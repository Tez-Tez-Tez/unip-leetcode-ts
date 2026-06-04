import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { useHighScore } from "~/hooks/useHighScore";
import { useTheme } from "~/hooks/useTheme";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AlgoQuiz - Pon a prueba tus conocimientos" },
    { name: "description", content: "Quiz interactivo sobre algoritmos clásicos" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { highScore } = useHighScore();
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
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
        </div>

        <div className="mb-8">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">AlgoQuiz</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Pon a prueba tus conocimientos sobre algoritmos clásicos
          </p>
        </div>

        {highScore > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-purple-50 dark:bg-purple-500/10 border border-purple-300 dark:border-purple-500/30 rounded-full text-purple-700 dark:text-purple-400 text-sm">
            <span>🏆 Mejor puntaje: {highScore}</span>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">¿Cómo funciona?</h2>
          <ul className="text-left space-y-3 text-gray-500 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
              <span>10 preguntas sobre algoritmos clásicos de programación</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
              <span>15 segundos por pregunta para responder</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
              <span>Cada acierto suma un punto</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
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
