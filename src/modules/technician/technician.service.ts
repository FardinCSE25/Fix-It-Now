import { Role, UserStatus } from "../../../generated/prisma/enums";
import { UserWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { TechnicianQuery, UpdateAvailabilityPayload, UpdateTechnicianProfilePayload } from "./Technician.interface";

const getAllTechniciansFromDB = async (query: TechnicianQuery) => {
    const { searchTerm, status } = query;

    const sortBy = query.sortBy ? query.sortBy : "experience"
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";

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

    if (status) {
        andConditions.push({
            status: {
                equals: status as UserStatus,
            },
        });
    }

    const technicians = await prisma.user.findMany({
        where: {
            role: Role.Technician,
            AND: andConditions,
        },

        orderBy:
        {
            technicianProfile: {
                [sortBy]: sortOrder,
            },
        },

        omit: {
            password: true,
        },

        include: {
            technicianReviews: {
                omit: {
                    technicianId: true
                }
            },
            technicianProfile: {
                omit: {
                    userId: true,
                    createdAt: true
                },
            },
        },
    });

    return technicians;
};


const getSingleTechnicianFromDB = async (id: string) => {
    const technician = await prisma.user.findFirstOrThrow({
        where: {
            id,
            role: Role.Technician,
        },
        omit: {
            password: true,
        },
        include: {
            technicianProfile: {
                omit: {
                    userId: true,
                    createdAt: true
                },
            },
            technicianReviews: {
                omit: {
                    technicianId: true
                }
            }

        },
    });
    return technician
}



const updateTechnicianProfileIntoDB = async (userId: string, payload: UpdateTechnicianProfilePayload) => {

    const updatedProfile = await prisma.technicianProfile.update({
        where: {
            userId
        },
        data: payload
    });

    return updatedProfile;
};


const updateAvailabilityIntoDB = async (technicianId: string, payload: UpdateAvailabilityPayload) => {

    const availability = await prisma.availability.upsert({

        where: {
            technicianId
        },

        update: {
            workingDays: payload.workingDays,
            startTime: payload.startTime,
            endTime: payload.endTime,
        },

        create: {
            technicianId,
            workingDays: payload.workingDays,
            startTime: payload.startTime,
            endTime: payload.endTime,
        },
    });


    return availability;
};

export const technicianService = {
    getAllTechniciansFromDB,
    getSingleTechnicianFromDB,
    updateTechnicianProfileIntoDB,
    updateAvailabilityIntoDB
}