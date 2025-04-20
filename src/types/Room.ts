export type Room = {
  id: number;
  photo: Blob | null | string;
  roomType: string;
  roomPrice: number;
  isBooked: boolean;
};
