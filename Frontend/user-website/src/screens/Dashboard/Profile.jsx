import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Pencil, X } from "lucide-react";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="max-w-full min-h-[90vh] w-[70%] mx-auto flex justify-start flex-col">
        <div className="flex justify-between items-center">
          <p className="mt-10 mb-6 font-semibold text-2xl">
            {editMode ? "Edit Profile" : "My Profile"}
          </p>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? <X /> : <Pencil />}
          </button>
        </div>
        {editMode ? (
          <form className="w-[50%]">
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="phoneno"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneno"
                type="number"
                name="phoneno"
                required
              />
            </div>
            <button className="mt-4 px-4 rounded-md py-[6px] bg-blue-500 text-blue-100 hover:text-white hover:bg-blue-600 transition-all hover:transition-all duration-150 hover:duration-150 ease-out hover:ease-in">
              Save Changes
            </button>
          </form>
        ) : (
          <>
            <p className="my-2 text-lg">Name: Krish Jotaniya</p>
            <p className="my-2 text-lg">Email: krish@gmail.com</p>
            <p className="my-2 text-lg">Phone No: +918765432678</p>
          </>
        )}
      </section>
    </main>
  );
};

export default Profile;
