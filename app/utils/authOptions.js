import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import connectDB from "@/config/database";

import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        await connectDB();

        const userExists = await User.findOne({ email: credentials.email });

        if (!userExists) return null;

        const matchPassword = await bcrypt.matchPassword(
          credentials.password,
          userExists.password
        );

        if (!matchPassword) return null;

        return {
          id: userExists.id,
          name: userExists.username,
          email: userExists.email,
        };
      },
    }),
  ],
};
