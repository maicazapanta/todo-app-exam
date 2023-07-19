import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
