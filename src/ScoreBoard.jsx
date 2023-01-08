import { useEffect } from "react";

export default function ScoreBoard(props) {
  let scores = JSON.parse(localStorage.getItem("Scores") ? localStorage.getItem("Scores") : "[]");
  scores.push(props.score);
  scores.sort((a, b) => {
    if (parseInt(a) - parseInt(b) > 0) return 1;
    else if (parseInt(a) - parseInt(b) == 0) return 0;
    else return -1;
  });
  scores = scores.slice(0, 5);
  localStorage.setItem("Scores", JSON.stringify(scores));
  return (
    <div className="score--board">
      <h1>Scoreboard</h1>
      <h3>Your top 5 Score</h3>
      {scores.map((score, index) => {
        return (
          <p key={index}>
            {index + 1}. {score}
          </p>
        );
      })}
    </div>
  );
}
