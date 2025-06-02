"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Textarea from "../atoms/Textarea";
import FileUploader from "../common/FileUploader";

import { getallcategory } from "@/redux/slice/category-slice";
import {
  coursegetbyid,
  createcourse,
  deletecourse,
  getallcourse,
  updatecourse,
} from "@/redux/slice/course-slice";
import { updateblog } from "@/redux/slice/blog-slice";
import { useRouter } from 'next/navigation'

const Courses = ({ courseId }) => {
  const router = useRouter()
  console.log(courseId);
  const dispatch = useDispatch();
  const [allcourse, setallcourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formdata, setFormdata] = useState({
    category: "",
    title: "",
    price: "",
    type: "",
    description: "",
    thumbnail: {},
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;
  const maxCoursesToShow = 10;

  // Limit total courses to 10
  const limitedCourses = allcourse.slice(0, maxCoursesToShow);

  const totalPages = Math.ceil(limitedCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = limitedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // Fetch categories
  const fetchCategory = async () => {
    try {
      const res = await dispatch(getallcategory());
      if (res.payload?.data) {
        const formattedCategories = res.payload.data.map((item) => ({
          label: item.title,
          value: item._id,
        }));
        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch courses
  const getcourse = async () => {
    try {
      const res = await dispatch(getallcourse());
      if (res.payload?.data && Array.isArray(res.payload.data)) {
        setallcourse(res.payload.data);
      } else {
        setallcourse([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    getcourse();
  }, []);

  // Form input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };
  const getcoursebyid = async () => {
    let res = await dispatch(coursegetbyid(courseId));
    res = res.payload?.data || {};
    setFormdata({
      category: res.category || "",
      title: res.title || "",
      price: res.price || "",
      type: res.type || "",
      description: res.description || "",
      thumbnail: {
        url: res.thumbnail?.url || "",
        publicId: res.thumbnail?.publicId || "",
        alt: res.thumbnail?.alt || "",
      },
    });
  };

  useEffect(() => {
    if (courseId) {
      getcoursebyid();
    }
  }, [courseId]);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (courseId) {
      dispatch(updatecourse({ courseId, formdata }));
       setFormdata({
      category:"",
      title: "",
      price: "",
      type:  "",
      description:  "",
      thumbnail: {
        url: "",
        publicId:  "",
        alt: "",
      },
    });
    router.push('/website-content/courses')
      getcourse();

    }
    else{
       if (!formdata.category) return alert("Please select a category.");
    if (!formdata.title) return alert("Title is required.");
    if (!formdata.price) return alert("Price is required.");
    if (!formdata.type) return alert("Type is required.");
    if (!formdata.description) return alert("Description is required.");
    if (!formdata.thumbnail?.url || !formdata.thumbnail?.publicId)
      return alert("Thumbnail is required.");
    

    try {
      await dispatch(createcourse(formdata));
      alert("Course created successfully!");
      setFormdata({
        category: "",
        title: "",
        price: "",
        type: "",
        description: "",
        thumbnail: {},
      });
      getcourse();
    } catch (err) {
      console.error("Course creation error:", err);
    }
    }

   
  };

  const handledeletecourse = (CourseId) => {
    dispatch(deletecourse(CourseId));
    getcourse();
  };

  return (
    <section className="flex lg:gap-4">
      <Link href={"/website-content"}>
        <i className="ri-arrow-left-line hidden lg:block ri-2x"></i>
      </Link>

      <div className="lg:p-10 space-y-6 p-3 w-full bg-white rounded-xl">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="text-secondary font-bold text-3xl">
            Course Management
          </h2>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl shadow space-y-4 lg:w-[80%] p-4 border border-[#E6E7EA]"
          >
            <h3 className="text-secondary text-center text-2xl font-semibold">
              Add Thumbnail
            </h3>

            <div className="flex justify-center">
              <div className="lg:w-[38%]">
                <FileUploader
                  onSuccess={(fileData) =>
                    setFormdata((prev) => ({
                      ...prev,
                      thumbnail: {
                        url: fileData?.image,
                        publicId: fileData?.publicId,
                      },
                    }))
                  }
                  onDelete={() =>
                    setFormdata((prev) => ({
                      ...prev,
                      thumbnail: {},
                    }))
                  }
                />
              </div>
            </div>

            <Select
              label="Category"
              name="category"
              value={formdata.category}
              options={categories}
              onChange={handleSelectChange}
            />

            <Input
              name="title"
              value={formdata.title}
              onChange={handleChange}
              label="Course Name"
              placeholder="Enter Title"
            />

            <Input
              name="price"
              value={formdata.price}
              type="number"
              onChange={handleChange}
              label="Price"
              placeholder="Enter Price"
            />

            <Select
              label="Type"
              name="type"
              value={formdata.type}
              options={[
                { label: "Live", value: "live" },
                { label: "Offline", value: "offline" },
              ]}
              onChange={handleSelectChange}
            />

            <Textarea
              name="description"
              value={formdata.description}
              onChange={handleChange}
              label="Description"
              placeholder="Write about the course"
            />

            <div className="flex gap-6">
              <Button style="w-full border border-[#E6E7EA]" label="Cancel" />
              <Button
                type="submit"
                style="bg-[#0070BA] text-white w-full"
                label={courseId ? "Update" : "Add Course"}
              />
            </div>
          </form>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Previous Courses</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-nowrap">
              <thead>
                <tr className="bg-[#f1f4f9] font-semibold text-sm text-gray-600">
                  <th>Title</th>
                  <th>Access</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 text-sm"
                  >
                    <td>{item.title}</td>
                    <td>{item.access || "N/A"}</td>
                    <td className="truncate text-blue-600 cursor-pointer">
                      {item.price}
                    </td>
                    <td>
                      <span className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="flex justify-center gap-3">
                      <Link
                        href={`/website-content/courses/${item._id}`}
                        className="cursor-pointer text-gray-600 hover:text-blue-600"
                      >
                        <i className="ri-edit-box-line ri-xl"></i>
                      </Link>
                      <span className="cursor-pointer text-gray-600 hover:text-blue-600">
                        <i className="ri-git-repository-private-line ri-xl"></i>
                      </span>
                      <span
                        onClick={() => handledeletecourse(item._id)}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-6-line ri-xl"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>
              Showing {indexOfFirstCourse + 1} to{" "}
              {Math.min(indexOfLastCourse, limitedCourses.length)} of{" "}
              {limitedCourses.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`border rounded-lg px-3 py-2 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>

              {(() => {
                if (currentPage === 1) {
                  const pagesToShow = totalPages > 1 ? [1, 2] : [1];
                  return pagesToShow.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`rounded-lg px-3 py-2 ${
                        currentPage === pageNum
                          ? "bg-blue-100 text-blue-600"
                          : "border"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ));
                } else {
                  return [...Array(totalPages).keys()].map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum + 1)}
                      className={`rounded-lg px-3 py-2 ${
                        currentPage === pageNum + 1
                          ? "bg-blue-100 text-blue-600"
                          : "border"
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  ));
                }
              })()}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`border rounded-lg px-3 py-2 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
