"use client";
import React, { useState } from "react";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { createTask } from "@/services/api.service";


const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleTaskCreation = async (data) => {
    const {file,...rest} = data
    console.log(rest);
    console.log(file);

    try {
      const result = await createTask(data);
      console.log(result);
      if (result?.error) {
        let errorMessage = result?.error;
        try {
          const errorBody = JSON.parse(result.error);
          errorMessage = errorBody.error || result?.error;
        } catch (e) {
          const eMessage = e.message;
          toast(eMessage);
        }
        toast(errorMessage);
      }
    } catch (error) {
      const errorMessage = error.message;
      toast(errorMessage || "Sorry something went wront!try again");
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between m-20">
          <h3 className="font-bold">Create Task</h3>
          <button className="text-white flex flex-row items-center bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2.5 self-center text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <BookmarkSquareIcon className="h-6 w-6" />
            Save draft
          </button>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(handleTaskCreation)}
            className="w-full sm:w-4/5 md:w-3/5 mx-auto"
          >
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name:
              </label>
              <input
                placeholder="Task Name"
                type="text"
                id="base-input"
                {...register("name", { required: "task name is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5 flex flex-col md:flex-row gap-3">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start date:
              </label>
              <input
                placeholder="Task Name"
                type="date"
                id="base-input"
                {...register("startDate", { required: "Start is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End date:
              </label>
              <input
                placeholder="Task Name"
                type="date"
                id="base-input"
                {...register("endDate", { required: "End is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Assignee:
              </label>
              <input
                placeholder="Type names to assign"
                type="text"
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Projects:
              </label>
              <input
                placeholder="Type projects to assign"
                type="text"
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="Description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task description:
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("description")}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your description here..."
              ></textarea>
            </div>
            <div className="flex gap-6 p-5 items-center">
              <label
                htmlFor="Priority"
                className="block mb-2 font-medium self-center text-gray-900 dark:text-white"
              >
                Task Priority
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="High"
                  {...register("priority")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  High
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="Normal"
                  {...register("priority")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Normal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="Low"
                  {...register("priority")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Low
                </label>
              </div>
            </div>
            <div className="flex mt-6 justify-between items-center gap-10">
              <div>
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Attach file:
                </label>
                <input
                  type="file"
                  id="base-input"
                  {...register("file")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 self-center text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
                <button className="text-white bg-gray-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 self-center text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
