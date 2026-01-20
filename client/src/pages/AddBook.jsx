import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const AddBook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [ formData, setFormData ] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    categories: [],
    coverImage: "",
  });

  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("author", formData.author);
    form.append("price", formData.price);
    form.append("categories", formData.categories);
    form.append("coverImage", fileRef.current.files[0]);

    try {
      await api.post("/books/add", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("New Book added!")
    } catch (error) {
      console.error(error);
      if (error.status) {
        toast.error("Book with that title already exist!");
      } else {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categories") {
      let categories = value.split(",");

      setFormData((prev) => ({
        ...prev,
        [name]: categories.map((category) => category.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectFile = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  if (user === undefined || user === null) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50 dark:kbg-gray-900 px-4 py-12">
      { user?.isAdmin ? (
        <div className="w-full max-w-lg bg-white dark:kbg-gray-800 shadow-xl rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:ktext-white">
            Add a New Book
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 dark:ktext-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:kbg-gray-700 dark:kborder-gray-600 dark:ktext-white"
                placeholder="Enter book title"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:ktext-gray-300 mb-1">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:kbg-gray-700 dark:kborder-gray-600 dark:ktext-white"
                placeholder="Enter author name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:ktext-gray-300 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:kbg-gray-700 dark:kborder-gray-600 dark:ktext-white"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:ktext-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:kbg-gray-700 dark:kborder-gray-600 dark:ktext-white"
                placeholder="Write a short description"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 dark:ktext-gray-300 mb-1">
                Category
              </label>
              <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:kbg-gray-700 dark:kborder-gray-600 dark:ktext-white"
                placeholder='e.g. "Fantasy, Adventure"'
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 dark:ktext-gray-300 mb-1">
                Cover URL
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleChange}
                  ref={fileRef}
                  className="hidden"
                />
                <button
                  onClick={handleSelectFile}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:kbg-gray-700 dark:kborder-gray-600 dark:ktext-white text-left"
                >
                  {formData.coverImage || "Choose file"}
                </button>
                <button
                  className="absolute right-2 top-2 text-xs bg-gray-100 border px-1 py-1 rounded-md cursor-pointer"
                  onClick={handleSelectFile}
                >
                  Select File
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full text-white py-2.5 rounded-lg font-medium transition-all duration-200 ${ isLoading ? "cursor-no-drop bg-indigo-400" : "cursor-pointer bg-indigo-600 hover:bg-indigo-700" }`}
            >
              { isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <div>Your not allowed</div>
      )}
    </main>
  );
};

export default AddBook;
