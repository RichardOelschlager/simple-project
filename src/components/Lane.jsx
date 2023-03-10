import Task from "./Task";
import TaskForm from "./TaskForm";
import { useState } from "react";

function Lane({
  laneId,
  title,
  loading,
  error,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  project
}) {
  const [open, setOpen] = useState(false);
  const sortedTasks = tasks.sort((b, a) => new Date(a.created) - new Date(b.created));
  return (
    <div
      className="scrollbar text-left p-0 rounded-sm min-h-96 min-w-500 overflow-y-auto h-full"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, laneId)}
    >
      <div className="flex justify-between w-full items-center bg-gray-200 mb-4 p-2.5 rounded-md dark:bg-sparksenseprimary">
        <h2 className="font-semibold dark:text-white">{title}</h2>
        <p className="bg-sparksensethird px-2 rounded-full text-white text-sm dark:bg-white dark:text-sparksenseprimary font-bold">
          {tasks.length}
        </p>
      </div>
      <div className="flex flex-col gap-4 min-w-400">
        {loading || error ? (
          <span>{error || "Loading..."}</span>
        ) : (
          sortedTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              body={task.body}
              created={task.created}
              onDragStart={onDragStart}
            />
          ))
        )}
        {open ? (
          <TaskForm close={setOpen} laneId={laneId} project={project} />
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="bg-gray-200 py-2.5 rounded-md text-gray-700 dark:text-gray-200 hover:text-sparksenseprimary hover:bg-gray-300 dark:bg-sparksenseprimary dark:hover:text-white dark:hover:bg-sparksensefourth"
          >
            Add Task
          </button>
        )}
      </div>
    </div>
  );
}

export default Lane;
