import { useEffect, useMemo, useState } from "react";
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

  const [answers, setAnswers] = useState({});
  useEffect(() => {
    console.log("questions:", questions);
    console.log("answers:", answers);
  }, [questions, answers]);


  return (
    <div className="">
      <div className="">
        <h1 className="">測驗進行中</h1>
        <pre className="bg-gray-100 p-4 rounded text-xs whitespace-pre-wrap">
          {Object.keys(questions).length
            ? JSON.stringify(questions, null, 2)
            : "題目載入中..."}
        </pre>

        {Object.entries(questions).map(([trait, traitQuestions]) => (
          <div key={trait}>
            <h2>{trait}</h2>

            {Object.entries(traitQuestions).map(([question, options]) => (
              <div key={question}>
                <h4>{question}</h4>

                {Object.entries(options).map(([optionText, score]) => {
                  const id = `${trait}-${question}-${score}`;

                  return (
                    <p key={id}>
                      <input
                        type="radio"
                        id={id}
                        name={`${trait}-${question}`} 
                        value={score}
                        checked={answers?.[trait]?.[question] === score}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [trait]: {
                              ...prev[trait],
                              [question]: score,
                            },
                          }))
                        }
                      />
                      <label htmlFor={id}>{optionText} {score}</label>
                    </p>
                  );
                })}
              </div>
            ))}

            <hr />
          </div>
        ))}
        <div>
          <Link to="/result/neuroticism">計算結果</Link>
        </div>
      </div>
    </div>
  );
}
