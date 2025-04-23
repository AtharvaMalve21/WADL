import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Contacts = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-500">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-300">
          Have questions or suggestions? We'd love to hear from you!
        </p>
      </div>

      {/* Contact Form & Info */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 py-10">
        {/* Contact Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Send a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 py-3 text-lg font-medium rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Contact Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail size={24} className="text-blue-500" />
              <span>support@blogify.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={24} className="text-blue-500" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={24} className="text-blue-500" />
              <span>New York, USA</span>
            </div>
          </div>

          {/* Social Media */}
          <h2 className="text-xl font-semibold text-blue-500 mt-6">
            Follow Us
          </h2>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <Facebook size={30} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <Twitter size={30} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <Instagram size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
