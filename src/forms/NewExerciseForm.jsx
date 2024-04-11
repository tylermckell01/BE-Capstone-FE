import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function NewExerciseForm() {
  const [formData, setFormData] = useState({
    exercise_name: "",
    muscles_worked: "",
  });

  const [exerciseData, setExerciseData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExerciseName, setEditedExerciseName] = useState(null);

  useEffect(() => {
    fetchExerciseData();
  }, []);

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
      await fetchExerciseData();
      return response;
    } else {
      console.error("create new exercise failed");
    }
  };

  const deleteExercise = async (exerciseId) => {
    let authToken = Cookies.get("auth_token");

    const response = await fetch(
      `http://127.0.0.1:8086/exercise/delete/${exerciseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
      }
    );

    if (response) {
      await fetchExerciseData();
      return response;
    } else {
      console.error("DELETE Exercise failed");
    }
  };

  const editExercise = () => {
    setIsEditing(true);
  };

  const editExerciseName = async (exercise) => {
    if (!editedExerciseName) {
      console.error("edited exercise name is empty");
      return;
    }

    let authToken = Cookies.get("auth_token");

    const response = await fetch(
      `http://127.0.0.1:8086/exercise/${exercise.exercise_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
        body: JSON.stringify({ exercise_name: editedExerciseName }),
      }
    );

    if (response) {
      await fetchExerciseData();
      return response;
    } else {
      console.error("Update Exercise failed");
    }
  };

  const fetchExerciseData = async () => {
    let authToken = Cookies.get("auth_token");
    await fetch("http://127.0.0.1:8086/exercises", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExerciseData(data.result);
      });
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    if (isEditing) {
      setEditedExerciseName(value);
    } else {
      setFormData((previous) => ({ ...previous, [name]: value }));
    }
  };

  const addExerciseForm = () => {
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
  };

  const renderExerciseData = () => {
    if (exerciseData.length === 0) {
      return <div>No Exercise Data</div>;
    }

    return exerciseData?.map((exercise, idx) => {
      return (
        <div className="exercise-wrapper" key={idx}>
          {isEditing ? (
            <input
              id="editing-exercise-name"
              name="editing-exercise_name"
              defaultValue={exercise.exercise_name}
              type="text"
              className="editing-exercise-name"
              onChange={handleFieldUpdate}
            />
          ) : (
            <div className="exercise-name">
              Exercise Name: {exercise.exercise_name}
            </div>
          )}
          <div className="muscles-worked">
            Muscles Worked: {exercise.muscles_worked}
          </div>
          {isEditing ? (
            <button
              onClick={() => {
                editExerciseName(exercise);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          ) : (
            <button onClick={() => editExercise()}>Edit</button>
          )}
          <button onClick={() => deleteExercise(exercise.exercise_id)}>
            delete
          </button>
        </div>
      );
    });
  };

  return (
    <div className="exercise-page-container">
      <div className="exercise-form">{addExerciseForm()}</div>
      <div className="existing-exercises">{renderExerciseData()}</div>
    </div>
  );
}
