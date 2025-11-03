import React, { useState } from "react";
import first from "../assets/Firstslide.png";
import second from "../assets/secondslide.webp";
import third from "../assets/thirdslide.webp";
import fourth from "../assets/fourthslide.webp";
import "../styles/globals.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const internships = [
    { _id: "i1", title: "Marketing Intern", company: "TechNova", location: "Mumbai", stipend: "₹10,000", Duration: "3 Months" },
    { _id: "i2", title: "Frontend Developer Intern", company: "CodeWave", location: "Bangalore", stipend: "₹15,000", Duration: "6 Months" },
    { _id: "i3", title: "Data Analyst Intern", company: "DataWorks", location: "Hyderabad", stipend: "₹12,000", Duration: "4 Months" },
    { _id: "i4", title: "Python Intern", company: "ETS", location: "Bangalore", stipend: "Unpaid", Duration: "2 Months" },
  ];

  const jobs = [
    { _id: "j1", title: "Software Engineer", company: "TechWorld", location: "Pune", salary: "₹6,00,000 PA" },
    { _id: "j2", title: "UI/UX Designer", company: "DesignPro", location: "Mumbai", salary: "₹5,50,000 PA" },
    { _id: "j3", title: "Data Scientist", company: "DataLabs", location: "Bangalore", salary: "₹8,00,000 PA" },
    { _id: "j4", title: "Embedded Engineer", company: "Hexacore", location: "Chennai", salary: "₹3,50,000 PA" },
  ];

  const courses = [
    { _id: "c1", title: "React JS Bootcamp", platform: "Udemy", duration: "4 Weeks", price: "₹5,000" },
    { _id: "c2", title: "Fullstack Python", platform: "Coursera", duration: "6 Weeks", price: "₹8,000" },
    { _id: "c3", title: "Data Analytics", platform: "edX", duration: "5 Weeks", price: "₹6,500" },
    { _id: "c4", title: "Python Mastery", platform: "edX", duration: "4 Weeks", price: "₹4,500" },
  ];

  const handleSlide = (direction) => {
    const container = document.getElementById("container");
    const step = 100;
    if (direction === "left") setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
    else setCurrentSlide((prev) => (prev < 3 ? prev + 1 : 3));
    sideScroll(container, direction, 25, step, 10);
  };

  const renderCards = (data, type) =>
    data.map((item) => (
      <div className="card-unified" key={item._id}>
        <p className="actively-hiring flex items-center gap-2">
          <i className="bi bi-arrow-up-right text-blue-500"></i> {type}
        </p>
        <h3>{item.title}</h3>
        {item.company && <p className="company">{item.company}</p>}
        {item.platform && <p className="company">{item.platform}</p>}
        <hr className="mt-5" />
        {item.location && <p className="meta"><i className="bi bi-geo-alt-fill text-blue-500"></i> {item.location}</p>}
        {item.salary && <p className="meta"><i className="bi bi-cash-stack text-blue-500"></i> {item.salary}</p>}
        {item.stipend && <p className="meta"><i className="bi bi-cash-stack text-blue-500"></i> {item.stipend}</p>}
        {item.Duration && <p className="meta"><i className="bi bi-calendar-fill text-blue-500"></i> {item.Duration}</p>}
        {item.duration && <p className="meta"><i className="bi bi-calendar-fill text-blue-500"></i> {item.duration}</p>}
        {item.price && <p className="meta"><i className="bi bi-cash-stack text-blue-500"></i> {item.price}</p>}
        <button className="view-btn mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View Details</button>
      </div>
    ));

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero text-center mt-6">
        <h1 className="text-3xl font-bold">Make your dream career a reality</h1>
        <p className="text-lg font-semibold mt-2">Trending on InternArea 🔥</p><br></br>
      </section>

      {/* IMAGE SLIDER */}
      <div className="imgs flex justify-center mt-10" id="container">
        <div className="slide flex" id="content">
          <img className="slide_Img ml-4" src={first} alt="" />
          <img className="slide_Img ml-4" src={second} alt="" />
          <img className="slide_Img ml-4" src={third} alt="" />
          <img className="slide_Img ml-4" src={fourth} alt="" />
        </div>
      </div>
      {/* RECOMMENDED INTERNSHIPS */}
      <section className="recommended-section py-10 mt-10">
        <h2>Recommended Internships</h2>
        <div className="recommended-container flex gap-6">{renderCards(internships, "Internship")}</div>
      </section>

      {/* RECOMMENDED JOBS */}
      <section className="recommended-section py-10 mt-10">
        <h2>Recommended Jobs</h2>
        <div className="recommended-container flex gap-6">{renderCards(jobs, "Job")}</div>
      </section>

      {/* RECOMMENDED COURSES */}
      <section className="recommended-section py-10 mt-10">
        <h2>Recommended Courses</h2>
        <div className="recommended-container flex gap-6">{renderCards(courses, "Course")}</div>
      </section>
    </>
  );
}

export default Home;

// Slider scroll function
function sideScroll(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    if (direction === "left") element.scrollLeft -= step;
    else element.scrollLeft += step;
    scrollAmount += step;
    if (scrollAmount >= distance) window.clearInterval(slideTimer);
  }, speed);
}
