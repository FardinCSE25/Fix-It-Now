import bcrypt from "bcryptjs";
import { SignOptions } from "jsonwebtoken";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { UserWhereInput } from "../../../generated/prisma/models";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { generateAccessToken } from "../../utils/jwtUtils";
import { LoginPayload, RegisterUserPayload, UserQuery } from "./auth.interface";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
    const { name, email, password, role, experience, bio, workingDays, startTime, endTime } = payload;

    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isUserExist) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    let registeredUser, user;

    if (!role || role === Role.Customer) {
        registeredUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
    }

    else {
        registeredUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                availability: {
                    create: {
                        workingDays,
                        startTime: startTime!,
                        endTime: endTime!
                    }
                },
                technicianProfile: {
                    create: {
                        experience: experience!,
                        bio
                    }
                }
            }
        });
    }


    if (registeredUser.role === Role.Technician) {
        user = await prisma.user.findUniqueOrThrow({
            where: {
                id: registeredUser.id,
                email: registeredUser.email || email
            },
            omit: {
                password: true,
            },
            include: {
                technicianProfile: {
                    omit: {
                        createdAt: true
                    }
                },
                availability: true
            }
        })
    }

    else {
        user = await prisma.user.findUniqueOrThrow({
            where: {
                id: registeredUser.id,
                email: registeredUser.email || email
            },
            omit: {
                password: true
            }
        })
    }
    return user;
}


const loginUserIntoDB = async (payload: LoginPayload) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    if (user.status === UserStatus.Banned) {
        throw new Error("Your account has been banned!");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = generateAccessToken(
        jwtPayload,
        config.jwt_access_secret!,
        config.jwt_access_expires_in as SignOptions
    );


    return {
        accessToken,
    };
}



const getMyProfileFromDB = async (id: string, role: Role) => {
    let user;

    if (role === Role.Technician) {
        user = await prisma.user.findUniqueOrThrow({
            where: {
                id
            },
            omit: {
                password: true
            },
            include: {
                technicianProfile: {
                    omit: {
                        createdAt: true
                    }
                },
                availability: true
            }
        })
    }

    else {
        user = await prisma.user.findUniqueOrThrow({
            where: {
                id
            },
            omit: {
                password: true
            }
        })
    }

    return user
}


const getAllUsersFromDB = async (query: UserQuery) => {
    const { searchTerm, role, status } = query;

    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder || "desc";

    const andConditions: UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    if (role) {
        andConditions.push({
            role,
        });
    }

    if (status) {
        andConditions.push({
            status,
        });
    }

    const users = await prisma.user.findMany({
        where: {
            AND: andConditions,
        },

        omit: {
            password: true,
        },

        include: {
            technicianProfile: {
                omit: {
                    createdAt: true,
                },
            },
            availability: true,
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
    });

    return users;
};



const updateUserIntoDB = async (id: string, status: UserStatus) => {

    const user = await prisma.user.findFirstOrThrow({
        where: {
            id
        }
    })

    if (user.status === status) {
        throw new Error(`User is already ${status} !`)
    }

    const updatedUser = await prisma.user.update({
        where: {
            id
        },

        data: {
            status
        },

        omit: {
            password: true
        }
    })

    return updatedUser
}

export const authService = {
    registerUserIntoDB,
    loginUserIntoDB,
    getMyProfileFromDB,
    getAllUsersFromDB,
    updateUserIntoDB
}