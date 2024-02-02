import { Routes, Route } from "react-router-dom";
import Editor from "./components/elements/Editor";
import Selector from "./components/elements/Selector";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Selector />} path="/" />
        <Route element={<Editor />} path="/editor" />
      </Routes>
    </div>
  );
}

export default App;
