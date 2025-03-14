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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <Table className="min-w-full table-auto border-collapse border border-gray-200">
        <TableCaption className="text-lg font-medium text-gray-700">
          A list of your recent applied users
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-4 py-2 text-left font-semibold text-gray-800">FullName</TableHead>
            <TableHead className="px-4 py-2 text-left font-semibold text-gray-800">Email</TableHead>
            <TableHead className="px-4 py-2 text-left font-semibold text-gray-800">Contact</TableHead>
            <TableHead className="px-4 py-2 text-left font-semibold text-gray-800">Resume</TableHead>
            <TableHead className="px-4 py-2 text-left font-semibold text-gray-800">Date</TableHead>
            <TableHead className="px-4 py-2 text-right font-semibold text-gray-800">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id} className="hover:bg-gray-50">
              <TableCell className="px-4 py-3">{item?.applicant?.fullname}</TableCell>
              <TableCell className="px-4 py-3">{item?.applicant?.email}</TableCell>
              <TableCell className="px-4 py-3">{item?.applicant?.phoneNumber}</TableCell>
              <TableCell className="px-4 py-3">
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 hover:underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                ) : (
                  <span className="text-gray-500">NA</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3">{item?.applicant?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right px-4 py-3">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="radio"
                          name="shortlistingStatus"
                          value={status}
                          id={`status-${index}-${item._id}`}
                        />
                        <label
                          htmlFor={`status-${index}-${item._id}`}
                          className="ml-2 text-sm"
                        >
                          {status}
                        </label>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
