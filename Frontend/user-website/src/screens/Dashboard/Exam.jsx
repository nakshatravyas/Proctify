import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import toast from "react-hot-toast";
import ExamShowCard from "../../components/ExamShowCard";
import axios from "axios";
const Exam = () => {
  const [examCode, setExamCode] = useState("bbt");
  const [examData, setExamData] = useState();
  useEffect(() => {
    examCodeCheckHandler();
  }, []);
  const examCodeCheckHandler = async () => {
    if (examCode) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:3002/api/v1/student/getexamdetails/bbt`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExamData(response.data.data);
        console.log(response.data.data);
        toast.success("");
      } catch (error) {
        toast.error(error);
      }
    }
  };
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="w-[80%] min-h-[90vh] flex justify-center items-center flex-col">
        {examData && (
          <div className="mt-10 w-full flex justify-center items-center flex-col">
            <ExamShowCard
              data={{
                code: examData.examcode,
                name: examData.exam_name,
                date: examData.startdate,
                time: examData.starttime,
                negative_marks: examData.negative_marks,
                question_weightage: examData.question_weightage,
                duration: examData.duration,
              }}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Exam;
