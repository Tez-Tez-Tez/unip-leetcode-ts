import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { useHighScore } from "~/hooks/useHighScore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AlgoQuiz - Pon a prueba tus conocimientos" },
    { name: "description", content: "Quiz interactivo sobre algoritmos clásicos" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { highScore } = useHighScore();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-4xl font-bold text-white mb-3">AlgoQuiz</h1>
          <p className="text-gray-400 text-lg">
            Pon a prueba tus conocimientos sobre algoritmos clásicos
          </p>
        </div>

        {highScore > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm">
            <span>🏆 Mejor puntaje: {highScore}</span>
          </div>
        )}

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">¿Cómo funciona?</h2>
          <ul className="text-left space-y-3 text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>10 preguntas sobre algoritmos clásicos de programación</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>15 segundos por pregunta para responder</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Cada acierto suma un punto</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Al final verás tu puntuación y porcentaje</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate("/quiz")}
          className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors cursor-pointer shadow-lg shadow-purple-600/25"
        >
          Comenzar Quiz
        </button>
      </div>
    </div>
  );
}
