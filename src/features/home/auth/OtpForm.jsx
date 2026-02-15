import { useEffect, useRef, useState } from "react";

export default function OtpForm({ phone, goBack }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(Array(6).fill(""));
    inputsRef.current[0].focus();
  };

  return (
    <>
      {/* Back */}
      <button
        onClick={goBack}
        className="text-sm text-gray-500 mb-4"
      >
        ← Back
      </button>

      <p className="text-sm text-gray-600 mb-4">
        Enter the OTP sent to <span className="font-semibold">{phone}</span>
      </p>

      {/* OTP boxes */}
      <div className="flex justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:border-orange-500"
          />
        ))}
      </div>

      <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">
        VERIFY OTP
      </button>

      {/* Resend */}
      <div className="text-center mt-4">
        {timer > 0 ? (
          <p className="text-sm text-gray-500">
            Resend OTP in {timer}s
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm text-orange-500 font-semibold"
          >
            Resend OTP
          </button>
        )}
      </div>
    </>
  );
}
