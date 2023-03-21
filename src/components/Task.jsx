import { useState } from "react";
import Options from "./Options";
import TaskForm from "./TaskForm";
import date from "../support/Date";

function Task({ id, title, body, created, onDragStart, project, url}) {
  const [edit, setEdit] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEdit(true);
  }

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
        <div
          className="bg-white p-4 rounded-md dark:bg-sparksenseprimary"
          draggable
          onDragStart={(e) => onDragStart(e, id)}
          href={url}
        >
          <div  className="flex justify-between items-center"  >
            <div>
              <h3 className="text-md font-semibold dark:text-white">{title}</h3>
              <p className="text-xs text-sparksenseprimary mb-2 dark:text-white">
                {date(new Date(created))}
              </p>
            </div>
            <Options taskId={id} edit={handleEditClick} />
          </div>
          <a className="overflow-hidden max-h-36" href={url} >
            <p className="text-sm text-gray-600 dark:text-gray-200" style={{overflowWrap: 'break-word'}} >{body}</p>
          </a>
        </div>
      )}
    </>
  );
}

export default Task;
