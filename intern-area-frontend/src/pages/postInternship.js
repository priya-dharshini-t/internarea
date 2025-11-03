import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  Tags,
  Info,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const PostInternship = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    aboutCompany: "",
    aboutInternship: "",
    whoCanApply: "",
    perks: "",
    numberOfOpening: "",
    stipend: "",
    startDate: "",
    additionalInfo: "",
  });

  const router = useRouter();
  const [isloading, setisloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    const hasEmptyFields = Object.values(formData).some((val) => !val.trim());
    if (hasEmptyFields) {
      toast.error("Please fill in all details");
      return;
    }

    try {
      setisloading(true);
      await axios.post(
        "https://internshala-clone-y2p2.onrender.com/api/internship",
        formData
      );
      toast.success("Internship posted successfully");
      router.push("/adminpanel");
    } catch (error) {
      console.error(error);
      toast.error("Error posting internship");
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Post New Internship
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Create a new internship opportunity for students
            </p>
          </div>

          <form className="space-y-6" onSubmit={handlesubmit}>
            {/* ---- All your form fields stay the same ---- */}
            {/* Just removed type annotations, rest unchanged */}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isloading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isloading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Posting Internship...
                  </div>
                ) : (
                  "Post Internship"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostInternship;
