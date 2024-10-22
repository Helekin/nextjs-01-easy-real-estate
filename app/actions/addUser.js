"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import connectDB from "@/config/database";

import User from "@/models/User";

async function addUser(formData) {
  await connectDB();

  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const userEmailExists = await User.findOne({ email: email });

  if (userEmailExists) {
    throw new Error("Email already exists!");
  }

  const userNameExists = await User.findOne({ username: username });

  if (userNameExists) {
    throw new Error("Username already exists!");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords don't match!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    email: email,
    username: username,
    password: hashedPassword,
  };

  const newUser = new User(userData);

  await newUser.save();

  revalidatePath("/", "layout");

  redirect("/auth/login");
}

export default addUser;
