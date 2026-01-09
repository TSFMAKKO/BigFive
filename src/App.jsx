import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import StartTestPage from "./pages/StartTestPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import Openness from "./pages/result/Openness.jsx";
import Conscientiousness from "./pages/result/Conscientiousness.jsx";
import Extroversion from "./pages/result/Extroversion.jsx";
import Agreeableness from "./pages/result/Agreeableness.jsx";
import Neuroticism from "./pages/result/Neuroticism.jsx";

function App() {
  const [resData, setResData] = useState({});

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(
        "https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json"
      );
      const data = await res.json();
      setResData(data);
    }

    fetchApi();
  }, []);

  useEffect(() => {
    console.log("resData:", resData);
  }, [resData]);

  return (
    <Routes>
      <Route path="/start-test" element={<StartTestPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/result" element={<ResultPage resData={resData} />}>
        <Route index element={<Navigate to="openness" replace />} />
        <Route path="openness" element={<Neuroticism />} />
        <Route path="conscientiousness" element={<Neuroticism />} />
        <Route path="extroversion" element={<Neuroticism />} />
        <Route path="agreeableness" element={<Neuroticism />} />
        <Route path="neuroticism" element={<Neuroticism />} />
      </Route>
      <Route path="/" element={<Navigate to="/start-test" replace />} />
      <Route path="*" element={<Navigate to="/start-test" replace />} />
    </Routes>
  );
}

export default App;
