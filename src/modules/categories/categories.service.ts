import { prisma } from "../../lib/prisma";
import { CategoryPayload } from "./categories.interface";

const createCategoryIntoDB = async (payload: CategoryPayload) => {
    const { title, description } = payload;
    const createdCategory = await prisma.category.create({
        data: {
            title,
            description
        }
    })

    return createdCategory
}


const getAllCategoriesFromDB = async () => {
    const categories = await prisma.category.findMany({
        include: {
            services: true
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return categories;
}

export const categoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB
}