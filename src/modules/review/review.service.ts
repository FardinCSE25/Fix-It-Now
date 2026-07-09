import { prisma } from "../../lib/prisma";
import { ReviewPayload } from "./review.interface";

const createReviewIntoDB = async (customerId: string, payload: ReviewPayload) => {

    const { bookingId, rating, comment } = payload;

    const booking = await prisma.booking.findFirstOrThrow({
        where: {
            id: bookingId,
            customerId,
            status: "Completed",
        },
    });

    const isReviewExists = await prisma.review.findFirst({
        where: {
            customerId,
            technicianId: booking.technicianId,
        },
    });

    if (isReviewExists) {
        throw new Error("You have already reviewed this technician.");
    }

    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5.");
    }

    const review = await prisma.review.create({
        data: {
            customerId,
            technicianId: booking.technicianId,
            rating,
            comment,
        },

        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },

            technician: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return review;
};



const getAllReviewsFromDB = async () => {
    const reviews = await prisma.review.findMany({
        omit: {
            customerId: true,
            technicianId: true
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            customer: {
                omit: {
                    password: true
                }
            },
            technician: {
                omit: {
                    password: true
                }
            }
        }
    })

    return reviews
}

export const reviewService = {
    createReviewIntoDB,
    getAllReviewsFromDB
};