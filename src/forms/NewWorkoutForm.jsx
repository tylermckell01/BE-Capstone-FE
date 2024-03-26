import { useState } from "react";
import asyncApiCall from "../utl/asyncApiCall";
import Cookies from "js-cookie";

export default function NewWorkoutForm() {
  const [formData, setFormData] = useState({
    workout_name: "",
    description: "",
    length: 0,
    // gym_id: "",
  });

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let authToken = Cookies.get("auth_token");
    const response = await fetch("http://127.0.0.1:8086/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response) {
      console.log("create new workout successful");
      console.log(response);
      return response;
    } else {
      console.error("create new workout failed");
    }
  };

  return (
    <div className="new-workout-form-container">
      <div className="page-title">new workout form</div>
      <form onSubmit={handleSubmit}>
        <div className="new-workout-form">
          <label htmlFor="workout-name">workout name </label>
          <input
            id="workout-name"
            name="workout_name"
            value={formData.workout_name}
            type="text"
            className="workout-name"
            onChange={handleFieldUpdate}
          />

          <label htmlFor="workout-description">workout description</label>
          <input
            id="workout-description"
            name="description"
            value={formData.description}
            type="text"
            className="workout-description"
            onChange={handleFieldUpdate}
          />

          <label htmlFor="workout-length">workout length</label>
          <input
            id="workout-length"
            name="length"
            value={formData.length}
            type="text"
            className="workout-length"
            onChange={handleFieldUpdate}
          />

          {/* <label htmlFor="gym-id">gym id</label>
          <input
            id="gym-id"
            name="gym_id"
            value={formData.gym_id}
            type="text"
            className="gym-id"
            onChange={handleFieldUpdate}
          /> */}
          <button type="submit">Add this workout!</button>
        </div>
      </form>
    </div>
  );
}
