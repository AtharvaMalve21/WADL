import { Link } from "react-router-dom";
import { BookOpen, Users, Lock, Pencil } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-500">Welcome to Blogify</h1>
        <p className="mt-4 text-lg text-gray-300">
          Blogify is a platform where passionate writers and readers come
          together. Share your thoughts, tell your stories, and engage with a
          community that values ideas.
        </p>
        <Link
          to="/users/blogs"
          className="mt-6 inline-block bg-blue-600 px-6 py-3 text-lg font-medium rounded-md hover:bg-blue-700 transition"
        >
          Explore Blogs
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        {/* Feature 1 */}
        <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
          <Pencil size={40} className="text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Write & Share</h2>
          <p className="text-gray-400 mt-2">
            Express your thoughts through blogs and share them with the world.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
          <BookOpen size={40} className="text-green-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Read & Discover</h2>
          <p className="text-gray-400 mt-2">
            Explore insightful blogs on various topics from different writers.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
          <Users size={40} className="text-yellow-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Community Driven</h2>
          <p className="text-gray-400 mt-2">
            Engage with other writers, comment, and share ideas.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
          <Lock size={40} className="text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Secure & Private</h2>
          <p className="text-gray-400 mt-2">
            Your data and blogs are safe with our secure platform.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Ready to Start Blogging?</h2>
        <Link
          to="/register"
          className="mt-4 inline-block bg-blue-600 px-6 py-3 text-lg font-medium rounded-md hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default About;
