export type RoomFormState = {
  photo: Blob | null;
  roomType: string;
  roomPrice: number;
  imagePreview: string;
}

export type RoomFormAction =
  | { type: "SET_PHOTO"; payload: Blob }
  | { type: "SET_ROOM_TYPE"; payload: string }
  | { type: "SET_ROOM_PRICE"; payload: number }
  | { type: "SET_IMAGE_PREVIEW"; payload: string }
  | { type: "RESET" };

export const initialRoomFormState: RoomFormState = {
  photo: null,
  roomType: "",
  roomPrice: 0,
  imagePreview: "",
};

export function roomFormReducer(state: RoomFormState, action: RoomFormAction): RoomFormState {
  switch (action.type) {
    case "SET_PHOTO":
      return { ...state, photo: action.payload };
    case "SET_ROOM_TYPE":
      return { ...state, roomType: action.payload };
    case "SET_ROOM_PRICE":
      return { ...state, roomPrice: action.payload };
    case "SET_IMAGE_PREVIEW":
      return { ...state, imagePreview: action.payload };
    case "RESET":
      return initialRoomFormState;
    default:
      return state;
  }
}