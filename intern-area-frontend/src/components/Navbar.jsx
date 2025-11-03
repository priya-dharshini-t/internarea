import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectuser, login, logout } from "../feature/Userslice";
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import LanguageSelector from "./LanguageSelector";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
// Import Firestore
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(); // initialize Firestore
const Navbar = () => {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("English");
  const [canAccess, setCanAccess] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile && (hour < 10 || hour > 13)) setCanAccess(false);
    else setCanAccess(true);
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        uid: result.user.uid, 
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: "user",
      };
       // Reference to the user document (using email as ID or auto-generated)
    const userRef = doc(db, "users", result.user.uid); 

    // Check if the user already exists
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      // If not, create a new document
      await setDoc(userRef, userData);
    }
      dispatch(login(userData));
      toast.success("Logged in successfully");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  if (!canAccess) {
    return <div className="access-message">Mobile access allowed only from 10 AM to 1 PM</div>;
  }

  return (
    <nav className="navbar">
  {/* Logo */}
  <div className="navbar-left">
    <Link to="/">
      <img src={logo} alt="Logo" className="logo" />
    </Link>
  </div>

      {/* Links */}
      <ul className="navbar-links">
        {/* Internships */}
        <li className="dropdown">
          <a href="#">Internships</a>
          <div className="dropdown-menu">
            <div className="dropdown-column">
              <h4>Top Locations</h4>
              <ul>
                <li>Internship in Chennai</li>
                <li>Internship in Mumbai</li>
                <li>Internship in Bangalore</li>
                <li>Internship in Delhi</li>
                <li>Internship in Pune</li>
                <li>Internship in Hyderabad</li>
                <li>Internship in Coimbatore</li>
                <li>Internship in kochin</li>
                <li>International Internship</li>
                <li>Work From Home</li>
              </ul>
            </div>
            <div className="dropdown-column">
              <h4>Top Categories</h4>
              <ul>
                <li>Engineering Internship</li>
                <li>Business/MBA Internship</li>
                <li>Part-Time Jobs/Internships</li>
                <li>Humanities Internship</li>
                <li>Science Internship</li>
                <li>Internships with Job Offer</li>
                <li>Internships for Women</li>
                <li>View All Internships</li>
              </ul>
            </div>
          </div>
        </li>

        {/* Jobs */}
        <li className="dropdown">
          <a href="#">Jobs</a>
          <div className="dropdown-menu">
            <div className="dropdown-column">
              <h4>Top Locations</h4>
              <ul>
                <li>Job in Chennai</li>
                <li>Job in Mumbai</li>
                <li>Job in Bangalore</li>
                <li>Job in Delhi</li>
                <li>Job in Pune</li>
                <li>Job in Hyderabad</li>
                <li>Job in Coimbatore</li>
                <li>Job in kochin</li>
                <li>Remote Jobs</li>
                <li>Work From Home</li>
              </ul>
            </div>
            <div className="dropdown-column">
              <h4>Top Categories</h4>
              <ul>
                <li>Fresher Jobs</li>
                <li>Marketing Jobs</li>
                <li>Content Writing Jobs</li>
                <li>Computer Science Jobs</li>
                <li>Finance Jobs</li>
                <li>HR Jobs</li>
                <li>Graphic Design Jobs</li>
                <li>Data Science Jobs</li>
                <li>View All Jobs</li>
              </ul>
            </div>
          </div>
        </li>

        {/* Courses */}
        <li className="dropdown">
          <a href="#">Courses</a>
          <div className="dropdown-menu">
            <div className="dropdown-column">
              <h4>Certification Courses</h4>
              <ul>
                <li>Artificial Intelligence & ML</li>
                <li>Web Development with AI</li>
                <li>Programming in Python</li>
                <li>Cloud Computing with AWS</li>
                <li>Core Java</li>
                <li>Digital Marketing with AI</li>
                <li>Advanced Excel with AI</li>
                <li>View 70+ More Courses</li>
              </ul>
            </div>
            <div className="dropdown-column">
              <h4>Placement Courses</h4>
              <ul>
                <li>Full Stack Development Course</li>
                <li>Data Science Course</li>
                <li>UI/UX Design Course</li>
                <li>Software Testing Course</li>
                <li>HR Management Course</li>
                <li>Digital Marketing Course</li>
                <li>Product Management Course</li>
                <li>Supply Chain Logistics Course</li>
                <li>Online Degrees (MBA, BCA, MCA, B.Com, BBA, BA, MA)</li>
                <li>View All</li>
              </ul>
            </div>
          </div>
        </li>

        {/* Profile */}
        <li className="dropdown profile">
          <a href="#">{user ? user.name : "Profile"}</a>
          <div className="dropdown-menu">
            <ul>
              <li><Link to="/profile">Home</Link></li>
              <li>My Applications</li>
              <li>My Bookmarks</li>
              <li>Edit Resume</li>
              <li>Edit Preferences</li>
              <li>Safety Tips</li>
              <li>Help Center</li>
              <li>More</li>
            </ul>
          </div>
        </li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <LanguageSelector />
        {user ? (
          <div className="user-section">
            <Link to="/profile">
              <img src={user.photo || "/default-avatar.png"} alt="Avatar" className="avatar" />
            </Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            {user.role === "admin" && (
              <Link to="/adminpanel" className="admin-btn">Admin</Link>
            )}
          </div>
        ) : (
          <button onClick={handleLogin} className="login-btn">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
