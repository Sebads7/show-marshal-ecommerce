"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "@/lib/zodSchemas";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { off } from "process";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user.email !== "paintsmart@live.com") {
    return redirect("/");
  }
  const submission = parseWithZod(formData, { schema: productSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user.email !== "paintsmart@live.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const productId = formData.get("productId") as string;

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "paintsmart@live.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "paintsmart@live.com") {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Type check and access value

  let cart: Cart | null = null;
  let sessionId = cookies().get("sessionId")?.value;

  if (user) {
    cart = await redis.get(`cart-${user.id}`);
  } else if (!sessionId) {
    sessionId = uuidv4(); // Generate new session ID
    cookies().set("sessionId", sessionId); // Store session ID in a cookie for future requests
  } else {
    cart = await redis.get(`cart-${sessionId}`);
  }
  // Retrieve the existing cart from Redis

  // Fetch product details from the database
  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product found with the provided ID.");
  }

  let myCart = {} as Cart;
  // Initialize cart if none exists
  if (!cart || !cart.items) {
    myCart = {
      userId: user?.id || (sessionId as string),
      items: [
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          imageString: selectedProduct.images[0],
          quantity: 1,
        },
      ],
    };
  } else {
    let itemExists = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemExists = true;
        item.quantity += 1;
      }
      return item;
    });

    if (!itemExists) {
      myCart.items.push({
        id: productId,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageString: selectedProduct.images[0],
        quantity: 1,
      });
    }
  }
  if (user) {
    await redis.set(`cart-${user.id}`, myCart);
  } else {
    await redis.set(`cart-${sessionId}`, myCart);
  }
  // Store updated cart in Redis

  // Revalidate path to update cart display
  revalidatePath("/", "layout");
}

export async function deleteItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const productId = formData.get("productId") as string;

  let cart: Cart | null = null;
  let sessionId = cookies().get("sessionId")?.value;

  if (sessionId && !user) {
    cart = await redis.get(`cart-${sessionId}`);
  } else if (user) {
    cart = await redis.get(`cart-${user.id}`);
  }

  if (cart && cart.items) {
    cart.items = cart.items.filter((item) => item.id !== productId);

    if (cart?.items.length === 0) {
      (await redis.del(`cart-${user.id}`)) ||
        (await redis.del(`cart-${sessionId}`));
    } else {
      if (sessionId && !user) {
        await redis.set(`cart-${sessionId}`, cart);
      } else if (user) {
        await redis.set(`cart-${user.id}`, cart);
      }
    }

    revalidatePath("/bag", "layout");
  }
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let cart: Cart | null = null;
  let sessionId = cookies().get("sessionId")?.value;

  if (sessionId && !user) {
    cart = await redis.get(`cart-${sessionId}`);
  } else if (user) {
    cart = await redis.get(`cart-${user.id}`);
  }

  if (cart && cart.items.length > 0) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/success"
          : "https://ecommerce-practice1.vercel.app/payment/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/bag"
          : "https://ecommerce-practice1.vercel.app/bag",
      metadata: {
        userId: user ? user.id : sessionId || null,
      },
    });

    if (session.url) {
      return redirect(session.url as string);
    } else {
      throw new Error("Session URL not found");
    }
  }
}
