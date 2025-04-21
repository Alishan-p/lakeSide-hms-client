import { useEffect, useState } from "react";
import { getAllRooms } from "../apis/roomApi";
import { Room } from "../types/Room";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "./RoomFilter";
import RoomPagination from "./RoomPagination";

const Rooms = () => {
  const [data, setData] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState<Room[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading rooms....</div>;

  if (error) return <div className="text-danger">Error : {error}</div>;

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);
  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter rooms={data} setFilteredData={setFilteredData} />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPagination
            currentPage={currentPage}
            onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
            totalPages={totalPages}
          />
        </Col>
      </Row>
      <Row>{renderRooms()}</Row>
      <Col md={6} className="d-flex align-items-center justify-content-end">
        <RoomPagination
          currentPage={currentPage}
          onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
          totalPages={totalPages}
        />
      </Col>
    </Container>
  );
};

export default Rooms;
