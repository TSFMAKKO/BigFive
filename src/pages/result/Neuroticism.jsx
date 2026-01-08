import { useState } from "react";
import { Link, useOutletContext, useLocation } from "react-router-dom";

export default function Neuroticism() {
  const result = useOutletContext();
  const location = useLocation();
  // 取得目前路由名稱 (例如: neuroticism)
  const currentRouteName = location.pathname.split("/").pop();
  // console.log("currentRouteName:", currentRouteName);

  const neuroticism = result?.neuroticism ?? [];
  const score = neuroticism.reduce((a, b) => a + b, 0); // Added initial value 0 for safety

  // Get resData from context
  const resData = result?.resData || {};

  let level = "";
  let levelStr = "";
  if (score > 7) {
    level = "high";
    levelStr = "高";
  } else if (score < 5) {
    level = "low";
    levelStr = "低";
  } else {
    level = "middle";
    levelStr = "中";
  }

  console.log("level:", level);
  // console.log("resData:", resData);

  //  problemList neuroticism description
  const descData = resData?.problemList?.[currentRouteName]?.description;
  console.log("descData:", descData);
  const desc = descData["desc"];
  console.log("desc", desc);

  const levelDesc = descData[level];
  console.log("levelDesc:", levelDesc);

  // traits en zh 抓index
  // const enIdx = resData.traits.en.indexOf(currentRouteName);
  // console.log("enIdx:", enIdx);

  const titles = ["情緒不穩定性", "外向性", "經驗開放性", "親和性", "盡責性"];
  const titleEns = [
    "neuroticism",
    "extroversion",
    "openness",
    "agreeableness",
    "conscientiousness",
  ];
  let [titleIdx, setTitleIdx] = useState(titleEns.indexOf(currentRouteName));
  const zhWord = resData.traits.zh[titleIdx];
  console.log("zhWord:", zhWord);
  // setTitleIdx(titleIdx + 1);

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{titles[titleIdx]}</h2>
      <h3>{currentRouteName}</h3>
      <p>原始分數：{levelStr}</p>
      <p>{desc}</p>
      <p>{levelDesc}</p>
      {titleIdx === titleEns.length - 1 ? (
        <Link
          className="px-3 py-1 rounded hover:bg-gray-100"
          to={`/test`}
        >
          重新測驗
        </Link>
      ) : (
        <Link
          className="px-3 py-1 rounded hover:bg-gray-100"
          to={`/result/${titleEns[titleIdx]}`}
          onClick={() => setTitleIdx(titleIdx + 1)}
        >
          {titles[titleIdx + 1]}
        </Link>
      )}
    </section>
  );
}
