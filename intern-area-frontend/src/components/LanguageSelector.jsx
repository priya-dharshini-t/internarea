import React, { useState } from "react";

function LanguageSelector({ setLanguage }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const sendOtp = async () => {
    if (!email) return alert("Enter email");
    try {
      await fetch("https://internarea-server.onrender.com/api/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_email: email }),
      });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch("https://internarea-server.onrender.com/api/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_email: email, otp: otpInput }),
      });
      if (res.ok) {
        alert("OTP Verified!");
        setLanguage("fr"); // Example: change language on verification
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Verification failed");
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!otpSent ? (
        <button onClick={sendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default LanguageSelector;
