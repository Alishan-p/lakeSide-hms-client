import ExistingRooms from "./components/Room/ExistingRooms";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditRoom from "./components/Room/EditRoom";
import AddRoom from "./components/Room/AddRoom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoomListing from "./components/Room/RoomListing";
import Admin from "./components/Admin/Admin";

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
          <Route path="/allrooms" Component={RoomListing} />
          <Route path="/admin" Component={Admin} />
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}

export default App;
