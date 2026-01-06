import { Link } from "react-router-dom";

export default function Extroversion() {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">外向性</h2>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/openness">經驗開放性</Link>
  
    </section>
  );
}
