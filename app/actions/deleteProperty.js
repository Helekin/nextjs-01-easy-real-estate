"use server";

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

import connectDB from "@/config/database";

import Property from "@/models/Property";

import { getSessionUser } from "@/utils/getSessionUser";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property Not Found");

  // Verified ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // Extract public Key from image URLs
  const publicKeys = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1);
  });

  // Delete from AWS S3
  if (publicKeys.length > 0) {
    for (let publicKey of publicKeys) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: publicKey,
      };

      const command = new DeleteObjectCommand(params);

      await s3Client.send(command);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
