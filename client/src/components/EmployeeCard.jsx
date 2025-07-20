import { Link } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext";

const EmployeeCard = ({ user }) => {
  const { addBookmark } = useBookmarks();

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100 hover:border-blue-200 overflow-hidden">
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img 
              src={user.image} 
              alt={user.firstName} 
              className="w-16 h-16 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all duration-300" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 truncate">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="text-center">
            <p className="text-xs text-blue-600 uppercase tracking-wide font-medium mb-1">Age</p>
            <p className="text-2xl font-bold text-gray-900">{user.age}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-600 uppercase tracking-wide font-medium mb-1">Department</p>
            <p className="text-lg font-semibold text-blue-700 truncate">{user.company.department}</p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: user.rating }).map((_, i) => (
              <span 
                key={i} 
                className="text-lg text-yellow-400 transition-all duration-200"
              >
                ⭐
              </span>
            ))}
            <span className="ml-2 text-sm font-medium text-blue-600">
              {user.rating}/5
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Link 
            to={`/employee/${user.id}`} 
            className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>
          
          <button 
            onClick={() => addBookmark(user)} 
            className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Save
          </button>
          
          <button className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Promote
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;