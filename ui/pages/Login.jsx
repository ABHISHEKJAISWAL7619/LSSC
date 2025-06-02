// "use client";

// import { Otpsend } from "@/redux/slice/auth-slice";
// import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
// import { useState } from "react";
// import { useDispatch } from "react-redux";

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [formdata, setformdata] = useState({ mobile: "9334432464", role: "admin" });

//   const handlechange = (e) => {
//     setformdata({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const handleSendOtp = (e) => {
//     e.preventDefault();
//     const { mobile, role } = formdata;

//     dispatch(Otpsend(formdata));
//     alert(`OTP sent to ${mobile}`);

//     // ✅ Navigate to OTP verify page
//     router.push(`/otp-verify?mobile=${mobile}`);
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Login form</h2>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">
//             Mobile Number
//           </label>
//           <input
//             type="tel"
//             name="mobile"
//             maxLength={10}
//             value={formdata.mobile}
//             onChange={handlechange}
//             placeholder="Enter mobile number"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Role</label>
//           <input
//             type="text"
//             name="role"
//             value={formdata.role}
//             onChange={handlechange}
//             placeholder="Enter your role"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           onClick={handleSendOtp}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Send OTP
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { Otpsend } from "@/redux/slice/auth-slice";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formdata, setformdata] = useState({ mobile: "9334432464", role: "admin" });

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const { mobile, role } = formdata;

    dispatch(Otpsend(formdata));
    alert(`OTP sent to ${mobile}`);

    // ✅ Navigate to OTP verify page
    router.push(`/otp-verify?mobile=${mobile}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login form</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            maxLength={10}
            value={formdata.mobile}
            onChange={handlechange}
            placeholder="Enter mobile number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formdata.role}
            onChange={handlechange}
            placeholder="Enter your role"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}

