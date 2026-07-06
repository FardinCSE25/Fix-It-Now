import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ServicePayload } from "./services.interface";

const createServiceIntoDB = async (payload: ServicePayload, technicianId: string) => {
    const { categoryId, title, description, price } = payload;

    const isCategoryExists = await prisma.category.findUniqueOrThrow({
        where: {
            id: categoryId,
        },
    });

    if (price <= 0) {
        throw new Error("Price must be positive");
    }

    const createdService = await prisma.service.create({
        data: {
            technicianId,
            categoryId,
            title,
            description,
            price,
        },
        include: {
            technician: true,
            category: true,
        },
    });

    return createdService
}


const getAllServicesFromDB = async (type: string) => {

    const andConditions: ServiceWhereInput[] = [];

    if (type) {
        andConditions.push({
            category: {
                title: {
                    equals: type,
                    mode: "insensitive",
                },
            },
        });
    }

    const result = await prisma.service.findMany({
        where: {
            AND: andConditions,
        },
        omit: {
            technicianId: true
        },
        include: {
            category: true,
            technician: {
                select: {
                    technicianProfile: true
                }
            },
        },
    });

    return result;
};

export const servicesService = {
    createServiceIntoDB,
    getAllServicesFromDB
}