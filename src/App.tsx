import ExistingRooms from "./components/ExistingRooms";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditRoom from "./components/EditRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/rooms" Component={ExistingRooms} />
        <Route path="/edit-room/:id" Component={EditRoom} />
      </Routes>
    </Router>
  );
}

export default App;
