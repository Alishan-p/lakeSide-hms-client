import { ChangeEvent, FormEvent, useEffect, useReducer, useRef } from "react";
import { initialRoomFormState, roomFormReducer } from "./roomFormReducer";
import { toastReducer, initialToastState } from "./useToastReducer";
import { Link, Navigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../apis/roomApi";
import RoomTypeSelector from "./RoomTypeSelector";

const EditRoom = () => {
  const [formState, formDispatch] = useReducer(
    roomFormReducer,
    initialRoomFormState
  );
  const [toastState, toastDispatch] = useReducer(
    toastReducer,
    initialToastState
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { id } = useParams();

  useEffect(() => {
    if (toastState.show) {
      const timer = setTimeout(() => {
        toastDispatch({ type: "HIDE" });
      }, 50000);
      return () => clearTimeout(timer);
    }
  }, [toastState.show]);

  useEffect(() => {
    const fetchRoom = async () => {
      if (id === undefined) return;

      const roomData = await getRoomById(parseInt(id));
      if (roomData === undefined) {
        toastDispatch({
          type: "SHOW_ERROR",
          payload: "Error fetching room details",
        });
        return;
      }

      const { photo } = roomData;
      let imagePreview = "";
      if (typeof photo === "string") {
        imagePreview = `data:image/jpeg;base64,${photo}`;
      }

      formDispatch({
        type: "POPULATE_FORM",
        payload: {
          ...roomData,
          imagePreview,
          photo: null,
        },
      });
    };

    fetchRoom();
  }, [id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      toastDispatch({
        type: "SHOW_ERROR",
        payload: "Please select a valid image file",
      });
      return;
    }
    if (formState.imagePreview) {
      URL.revokeObjectURL(formState.imagePreview);
    }

    formDispatch({ type: "SET_PHOTO", payload: file });
    formDispatch({
      type: "SET_IMAGE_PREVIEW",
      payload: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.photo) {
      toastDispatch({
        type: "SHOW_ERROR",
        payload: "Room photo is required",
      });
      return;
    }

    if (formState.roomType === "" || formState.roomType === "Add New") {
      toastDispatch({ type: "SHOW_ERROR", payload: "Room type is required" });
      return;
    }

    if (id === undefined) {
      toastDispatch({ type: "SHOW_ERROR", payload: "Room id is required" });
      return;
    }

    try {
      const success = await updateRoom(parseInt(id), { ...formState });
      if (success) {
        toastDispatch({ type: "SHOW_SUCCESS", payload: "room data edited" });
        formDispatch({ type: "RESET" });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        Navigate({ to: "/rooms" });
      } else {
        toastDispatch({
          type: "SHOW_ERROR",
          payload: "Something went wrong",
        });
      }
    } catch (error) {
      if (error instanceof Error)
        toastDispatch({ type: "SHOW_ERROR", payload: error.message });
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add New Room</h2>
            {toastState.show && (
              <div
                className={`d-flex justify-content-between alert alert-${toastState.type === "error" ? "danger" : toastState.type}`}
              >
                <span>{toastState.message}</span>
                <button
                  onClick={() => toastDispatch({ type: "HIDE" })}
                  className="btn-close ml-auto"
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="roomType">
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={(e) =>
                      formDispatch({
                        type: "SET_ROOM_TYPE",
                        payload: e.target.value,
                      })
                    }
                    newRoom={{ roomType: formState.roomType }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="roomPrice">
                  Room Price
                </label>
                <input
                  className="form-control"
                  id="roomPrice"
                  required
                  type="number"
                  min="0"
                  value={formState.roomPrice}
                  onChange={(e) =>
                    formDispatch({
                      type: "SET_ROOM_PRICE",
                      payload: parseInt(e.target.value),
                    })
                  }
                  placeholder="Enter the price"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="roomPrice">
                  Room Photo
                </label>
                <input
                  ref={fileInputRef}
                  className="form-control"
                  id="photo"
                  required
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formState.imagePreview && (
                  <img
                    src={formState.imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link to="/rooms" className="btn btn-outline-info ml-5">
                  back
                </Link>
                <button className="btn btn-outline-primary ml-5 " type="submit">
                  Edit room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRoom;
