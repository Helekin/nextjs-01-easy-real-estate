"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import ClipLoader from "react-spinners/ClipLoader";

const LoginForm = () => {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: "/",
    });

    if (result.error) {
      throw new Error(result.error);
    }
  };

  const handleGoogleSubmit = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const override = {
    display: "block",
    margin: "100px auto",
  };

  if (status === "loading") {
    return (
      <ClipLoader
        color="#3b82f6"
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl text-center font-semibold mb-6">Log In</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log In
        </button>
      </div>

      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          Sign up.
        </Link>
      </p>

      <div className="mt-6">
        <button
          onClick={handleGoogleSubmit}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        >
          Sign in with Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
