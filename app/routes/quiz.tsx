import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/quiz";
import { questions as rawQuestions } from "~/data/questions";
import { useTimer } from "~/hooks/useTimer";
import { useTheme } from "~/hooks/useTheme";
import { useSound } from "~/hooks/useSound";

const TIMER_SECONDS = 15;
const TOTAL_QUESTIONS = rawQuestions.length;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestion(q: (typeof rawQuestions)[number]) {
  const correctValue = q.options[q.correctIndex];
  const shuffledOptions = shuffleArray(q.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctValue);
  return { ...q, options: shuffledOptions, correctIndex: newCorrectIndex };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz de Algoritmos" },
    { name: "description", content: "Pon a prueba tus conocimientos de algoritmos" },
  ];
}

type AnswerState = "waiting" | "correct" | "incorrect" | "timeout";

export default function Quiz() {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const { playCorrect, playIncorrect, playTimeout, muted, toggleMute } = useSound();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("waiting");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTimerDisabled, setIsTimerDisabled] = useState(false);

  const questions = useMemo(() => rawQuestions.map(shuffleQuestion), []);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;

  const handleExpire = useCallback(() => {
    setAnswerState("timeout");
    setIsTimerDisabled(true);
    playTimeout();
  }, [playTimeout]);

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
      playCorrect();
    } else {
      setAnswerState("incorrect");
      playIncorrect();
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
      return "border-gray-300 dark:border-gray-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 cursor-pointer";
    }
    if (index === currentQuestion.correctIndex) {
      return "border-green-500 bg-green-50 dark:bg-green-500/20 text-green-700 dark:text-green-300";
    }
    if (index === selectedIndex) {
      return "border-red-500 bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-300";
    }
    return "border-gray-200 dark:border-gray-700 opacity-50";
  };

  const getTimerColor = () => {
    if (isTimerLow) return "bg-red-500";
    return "bg-purple-500";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AlgoQuiz</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label={muted ? "Activar sonido" : "Silenciar"}
            >
              {muted ? (
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Cambiar tema"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Puntaje:</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">{score}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-gray-500 dark:text-gray-500 text-sm mb-6 text-right">
          {currentIndex + 1} / {TOTAL_QUESTIONS}
        </p>

        {/* Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Tiempo restante</span>
            <span
              className={`font-mono font-bold text-lg ${
                isTimerLow ? "text-red-500 dark:text-red-400" : "text-purple-600 dark:text-purple-400"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${getTimerColor()}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          {/* Code Snippet */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-4 mb-6 font-mono text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <pre>{currentQuestion.code}</pre>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
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
                <span className="text-gray-900 dark:text-white">{option}</span>
              </button>
            ))}
          </div>

          {/* Feedback & Next */}
          {answerState !== "waiting" && (
            <div className="mt-6 space-y-4">
              <div
                className={`p-4 rounded-xl text-center font-semibold ${
                  answerState === "correct"
                    ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-300 dark:border-green-500/30"
                    : answerState === "timeout"
                    ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-500/30"
                    : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/30"
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
