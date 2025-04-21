import ExistingRooms from "./components/ExistingRooms";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditRoom from "./components/EditRoom";
import AddRoom from "./components/AddRoom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/rooms" Component={ExistingRooms} />
          <Route path="/edit-room/:id" Component={EditRoom} />
          <Route path="/add-room" Component={AddRoom} />
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}

export default App;
