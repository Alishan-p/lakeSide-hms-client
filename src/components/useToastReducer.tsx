type ToastState = {
  message: string;
  type: "success" | "error" | "";
  show: boolean;
}

export type ToastAction =
  | { type: "SHOW_SUCCESS"; payload: string }
  | { type: "SHOW_ERROR"; payload: string }
  | { type: "HIDE" };

export const initialToastState: ToastState = {
  message: "",
  type: "",
  show: false
}

export const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "SHOW_SUCCESS":
      return { message: action.payload, type: "success", show: true };
    case "SHOW_ERROR":
      return { message: action.payload, type: "error", show: true };
    case "HIDE":
      return initialToastState;
    default:
      return state;
  }
}