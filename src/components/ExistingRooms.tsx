import { useEffect, useState } from "react";
import { Room } from "../types/Room";
import { getAllRooms } from "../apis/roomApi";
import { Col } from "react-bootstrap";
import RoomFilter from "./RoomFilter";
import RoomPagination from "./RoomPagination";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [selectedRoomType] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const res = await getAllRooms();
      setRooms(res);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else if (typeof error === "string") setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") setFilteredRooms(rooms);
    else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const calculateTotalPages = (
    filteredRooms: Room[],
    roomsPerPage: number,
    rooms: Room[]
  ) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div>
      {isLoading ? (
        <p>Loading existing rooms</p>
      ) : (
        <>
          ({error && <p>{error}</p>})
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-center mb-3 mt-5">
              <h2>Existing Rooms</h2>
            </div>
            <Col md={6} className="mb-3 mb-md-0">
              <RoomFilter rooms={rooms} setFilteredData={setFilteredRooms} />
            </Col>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Id</th>
                  <th>price</th>
                  <th>type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomPrice}</td>
                    <td>{room.roomType}</td>
                    <td>
                      <button>View / Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPagination
              currentPage={currentPage}
              onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
              totalPages={calculateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default ExistingRooms;
