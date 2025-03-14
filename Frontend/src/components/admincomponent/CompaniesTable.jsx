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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Your recent registered Companies</TableCaption>
          <TableHeader>
            <TableRow className="text-gray-700">
              <TableHead className="text-left">Logo</TableHead>
              <TableHead className="text-left truncate">Company Name</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                  No Companies Added
                </TableCell>
              </TableRow>
            ) : (
              filterCompany?.map((company) => (
                <TableRow key={company.id} className="hover:bg-gray-100">
                  <TableCell className="py-3">
                    <Avatar>
                      <AvatarImage
                        src={company.logo || "default-logo-url"}
                        alt={`${company.name} logo`}
                        className="w-10 h-10 rounded-full border border-gray-300"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell className="truncate">{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="w-5 text-gray-500 hover:text-blue-500" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 bg-white shadow-lg rounded-md p-2 edit-company">
                        <div
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex items-center gap-2 w-fit cursor-pointer text-gray-600 hover:text-blue-600"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
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

export default CompaniesTable;
