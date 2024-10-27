"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/config/database";

import Message from "@/models/Message";

import { getSessionUser } from "@/utils/getSessionUser";

async function deleteMessage(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (message.recipient.toString() !== userId) {
    throw new Error("Unathorized");
  }

  await message.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteMessage;