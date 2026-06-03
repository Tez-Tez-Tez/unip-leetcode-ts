import { useNavigate, useLocation } from "react-router";
import type { Route } from "./+types/results";
import { questions } from "~/data/questions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resultados del Quiz" },
    { name: "description", content: "Resultados del quiz de algoritmos" },
  ];
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score = 0, total = questions.length } = location.state as {
    score: number;
    total: number;
  } ?? {};

  const percentage = Math.round((score / total) * 100);

  let message: string;
  let emoji: string;

  if (percentage === 100) {
    message = "¡Perfecto! Dominas los algoritmos";
    emoji = "🏆";
  } else if (percentage >= 70) {
    message = "¡Muy bien! Tienes buen conocimiento";
    emoji = "🌟";
  } else if (percentage >= 40) {
    message = "Vas por buen camino, sigue practicando";
    emoji = "💪";
  } else {
    message = "Sigue estudiando, ¡tú puedes!";
    emoji = "📚";
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <div className="text-6xl mb-6">{emoji}</div>

          <h1 className="text-3xl font-bold text-white mb-2">Quiz Completado</h1>
          <p className="text-gray-400 mb-8">{message}</p>

          {/* Score Circle */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#1f2937"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#a855f7"
                strokeWidth="8"
                strokeDasharray={`${(percentage / 100) * 339.292} 339.292`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <span className="text-4xl font-bold text-white">{score}</span>
                <span className="text-gray-400 text-xl">/{total}</span>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-purple-400 mb-8">{percentage}%</p>

          <button
            onClick={() => navigate("/quiz")}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors cursor-pointer mb-3"
          >
            Intentar de nuevo
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold transition-colors cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
