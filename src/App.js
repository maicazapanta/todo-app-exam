import "./App.css";
import AddTask from "./components/AddTasks";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="wraper bg-gradient-to-t from-gray-900 to-yellow-300 to- min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <Header />
      <AddTask tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
