import ExistingRooms from "./components/ExistingRooms";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/rooms" Component={ExistingRooms} />
      </Routes>
    </Router>
  );
}

export default App;
