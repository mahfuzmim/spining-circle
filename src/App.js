import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Wheel from "./Wheel";

function App() {
  const [friendObj, setFriendObj] = useState({ fname: "" });
  const [friendInfo, setFriendInfo] = useState([]);

  const handleAddButton = (e) => {
    e.preventDefault();
    if (friendObj.fname.trim()) {
      setFriendInfo([...friendInfo, friendObj.fname]);
      setFriendObj({ fname: "" });
    }
  };

  const handleInput = (e) => {
    setFriendObj({ ...friendObj, [e.target.name]: e.target.value });
  };

  const handleDelete = (index) => {
    setFriendInfo(friendInfo.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <Wheel names={friendInfo} />
        <div className="name-list">
          <h2>Friend Name List</h2>
          <ul>
            {friendInfo.map((name, index) => (
              <li key={index}>
                {index + 1}. {name}{" "}
                <MdDeleteForever
                  style={{ color: "#e6166d", fontSize: "1.3rem" }}
                  onClick={() => handleDelete(index)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="input-section">
          <form onSubmit={handleAddButton}>
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-input"
              value={friendObj.fname}
              name="fname"
              onChange={handleInput}
            />
            <button type="submit" className="addButton">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
