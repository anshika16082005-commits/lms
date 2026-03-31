"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, FileText, Lock } from "lucide-react";

export default function CoursePlayer() {
  const [activeLecture, setActiveLecture] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState("");

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  type module = {
    title: string;
    description?: string;
    lessons: {
      title: string;
      type: "video" | "pdf" | "quiz";
      url: String;
      completed: Boolean;
    }[];
  };

  const [modules, setmodules] = useState<module[]>([]);

  const quiz = {
    question: "What is React?",
    options: ["Library", "Framework", "Language", "Database"],
    correct: 0,
  };

  // Flatten lessons
  let flatlessons: any[] = [];
  modules.flatMap((s) => (flatlessons = [...flatlessons, ...s.lessons]));

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await fetch("/api/mycourses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();
        console.log("Course Data:", data);
        setmodules(data[0].modules);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

  return (
    <div className="flex gap-6">
      {/* LEFT SIDE */}
      <div className="flex-1 space-y-6">
        {/* VIDEO */}
        <div className="w-full h-105 bg-black rounded-2xl flex items-center justify-center text-white">
          Video Player
        </div>

        {/* TITLE */}
        <div>
          <h2 className="text-2xl font-semibold">
            {/* {flatlessons[activeLecture].title} */}
          </h2>
          <p className="text-gray-500 text-sm">
            Learn step by step with practical examples.
          </p>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-between items-center border rounded-xl p-4 bg-white">
          <div className="flex gap-3">
            <Button
            // onClick={() => {
            //   const nextLecture = flatlessons[activeLecture + 1];

            //   if (nextLecture?.type === "quiz") {
            //     setShowQuiz(true);
            //   } else {
            //     setActiveLecture((prev) =>
            //       Math.min(prev + 1, flatlessons.length - 1),
            //     );
            //   }
            // }}
            >
              Mark Complete
            </Button>

            <Button
              variant="outline"
              // onClick={() =>
              //   setActiveLecture((prev) =>
              //     Math.min(prev + 1, flatlessons.length - 1),
              //   )
              // }
            >
              Next Lecture
            </Button>
          </div>

          <span className="text-sm text-gray-500">
            Progress:{" "}
            {/* {Math.round(((activeLecture + 1) / flatlessons.length) * 100)}% */}
          </span>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-2xl border">
          <div className="flex border-b">
            {["overview", "resources", "notes", "qa"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize
                ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === "overview" && (
              <p className="text-gray-600 text-sm">
                This lecture covers core concepts in a structured way.
              </p>
            )}

            {activeTab === "resources" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 cursor-pointer hover:underline">
                  <FileText size={16} />
                  Download PDF Notes
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:underline">
                  <FileText size={16} />
                  Source Code Files
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes..."
                  className="w-full h-32 border rounded-lg p-3 text-sm"
                />
                <Button size="sm">Save Notes</Button>
              </div>
            )}

            {activeTab === "qa" && (
              <div className="space-y-3">
                <input
                  placeholder="Ask a question..."
                  className="w-full border rounded-lg p-2 text-sm"
                />
                <Button size="sm">Post</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-85 h-[calc(100vh-120px)] overflow-y-auto">
        <Card className="rounded-2xl">
          <CardContent className="p-4 space-y-4">
            {modules.map((mod, sIndex) => (
              <div key={sIndex}>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  {mod.title}
                </h3>

                {mod.lessons.map((lec, i) => {
                  const index =
                    modules
                      .slice(0, sIndex)
                      .reduce((acc, sec) => acc + sec.lessons.length, 0) + i;

                  return (
                    <div
                      key={i}
                      onClick={() => setActiveLecture(index)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer
                      ${
                        activeLecture === index
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {lec.type === "video" && <PlayCircle size={16} />}
                        {lec.type === "pdf" && <FileText size={16} />}
                        {lec.type === "quiz" && <CheckCircle size={16} />}

                        <span className="text-sm">{lec.title}</span>
                      </div>

                      {lec.completed ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Lock size={16} className="text-gray-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 🔥 QUIZ MODAL */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-100 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Quiz</h2>

            <p className="text-sm">{quiz.question}</p>

            <div className="space-y-2">
              {quiz.options.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => !submitted && setSelectedAnswer(i)}
                  className={`p-3 border rounded-lg cursor-pointer
                  ${
                    selectedAnswer === i
                      ? "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>

            {!submitted ? (
              <Button
                className="w-full"
                disabled={selectedAnswer === null}
                onClick={() => setSubmitted(true)}
              >
                Submit
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  {selectedAnswer === quiz.correct
                    ? "✅ Correct!"
                    : "❌ Wrong!"}
                </p>

                <Button
                  className="w-full"
                  // onClick={() => {
                  //   setShowQuiz(false);
                  //   setSubmitted(false);
                  //   setSelectedAnswer(null);
                  //   setActiveLecture((prev) =>
                  //     Math.min(prev + 1, flatlessons.length - 1),
                  //   );
                  // }}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
