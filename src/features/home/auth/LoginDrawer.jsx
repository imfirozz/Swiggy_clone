import { useState } from "react";
import OtpForm from "./OtpForm";

export default function LoginDrawer({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [step, setStep] = useState("form"); // form | otp
  const [phone, setPhone] = useState("");


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl p-6 animate-slideIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-8 mt-10">
          <h2 className="text-2xl font-semibold">
            {step === "otp"
              ? "Verify OTP"
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </h2>

          {step !== "otp" && (
            <p className="text-sm text-gray-500 mt-1">
              {mode === "login" ? (
                <>
                  or{" "}
                  <span
                    onClick={() => setMode("signup")}
                    className="text-orange-500 cursor-pointer"
                  >
                    create an account
                  </span>
                </>
              ) : (
                <>
                  or{" "}
                  <span
                    onClick={() => setMode("login")}
                    className="text-orange-500 cursor-pointer"
                  >
                    login to your account
                  </span>
                </>
              )}
            </p>
          )}
        </div>

        {/* BODY */}
        {step === "form" ? (
          mode === "login" ? (
            <LoginForm
              phone={phone}
              setPhone={setPhone}
              onContinue={() => setStep("otp")}
            />
          ) : (
            <SignupForm
              phone={phone}
              setPhone={setPhone}
              onContinue={() => setStep("otp")}
            />
          )
        ) : (
            <OtpForm
             phone={phone}
             goBack={() => setStep("form")}/>

        )}

        {/* Terms */}
        {step !== "otp" && (
          <p className="text-xs text-gray-500 mt-4">
            By continuing, I accept the Terms & Conditions & Privacy Policy
          </p>
        )}
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}

/* ---------------- FORMS ---------------- */

function LoginForm({ phone, setPhone, onContinue }) {
  return (
    <>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-orange-500"
      />

      <button
        onClick={onContinue}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
      >
        SEND OTP
      </button>
    </>
  );
}

function SignupForm({ phone, setPhone, onContinue }) {
  return (
    <>
      <input
        type="text"
        placeholder="Name"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-orange-500"
      />

      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-orange-500"
      />

      <button
        onClick={onContinue}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
      >
        CONTINUE
      </button>
    </>
  );
}


