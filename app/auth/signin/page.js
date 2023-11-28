"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      console.log(result);
      if (result?.error) {
        let errorMessage = result?.error;
        try {
          const errorBody = JSON.parse(result.error);
          errorMessage = errorBody.error || result?.error;
        } catch (e) {
          const eMessage = e.message;
          toast(eMessage);
          setLoading(false);
        }
        toast(errorMessage);
        setLoading(false);
      }
    } catch (error) {
      const errorMessage = error.message;
      toast(errorMessage || "Sorry something went wront!try again");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="flex flex-col w-full h-screen justify-center items-center mx-auto bg-gray-100">
        <h3 className="mb-5">LOG INTO TASK MANAGEMENT SYSTEM</h3>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className=" w-4/5 sm:w-2/5 bg-white p-6 rounded-md shadow-2xl mx-auto flex flex-col justify-center"
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              {...register("email", { required: "Username is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@domain.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 self-center text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
