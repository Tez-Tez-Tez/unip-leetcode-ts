import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/quiz";
import { questions } from "~/data/questions";
import { useTimer } from "~/hooks/useTimer";

const TIMER_SECONDS = 15;
const TOTAL_QUESTIONS = questions.length;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz de Algoritmos" },
    { name: "description", content: "Pon a prueba tus conocimientos de algoritmos" },
  ];
}

type AnswerState = "waiting" | "correct" | "incorrect" | "timeout";

export default function Quiz() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("waiting");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTimerDisabled, setIsTimerDisabled] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;

  const handleExpire = useCallback(() => {
    setAnswerState("timeout");
    setIsTimerDisabled(true);
  }, []);

  const { timeLeft, reset: resetTimer } = useTimer(
    TIMER_SECONDS,
    handleExpire,
    isTimerDisabled
  );

  const handleAnswer = (optionIndex: number) => {
    if (answerState !== "waiting") return;

    setSelectedIndex(optionIndex);
    setIsTimerDisabled(true);

    if (optionIndex === currentQuestion.correctIndex) {
      setAnswerState("correct");
      setScore((prev) => prev + 1);
    } else {
      setAnswerState("incorrect");
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigate("/results", { state: { score, total: TOTAL_QUESTIONS } });
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setAnswerState("waiting");
    setSelectedIndex(null);
    setIsTimerDisabled(false);
    resetTimer();
  };

  const progressPercent = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const isTimerLow = timeLeft <= 5;

  const getOptionClass = (index: number) => {
    if (answerState === "waiting") {
      return "border-gray-600 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer";
    }
    if (index === currentQuestion.correctIndex) {
      return "border-green-500 bg-green-500/20 text-green-300";
    }
    if (index === selectedIndex) {
      return "border-red-500 bg-red-500/20 text-red-300";
    }
    return "border-gray-700 opacity-50";
  };

  const getTimerColor = () => {
    if (isTimerLow) return "bg-red-500";
    return "bg-purple-500";
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">AlgoQuiz</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Puntaje:</span>
              <span className="text-purple-400 font-bold text-lg">{score}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-gray-500 text-sm mb-6 text-right">
          {currentIndex + 1} / {TOTAL_QUESTIONS}
        </p>

        {/* Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Tiempo restante</span>
            <span
              className={`font-mono font-bold text-lg ${
                isTimerLow ? "text-red-400" : "text-purple-400"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${getTimerColor()}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          {/* Code Snippet */}
          <div className="bg-gray-950 rounded-xl p-4 mb-6 font-mono text-sm text-gray-300 border border-gray-800 overflow-x-auto">
            <pre>{currentQuestion.code}</pre>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answerState !== "waiting"}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  getOptionClass(index)
                }`}
              >
                <span className="text-white">{option}</span>
              </button>
            ))}
          </div>

          {/* Feedback & Next */}
          {answerState !== "waiting" && (
            <div className="mt-6 space-y-4">
              <div
                className={`p-4 rounded-xl text-center font-semibold ${
                  answerState === "correct"
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : answerState === "timeout"
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    : "bg-red-500/10 text-red-400 border border-red-500/30"
                }`}
              >
                {answerState === "correct" && "¡Respuesta correcta!"}
                {answerState === "incorrect" && "Respuesta incorrecta"}
                {answerState === "timeout" && "¡Se acabó el tiempo!"}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors cursor-pointer"
              >
                {isLastQuestion ? "Ver resultados" : "Siguiente pregunta"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
