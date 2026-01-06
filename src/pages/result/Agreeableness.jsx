import { Link } from "react-router-dom";

export default function Agreeableness() {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">親和性</h2>
          <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/conscientiousness">盡責性</Link>
  
    </section>
  );
}
