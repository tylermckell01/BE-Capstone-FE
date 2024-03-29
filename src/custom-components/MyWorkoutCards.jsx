import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { select } from "neo-async";

export default function MyWorkoutCards() {
  const [yourWorkoutData, setYourWorkoutData] = useState([]);
  const [yourExerciseData, setYourExerciseData] = useState([]);
  const [workoutExerciseId, setWorkoutExerciseId] = useState({
    workout_id: "",
    exercise_id: "",
  });

  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [addExerciseButton, setAddExerciseButton] = useState(false);

  // I need to get these two functions to render when the save button is clicked, it is correctly updating the
  // actual db, but needs to render on save
  useEffect(() => {
    fetchWorkoutData();
    fetchExerciseData();
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

    // console.log("piece of state", yourWorkoutData);
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
        setYourExerciseData(data.result);
      });
    // console.log("exercise data:", yourExerciseData);
  };

  const saveEditedWorkout = async () => {
    if (!editingWorkout) return;
    let authToken = Cookies.get("auth_token");
    await fetch(`http://127.0.0.1:8086/workout/${editingWorkout.workout_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(editingWorkout),
    });

    console.log("after pressing save button piece of state", yourWorkoutData);
    // yourWorkoutData.forEach((workout) => {
    //   console.log("added workout id", workout.workout_id);
    //   workout.exercises.forEach((exercise) => {
    //     console.log("added exercise id", exercise.exercise_id);
    //   });
    // });

    // console.log("edited workout saved");
    // fetchWorkoutData();
    setEditingWorkout(null);
    setIsEditing(false);
    setAddExerciseButton(false);
  };

  const addExerciseToWorkout = async (workoutId, exerciseId) => {
    let authToken = Cookies.get("auth_token");

    const response = await fetch("http://127.0.0.1:8086/workout/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify({ workout_id: workoutId, exercise_id: exerciseId }),
    })
      .then((res) => res.json())
      .then((data) => data);

    // console.log("res: ", response);
    console.log("workout_id", workoutId);
    console.log("exercise_id", exerciseId);

    if (response) {
      await fetchWorkoutData();
      return response;
    } else {
      console.error("workout/exercise xref failed");
    }
  };

  const deleteWorkout = () => {
    console.log("delete workout");
  };

  const editWorkout = (workout) => {
    // console.log("edit workout", workout);
    setIsEditing(true);
    setEditingWorkout(workout);
  };

  const addExercise = () => {
    setAddExerciseButton(true);
  };

  const renderWorkoutdata = () => {
    if (yourWorkoutData.length === 0) {
      return <div>No workout data available.</div>;
    }

    return yourWorkoutData?.map((workout, idx) => {
      return (
        <div className="workout-info" key={idx}>
          <div className="workout-name">
            {isEditing && editingWorkout.workout_id === workout.workout_id ? (
              <input
                type="text"
                defaultValue={workout.workout_name}
                onChange={(e) =>
                  setEditingWorkout({
                    ...editingWorkout,
                    workout_name: e.target.value,
                  })
                }
              />
            ) : (
              workout.workout_name
            )}
          </div>
          <div className="workout-description">
            {isEditing && editingWorkout.workout_id === workout.workout_id ? (
              <input
                type="text"
                defaultValue={workout.description}
                onChange={(e) =>
                  setEditingWorkout({
                    ...editingWorkout,
                    description: e.target.value,
                  })
                }
              />
            ) : (
              workout.description
            )}
          </div>
          <div className="workout-exercises">
            {workout.exercises.map((exercise, exerciseIdx) => (
              <div key={exerciseIdx}>
                <div className="exercise-name">
                  {isEditing &&
                  editingWorkout.workout_id === workout.workout_id ? (
                    <label htmlFor="exercise-names">
                      <select
                        name="exercise-names"
                        id="exercise-names"
                        value={exercise.exercise_name}
                        onChange={(e) =>
                          setEditingWorkout({
                            ...editingWorkout,
                            exercise_name: e.target.value,
                          })
                        }
                      >
                        {yourExerciseData.map((exercise) => (
                          <option
                            key={exercise.exercise_id}
                            value={exercise.exercise_name}
                          >
                            {exercise.exercise_name}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    exercise.exercise_name
                  )}
                </div>
                <div className="muscles-worked">
                  {isEditing &&
                  editingWorkout.workout_id === workout.workout_id ? (
                    <label htmlFor="muscles-worked">
                      <select
                        name="muscles-worked"
                        id="muscles-worked"
                        value={exercise.muscles_worked}
                        onChange={(e) =>
                          setEditingWorkout({
                            ...editingWorkout,
                            muscles_worked: e.target.value,
                          })
                        }
                      >
                        {yourExerciseData.map((exercise) => (
                          <option
                            key={exercise.exercise_id}
                            value={exercise.muscles_worked}
                          >
                            {exercise.muscles_worked}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    exercise.muscles_worked
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={() => editWorkout(workout)}>edit</button>
            {isEditing && editingWorkout.workout_id === workout.workout_id && (
              <button onClick={deleteWorkout}>delete</button>
            )}
          </div>
          {isEditing && editingWorkout.workout_id === workout.workout_id && (
            <div className="edit-modal">
              {addExerciseButton ? (
                <select
                  onChange={(e) =>
                    addExerciseToWorkout(workout.workout_id, e.target.value)
                  }
                >
                  <option value="none"></option>
                  {yourExerciseData.map((exercise) => (
                    <option
                      key={exercise.exercise_id}
                      value={exercise.exercise_id}
                    >
                      {exercise.exercise_name}
                    </option>
                  ))}
                </select>
              ) : (
                <div></div>
              )}
              <button onClick={addExercise}>add exercise</button>

              <button
                onClick={() => {
                  saveEditedWorkout();
                }}
              >
                save
              </button>
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
