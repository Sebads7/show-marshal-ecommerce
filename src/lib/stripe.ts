import Stripe from "stripe";

const api_key = process.env.STRIPE_API_KEY;

export const stripe = new Stripe(api_key as string, {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
});
{
}
