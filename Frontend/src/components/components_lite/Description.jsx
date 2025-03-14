import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUserTie, FaArrowLeft } from "react-icons/fa";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate();

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error applying for job");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (error) {
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (loading) return <div>Loading job details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!singleJob) return <div>No job details available.</div>;

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge className="text-blue-600 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#FA4F09] font-bold" variant="ghost">
              <FaMoneyBillWave className="inline mr-1" /> {singleJob?.salary} LPA
            </Badge>
            <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
              <FaMapMarkerAlt className="inline mr-1" /> {singleJob?.location}
            </Badge>
            <Badge className="text-black font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-4 md:mt-0 rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#6B3AC2] hover:bg-[#552d9b]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="border-t border-gray-300 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
        <p className="text-gray-700 leading-relaxed">{singleJob?.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            ["Role", `${singleJob?.position} Open Positions`],
            ["Location", singleJob?.location],
            ["Salary", `${singleJob?.salary} LPA`],
            ["Experience", `${singleJob?.experienceLevel} Year`],
            ["Total Applicants", singleJob?.applications?.length],
            ["Job Type", singleJob?.jobType],
            ["Post Date", singleJob?.createdAt.split("T")[0]],
          ].map(([label, value], index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">{label}:</h3>
              <p className="text-gray-700 mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
