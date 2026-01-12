import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function TestPage({ resData, setResult }) {
  const questions = useMemo(() => {
    const problemList = resData?.problemList ?? {};
    return Object.entries(problemList).reduce((acc, [traitKey, traitData]) => {
      const traitQuestions = (traitData?.problems ?? []).reduce(
        (questionAcc, problem) => {
          questionAcc[problem.problem] = problem.options.reduce(
            (optionAcc, option) => {
              optionAcc[option.description] = option.fraction;
              return optionAcc;
            },
            {}
          );
          return questionAcc;
        },
        {}
      );
      acc[traitKey] = traitQuestions;
      return acc;
    }, {});
  }, [resData]);

  const [answers, setAnswers] = useState({});

  const pages = useMemo(() => {
    const list = [];
    Object.entries(questions).forEach(([trait, traitQuestions]) => {
      Object.entries(traitQuestions).forEach(([question, options]) => {
        list.push({ trait, question, options });
      });
    });
    return list;
  }, [questions]);

  const [pageIdx, setPageIdx] = useState(0);
  const currentPage = pages[pageIdx];
  const pageName = currentPage?.question ?? "";

  const result = useMemo(() => {
    const problemList = resData?.problemList ?? {};
    const order = [
      "neuroticism",
      "extroversion",
      "openness",
      "agreeableness",
      "conscientiousness",
    ];
    const out = {};
    order.forEach((trait) => {
      const probs = problemList[trait]?.problems ?? [];
      out[trait] = probs.map((p) => {
        const val = answers?.[trait]?.[p.problem];
        return typeof val === "number" ? val : 0;
      });
    });
    return out;
  }, [answers, resData]);

  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    console.log("questions:", questions);
    console.log("answers:", answers);
    console.log("pages", pages);
    console.log("result", result);
  }, [questions, answers, pages, result]);

  useEffect(() => {
    if (pageIdx >= pages.length) {
      setPageIdx(0);
    }
  }, [pages.length, pageIdx]);

  useEffect(() => {
    // 將作答轉成結果陣列並上傳到 App 的 result
    const problemList = resData?.problemList ?? {};
    const order = [
      "neuroticism",
      "extroversion",
      "openness",
      "agreeableness",
      "conscientiousness",
    ];
    const out = {};
    order.forEach((trait) => {
      const probs = problemList[trait]?.problems ?? [];
      out[trait] = probs.map((p) => {
        const val = answers?.[trait]?.[p.problem];
        return typeof val === "number" ? val : 0;
      });
    });
    setResult(out);
  }, [answers, resData, setResult]);

  return (
    <>
      {currentPage && (
        <div className="max-w-[1920px] min-h-screen mx-auto flex flex-col lg:flex-row">
          {/* left */}
          <div className="w-full lg:w-[960px] min-h-[400px] lg:min-h-screen bg-[#f1f2ff] relative">
            {pageIdx > 0 && (
              <button
                type="button"
                aria-label="上一題"
                className="absolute top-0 left-0 w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[64px] lg:h-[64px] bg-[#4F61FF] text-white grid place-items-center z-10"
                onClick={() => {
                  const prevIdx = Math.max(0, pageIdx - 1);
                  const prevPage = pages[prevIdx];
                  const answered =
                    typeof answers?.[prevPage.trait]?.[prevPage.question] ===
                    "number";
                  setPageIdx(prevIdx);
                  setCanNext(answered);
                }}
              >
                <span className="material-icons text-[24px] sm:text-[28px] lg:text-[32px]">arrow_back</span>
              </button>
            )}
            <div className="q text-[64px] sm:text-[80px] md:text-[100px] lg:text-[120px] mt-[120px] sm:mt-[180px] lg:mt-[240px] ml-[24px] sm:ml-[48px] md:ml-[72px] lg:ml-[96px]">
              Q
            </div>
            <div
              className="mt-[12px] sm:mt-[16px] mx-[24px] sm:mx-[48px] md:mx-[96px] lg:mx-[144px] pb-8"
              key={`${currentPage.trait}-${currentPage.question}`}
            >
              <div>
                <h4 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[1.4]">
                  {currentPage.question}
                </h4>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="w-full lg:w-[960px] min-h-screen bg-[#ffffff] relative">
            <div className="" key={`${currentPage.trait}-${currentPage.question}`}>
              <div className="px-6 sm:px-12 md:px-16 lg:pl-[72px] lg:pr-[24px] pb-[100px] sm:pb-[120px] pt-8 lg:pt-[510px] flex flex-col gap-y-[24px] sm:gap-y-[30px] lg:gap-y-[36px]">
                {Object.entries(currentPage.options).map(
                  ([optionText, score]) => {
                    const id = `${currentPage.trait}-${currentPage.question}-${score}`;

                    return (
                      <p className="text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.5]" key={id}>
                        <input
                          className="bf-radio"
                          type="radio"
                          id={id}
                          name={`${currentPage.trait}-${currentPage.question}`}
                          value={score}
                          checked={
                            answers?.[currentPage.trait]?.[
                              currentPage.question
                            ] === score
                          }
                          onChange={() => {
                            setAnswers((prev) => ({
                              ...prev,
                              [currentPage.trait]: {
                                ...prev[currentPage.trait],
                                [currentPage.question]: score,
                              },
                            }));

                            setCanNext(true);
                          }}
                        />
                        <label className="bf-radio__label" htmlFor={id}>
                          {optionText}
                        </label>
                      </p>
                    );
                  }
                )}
              </div>

              {/* Bottom action bar */}
              <div
                className={`absolute left-0 right-0 bottom-0 h-[60px] sm:h-[68px] lg:h-[72px] flex items-center justify-end px-6 sm:px-8 lg:pr-[48px] ${
                  canNext ? "bg-[#4F61FF]" : "bg-[#C8CDD7]"
                }`}
              >
                {pageIdx < pages.length - 1 && (
                  <button
                    type="button"
                    disabled={!canNext}
                    className="flex items-center gap-2 text-white text-[16px] sm:text-[18px] lg:text-[20px] font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (!canNext) return;
                      setPageIdx((idx) => Math.min(pages.length - 1, idx + 1));
                      setCanNext(false);
                    }}
                  >
                    <span>下一題</span>
                    <span className="material-icons text-[24px] sm:text-[26px] lg:text-[28px]">
                      arrow_forward
                    </span>
                  </button>
                )}
                {pageIdx === pages.length - 1 &&
                  (canNext ? (
                    <Link
                      to="/result/neuroticism"
                      className="flex items-center gap-2 text-white text-[16px] sm:text-[18px] lg:text-[20px] font-medium"
                    >
                      <span>計算結果</span>
                      <span className="material-icons text-[24px] sm:text-[26px] lg:text-[28px]">
                        arrow_forward
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex items-center gap-2 text-white text-[16px] sm:text-[18px] lg:text-[20px] font-medium opacity-70 cursor-not-allowed"
                    >
                      <span>計算結果</span>
                      <span className="material-icons text-[24px] sm:text-[26px] lg:text-[28px]">
                        arrow_forward
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
