import { Link } from "react-router-dom";

export default function TestPage() {
  return (
    <div className="">
      <div className="">
        <h1 className="">測驗進行中</h1>
        <div >
          <Link
            to="/result/neuroticism">
            計算結果
          </Link>
        </div>
      </div>
    </div>
  );
}
