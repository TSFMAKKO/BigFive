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
  return (
    <Routes>
      <Route path="/start-test" element={<StartTestPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/result" element={<ResultPage />}>
        <Route index element={<Navigate to="openness" replace />} />
        <Route path="openness" element={<Openness />} />
        <Route path="conscientiousness" element={<Conscientiousness />} />
        <Route path="extroversion" element={<Extroversion />} />
        <Route path="agreeableness" element={<Agreeableness />} />
        <Route path="neuroticism" element={<Neuroticism />} />
      </Route>
      <Route path="/" element={<Navigate to="/start-test" replace />} />
      <Route path="*" element={<Navigate to="/start-test" replace />} />
    </Routes>
  );
}

export default App;
