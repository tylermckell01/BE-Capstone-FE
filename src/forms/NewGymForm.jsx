import { useState } from "react";
import Cookies from "js-cookie";

export default function NewGymForm() {
  const [formData, setFormData] = useState({
    gym_name: "",
    // workout_name: "",
  });

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

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
      console.log("create new gym successful");
      console.log(response);
      return response;
    } else {
      console.error("create new gym failed");
    }
  };

  return (
    <div className="new-gym-form-container">
      <div className="page-title">new gym form</div>
      <form onSubmit={handleSubmit}>
        <div className="new-gym-form">
          <label htmlFor="gym-name">gym name</label>
          <input
            id="gym-name"
            name="gym_name"
            value={formData.gym_name}
            type="text"
            className="gym-name"
            onChange={handleFieldUpdate}
          />
          {/* select workouts associated with this gym below
          <select
            name="workout-name"
            id="workout_name"
            value={formData.workout_name}
            className="workout-name"
          ></select> */}
          <button type="submit">Add this gym!</button>
        </div>
      </form>
    </div>
  );
}
