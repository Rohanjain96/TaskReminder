
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage";
import TaskPage from "./Pages/Homepage/TaskPage";
function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/tasks" element={<TaskPage />}></Route>
      </Routes>
    </>);
}

export default App;
