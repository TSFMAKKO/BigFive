import { Link, useOutletContext, useLocation } from "react-router-dom";

export default function Neuroticism() {
  const result = useOutletContext();
  const location = useLocation();
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

  const descData = resData?.problemList?.[currentRouteName]?.description || {};
  const desc = descData.desc || "";
  const levelDesc = descData[level] || "";

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
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;
  const isLast = safeIdx === titleEns.length - 1;
  const nextIdx = (safeIdx + 1) % titleEns.length;
  const nextTitle = titles[nextIdx];
  const nextRoute = titleEns[nextIdx];

  // Image mapping
  const imageMap = {
    neuroticism: "情緒不穩定性.avif",
    extroversion: "外向性.avif",
    openness: "經驗開放性.avif",
    agreeableness: "親和性.avif",
    conscientiousness: "盡責性.avif",
  };
  const imageSrc = `/imgs/${
    imageMap[currentRouteName] || imageMap.neuroticism
  }`;

  const navItems = [
    { key: "neuroticism", label: "情緒不穩定性" },
    { key: "extroversion", label: "外向性" },
    { key: "openness", label: "經驗開放性" },
    { key: "agreeableness", label: "親和性" },
    { key: "conscientiousness", label: "盡責性" },
  ];

  return (
    <div>
      {/* Hero section with image */}
      <section className="relative h-[540px] bg-black/90 overflow-hidden">
        <img
          src={imageSrc}
          alt={zhWord}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        {/* Navigation bar overlaying image */}
        <header className="relative z-10 text-white max-w-[calc(1410px+160px)] px-20 mx-auto py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[20px] font-light mb-1">
                五大性格特質心理測驗
              </h1>
              <p className="text-[12px] text-gray-400">
                Big Five personality traits test
              </p>
            </div>
            <nav className="flex gap-6 max-xl:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={`/result/${item.key}`}
                  className={`text-[16px] pb-1 transition-colors ${
                    currentRouteName === item.key
                      ? "text-[#ffffff] border-b-2 border-[#4F61FF]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <div className="relative h-full max-w-[calc(1410px+160px)] px-20 mx-auto flex items-center">
          <div className="text-white max-w-[900px] flex max-xl:flex-wrap gap-x-[96px]">
            <div>
              <h2 className="text-[48px] mb-2">{zhWord}</h2>
              <p className="text-[24px] text-gray-300  ">{currentRouteName}</p>
            </div>
            <div className="w-[450px] max-lg:max-w-[450px] mt-[12px]">
              <p className="text-[16px] tracking-[-0.5px]  text-gray-200">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-white px-[255px] py-[80px]">
        <div className="max-w-[810px] text-[24px] mb-[201px]">
          <h3 className="text-[64px] mb-4">{levelStr}</h3>
          {levelStr === "中" ? (
            <>
              <p className=" text-gray-700 mb-8">
                你的{zhWord}介於
                {levelStr === "高"
                  ? "高分與低分"
                  : levelStr === "低"
                  ? "低分"
                  : "中間"}
                ，可參考高分與低分的說明。
              </p>

              <div className="space-y-6 mb-12">
                <div>
                  <h4 className="text-[20px] font-medium mb-3">高</h4>
                  <p className="text-[16px] leading-[1.8] text-gray-600">
                    {descData["high"] || "高分描述暫無資料"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[20px] font-medium mb-3">低</h4>
                  <p className="text-[16px] leading-[1.8] text-gray-600">
                    {descData["low"] || "低分描述暫無資料"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className=" text-gray-700 mb-8 tracking-[-0.5px] ">{descData[level]}</p>
          )}

        </div>
          {/* Navigation */}
          <div className="flex justify-end">
            {isLast ? (
              <Link
                to="/start-test"
                className="flex items-center gap-2 text-[#4F61FF] text-[20px] font-medium hover:text-[#3d4dd4] transition-colors"
              >
                <span>重新測驗</span>
                <span className="material-icons text-[28px]">
                  arrow_forward
                </span>
              </Link>
            ) : (
              <Link
                to={`/result/${nextRoute}`}
                className="flex items-center gap-2 text-[32px]  hover:text-[#3d4dd4] transition-colors"
              >
                <span>下一個</span>

                <span className="font-medium">：{nextTitle}</span>
                <span
                  className="material-icons text-[#4F61FF] "
                  style={{ fontSize: "48px" }}
                >
                  arrow_forward
                </span>
              </Link>
            )}
          </div>
      </section>
    </div>
  );
}
