import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen, Download } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="mb-5">
      <Navbar />

      <div className="mx-6 mb-5">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-blue-400">
          <div className="flex justify-between sm:flex-row edit-profile-top-container">
            <div className="flex items-center gap-5 profile-avatar-container">
              <Avatar className="cursor-pointer h-24 w-24">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="@shadcn"
                />
              </Avatar>
              <div>
                <h1 className="font-medium text-xl truncate">{user?.fullname}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="mt-4 sm:mt-0 edit-profile-button"
              variant="outline"
            >
              <Pen />
              <span>Edit Profile</span>
            </Button>
          </div>
          <div className="my-5">
            <div className="flex items-center gap-3 my-2">
              <Mail />
              <span>
                <a href={`mailto:${user?.email}`}>{user?.email}</a>
              </span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <Contact />
              <span>
                <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
              </span>
            </div>
          </div>

          <div>
            <div className="my-5">
              <h1 className="text-md font-bold mb-1">Skills</h1>
              <div className="flex items-center gap-1 flex-wrap">
                {user?.profile?.skills.length !== 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div>
                {isResume ? (
                  <a
                    target="_blank"
                    href={user?.profile?.resume}
                    className="inline-flex items-center gap-2 bg-[#6A38C2] text-white px-4 py-2 rounded-lg hover:bg-[#5a2ea0] cursor-pointer"
                  >
                    <Download className="h-5 w-5" /> Download Resume
                  </a>
                ) : (
                  <span>No Resume Found</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg hover:shadow-blue-400">
          <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

          {/* Add Application Table */}
          <div className="overflow-x-auto">
            <AppliedJob />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
