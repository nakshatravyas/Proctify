import React, { useEffect, useState,useRef } from "react";
import { useLocation } from "react-router-dom";
import ExamCard from "../../components/ExamCard";
import RecordRTC from 'recordrtc';
import toast from "react-hot-toast";

const GiveExam = () => {
  const router = useLocation();
  const [isFullScreen, setFullScreen] = useState(false);
 const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const recorderRef = useRef(null);

  const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ screen: true });
    console.log(stream)
    const recorder = new RecordRTC(stream, {
      type: 'video',
      mimeType: 'video/webm',
    });
    recorder.startRecording();
    recorderRef.current = recorder;
    setRecording(true);
    setStream(stream);
  } catch (error) {
    toast.error("Screen Permission Is Necessary")
    startRecording()
    }
};

  
  useEffect(() => {
    //startRecording()
    const blockShortcuts = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "c" ||
          event.key === "v" ||
          event.key === "t" ||
          event.key === "r")
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", blockShortcuts);
    return () => {
      window.removeEventListener("keydown", blockShortcuts);
    };
  }, []);
  return (
    <main className="flex items-start select-none">
      <section className="w-full min-h-[100vh] mx-auto flex flex-col">
        <section className="flex justify-between items-center w-full mx-auto py-4 px-10 bg-white shadow border-b">
          <p className="font-semibold">
            Exam:{" "}
            <span className="font-normal">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium, ratione.
            </span>
          </p>
          <p className="font-semibold">
            Code:{" "}
            <span className="font-normal">
              {router.pathname.replace("/dashboard/exam/", "")}
            </span>
          </p>
        </section>
        <section className="flex justify-between items-start">
          <ExamCard
            data={{
              que_title: "This IS Question Title",
              que_no: 10,
            }}
          />
        </section>
      </section>
    </main>
  );
};

export default GiveExam;
