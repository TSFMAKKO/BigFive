import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function TestPage({ resData }) {
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

  useEffect(() => {
    console.log("questions:", questions);
  }, [questions]);

 
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
