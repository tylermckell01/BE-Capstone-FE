import arnold from "../images/hlh070123feacover-006-hi-646d2427d5697.jpeg";
import arnoldStud from "../audio/arnold-stud-101soundboards.mp3";

export default function LandingPage() {
  const arnoldAudio = new Audio(arnoldStud);

  const playAudio = () => {
    arnoldAudio.play();
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-wrapper">
        <div className="text">
          Welcome to the FITNESS TRACKER where you can create workouts and
          become a STUD... click one of the buttons in the header to start! OR
          click on Arnold for motivation
          <br />
        </div>
        <img src={arnold} alt="arnold" onClick={playAudio} />
      </div>
    </div>
  );
}
