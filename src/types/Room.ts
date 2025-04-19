export type Room = {
  id : number;
  photo: Blob | null;
  roomType: string;
  roomPrice: number;
  isBooked: boolean;
}