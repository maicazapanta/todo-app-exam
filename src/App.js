import { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export const DeleteHandlerContext = createContext();
export const EditHandlerContext = createContext();
export const AddCommentHandlerContext = createContext();
export const EditCommentHandlerContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editedText, setEditedText] = useState("");
  const [toggleEditMode, setToggleEditMode] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Retrieve tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
    setLoading(false);
  }, []);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Delete event
  const handleDelete = (id) => {
    // Delete data from tasks
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);

    // Delete data from localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Editing Event
  const handleEdit = (id) => {
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = true;
    setEditedText(editableTarget.text);
    setTasks([...tasks]);
    setToggleEditMode(false);

    // Re-arrange
    tasks
      .filter((task) => task.id !== id)
      .map((targetedEl) => (targetedEl.isEditable = false));
  };

  const handleAddComment = (id) => {
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = true;
    setComment(editableTarget.text);
    setTasks([...tasks]);
    setToggleEditMode(false);

    // Re-arrange
    tasks
      .filter((task) => task.id !== id)
      .map((targetedEl) => (targetedEl.isEditable = false));
  };

  const handleEditComment = (commentId, newComment) => {
    // Find the comment to be edited
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          text: newComment,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  // Editing task form handler
  const handleEditSubmitter = (e, id) => {
    e.preventDefault();
    setToggleEditMode(!toggleEditMode);

    // Persist data
    const editPersistance = {
      text: editedText,
      id: id,
    };

    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = false;
    editableTarget.text = editPersistance.text;
    setTasks([...tasks]);

    // Update the comment in the comments array
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          text: editPersistance.text,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const puttingRequest = async (id, newData) => {
    // Update the task in the tasks array
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          text: newData.text,
        };
      }
      return task;
    });

    // Update the tasks in state
    setTasks(updatedTasks);

    // Update the tasks in localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="wraper bg-gradient-to-t from-gray-900 to-yellow-300 to- min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <DeleteHandlerContext.Provider value={handleDelete}>
        <EditHandlerContext.Provider value={handleEdit}>
          <AddCommentHandlerContext.Provider value={handleAddComment}>
            <EditCommentHandlerContext.Provider value={handleEditComment}>
              <Header />
              <AddTask tasks={tasks} setTasks={setTasks} />
              <TaskList
                tasks={tasks}
                error={error}
                loading={loading}
                handleEditSubmitter={handleEditSubmitter}
                editedText={editedText}
                setEditedText={setEditedText}
                comments={comments}
                puttingRequest={puttingRequest}
              />
            </EditCommentHandlerContext.Provider>
          </AddCommentHandlerContext.Provider>
        </EditHandlerContext.Provider>
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
