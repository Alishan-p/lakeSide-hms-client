import { ChangeEvent, useState } from "react";
import { Room } from "../types/Room";

interface RoomFilterProps {
  rooms: Room[];
  setFilteredData: (rooms: Room[]) => void;
}
const RoomFilter = ({ rooms, setFilteredData }: RoomFilterProps) => {
  const [filter, setfilter] = useState("");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomType = e.target.value;
    if (selectedRoomType === "") {
      clearFilter();
      return;
    }
    setfilter(selectedRoomType);
    const filteredRooms = rooms.filter(
      (room) => room.roomType === selectedRoomType
    );
    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setfilter("");
    setFilteredData(rooms);
  };

  const roomTypes = [...new Set(rooms.map((room) => room.roomType)), ""];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter Rooms by type
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
        name=""
        id=""
      >
        <option value="">select a room type to filter...</option>
        {roomTypes.map((type, i) => (
          <option value={type} key={i}>
            {type}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear filter
      </button>
    </div>
  );
};

export default RoomFilter;
