import { useState } from "react";
import Cookies from "js-cookie";

export default function NewExerciseForm() {
  const [formData, setFormData] = useState({
    exercise_name: "",
    muscles_worked: "",
  });

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let authToken = Cookies.get("auth_token");
    const response = await fetch("http://127.0.0.1:8086/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response) {
      console.log("create new exercise successful");
      console.log(response);
      return response;
    } else {
      console.error("create new exercise failed");
    }
  };

  return (
    <div className="new-exercise-form-container">
      <div className="page-title">new exercise form</div>
      <form onSubmit={handleSubmit}>
        <div className="new-exercise-form">
          <label htmlFor="exercise-name">exercise name </label>
          <input
            id="exercise-name"
            name="exercise_name"
            value={formData.exercise_name}
            type="text"
            className="exercise-name"
            onChange={handleFieldUpdate}
          />

          <label htmlFor="muscles-worked">muscles worked</label>
          <input
            id="muscles-worked"
            name="muscles_worked"
            value={formData.muscles_worked}
            type="text"
            className="muscles-worked"
            onChange={handleFieldUpdate}
          />

          <button type="submit">Add this exercise!</button>
        </div>
      </form>
    </div>
  );
}
