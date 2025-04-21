import { ChangeEvent, useEffect, useState } from "react";
import { getRoomTypes } from "../../apis/roomApi";

type RoomTypeSelectorProp = {
  handleRoomInputChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  newRoom: {
    roomType: string;
  };
};

const RoomTypeSelector = ({
  handleRoomInputChange,
  newRoom,
}: RoomTypeSelectorProp) => {
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => setRoomTypes(data));
  }, []);

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <div>
      <select
        className="form-select mb-3"
        name="roomType"
        id="roomType"
        value={newRoom.roomType}
        onChange={(e) => {
          if (e.target.value === "Add New") {
            setShowNewRoomTypeInput(true);
          } else {
            setShowNewRoomTypeInput(false);
            handleRoomInputChange(e);
          }
        }}
      >
        <option value="">select a room type</option>
        <option value="Add New">Add New</option>
        {roomTypes.map((type, index) => {
          return (
            <option key={index} value={type}>
              {type}
            </option>
          );
        })}
      </select>
      {showNewRoomTypeInput && (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a new room type"
            onChange={(e) => setNewRoomType(e.target.value)}
          />
          <button
            className="btn btn-hotel"
            type="button"
            onClick={handleAddNewRoomType}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomTypeSelector;
