import { useState } from "react";

export default function StudentForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    branch: "",
    age: "",
  });
  const [success, setSuccess] = useState("");

  const branches = ["CS", "IT", "E&TC", "Mechanical"];

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      setFormData((prev) => ({
        ...prev,
        dob: value,
        age: calculateAge(value),
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!formData.fullName.trim() || !nameRegex.test(formData.fullName)) {
        alert("Name must contain only alphabets.");
        return false;
      }
      if (!formData.dob || new Date(formData.dob) >= new Date()) {
        alert("Please select a valid past date for DOB.");
        return false;
      }
      if (formData.address.trim().length < 10) {
        alert("Address must be at least 10 characters long.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.branch) {
        alert("Please select a branch.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", { // ✅ Updated path
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFormData({ fullName: "", dob: "", address: "", branch: "", age: "" });
        setStep(1);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 animated-bg"
      style={{ fontFamily: "'Fira Sans', sans-serif" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 rounded-2xl shadow-xl bg-white border border-gray-100"
      >
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6 animate-fade-in">
          Student Registration Form
        </h1>

        {/* Progress Bar */}
        <div className="flex items-center mb-6">
          {["Personal Info", "Academic Info", "Review"].map((label, index) => {
            const currentStep = index + 1;
            return (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-colors ${
                    step >= currentStep
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep}
                </div>
                <span className="text-xs mt-1">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 font-medium shadow-inner">
            {success}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                readOnly
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                placeholder="Enter your address"
              ></textarea>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700">
              Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Select a branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-gray-50 shadow-inner">
              <p>
                <strong>Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>DOB:</strong> {formData.dob}
              </p>
              <p>
                <strong>Age:</strong> {formData.age}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}
              </p>
              <p>
                <strong>Branch:</strong> {formData.branch}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Animated Background */}
      <style>{`
        .animated-bg {
          background: linear-gradient(-45deg, #eef2f3, #d9e4ec, #f0f4ff, #e3f2fd);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
