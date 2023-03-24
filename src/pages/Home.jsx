import React from "react";
import Nav from "../components/Nav";
import app from "../static/app.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="grid justify-items-center bg-sparksenseprimary w-full ">
      <Nav />
      <div className="bg-white px-10 pt-24 pb-48 w-full max-w-7xl">
        <div className="pl-3 text-center">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sparksenseprimary">
            Welcome to{" "}
            <span className="font-extralight text-sparksenseprimary">
              {" "}
              One<span className="font-bold">Spark</span>{" "}
            </span>
          </h1>
          <p className="mt-4 text-sparksenseprimary text-md sm:text-lg lg:text-xl">
            The personalized insights platform for tech startup executives and sales representatives.
          </p>
        </div>
      </div>
      <div className="grid justify-items-center -mb-36 bg-white p-10 w-full">
        <img
          src={app}
          className="w-4/12 h-auto relative -top-40 rounded-lg shadow-lg"
          alt="app screenshot"
        />
      </div>
      <div className="grid justify-items-center bg-white p-10 w-full">
        <div className="w-full max-w-7xl">
          <h2 className="font-bold text-center first-line:selection:text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Why OneSpark? 
          </h2>
          <hr className="my-10" />
          <div
            id="features"
            className="grid lg:grid-cols-3 place-items-center gap-5"
          >
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-sparksenseprimary">
                Simple and Intuitive Personalized insights 
              </h5>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Get access to tailored essential insights on startups, technology advancements, companies, and more.
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-sparksenseprimary">
                Secure Login and Profile Management
              </h5>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Your information is safe with us. We use industry-standard security protocols to ensure your data is secure.
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-sparksenseprimary">
              Easy Keyword and Filter Management
              </h5>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Customize your feed by managing your interests, keywords, filters, and other criteria to get the insights you need.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
