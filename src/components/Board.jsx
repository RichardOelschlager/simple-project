import { useEffect, useState, useContext } from "react";
import Lane from "./Lane";
import useDataFetching from "../hooks/useDataFetching";
import AuthContext from "../context/AuthContext";
import axios from "axios";


const baseURL = process.env.REACT_APP_BACKEND_URL;

function Board({ project }) {
  const [loading, error, data] = useDataFetching(`tasks/${project.slug}`);
  const [tasks, setTasks] = useState([]);
  const { token, badge, setTitle, setMessage, setBadge, setType } =
    useContext(AuthContext);

  function onDrop(e, laneId) {
    const id = e.dataTransfer.getData("id");
    const updatedTasks = tasks.filter((task) => {
      if (task.id.toString() === id) {
        const updatedTask = { ...task, stage: laneId };
        axios
          .put(
            `${baseURL}/task/${task.id}`,
            JSON.stringify({ stage: laneId }),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(token.access),
              },
            }
          )
          .then((response) => {})
          .catch((response) => {
            setBadge(true);
            setTitle("Error");
            setMessage(response.data);
            setType("warning");
          });
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function onDragStart(event, id) {
    event.dataTransfer.setData("id", id);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  useEffect(() => {
    setTasks(data);
  }, [data, badge]);

   // Create lanes dynamically based on unique task stages
   const uniqueStages = [...new Set(tasks.map((task) => task.stage))];
   const lanes = uniqueStages.map((stage) => ({
     id: stage,
     title: stage,
   }));


  return (
    <div className="grow flex flex-col h-48 w-full items-center bg-gray-100 p-5 pb-0 dark:bg-sparksensefourth">
      <div
        className="scrollbar w-full px-3 xl:px-10  grid gap-5 justify-between overflow-auto pb-5"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" }}
      >
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            title={lane.title}
            laneId={lane.id}
            loading={loading}
            error={error}
            tasks={tasks.filter((task) => task.stage === lane.id)}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
