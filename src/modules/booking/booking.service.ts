import { prisma } from "../../lib/prisma";

const createBookingIntoDB = async (customerId: string, serviceId: string) => {

    const service = await prisma.service.findUniqueOrThrow({
        where: {
            id: serviceId,
        },
    });

    const isBookingAlreadyExist = await prisma.booking.findFirstOrThrow({
        where: {
            customerId,
            serviceId
        }
    })

    const booking = await prisma.booking.create({
        data: {
            customerId,
            technicianId: service.technicianId,
            serviceId,
        },
        include: {
            technician: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    technicianProfile: {
                        select: {
                            bio: true,
                            experience: true,
                        },
                    },
                },
            },
            service: true,
        },
    });

    return booking;
};


const getMyBookingsFromDB = async (customerId: string) => {

    const bookings = await prisma.booking.findMany({
        where: {
            customerId,
        },

        orderBy: {
            createdAt: "desc",
        },

        include: {
            service: true,

            technician: {
                select: {
                    id: true,
                    name: true,
                    email: true,

                    technicianProfile: {
                        select: {
                            bio: true,
                            experience: true,
                        },
                    },
                },
            },
        },
    });

    return bookings;
};


const getMySpecificBookingFromDB = async (customerId: string, bookingId: string) => {
    const booking = await prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId,
            customerId
        },

        include: {
            service: true,

            technician: {
                select: {
                    id: true,
                    name: true,
                    email: true,

                    technicianProfile: {
                        select: {
                            bio: true,
                            experience: true,
                        },
                    },
                },
            },
        },
    });

    return booking;
};

export const bookingService = {
    createBookingIntoDB,
    getMyBookingsFromDB,
    getMySpecificBookingFromDB
}