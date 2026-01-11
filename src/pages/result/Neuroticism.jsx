import { Link, useOutletContext, useLocation } from "react-router-dom";

export default function Neuroticism() {
  const result = useOutletContext();
  const location = useLocation();
  // 取得目前路由名稱 (例如: neuroticism)
  const currentRouteName = location.pathname.split("/").pop() ?? "neuroticism";

  const traits = result?.[currentRouteName] ?? [];
  const score = traits.reduce((sum, value) => sum + value, 0);

  const resData = result?.resData || {};
  const degree = resData?.degree || {};
  const highThreshold = degree.high ?? 7;
  const lowThreshold = degree.low ?? 5;

  let level = "middle";
  if (score >= highThreshold) level = "high";
  else if (score <= lowThreshold) level = "low";

  const levelStr = level === "high" ? "高" : level === "low" ? "低" : "中";

  //  problemList neuroticism description
  const descData = resData?.problemList?.[currentRouteName]?.description || {};
  const desc = descData.desc || "";
  const levelDesc = descData[level] || "";

  // traits en zh 抓index
  const enIdx = resData?.traits?.en?.indexOf(currentRouteName) ?? 0;
  const zhWord = resData?.traits?.zh?.[enIdx] || "情緒不穩定性";

  const titles = ["情緒不穩定性", "外向性", "經驗開放性", "親和性", "盡責性"];
  const titleEns = [
    "neuroticism",
    "extroversion",
    "openness",
    "agreeableness",
    "conscientiousness",
  ];
  const currentIdx = titleEns.indexOf(currentRouteName);
  // 找不到idx=0
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;
  const isLast = safeIdx === titleEns.length - 1;
  const nextIdx = (safeIdx + 1) % titleEns.length;
  const nextTitle = titles[nextIdx];
  const nextRoute = titleEns[nextIdx];

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{zhWord}</h2>
      <h3>{currentRouteName}</h3>
      <p>
        原始分數：{levelStr} {score}
      </p>
      <p>{desc}</p>
      <p>{levelDesc}</p>

      {levelStr === "中" && (
        <>
          <p>高:{descData["high"]}</p>
          <p>低:{descData["low"]}</p>
        </>
      )}
      {isLast ? (
        <Link className="px-3 py-1 rounded hover:bg-gray-100" to="/test">
          重新測驗
        </Link>
      ) : (
        <Link
          className="px-3 py-1 rounded hover:bg-gray-100"
          to={`/result/${nextRoute}`}
        >
          {nextTitle}
        </Link>
      )}
    </section>
  );
}
