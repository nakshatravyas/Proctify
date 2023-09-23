import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const Verify = () => {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);
  return (
    <section className="flex justify-center items-center h-[90vh] w-full bg-blue-50">
      <div className="w-[36%] flex justify-center items-center flex-col py-6 px-5 rounded-md">
        <p className="text-2xl font-semibold my-4">Verify Profile</p>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <button
          className="bg-blue-600 w-full mt-5 text-white px-6 py-2 rounded-md mb-6 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700"
          onClick={capture}
        >
          Capture Photo
        </button>
      </div>
    </section>
  );
};

export default Verify;
