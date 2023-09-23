import React from "react";
import { useNavigate } from "react-router-dom";

const ExamShowCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="w-[85%] bg-white shadow-md border rounded-md p-4 flex justify-between items-end cursor-pointer mb-5">
      <div>
        <p className="font-semibold mb-1 text-lg">
          {props.data.code} - {props.data.name}
        </p>
        <p className="text-sm mr-2 mb-1">
          Date: {props.data.date.split("T")[0]}
        </p>
        <p className="text-sm mr-2">Time: {props.data.time}</p>
      </div>
      <div>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 text-sm hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700"
          onClick={() =>
            navigate(`/dashboard/instructions`, {
              state: {
                code: props.data.code,
                name: props.data.name,
                duration: props.data.duration,
                negative_marks: props.data.negative_marks,
                question_weightage: props.data.question_weightage,
              },
            })
          }
        >
          Give Exam
        </button>
      </div>
    </div>
  );
};

export default ExamShowCard;
