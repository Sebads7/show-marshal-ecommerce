import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

const webhook_secret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhook_secret);
  } catch (error) {
    console.error(error);
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata?.userId,
        },
      });

      await redis.del(`cart-${session.metadata?.userId}`);
      break;
    }
    default: {
      console.log(`Unhandled event type ${event.type}`);
    }
  }
  return new Response(null, { status: 200 });
}
