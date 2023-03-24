import { useState } from "react";
import Options from "./Options";
import TaskForm from "./TaskForm";
import date from "../support/Date";

function Task({ id, title, body, created, project, url }) {
  const [edit, setEdit] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const handleTaskClick = (e) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {edit ? (
        <TaskForm
          edit={() => {
            setEdit(false);
          }}
          editBody={body}
          editTitle={title}
          taskId={id}
          project={project}
        />
      ) : (
        <div className="bg-white p-4 rounded-md dark:bg-sparksenseprimary">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-semibold dark:text-white">{title}</h3>
              <p className="text-xs text-sparksenseprimary mb-2 dark:text-white">
                {date(new Date(created))}
              </p>
            </div>
            <Options
              taskId={id}
              edit={(e) => {
                e.stopPropagation(); // prevent click event from propagating to parent div
                handleEditClick(e);
              }}
            />
          </div>
          <div
            className="overflow-hidden max-h-36 text-sm text-gray-600 dark:text-gray-200 cursor-pointer"
            style={{ overflowWrap: "break-word" }}
            onClick={handleTaskClick}
          >
            {body}
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
