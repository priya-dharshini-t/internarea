import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectuser, login } from "../feature/Userslice";
import { ExternalLink, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const defaultAvatars = [
  "/assets/Brian.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
];

const Profile = () => {
  const reduxUser = useSelector(selectuser);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (reduxUser?.uid) {
        try {
          const userRef = doc(db, "users", reduxUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUser(data);
            setName(data.name || reduxUser.name);
            setAvatar(data.photo || "");
          } else {
            setUser(reduxUser);
            setName(reduxUser.name);
            setAvatar(reduxUser.photo || "");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, [reduxUser]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const preview = URL.createObjectURL(file);
      setAvatar(preview);
    }
  };

  const handleSave = async () => {
    if (!reduxUser?.uid) return toast.error("User not logged in");

    setLoading(true);

    try {
      let photoURL = avatar;

      // Upload to Cloudinary if a new file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "profile_preset"); // your unsigned preset
        formData.append("folder", "profilePhotos");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/duqx2mkqr/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          photoURL = data.secure_url;
        } else {
          throw new Error("Cloudinary upload failed");
        }
      }

      const updatedUser = {
        ...user,
        name,
        photo: photoURL,
      };

      await setDoc(doc(db, "users", reduxUser.uid), updatedUser, { merge: true });
      dispatch(login(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      setFile(null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {isEditing ? (
              <div className="avatar-edit-section">
                <label className="avatar-upload-btn">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                </label>
                <div className="avatar-list">
                  {defaultAvatars.map((avt) => (
                    <img
                      key={avt}
                      src={avt}
                      alt="avatar"
                      className={`avatar-option ${avatar === avt ? "selected" : ""}`}
                      onClick={() => {
                        setAvatar(avt);
                        setFile(null);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : avatar ? (
              <img src={avatar} alt={user.name} className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                <User className="avatar-icon" />
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          {isEditing ? (
            <input
              type="text"
              className="profile-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <h1 className="profile-name">{user.name}</h1>
          )}

          <div className="profile-email">
            <Mail className="mail-icon" />
            <span>{user.email}</span>
          </div>

          <div className="profile-stats">
            <div className="stat-card active-apps">
              <p className="stat-number">{user.activeApplications || 0}</p>
              <p className="stat-label">Active Applications</p>
            </div>
            <div className="stat-card accepted-apps">
              <p className="stat-number">{user.acceptedApplications || 0}</p>
              <p className="stat-label">Accepted Applications</p>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/userapplication" className="btn btn-primary">
              View Applications
              <ExternalLink className="btn-icon" />
            </Link>

            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn btn-secondary"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-tertiary"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
