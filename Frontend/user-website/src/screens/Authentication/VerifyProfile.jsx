import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const VerifyProfile = () => {
  const webcamRef = useRef(null);
  const [imageBase64Data, setImageBase64Data] = useState("");
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);
  const register = async() => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        // userId: "hetpatel",
        imageBase64Data,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

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
            onClick={register}
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyProfile;
