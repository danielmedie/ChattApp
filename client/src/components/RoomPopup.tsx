import { useState } from "react";
import { RoomPopupProps } from "../models/RoomPopupProps";

export default function RoomPopup({ onClose, onCreate }: RoomPopupProps) {
  const [newRoomName, setNewRoomName] = useState("");

  const handleNewRoomInPopup = () => {
    if (newRoomName.trim() !== "") {
      onCreate(newRoomName);
      onClose();
    }
  };

  return (
    <div className="roomPopupOverlay" data-modal>
      <dialog>
        <div className="roomPopupContent">
          <h2>Create a new room</h2>
          <input
            type="text"
            placeholder="New room:"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={handleNewRoomInPopup}>Create room</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </dialog>
    </div>
  );
}
