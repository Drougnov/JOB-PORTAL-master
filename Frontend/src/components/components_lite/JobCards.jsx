import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";


const JobCards = ({job}) => {
  console.log(job);
  const navigate = useNavigate();
 
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="latest-job-cards p-5 rounded-md shadow-xl bg-white  border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 ">
      <div>
        <div>
          <h1 className="text-lg font-medium"> {job.name} </h1>

          <p className="text-sm text-gray-600">Bangladesh</p>
          </div>
          <div>
          <h2 className="font-bold text-lg my-2">{job.title}</h2>
          <p className="text-sm text-gray-600">
            {
              job.description
            }
          </p>
        </div>
      </div>
      <div className=" flex gap-2 items-center mt-4 flex-wrap" style={{whiteSpace: "nowrap"}}>
        <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>
          <span className="truncate">{job.position} Open Positions</span>
        </Badge>
        <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>
          <span className="truncate">{job.salary}LPA</span>
        </Badge>
        <Badge className={" text-[#6B3AC2]  font-bold"} variant={"ghost"}>
          <span className="truncate">{job.location}</span>
        </Badge>
        <Badge className={" text-black font-bold"} variant={"ghost"}>
          <span className="truncate">{job.jobType}</span>
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
