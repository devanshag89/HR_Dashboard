import { useBookmarks } from '../context/BookmarkContext';
import EmployeeCard from '../components/EmployeeCard';
import { Bookmark, BookmarkX, Heart, Trash2 } from 'lucide-react';

export default function BookMarks() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-indigo-500/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-200/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-2xl shadow-lg">
                <Bookmark className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                  My Bookmarks
                </h1>
                <p className="text-slate-600">Your saved employee profiles</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 rounded-full border border-pink-200/50">
                <Heart className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-pink-700">
                  {bookmarks.length} {bookmarks.length === 1 ? 'Bookmark' : 'Bookmarks'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {bookmarks.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BookmarkX className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No Bookmarks Yet</h3>
              <p className="text-slate-600 mb-6">
                Start exploring employee profiles and bookmark your favorites to see them here.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                <p className="text-sm text-blue-700 font-medium mb-2">💡 Quick Tip</p>
                <p className="text-sm text-blue-600">
                  Click the bookmark icon on any employee card to add them to your favorites!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map(user => (
              <div 
                key={user.id} 
                className="relative group bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Remove button - Larger hover area to prevent blinking */}
                <div className="absolute top-2 right-2 z-10 p-2">
                  <button
                    onClick={() => removeBookmark(user.id)}
                    className="bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bookmark indicator */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full shadow-lg">
                  <Bookmark className="w-4 h-4 fill-current" />
                </div>

                {/* Employee Card Content */}
                <div className="relative">
                  <EmployeeCard user={user} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info */}
        {bookmarks.length > 0 && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-xl">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {bookmarks.length} Bookmarked {bookmarks.length === 1 ? 'Employee' : 'Employees'}
                  </p>
                  <p className="text-sm text-slate-600">
                    Manage your favorite employee profiles
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">
                  Hover over cards to remove bookmarks
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}