import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="mb-5 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-6">
        {/* Go Back Link with Arrow */}
        <div
          onClick={() => navigate(-1)} // Using navigate(-1) to go back
          className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-base">Go Back</span>
        </div>

        <h1 className="font-bold text-3xl text-gray-800 my-5">Job Listings</h1>
        <p className="text-gray-600 mb-10">
          Browse through various job opportunities available across different industries. Find the best match for your skills and start your next career journey today!
        </p>

        {allJobs.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <span className="text-xl text-gray-500">No job listings available at the moment. Please check back later!</span>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Found <span className="text-blue-700">{allJobs.length}</span> job(s)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.map((job) => (
                <div key={job._id} className="transform transition duration-300 ease-in-out">
                  <Job1 job={job} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
