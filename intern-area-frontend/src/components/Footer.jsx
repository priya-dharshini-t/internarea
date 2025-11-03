import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 flex flex-wrap justify-between gap-8">
        {/* === COLUMN 1: Internship Place & Stream === */}
        <div className="flex flex-col gap-6 w-60">
          <h3 className="text-lg font-semibold">Internship by Place</h3><br></br>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Internship in India</li>
            <li>Internship in Delhi</li>
            <li>Internship in Bangalore</li>
            <li>Internship in Hyderabad</li>
            <li>Virtual Internship</li>
            <li>View all internships</li>
          </ul>
<br></br>
          <h3 className="text-lg font-semibold mt-4">Internship by Stream</h3><br></br>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Computer Science Internship</li>
            <li>Electronics Internship</li>
            <li>Mechanical Internship</li>
            <li>Civil Internship</li>
            <li>Marketing Internship</li>
            <li>View all internships</li>
          </ul>
        </div>
<br></br>
        {/* === COLUMN 2: Jobs Place & Stream === */}
        <div className="flex flex-col gap-6 w-60">
          <h3 className="text-lg font-semibold">Jobs by Place</h3><br></br>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Jobs in Delhi</li>
            <li>Jobs in Mumbai</li>
            <li>Jobs in Bangalore</li>
            <li>Jobs in Chennai</li>
            <li>Jobs in Hyderabad</li>
            <li>View all jobs</li>
          </ul>
<br></br>
          <h3 className="text-lg font-semibold mt-4">Jobs by Stream</h3><br></br>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Marketing jobs</li>
            <li>Web Development jobs</li>
            <li>Content Writing jobs</li>
            <li>Sales jobs</li>
            <li>Finance jobs</li>
            <li>View all jobs</li>
          </ul>
        </div>

        {/* === COLUMN 3: Placement Courses === */}
        <div className="flex flex-col gap-6 w-60">
          <h3 className="text-lg font-semibold">Placement Courses with AI</h3><br></br>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Full Stack Development Course</li>
            <li>Data Science Course</li>
            <li>UI/UX Design Course</li>
            <li>Digital Marketing Course</li>
            <li>Software Testing Course</li>
            <li>Financial Modelling Course</li>
            <li>Certification Courses OFFER</li>
          </ul>
        </div>

        {/* === COLUMN 4: Company & About === */}
        <div className="flex flex-col gap-6 w-60">
          <h3 className="text-lg font-semibold">Company</h3><br></br>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>About us</li>
            <li>We're hiring</li>
            <li>Hire interns for your company</li>
            <li>Post a Job</li>
            <li>Team Diary</li>
            <li>Blog</li>
            <li>Our Services</li>
            <li>Terms & Conditions</li>
            <li>Privacy</li>
            <li>Contact us</li>
          </ul>
        </div>
      </div>

      {/* === BOTTOM SOCIAL + COPYRIGHT === */}
      <div className="mt-10 flex flex-wrap justify-between items-center gap-6 border-t border-gray-700 pt-6 px-6">
        <div className="flex gap-4">
          <button className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">
            Get Android App
          </button>
          <button className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">
            Get iOS App
          </button>
        </div>

        <div className="flex space-x-4">
          <Facebook className="w-6 h-6 hover:text-blue-400 cursor-pointer" />
          <Twitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" />
          <Instagram className="w-6 h-6 hover:text-pink-400 cursor-pointer" />
        </div>

        <p className="text-sm text-gray-400 text-center sm:text-left mt-4 sm:mt-0">
          © Copyright 2025 <span className="font-semibold text-gray-200">Internshala</span> (Scholiverse Educare Private Limited)
        </p>
      </div>
    </footer>
  );
}
