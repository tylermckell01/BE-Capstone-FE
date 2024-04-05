import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function NewGymForm() {
  const [formData, setFormData] = useState({
    gym_name: "",
  });

  const [gymData, setGymData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGymName, setEditedGymName] = useState(null);

  useEffect(() => {
    fetchGymData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let authToken = Cookies.get("auth_token");
    const response = await fetch("http://127.0.0.1:8086/gym", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response) {
      await fetchGymData();
      return response;
    } else {
      console.error("create new gym failed");
    }
  };

  const deleteGym = async (gymId) => {
    let authToken = Cookies.get("auth_token");

    const response = await fetch(`http://127.0.0.1:8086/gym/delete/${gymId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    });

    if (response) {
      await fetchGymData();
      return response;
    } else {
      console.error("DELETE Gym failed");
    }
  };

  const editGym = () => {
    setIsEditing(true);
  };

  const editGymName = async (gym) => {
    let authToken = Cookies.get("auth_token");

    const response = await fetch(`http://127.0.0.1:8086/gym/${gym.gym_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify({ gym_name: editedGymName }),
    });

    if (response) {
      await fetchGymData();
      return response;
    } else {
      console.error("Update gym name failed");
    }
  };

  const fetchGymData = async () => {
    let authToken = Cookies.get("auth_token");
    await fetch("http://127.0.0.1:8086/gyms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGymData(data.result);
      });
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    if (isEditing) {
      setEditedGymName(value);
    } else {
      setFormData((previous) => ({ ...previous, [name]: value }));
    }
  };

  const addGymForm = () => {
    return (
      <div className="new-gym-form-container">
        <div className="page-title">new gym form</div>
        <form onSubmit={handleSubmit}>
          <div className="new-gym-form">
            <label htmlFor="gym-name">Gym Name </label>
            <input
              id="gym-name"
              name="gym_name"
              value={formData.gym_name}
              type="text"
              className="gym-name"
              onChange={handleFieldUpdate}
            />

            <button type="submit">Add this gym!</button>
          </div>
        </form>
      </div>
    );
  };

  const renderGymData = () => {
    if (gymData.length === 0) {
      return <div>No Gym Data</div>;
    }

    return gymData?.map((gym, idx) => {
      return (
        <div className="gym-wrapper" key={idx}>
          {isEditing ? (
            <input
              id="editing-gym-name"
              name="editing-gym_name"
              defaultValue={gym.gym_name}
              type="text"
              className="editing-gym-name"
              onChange={handleFieldUpdate}
            />
          ) : (
            <div className="gym-name">Gym Name: {gym.gym_name}</div>
          )}

          {isEditing ? (
            <button
              onClick={() => {
                editGymName(gym);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          ) : (
            <button onClick={() => editGym()}>Edit</button>
          )}
          <button onClick={() => deleteGym(gym.gym_id)}>delete</button>
        </div>
      );
    });
  };

  return (
    <div className="gym-page-container">
      <div className="gym-form">{addGymForm()}</div>
      <div className="existing-gyms">{renderGymData()}</div>
    </div>
  );
}
