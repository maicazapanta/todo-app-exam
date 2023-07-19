import { useContext, useState } from "react";
import { FiEdit, FiTrash, FiMessageCircle, FiPlus } from "react-icons/fi";
import {
  DeleteHandlerContext,
  EditHandlerContext,
  EditCommentHandlerContext,
} from "../App";
import Comment from "./Comment";

const TaskItem = ({ task, handleEditSubmitter, editedText, setEditedText }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleDelete = useContext(DeleteHandlerContext);
  const handleEdit = useContext(EditHandlerContext);
  const handleEditComment = useContext(EditCommentHandlerContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentTaskId, setCommentTaskId] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Add the comment to the comments array
    const newComment = { id: Date.now(), text: comment };
    setComments([...comments, newComment]);

    // Clear the comment input field
    setComment("");
  };

  const handleAddCommentClick = (taskId) => {
    setCommentTaskId(taskId);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-5 rounded hover:from-yellow-500 hover:to-gray-800 group">
      <div className="task-item flex justify-between items-center ">
        <div className="task-item-left flex gap-3">
          <span className="self-center">
            <input
              type="checkbox"
              className="cursor-pointer accent-yellow-300"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          </span>

          {task.isEditable ? (
            <form onSubmit={(e) => handleEditSubmitter(e, task.id)}>
              <input
                className="bg-transparent outline-none border-b-2 border-gray-500 pb-1 w-full focus:border-yellow-500"
                type="text"
                required
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            </form>
          ) : (
            <p
              className={`group-hover:text-black ${
                isChecked
                  ? "line-through text-gray-500 group-hover:text-black"
                  : ""
              }`}
            >
              {task.text}
            </p>
          )}
        </div>

        <div className="task-item-right flex gap-3 text-gray-500">
          <button onClick={() => handleEdit(task.id)}>
            <FiEdit className="cursor-pointer hover:text-yellow-400 duration-300" />
          </button>
          <button onClick={() => handleDelete(task.id)}>
            <FiTrash className="cursor-pointer hover:text-yellow-500 duration-300" />
          </button>
          <button onClick={() => handleAddCommentClick(task.id)}>
            <FiMessageCircle className="cursor-pointer hover:text-yellow-500 duration-300" />
          </button>
        </div>
      </div>
      {/* Comment Section */}
      {task.id === commentTaskId && (
        <div className="comment-section m-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleDeleteComment={handleDeleteComment}
              handleEditComment={handleEditComment}
            />
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input
              value={comment}
              onChange={handleCommentChange}
              type="text"
              placeholder="Add a comment"
              className="bg-transparent outline-none border-b-2 border-gray-500 py-2 px-2 text-center md:text-left focus:border-yellow-400 duration-300 text-sm mt-2"
            />
            <button type="submit">
              <FiPlus className="inline-block mr-2" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
