import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-max">
        <TableCaption className="text-gray-500 text-sm mt-4">
          Recent Applied Jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-4 text-left">Date</TableHead>
            <TableHead className="p-4 text-left">Job Title</TableHead>
            <TableHead className="p-4 text-left">Company</TableHead>
            <TableHead className="p-4 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                You have not applied for any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="p-4">
                  {appliedJob?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="p-4 font-medium">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="p-4">
                  {appliedJob.job?.company.name}
                </TableCell>
                <TableCell className="p-4 text-right">
                  <Badge
                    className={`text-white px-3 py-1 rounded-full ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob?.status === "accepted"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
