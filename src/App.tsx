import ExistingRooms from "./components/ExistingRooms";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditRoom from "./components/EditRoom";
import AddRoom from "./components/AddRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/rooms" Component={ExistingRooms} />
        <Route path="/edit-room/:id" Component={EditRoom} />
        <Route path="/add-room" Component={AddRoom} />
      </Routes>
    </Router>
  );
}

export default App;
