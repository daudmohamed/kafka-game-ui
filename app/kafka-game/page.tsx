"use client";

import { KafkaGameHooks } from "@/app/kafka-game/hooks";
import { Team } from "@/lib/model";
import "./page.module.css";

type TeamProps = Team & { index: number}

const TeamComponent = (props: TeamProps) => {
  // sort answers by position
  const answers = props.answers.sort((a, b) => a.position - b.position);
  let backgroundColor;
  switch (props.index) {
    case 0:
      backgroundColor = "#FFD700";
      break;
    case 1:
      backgroundColor = "#C0C0C0";
      break;
    case 2:
      backgroundColor = "#CD7F32";
      break;
    default:
      backgroundColor = "#FFFFFF";
  }
  return (
    <div className="container border p-4 rounded-3 shadow" style={{ backgroundColor: backgroundColor}}>
      <div className="row">
        <div className="col">
          <div className="row d-flex p-2 align-items-center justify-content-center">
            <div
              className="col-1 rounded-circle"
              style={{
                width: "3vw",
                height: "3vw",
                backgroundColor: props.hexColor,
              }}
            ></div>
            <h4 className="col mr-3 mt-3">{props.name}</h4>
          </div>
          <p>Score: {props.score}</p>
        </div>
      </div>
      <div className="row">
        {answers.map((answer, index) => {
          let icon;
          if (answer.hasError) {
            icon = <i className="bi bi-x-circle-fill text-danger"></i>;
          } else if (answer.totalAnswers === 0) {
            icon = <i className="bi bi-dash-circle-fill text-warning"></i>;
          } else {
            icon = <i className="bi bi-check-circle-fill text-success"></i>;
          }

          return (
            <div
              key={index}
              className="col border p-2 d-flex flex-column justify-content-between align-items-center text-center"
            >
              <div className="row">
                <p className="h6 text-body-secondary">{answer.category}</p>
              </div>
              <div className="d-flex gap-2">
                {icon}
                <p>{answer.totalAnswers}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Home() {
  const { teamState } = KafkaGameHooks("leaderboard");
  // sort teams by score and lowest highestAnswerId
    const teams = teamState.teams.sort((a, b) => {
        if (a.score === b.score) {
          return a.highestAnswerId - b.highestAnswerId;
        }
        return b.score - a.score;
      });
  return (
    <div className="container-fluid">
      <div className="row text-center">
        <h1 className="display-1">Leaderboards</h1>
        <p className="text-body-secondary">Life is a stream of questions</p>
      </div>
      <div className="row g-4">
        {teams.map((team, index) => (
          <div key={team.id} className="col-6 col-xxl-6">
            <TeamComponent index={index} {...team} />
          </div>
        ))}
      </div>
    </div>
  );
}
