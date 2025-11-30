import { FilterState } from "../types";

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const Filters = ({ filters, onFiltersChange }: FiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={filters.jobType}
            onChange={(e) =>
              onFiltersChange({ ...filters, jobType: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remote
          </label>
          <select
            value={
              filters.remote === null ? "" : filters.remote ? "true" : "false"
            }
            onChange={(e) => {
              const value = e.target.value;
              onFiltersChange({
                ...filters,
                remote: value === "" ? null : value === "true",
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="true">Remote Only</option>
            <option value="false">On-site Only</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Salary
          </label>
          <input
            type="text"
            placeholder="e.g., 80000"
            value={filters.salaryMin}
            onChange={(e) =>
              onFiltersChange({ ...filters, salaryMin: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() =>
            onFiltersChange({
              search: "",
              location: "",
              jobType: "",
              remote: null,
              salaryMin: "",
            })
          }
          className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
