import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy user credentials
    const dummyUsers = [
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" },
      { username: "user3", password: "password3" },
    ];

    // Check if entered credentials match any dummy user
    const matchedUser = dummyUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      // Navigate to another page (e.g., dashboard)
      navigate("/main");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-gradient-to-t from-gray-900 to-yellow-300 min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-5 rounded hover:from-yellow-500 hover:to-gray-800 group">
        <h2 className="uppercase font-semibold text-yellow-300 flex items-center tracking-wider gap-2">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-medium mb-2 text-white"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-medium mb-2 text-white"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-[100%]"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
