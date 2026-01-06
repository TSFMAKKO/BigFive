import { Link } from "react-router-dom";

export default function Neuroticism() {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">情緒不穩定性</h2>
       <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/result/extroversion">外向性</Link>
  
    </section>
  );
}
