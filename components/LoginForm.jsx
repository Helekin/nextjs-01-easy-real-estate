import Link from "next/link";

const LoginForm = () => {
  return (
    <form>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Log In
      </h2>
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
    </form>
  );
};

export default LoginForm;
