import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import OptionCard from "./OptionCard";

const ExamCard = (props) => {
  return (
    <section className="flex justify-between items-start w-full">
      <div className="w-[70%] mb-10 mt-6 mx-auto">
        <p className="font-semibold text-sm tracking-wide bg-blue-500 inline-block px-4 py-1 rounded-full text-white">
          Que. {props.data.que_no}
        </p>
        <p className="mt-4 font-medium leading-8 text-lg">
          {props.data.que_title}
        </p>
        <ul className="mt-4">
          <OptionCard number={"A"} option_text={"Apple is Great"} />
          <OptionCard number={"B"} option_text={"Red Apple is Great"} />
          <OptionCard number={"C"} option_text={"Green Apple is Great"} />
          <OptionCard number={"D"} option_text={"Blue Apple is Great"} />
        </ul>
        <div className="flex justify-end mt-8">
          <button className="bg-blue-500 text-blue-100 hover:text-white hover:bg-blue-600 transition-all duration-150 ease-out focus:outline-none active:border-none font-medium px-6 py-2 rounded-full">
            Submit Answer
          </button>
        </div>
      </div>
      <div className="w-[18%] flex justify-center items-start sticky top-0">
        <p className="mt-10 text-2xl font-semibold border-black border-2 py-3 px-4 rounded-md flex justify-center items-center tracking-wider">
          <span className="mr-1">
            <Player
              src={require("../animation/timer.json")}
              className="w-12"
              loop
              autoplay
              speed={4}
            />
          </span>
          12:00
        </p>
      </div>
    </section>
  );
};

export default ExamCard;
