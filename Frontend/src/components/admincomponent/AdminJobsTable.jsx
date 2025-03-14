import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Your recent Posted Jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                  No Job Added
                </TableCell>
              </TableRow>
            ) : (
              filterJobs?.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="w-5 text-gray-500 hover:text-blue-500" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() => navigate(`/admin/companies/${job._id}`)}
                          className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <hr />
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;
