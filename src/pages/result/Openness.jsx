import { Link } from "react-router-dom";

export default function Openness() {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">經驗開放性</h2>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/agreeableness">親和性</Link>
  
    </section>
  );
}
