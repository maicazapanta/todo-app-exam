import { useRef, useState } from "react";

const AddTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");
  const inputRef = useRef(null);

  // add task handler event
  const addTaskHandler = (e) => {
    e.preventDefault();
    // post task into server
    taskPosting(task);
    inputRef.current.blur();
    setTask("");
  };

  // task posting
  // use "text"
  const taskPosting = (text) => {
    // Create a new task object with a unique ID
    const newTask = {
      id: generateUniqueId(),
      text,
    };

    // Update the tasks in state
    setTasks([...tasks, newTask]);

    // Update the tasks in localStorage
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Generate a unique ID
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  return (
    <form
      className="bg-gray-900 p-10 container mx-auto flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between lg:max-w-4xl"
      onSubmit={addTaskHandler}
    >
      <input
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
        type="text"
        placeholder="What things to do?"
        className="bg-transparent outline-none border-b-2 border-gray-500 py-2 px-5 text-center md:text-left focus:border-yellow-400 duration-300"
      />
      <button
        type="submit"
        className="border-2 border-yellow-500 py-2 px-5 bg-teal-500/10 text-yellow-500 hover:bg-yellow-500 duration-300 hover:text-gray-900 "
      >
        Add task
      </button>
    </form>
  );
};

export default AddTask;
