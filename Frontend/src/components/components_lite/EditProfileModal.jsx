import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, skills: input.skills.split(", ") }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  const FileChangehandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-3xl p-6 rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFileChange} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Name", id: "fullname", type: "text" },
              { label: "Email", id: "email", type: "email" },
              { label: "Phone", id: "phoneNumber", type: "tel" },
              { label: "Bio", id: "bio", type: "text" },
              { label: "Skills (comma separated)", id: "skills", type: "text" },
            ].map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <Label htmlFor={field.id} className="font-semibold">
                  {field.label}
                </Label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={input[field.id]}
                  onChange={changeEventHandler}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            ))}

            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="file" className="font-semibold">
                Resume (PDF only)
              </Label>
              <input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                onChange={FileChangehandler}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg py-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
