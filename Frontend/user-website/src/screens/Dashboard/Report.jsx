import React, { useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";

const Report = () => {
  const [data, setData] = useState({
    email: "",
    problem: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.problem) {
      toast.dismiss();
      toast.error("Enter All Fields");
      return;
    }
    toast.success("Problem Submitted Successful!");
    setData({
      email: "",
      problem: "",
    });
  };

  const setValueHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="flex justify-center h-[90vh] items-start w-[80%]">
        <div className="my-10 w-[50%] flex justify-center items-center flex-col py-6 px-5 rounded-md">
          <p className="text-2xl font-semibold my-3">Report A Problem</p>
          <div className="w-full">
            <form className=" px-8 pt-6 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={setValueHandler}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="problem"
                >
                  Problem
                </label>
                <textarea
                  name="problem"
                  id="problem"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none text-sm"
                ></textarea>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[50%]"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Report;
