"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/config/database";

import User from "@/models/User";

import { getSessionUser } from "@/utils/getSessionUser";

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
}

export default bookmarkProperty;
