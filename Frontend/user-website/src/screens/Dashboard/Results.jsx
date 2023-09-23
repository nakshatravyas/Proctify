import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ResultShowCard from "../../components/ResultShowCard";
import { X } from "lucide-react";
const Result = () => {
  const [active, setActive] = useState(false);
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="w-[80%] min-h-[90vh] flex justify-start items-center flex-col">
        <p className="my-8 font-bold text-3xl">Results</p>
        {active && (
          <div className="w-[100vw] h-[100vh] bg-black/70 absolute top-0 left-0 z-20 flex justify-center items-center">
            <div className="w-[45%] bg-white px-8 py-4 rounded border flex justify-start items-center flex-col">
              <div class="mt-2 mb-3 flex justify-between items-center w-full">
                <p class="font-bold text-2xl text-left my-2">Result</p>
                <button onClick={() => setActive(false)}>
                  <X />
                </button>
              </div>
              <table class="w-full border border-gray-300">
                <tr>
                  <th class="bg-gray-200 p-2 border">Field</th>
                  <th class="bg-gray-200 p-2 border">Details</th>
                </tr>
                <tr>
                  <td class="p-2 border">Subject</td>
                  <td class="p-2 border">Web Development With ReactJs</td>
                </tr>
                <tr>
                  <td class="p-2 border">Code</td>
                  <td class="p-2 border">11239r3</td>
                </tr>
                <tr>
                  <td class="p-2 border">Marks</td>
                  <td class="p-2 border">180/200</td>
                </tr>
                <tr>
                  <td class="p-2 border">Average</td>
                  <td class="p-2 border">120</td>
                </tr>
              </table>
            </div>
          </div>
        )}
        <div className="w-full grid gap-y-5 place-items-center">
          <ResultShowCard
            onClick={() => setActive(true)}
            data={{
              code: "11239r3",
              name: "Web Development With ReactJs",
              questions: 20,
              date: "1st September 2023",
              time: "9:30 AM",
              published: true,
            }}
          />
          <ResultShowCard
            data={{
              code: "11239r3",
              name: "Web Development With ReactJs",
              questions: 20,
              date: "1st September 2023",
              time: "9:30 AM",
              published: false,
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default Result;
