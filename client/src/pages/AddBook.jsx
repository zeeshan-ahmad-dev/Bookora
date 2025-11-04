import React from "react";
import { useState } from "react";
import { useRef } from "react";
import api from "../api";

const AddBook = () => {
  const [formData, setFormData] = useState({
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

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("author", formData.author);
    form.append("price", formData.price);
    form.append("categories", formData.categories);
    form.append("coverImage", fileRef.current.files[0]);

    try {
      const response = await api.post("/books/add", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categories") {
      let categories = value.split(",");

      setFormData((prev) => ({
        ...prev,
        [name]: categories.map((category, _) => category.trim()),
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
  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          Add a New Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter book title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter author name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Write a short description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.categories}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder='e.g. "Fantasy, Adventure"'
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white text-left"
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddBook;
