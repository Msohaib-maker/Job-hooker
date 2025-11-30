import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
              upHunt
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Jobs
            </Link>
            <a
              href="#"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Companies
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
