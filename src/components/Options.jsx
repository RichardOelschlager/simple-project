import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineMoreVert, MdDelete, MdModeEdit } from "react-icons/md";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function Options({ taskId, edit }) {
  const { token, setTitle, setMessage, setBadge, setType, badge } =
    useContext(AuthContext);
  const [open, setOpen] = useState(false);
  
  const markArticleIrrelevant = () => {
    axios
      .post(`${baseURL}/article_irrelevant`, { task_id: taskId }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      })
      .then((response) => {
        setBadge(true);
        setTitle("Successful operation");
        setMessage("Article marked as irrelevant");
        setType("success");
      })
      .catch((response) => {
        setBadge(true);
        setTitle("Error");
        setMessage(response.data);
        setType("warning");
      });
  };

  const markPublisherIrrelevant = () => {
    axios
      .post(`${baseURL}/publisher_irrelevant`, { task_id: taskId }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      })
      .then((response) => {
        setBadge(true);
        setTitle("Successful operation");
        setMessage("Publisher marked as irrelevant");
        setType("success");
      })
      .catch((response) => {
        setBadge(true);
        setTitle("Error");
        setMessage(response.data);
        setType("warning");
      });
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setBadge(false);
      setTitle("");
      setMessage("");
      setType("");
    }, 5000);
  }, [badge]);
  
  return (
    <>
      <div className="relative inline-block">
        <MdOutlineMoreVert
          onClick={() => {
            setOpen(!open);
          }}
          className="text-gray-500 hover:text-sparksensethird mb-4 dark:text-gray-300 dark:hover:text-white"
        />
        <div
          className={
            open
              ? " flex flex-col absolute right-0.5 top-5 w-32 shadow-md bg-gray-50 dark:bg-sparksensethird dark:text-white"
              : " absolute hidden"
          }
        >
          <button
            ref={ref}
            onClick={markArticleIrrelevant}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          >
            <span>Article irrelevant</span>
          </button>
          <button
            onClick={markPublisherIrrelevant}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          >
            <span>Publisher irrelevant</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Options;
