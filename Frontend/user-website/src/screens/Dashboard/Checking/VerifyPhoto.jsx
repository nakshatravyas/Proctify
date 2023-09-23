import React, { useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const VerifyPhoto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  const verifyProfile = () => {
    document.documentElement.requestFullscreen().then(() => {
      navigate(`/dashboard/exam/${location.state.code}`);
    });
  };
  return (
    <section className="flex justify-center items-center h-[90vh] w-full bg-blue-50">
      <div className="w-[36%] flex justify-center items-center flex-col py-6 px-5 rounded-md">
        <p className="text-2xl font-semibold my-4">Verify Profile</p>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <div className="flex justify-center items-center w-full ">
          <button
            className="bg-blue-600 w-full mt-5 text-white px-6 py-2 rounded-md transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 mr-4"
            onClick={capture}
          >
            Capture
          </button>
          <button
            className="bg-blue-600 w-full mt-5 text-white px-6 py-2 rounded-md transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 "
            onClick={verifyProfile}
          >
            Verify
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyPhoto;
