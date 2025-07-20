import { Link } from "react-router-dom";
import { useState } from "react";
import { useBookmarks } from "../context/BookmarkContext";

const EmployeeCard = ({ user }) => {
  const { addBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    addBookmark(user);
    setBookmarked(true);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100 hover:border-emerald-200 overflow-hidden">
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 to-teal-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <img 
              src={user.image} 
              alt={user.firstName} 
              className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:shadow-xl ring-2 ring-gray-100 group-hover:ring-emerald-200 transition-all duration-300" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 truncate">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="text-center bg-gray-50 group-hover:bg-emerald-50 rounded-xl p-3 transition-colors duration-300">
            <p className="text-xs text-emerald-600 uppercase tracking-wide font-semibold mb-1">Age</p>
            <p className="text-2xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">{user.age}</p>
          </div>
          <div className="text-center bg-gray-50 group-hover:bg-emerald-50 rounded-xl p-3 transition-colors duration-300">
            <p className="text-xs text-emerald-600 uppercase tracking-wide font-semibold mb-1">Department</p>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 truncate transition-colors duration-300">{user.company.department}</p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1 bg-gray-50 group-hover:bg-amber-50 rounded-xl p-3 transition-colors duration-300">
            {Array.from({ length: user.rating }).map((_, i) => (
              <span 
                key={i} 
                className="text-lg text-amber-400 group-hover:text-amber-500 transition-all duration-200 group-hover:scale-110"
              >
                ⭐
              </span>
            ))}
            <span className="ml-2 text-sm font-semibold text-gray-600 group-hover:text-amber-600 transition-colors duration-300">
              {user.rating}/5
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link 
            to={`/employee/${user.id}`} 
            className="flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>
          
          <button 
            onClick={handleBookmarkClick}
            className={`flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 ${
              bookmarked 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white' 
                : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white'
            }`}
          >
            <svg className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;