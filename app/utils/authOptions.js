import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import connectDB from "@/config/database";

import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDB();

        const userExists = await User.findOne({ email: credentials.email });

        if (!userExists) {
          throw new Error("No user found with the entered email");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userExists.password
        );

        if (!matchPassword) {
          throw new Error("Password is incorrect");
        }

        return {
          id: userExists.id,
          name: userExists.username,
          email: userExists.email,
        };
      },
    }),
  ],
};
