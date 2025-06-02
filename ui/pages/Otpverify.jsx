// "use client";

// import { loginuser } from "@/redux/slice/auth-slice";
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSearchParams, useRouter } from "next/navigation"; // ✅ Fixed here

// const Otpverify = ({ mobile }) => {
//   const [otp, setOtp] = useState("123456");
//   const router = useRouter(); // ✅ Fixed
//   const searchParams = useSearchParams();
//   const dispatch = useDispatch();
//   const [phoneNumber, setPhoneNumber] = useState("");

//   useEffect(() => {
//     if (mobile) {
//       setPhoneNumber(mobile);
//     }
//   }, [searchParams]);

//   const handleLogin = async() => {
//     const obj = {
//       mobile: phoneNumber,
//       otp: otp,
//     };

//     await dispatch(loginuser(obj));
//     router.push("/"); 
//   };



//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             value={phoneNumber}
//             readOnly
//             className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             OTP
//           </label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Otpverify;

"use client";

import { loginuser } from "@/redux/slice/auth-slice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Fixed here

const Otpverify = ({ mobile }) => {
  const [otp, setOtp] = useState("123456");
  const router = useRouter(); // ✅ Fixed
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (mobile) {
      setPhoneNumber(mobile);
    }
  }, [searchParams]);

  const handleLogin = async () => {
    const obj = {
      mobile: phoneNumber,
      otp: otp,
    };

    await dispatch(loginuser(obj));
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Otpverify;

