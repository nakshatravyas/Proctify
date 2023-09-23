import React from "react";

const Verify = () => {
  return (
    <section className="flex justify-center items-center h-[90vh] w-full bg-blue-50">
      <div className="mt-10 w-[36%] bg-white flex justify-center items-center flex-col py-6 px-5 shadow-md border rounded-md">
        <p className="text-2xl font-semibold my-6">Verify Profile</p>
        <button
          className="bg-blue-600 w-full text-white px-6 py-2 rounded-md mb-6 mt-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700"
          type="submit"
        >
          Capture Photo
        </button>
      </div>
    </section>
  );
};

export default Verify;
