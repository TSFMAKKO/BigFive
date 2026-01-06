import { Link, Outlet } from "react-router-dom";

export default function ResultPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">測驗結果</h1>
        <nav className="flex flex-wrap gap-3 mb-6">
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/neuroticism">情緒不穩定性</Link>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/extroversion">外向性</Link>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/openness">經驗開放性</Link>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/agreeableness">親和性</Link>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/conscientiousness">盡責性</Link>
        </nav>
        <div className="bg-white/50 rounded border p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
