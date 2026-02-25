import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home.tsx";
import { Menu } from "./components/menu.tsx";
import ConnectHub  from "./pages/ConnectHub";
import { MoneyFlow } from "./pages/MoneyFlow.tsx";
import { TaskMaster } from "./pages/TaskMaster.tsx";

export function App() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connecthub" element={<ConnectHub />} />
        <Route path="/moneyflow" element={<MoneyFlow />} />
        <Route path="/taskmanager" element={<TaskMaster />} />
      </Routes>
    </>
  );
}