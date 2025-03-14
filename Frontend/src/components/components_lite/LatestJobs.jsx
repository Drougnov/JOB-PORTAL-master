import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []); // Safely access allJobs

  return (
    <div className="max-w-7xl mx-auto my-20 px-6">
      <h2 className="text-4xl font-semibold mb-12">
        <span className="text-[#6A38C2]">Top & Newest </span>Jobs
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length === 0 ? (
          <div className="col-span-full text-center text-xl text-gray-500">
            No Jobs Available
          </div>
        ) : (
          allJobs
            .slice(0, 6) // Limit to 6 jobs
            .map((job) =>
              job?._id ? (
                <JobCards key={job._id} job={job} />
              ) : (
                <div key={Math.random()} className="col-span-full text-center text-red-500">
                  Invalid Job Data
                </div>
              )
            )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
