import axios from "axios";

const roomApi = axios.create({
  baseURL: 'http://localhost:8082/api/room'
});

const addNewRoom = async (photo: Blob | string, roomType: string, roomPrice: string) => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const res = await roomApi.post('', formData);
  console.log(res.data)
  if (res.status === 201) 
    return true
   else 
    return false;
}

const getRoomTypes = async () => {
  try {
    const res = await roomApi.get('/types');
    return res.data;
  } catch (error) {
    throw new Error("Error fetching room types")
  }
}

export {addNewRoom, getRoomTypes}