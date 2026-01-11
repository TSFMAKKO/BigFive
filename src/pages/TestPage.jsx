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
        <div className="max-w-[1920px] max-h-[1080px] mx-auto max-h-[1080px] h-[100vh] flex">
          <div className="flex-1 bg-[#f1f2ff] relative">
            <button
              type="button"
              aria-label="上一題"
              className="absolute top-0 left-0 w-[64px] h-[64px] bg-[#4F61FF] text-white grid place-items-center"
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
              <span className="material-icons text-[32px]">arrow_back</span>
            </button>
            <div className="q text-[120px] mt-[240px] ml-[96px]">Q</div>
            <div
              className="mt-[16px] ml-[144px]"
              key={`${currentPage.trait}-${currentPage.question}`}
            >
              <div>
                <h4 className="text-[48px] ">{currentPage.question}</h4>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex-1 bg-[#ffffff] relative">
            <div className="" key={`${currentPage.trait}-${currentPage.question}`}>
              <div className="pl-[72px] pr-[24px] pb-[120px] mt-[510px] flex flex-col gap-y-[36px]">
                {Object.entries(currentPage.options).map(
                  ([optionText, score]) => {
                    const id = `${currentPage.trait}-${currentPage.question}-${score}`;

                    return (
                      <p className="text-[24px] leading-[1.5]" key={id}>
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
                className={`absolute left-0 right-0 bottom-0 h-[72px] flex items-center justify-end pr-[48px] ${
                  canNext ? "bg-[#4F61FF]" : "bg-[#C8CDD7]"
                }`}
              >
                {pageIdx < pages.length - 1 && (
                  <button
                    type="button"
                    disabled={!canNext}
                    className="flex items-center gap-2 text-white text-[20px] font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (!canNext) return;
                      setPageIdx((idx) => Math.min(pages.length - 1, idx + 1));
                      setCanNext(false);
                    }}
                  >
                    <span>下一題</span>
                    <span className="material-icons text-[28px]">
                      arrow_forward
                    </span>
                  </button>
                )}
                {pageIdx === pages.length - 1 &&
                  (canNext ? (
                    <Link
                      to="/result/neuroticism"
                      className="flex items-center gap-2 text-white text-[20px] font-medium"
                    >
                      <span>計算結果</span>
                      <span className="material-icons text-[28px]">
                        arrow_forward
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex items-center gap-2 text-white text-[20px] font-medium opacity-70 cursor-not-allowed"
                    >
                      <span>計算結果</span>
                      <span className="material-icons text-[28px]">
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
