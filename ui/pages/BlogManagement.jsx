"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
 import { useRouter } from 'next/navigation'
import Select from "../atoms/Select";
import FileUploader from "../common/FileUploader";
import Button from "../atoms/Button";
import {
  bloggetbyid,
  createblog,
  deleteblog,
  getallblog,
  updateblog,
} from "@/redux/slice/blog-slice";
import Link from "next/link";

const BlogManagement = ({ blogId }) => {
  const dispatch = useDispatch();
  const router = useRouter()
 

  const [formdata, setFormdata] = useState({
    title: "",
    shortDescription: "",
    content: "",
    type: "",
    thumbnail: {
      url: "",
      publicId: "",
      alt: "",
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
    author: {
      name: "",
      designation: "",
    },
  });

  useEffect(() => {
    const bloggetbyId = async () => {
      let resd = await dispatch(bloggetbyid(blogId));
      console.log(resd.payload);
      const res = resd.payload;
      setFormdata({
        title: res.data.title,
        shortDescription: res.data.shortDescription,
        content: res.data.content,
        type: res.data.type,
        thumbnail: {
          url: res.data.thumbnail.url,
          publicId: res.data.thumbnail.publicId,
          alt: res.data.thumbnail.alt,
        },
        seo: {
          metaTitle: res.data.seo.metaTitle,
          metaDescription: res.data.seo.metaDescription,
          metaKeywords: Array.isArray(res.data.seo.metaKeywords)
            ? res.data.seo.metaKeywords.join(", ")
            : res.data.seo.metaKeywords || "",
        },
        author: {
          name: res.data.author.name,
          designation: res.data.author.designation,
        },
      });
    };

    bloggetbyId();
  }, [blogId]);

  // Blog list
  const [blogList, setBlogList] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchedblog = async () => {
    const res = await dispatch(getallblog());
    if (res.payload && res.payload.data) {
      setBlogList(res.payload.data);
    }
  };
  useEffect(() => {
    fetchedblog();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("seo.")) {
      const key = name.split(".")[1];
      setFormdata((prev) => ({
        ...prev,
        seo: { ...prev.seo, [key]: value },
      }));
    } else if (name.startsWith("author.")) {
      const key = name.split(".")[1];
      setFormdata((prev) => ({
        ...prev,
        author: { ...prev.author, [key]: value },
      }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formdata.thumbnail.url || !formdata.thumbnail.publicId) {
      alert("Please upload a thumbnail image.");
      return;
    }

    const keywordsArray = formdata.seo.metaKeywords
      ? formdata.seo.metaKeywords.split(",").map((k) => k.trim())
      : [];

    const invalidKeyword = keywordsArray.find((k) => k.length > 20);
    if (invalidKeyword) {
      alert(
        `Keyword "${invalidKeyword}" is too long. Each keyword must be 20 characters or less.`
      );
      return;
    }

    const payload = {
      title: formdata.title,
      shortDescription: formdata.shortDescription,
      content: formdata.content,
      type: formdata.type,
      thumbnail: {
        url: formdata.thumbnail.url,
        publicId: formdata.thumbnail.publicId,
        alt: formdata.thumbnail.alt || "thumbnail",
      },
      seo: {
        metaTitle: formdata.seo.metaTitle,
        metaDescription: formdata.seo.metaDescription,
        metaKeywords: keywordsArray,
      },
      author: {
        name: formdata.author.name,
        designation: formdata.author.designation,
      },
    };

    if (blogId) {
      console.log(blogId);
      dispatch(updateblog({ formdata, blogId }));
       setFormdata({
        title:"",
        shortDescription: "",
        content:"",
        type: "",
        thumbnail: {
          url: "",
          publicId: "",
          alt: "",
        },
        seo: {
          metaTitle: "",
          metaDescription: "",
          metaKeywords:"",
        },
        author: {
          name: "",
          designation:"",
        },
      });
      router.push('/website-content/blog-management')
      fetchedblog();

    } else {
      dispatch(createblog(payload));
    }

    // console.log("Payload:", payload);
  };

  // Calculate displayed blogs based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(blogList.length / itemsPerPage);

  // Pagination handlers
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handledeleteblog = (blogid) => {
    dispatch(deleteblog(blogid));
    fetchedblog();
  };

  return (
    <section className="flex lg:gap-4">
      <div className="lg:p-10 space-y-6 p-3 w-full bg-white rounded-xl">
        <div className="flex flex-col gap-6 items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl shadow p-4 border border-[#E6E7EA] w-full lg:flex lg:justify-between lg:items-start gap-8 bg-white"
          >
            {/* Left Side */}
            <div className="lg:w-2/3 space-y-4">
              <h3 className="text-secondary text-2xl font-semibold text-center lg:text-left">
                Blog
              </h3>
              <Input
                label="Title"
                placeholder="Enter Title"
                name="title"
                value={formdata.title}
                onChange={handleChange}
              />
              <Textarea
                label="Short Description"
                placeholder="Enter short description"
                name="shortDescription"
                value={formdata.shortDescription}
                onChange={handleChange}
              />
              <Textarea
                label="Content"
                placeholder="Enter full content"
                name="content"
                value={formdata.content}
                onChange={handleChange}
              />
              <Input
                label="SEO Meta Title"
                placeholder="Enter SEO title"
                name="seo.metaTitle"
                value={formdata.seo.metaTitle}
                onChange={handleChange}
              />
              <Textarea
                label="SEO Meta Description"
                placeholder="Enter SEO description"
                name="seo.metaDescription"
                value={formdata.seo.metaDescription}
                onChange={handleChange}
              />
              <div className="flex gap-6">
                <Button
  type="button"
  style="w-full border border-[#E6E7EA]"
  label="Cancel"
  onClick={() =>
    setFormdata({
      title: "",
      shortDescription: "",
      content: "",
      type: "",
      thumbnail: { url: "", publicId: "", alt: "" },
      seo: {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      },
      author: { name: "", designation: "" },
    })
  }
/>

<Button
  type="submit"
  style="bg-[#0070BA] text-white w-full"
  label={blogId ? "Update" : "Submit"}
/>

              </div>
            </div>

            {/* Right Side */}
            <div className="lg:w-1/3 flex flex-col items-center space-y-4">
              <h3 className="text-secondary text-2xl font-semibold text-center">
                Details
              </h3>

              {/* FileUploader */}
              <div className="w-full">
                <FileUploader
                  onSuccess={(fileData) =>
                    setFormdata((prev) => ({
                      ...prev,
                      thumbnail: {
                        url: fileData.image,
                        publicId: fileData.publicId,
                        alt: fileData.alt || "thumbnail",
                      },
                    }))
                  }
                  onDelete={() =>
                    setFormdata((prev) => ({
                      ...prev,
                      thumbnail: { url: "", publicId: "", alt: "" },
                    }))
                  }
                />
              </div>

              {/* Thumbnail Preview */}
              {formdata.thumbnail.url && (
                <img
                  src={formdata.thumbnail.url}
                  alt={formdata.thumbnail.alt}
                  className="w-full h-40 object-cover rounded border"
                />
              )}

              <Select
                label="Type"
                options={["blog", "news", "service", "event"]}
                name="type"
                value={formdata.type}
                onChange={handleChange}
              />
              <Input
                label="SEO Keywords"
                placeholder="Comma separated keywords"
                name="seo.metaKeywords"
                value={formdata.seo.metaKeywords}
                onChange={handleChange}
              />
              <Input
                label="Author Name"
                placeholder="Enter author name"
                name="author.name"
                value={formdata.author.name}
                onChange={handleChange}
              />
              <Input
                label="Author Designation"
                placeholder="Enter author designation"
                name="author.designation"
                value={formdata.author.designation}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        {/* Blog List Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Previous Blogs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-nowrap">
              <thead>
                <tr className="bg-[#f1f4f9] font-semibold text-sm text-gray-600">
                  <th className="px-3 py-2 text-left">Title</th>
                  <th className="px-3 py-2 text-left">Author Name</th>
                  <th className="px-3 py-2 text-left">Content</th>
                  <th className="px-3 py-2 text-left">Thumbnail</th>
                  <th className="px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 text-sm"
                  >
                    <td className="whitespace-nowrap px-3 text-left py-2">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-3 text-left py-2">
                      {item.author?.name || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-3 text-left py-2 line-clamp-1 max-w-xs">
                      {item.content}
                    </td>
                    <td className="whitespace-nowrap px-3 text-left py-2">
                      <img
                        src={item.thumbnail?.url}
                        alt={item.thumbnail?.alt || "thumbnail"}
                        className="w-16 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="flex justify-center gap-3 py-2">
                      <Link
                        href={`/website-content/blog-management/${item._id}`}
                        className="cursor-pointer text-gray-600 hover:text-blue-600"
                      >
                        <i className="ri-edit-box-line ri-xl"></i>
                      </Link>
                      <span className="cursor-pointer text-gray-600 hover:text-blue-600">
                        <i className="ri-git-repository-private-line ri-xl"></i>
                      </span>
                      <span
                        onClick={() => handledeleteblog(item._id)}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-6-line ri-xl"></i>
                      </span>
                    </td>
                  </tr>
                ))}
                {blogList.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No blogs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {blogList.length > itemsPerPage && (
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1
                    ? "cursor-not-allowed text-gray-400 border-gray-300"
                    : "hover:bg-gray-200"
                }`}
              >
                Prev
              </button>
              <span className="px-4 py-2 border rounded bg-gray-100">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-gray-400 border-gray-300"
                    : "hover:bg-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogManagement;
