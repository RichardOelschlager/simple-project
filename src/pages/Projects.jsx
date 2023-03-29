import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import AuthContext from "../context/AuthContext";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import date from "../support/Date";
import ProjectForm from "../components/ProjectForm";
import KeywordForm from "../components/KeywordForm";
import { useNavigate } from "react-router-dom";

function Projects() {
  const { user, projects } = useContext(AuthContext);

  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const [openKeyword, setOpenKeywordForm] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      {open && <ProjectForm close={() => setOpen(false)}/>}
      {openKeyword && <KeywordForm close={() => setOpenKeywordForm(false)}/>}
      {sidebar && (
        <SideBar
          sidebar={() => {
            setSidebar(false);
          }}
        />
      )}
      <div className="flex flex-col items-center h-screen w-screen dark:bg-sparksenseprimary overflow-y-auto home">
        <Navbar
          sidebar={() => {
            setSidebar(true);
          }}
        />
        {projects ? (
          <div className="grow flex flex-col w-full">
            <div className="p-10">
              <div className="flex flex-col text-center h-fit rounded-3xl py-10">
                <p className="mb-2 text-lg dark:text-gray-300 text-sparksenseprimary">
                  Welcome back,{" "}
                  <span className="font-semibold dark:text-white">
                    {user.username}!
                  </span>
                </p>
                <h1 className="text-5xl font-bold dark:text-white text-sparksenseprimary">
                  Your Leads
                </h1>
              </div>
            </div>
            <div className="grow w-full flex flex-col items-center bg-sparksensefourth dark:bg-sparksensefourth ">
              <div className="grid w-full px-3 xl:px-10 max-w-8xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-10">
                {projects.map((project, key) => {
                  return (
                    <div
                      key={key}
                      className="p-6 bg-white rounded-xl dark:bg-sparksenseprimary border dark:border-gray-700 border-gray-300"
                      onClick={()=>{navigate(`/project/${project.slug}`)}}
                    >
                      <div
                        className="grid items-center"
                        style={{ gridTemplateColumns: "1fr auto" }}
                      >
                        <div>
                          <h5 className="whitespace-nowrap overflow-x-hidden text-xl font-bold tracking-tight text-sparksenseprimary dark:text-white">
                            {project.name}
                          </h5>
                          <p className="text-xs font-normal text-gray-700 dark:text-gray-400">
                            {date(new Date(project.created))}
                          </p>
                        </div>
                        <Link
                          to={`/project/${project.slug}`}
                          className="bg-sparksenseprimary dark:bg-white p-2 rounded-full h-10 w-10 flex place-items-center text-white dark:text-sparksenseprimary"
                        >
                          <MdNavigateNext className="text-2xl" />
                        </Link>
                      </div>
                      <p className="text-gray-500 dark:text-gray-300 text-sm mt-2.5 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  );
                })}
                <div className="p-6 grid justify-items-center bg-white rounded-xl dark:bg-sparksenseprimary border dark:border-gray-600 border-gray-300 ">
                  <h5 className="whitespace-nowrap overflow-x-hidden text-xl font-bold tracking-tight text-sparksenseprimary dark:text-white mb-2.5">
                    Add a view
                  </h5>
                  Coming soon.. 

                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="bg-sparksenseprimary dark:bg-white h-10 w-10 text-white dark:text-sparksenseprimary rounded-full text-xl"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>nothing</div>
        )}
      </div>
    </>
  );
}

export default Projects;
