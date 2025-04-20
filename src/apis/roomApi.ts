import axios from "axios";
import { Room } from "../types/Room";

const roomApi = axios.create({
  baseURL: "http://localhost:8082/api/room",
});

const addNewRoom = async (
  photo: Blob | string,
  roomType: string,
  roomPrice: string
) => {
  console.log("Calling the new room api");
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const res = await roomApi.post("", formData);
    if (res.status === 201) return true;
    else return false;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding new room");
  }
};

const getRoomTypes = async (): Promise<string[]> => {
  console.log("Calling the get room type api");
  try {
    const res = await roomApi.get("/types");
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching room types");
  }
};

const getAllRooms = async (): Promise<Room[]> => {
  console.log("calling the all rooms api");
  try {
    const res = await roomApi.get("");
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Error Fetching rooms");
  }
};

const deleteRoom = async (id: number) => {
  console.log("calling the delete api");
  try {
    const res = await roomApi.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      throw new Error("Error deleting rooms " + error.message);
  }
};

const updateRoom = async (id: number, data: Room) => {
  console.log("calling the update api");
  const formData = new FormData();
  formData.append("roomType", data.roomType);
  formData.append("roomPrice", data.roomPrice.toString());
  formData.append("photo", data.photo || "");

  try {
    const res = await roomApi.put(`/${id}`, formData);
    return res.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      throw new Error("Error deleting rooms " + error.message);
  }
};

const getRoomById = async (id: number): Promise<Room | undefined> => {
  console.log("calling the fetch room by id api");
  try {
    const res = await roomApi.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      throw new Error("Error fetching room by id" + error.message);
  }
};

export {
  addNewRoom,
  getRoomTypes,
  getAllRooms,
  deleteRoom,
  updateRoom,
  getRoomById,
};
