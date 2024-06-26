import { useState } from "react";
import Cookies from "js-cookie";

export default function NewWorkoutForm() {
  const [formData, setFormData] = useState({
    workout_name: "",
    description: "",
    length: 0,
    user_id: Cookies.get("user_id"),
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
      setFormData({ workout_name: "", description: "", length: 0 });
      return response;
    }
  };

  return (
    <div className="new-workout-form-container">
      <div className="page-title">Create a Workout Here!</div>
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

          <label htmlFor="workout-length">workout length (hrs)</label>
          <input
            id="workout-length"
            name="length"
            value={formData.length}
            type="text"
            className="workout-length"
            onChange={handleFieldUpdate}
          />

          <button type="submit">Add this workout!</button>
        </div>
      </form>
    </div>
  );
}
