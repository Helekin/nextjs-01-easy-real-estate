import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
          image: userExists.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ account, profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists and use google
      if (account.provider === "google") {
        const userExists = await User.findOne({ email: profile.email });
        // 3. If not, create user
        if (!userExists) {
          // truncate username if too long
          const username = profile.name.slice(0, 20);

          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          });
        }
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign user id from the session
      session.user.id = user._id.toString();
      // 3. Return session
      return session;
    },
  },
};
