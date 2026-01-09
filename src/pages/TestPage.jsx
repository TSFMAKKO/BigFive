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
    <div className="">
      <div className="">
        <h1 className="">測驗進行中</h1>

        {currentPage && (
          <div key={`${currentPage.trait}-${currentPage.question}`}>
            <h2>{currentPage.trait}</h2>
            <div>
              <h4>{currentPage.question}</h4>
              {Object.entries(currentPage.options).map(
                ([optionText, score]) => {
                  const id = `${currentPage.trait}-${currentPage.question}-${score}`;

                  return (
                    <p key={id}>
                      <input
                        type="radio"
                        id={id}
                        name={`${currentPage.trait}-${currentPage.question}`}
                        value={score}
                        checked={
                          answers?.[currentPage.trait]?.[
                            currentPage.question
                          ] === score
                        }
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentPage.trait]: {
                              ...prev[currentPage.trait],
                              [currentPage.question]: score,
                            },
                          }))
                        }
                      />
                      <label htmlFor={id}>
                        {optionText} {score}
                      </label>
                    </p>
                  );
                }
              )}
            </div>
            <hr />
          </div>
        )}

        <div className="flex gap-2">
          {pageIdx < pages.length - 1 && (
            <button
              type="button"
              className="px-3 py-1 rounded border"
              disabled={pageIdx >= pages.length - 1}
              onClick={() =>
                setPageIdx((idx) => Math.min(pages.length - 1, idx + 1))
              }
            >
              下一題
            </button>
          )}
        </div>
        {pageIdx === pages.length - 1 && (
          <div>
            <Link to="/result/neuroticism">計算結果</Link>
          </div>
        )}
      </div>
    </div>
  );
}
