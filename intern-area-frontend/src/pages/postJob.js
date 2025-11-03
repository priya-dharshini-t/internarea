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
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    aboutCompany: "",
    aboutJob: "",
    whoCanApply: "",
    perks: "",
    numberOfOpening: "",
    CTC: "",
    startDate: "",
    AdditionalInfo: "",
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
    const hasemptyfields = Object.values(formData).some((val) => !val.trim());
    if (hasemptyfields) {
      toast.error("Please fill in all details");
      return;
    }

    try {
      setisloading(true);
      await axios.post("https://internshala-clone-y2p2.onrender.com/api/job", formData);
      toast.success("Job posted successfully");
      router.push("/adminpanel");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error posting job");
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Post New Job</h1>
            <p className="mt-2 text-sm text-gray-600">Create a new job opportunity</p>
          </div>

          <form className="space-y-6" onSubmit={handlesubmit}>
            {/* your form fields (same as before) */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
