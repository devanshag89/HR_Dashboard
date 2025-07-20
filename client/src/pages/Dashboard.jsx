import { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import { useSearch } from '../hooks/useSearch'; // Import your custom hook

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the custom search hook
  const {
    searchTerm,
    departmentFilters,
    ratingFilters,
    filteredData,
    departments,
    ratings,
    setSearchTerm,
    toggleDepartmentFilter,
    toggleRatingFilter,
    clearFilters,
    activeFiltersCount
  } = useSearch(users, ['firstName', 'lastName', 'email', 'company.department']);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const modified = data.users.map(user => ({
          ...user,
          rating: Math.ceil(Math.random() * 5) // mock performance
        }));
        setUsers(modified);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-blue-600">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Clear Filters Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-4">
          {/* Department Filter */}
          <div className="relative">
            <div className="group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Department
                {departmentFilters.length > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                    {departmentFilters.length}
                  </span>
                )}
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-10">
                <div className="p-2 max-h-60 overflow-y-auto">
                  {departments.map(department => (
                    <label key={department} className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={departmentFilters.includes(department)}
                        onChange={() => toggleDepartmentFilter(department)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 truncate">{department}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="relative">
            <div className="group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Rating
                {ratingFilters.length > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                    {ratingFilters.length}
                  </span>
                )}
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-10">
                <div className="p-2">
                  {ratings.map(rating => (
                    <label key={rating} className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ratingFilters.includes(rating)}
                        onChange={() => toggleRatingFilter(rating)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({rating})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-blue-600">{filteredData.length}</span> of <span className="font-semibold">{users.length}</span> employees
        </p>
      </div>

      {/* Employee Cards Grid */}
      {filteredData.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map(user => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}