import { Search } from "lucide-react";
import { FilterState } from "../types";

interface SearchBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const SearchBar = ({ filters, onFiltersChange }: SearchBarProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              onFiltersChange({ ...filters, location: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent md:w-48"
          />
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
