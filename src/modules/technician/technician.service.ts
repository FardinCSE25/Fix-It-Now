import { Role, UserStatus } from "../../../generated/prisma/enums";
import { UserWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { TechnicianQuery } from "./Technician.interface";

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

        orderBy: {
            technicianProfile: {
                [sortBy]: sortOrder,
            },
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
        technicianProfile:{
            omit: {
                userId: true,
                createdAt: true
            },
         },
        technicianReviews: true
        
    },
});
    return technician
}

export const technicianService = {
    getAllTechniciansFromDB,
    getSingleTechnicianFromDB
}