import Stripe from "stripe";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {

    const bookingId = session.metadata?.bookingId;
    const transactionId = session.payment_intent;

    if (!bookingId || !transactionId) {
        console.log("Missing required metadata in session");
        return;
    }

    const booking = await prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId,
        },
        include: {
            service: true,
        },
    });

    try {
        const result = await prisma.payment.upsert({
            where: {
                bookingId,
            },
            create: {
                bookingId,
                amount: booking.service.price,
                transactionId: transactionId as string,
                status: PaymentStatus.Paid,
            },
            update: {
                transactionId: transactionId as string,
                status: PaymentStatus.Paid,
            },
        });

        console.log("✅ Payment saved:", result);

    } catch (err) {
        console.error("❌ Payment save failed:", err);
    }
};