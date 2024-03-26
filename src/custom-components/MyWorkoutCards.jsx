import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MyWorkoutCards() {
  const [yourWorkoutData, setYourWorkoutData] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchWorkoutData();
  }, []);

  const fetchWorkoutData = async () => {
    let authToken = Cookies.get("auth_token");
    await fetch("http://127.0.0.1:8086/workouts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setYourWorkoutData(data.result);
      });

    console.log("piece of state", yourWorkoutData);
  };

  const deleteWorkout = () => {
    console.log("delete workout");
  };

  const editWorkout = (workout) => {
    console.log("edit workout", workout);
    setIsEditing(true);
    setEditingWorkout(workout);
  };

  const saveEditedWorkout = () => {
    // UPDATE apicall here?
    console.log("edited workout saved");
    setEditingWorkout(null);
    setIsEditing(false);
  };

  const renderWorkoutdata = () => {
    if (yourWorkoutData.length === 0) {
      return <div>No workout data available.</div>;
    }

    return yourWorkoutData?.map((workout, idx) => {
      return (
        <div className="workout-info" key={idx}>
          <div className="workout-name">
            {isEditing && editingWorkout === workout ? (
              <input type="text" defaultValue={workout.workout_name} />
            ) : (
              workout.workout_name
            )}
          </div>
          <div className="workout-description">
            {isEditing && editingWorkout === workout ? (
              <input type="text" defaultValue={workout.description} />
            ) : (
              workout.description
            )}
          </div>
          <div className="workout-exercises">
            {workout.exercises.map((exercise, exerciseIdx) => (
              <div key={exerciseIdx}>
                <div className="exercise-name">
                  {isEditing && editingWorkout === workout ? (
                    <input type="text" defaultValue={exercise.exercise_name} />
                  ) : (
                    exercise.exercise_name
                  )}
                </div>
                <div className="muscles-worked">
                  {isEditing && editingWorkout === workout ? (
                    <input type="text" defaultValue={exercise.muscles_worked} />
                  ) : (
                    exercise.muscles_worked
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={() => editWorkout(workout)}>edit</button>
            <button onClick={deleteWorkout}>delete</button>
          </div>
          {editingWorkout === workout && (
            <div className="edit-modal">
              <button onClick={saveEditedWorkout}>save</button>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="my-workout-cards-container">
      <div className="cards-wrapper">{renderWorkoutdata()}</div>
    </div>
  );
}
