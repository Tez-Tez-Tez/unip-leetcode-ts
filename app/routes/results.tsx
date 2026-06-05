import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import type { Route } from "./+types/results";
import { questions } from "~/data/questions";
import { useHighScore } from "~/hooks/useHighScore";
import { useTheme } from "~/hooks/useTheme";
import { useSound } from "~/hooks/useSound";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resultados del Quiz" },
    { name: "description", content: "Resultados del quiz de algoritmos" },
  ];
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle } = useTheme();
  const { muted, toggleMute } = useSound();
  const { score = 0, total = questions.length } = (location.state as {
    score: number;
    total: number;
  }) ?? {};

  const { highScore, updateHighScore, resetHighScore, isNewRecord } =
    useHighScore();
  const isRecord = isNewRecord(score);

  useEffect(() => {
    updateHighScore(score);
  }, [score, updateHighScore]);

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
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-end gap-2 mb-4">
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
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center shadow-sm">
          {isRecord && (
            <div className="inline-block px-4 py-1 mb-4 bg-yellow-50 dark:bg-yellow-500/20 border border-yellow-300 dark:border-yellow-500/40 rounded-full text-yellow-700 dark:text-yellow-400 text-sm font-semibold">
              ¡Nuevo récord!
            </div>
          )}
          <div className="text-6xl mb-6">{emoji}</div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completado</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{message}</p>

          {/* Score Circle */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e5e7eb"
                className="dark:stroke-gray-700"
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
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{score}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xl">/{total}</span>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">{percentage}%</p>

          <div className="flex items-center justify-center gap-6 mb-8 p-4 bg-gray-50 dark:bg-gray-950/50 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Puntaje</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {score}/{total}
              </p>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Mejor puntaje</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{highScore}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/quiz")}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors cursor-pointer mb-3"
          >
            Intentar de nuevo
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold transition-colors cursor-pointer mb-3"
          >
            Volver al inicio
          </button>

          <button
            onClick={resetHighScore}
            className="w-full py-2 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500/50 text-gray-500 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors cursor-pointer"
          >
            Resetear récord
          </button>
        </div>
      </div>
    </div>
  );
}
