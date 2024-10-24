"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: amenities,

    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageKey = `${Date.now()}_${imageFile.name}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: imageKey,
      Body: imageBuffer,
      ContentType: imageFile.type,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(params);

    await s3Client.send(command);

    imageUrls.push(
      `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${imageKey}`
    );
  }

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
