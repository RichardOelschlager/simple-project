import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const baseURL = process.env.REACT_APP_BACKEND_URL;

function KeywordForm({ close, id, newKeyword = "" }) {
  const [keyword, setKeyword] = useState(newKeyword);
  const { token, setTitle, setMessage, setBadge, setType, badge } =
    useContext(AuthContext);
    
  const { slug } = useParams();
  const navigate = useNavigate();
  const saveKeyword = (event) => {
    event.preventDefault();

    if (keyword === "") {
        // Display error message if keyword is empty
        setBadge(true);
        setType("danger");
        setTitle("Error");
        setMessage("Keyword musn't be empty!");
      } else {
        const data = { keyword: keyword,
                       projectId: id };
        axios
          .post(`${baseURL}/keywords/`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(token.access),
            },
          })
          .then((response) => {
            // Display success message and reset state
            setBadge(true);
            setTitle("Successful operation");
            setMessage("Keyword added successfully");
            setType("success");
            setKeyword("");
            close();
            navigate(`/project/${slug}`);
          })
          .catch((error) => {
            // Display error message with details of the error response
            setBadge(true);
            setType("danger");
            setTitle("Error");
            setMessage(error.response.data);
          });
      }
    }

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      <div className="absolute z-40 grid place-items-center w-screen h-screen bg-black/50 dark:bg-white/50">
        <form
          ref={ref}
          className="bg-white dark:bg-sparksenseprimary w-full max-w-md lg:max-w-lg rounded m-5"
          onSubmit={saveKeyword}
        >
          <h1 className="p-7 pb-0 dark:text-white font-bold text-xl">
            Add Keyword:
          </h1>
          <hr className="my-5 border-gray-300 dark:border-gray-600" />
          <div className="p-7 pt-0">
            <div className="flex justify-between items-center mb-3">
              <div className="w-full">
                <label htmlFor="taskTile" className="sr-only">
                  Keyword
                </label>
                <input
                  name="taskTile"
                  type="text"
                  placeholder="Enter Keyword..."
                  className="outline-none w-full focus:border-b-2 focus:border-gray-500 pb-1 font-semibold bg-transparent dark:text-white"
                  onChange={(event) => {
                    setKeyword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-5 mt-2.5">
              <button
                onClick={close}
                className="w-full bg-gray-200 py-1.5 rounded-md text-gray-700 dark:text-gray-50 hover:text-sparksenseprimary hover:bg-gray-300 dark:bg-gray-700 dark:hover:text-white dark:hover:bg-sparksensethird"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="save"
                className="w-full bg-green-700 py-1.5 rounded-md text-white dark:text-gray-50 hover:text-gray-50 hover:bg-green-600 dark:bg-green-800 dark:hover:text-white dark:hover:bg-green-900"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default KeywordForm;
