import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const Comment = ({ comment, handleDeleteComment, handleEditComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditComment(comment.id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleDeleteComment(comment.id);
  };
  return (
    <div className="flex items-center justify-between mb-2">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="bg-transparent outline-none border-b-2 border-gray-500 py-1 px-2 text-gray-100 focus:border-yellow-400"
          />
        </form>
      ) : (
        <p className="text-gray-100 text-sm">{editedText}</p>
      )}

      <div className="flex items-center">
        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>
              <FiEdit className="text-gray-400 hover:text-yellow-400" />
            </button>
            <button onClick={handleDelete}>
              <FiTrash className="text-gray-400 hover:text-yellow-500 ml-2" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
