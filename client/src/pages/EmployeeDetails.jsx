import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Building, User, Star, Briefcase, Calendar, Eye, Weight, Droplets, Shield } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';

export default function EmployeeDetails() {
  const { employees } = useEmployeeContext();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Find employee from the employees array instead of fetching
    const foundEmployee = employees.find(emp => emp.id === parseInt(id));
    if (foundEmployee) {
      setUser(foundEmployee);
    }
  }, [id, employees]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'feedback', label: 'Feedback', icon: Star }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-sm">
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full flex-shrink-0"></div>
            <div className="space-y-3 flex-1">
              <div className="h-3 sm:h-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded w-full max-w-32"></div>
              <div className="h-2 sm:h-3 bg-gradient-to-r from-blue-200 to-indigo-200 rounded w-full max-w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-16 sm:-translate-y-24 md:-translate-y-32 translate-x-16 sm:translate-x-24 md:translate-x-32"></div>
          
          <div className="relative flex flex-col items-center gap-4 sm:gap-6 md:gap-8 md:flex-row">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1 shadow-2xl">
                <img 
                  src={user.image} 
                  alt={user.firstName} 
                  className="w-full h-full rounded-full object-cover border-2 sm:border-4 border-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full p-1.5 sm:p-2 shadow-lg">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2 break-words">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600 mb-3 sm:mb-4">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg break-all">{user.email}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg text-xs sm:text-sm">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-medium truncate max-w-32 sm:max-w-none">{user.company.department}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg text-xs sm:text-sm">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-medium truncate max-w-32 sm:max-w-none">{user.company.title}</span>
                </div>
                <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg text-white text-xs sm:text-sm ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                    : 'bg-gradient-to-r from-gray-500 to-gray-600'
                }`}>
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-medium capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl border border-white/20 mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Contact and Address Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
              {/* Contact Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Contact Information</h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/50">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">Phone</p>
                        <p className="text-base sm:text-lg text-slate-800 font-medium break-all">{user.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/50">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">Username</p>
                        <p className="text-base sm:text-lg text-slate-800 font-medium break-all">@{user.username}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Address</h3>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/50">
                    <div className="space-y-2">
                      <p className="text-base sm:text-lg text-slate-800 font-medium break-words">{user.address.address}</p>
                      <p className="text-base sm:text-lg text-slate-700 break-words">{user.address.city}, {user.address.state}</p>
                      <p className="text-base sm:text-lg text-slate-700">{user.address.postalCode}</p>
                      <div className="pt-2 border-t border-slate-200">
                        <p className="text-lg sm:text-xl font-semibold text-slate-800">{user.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-rose-500/5"></div>
              
              <div className="relative">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                      <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">Age</p>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-slate-800">{user.age} years</p>
                    <p className="text-xs sm:text-sm text-slate-600 break-words">Born: {new Date(user.birthDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">Eyes</p>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-slate-800">{user.eyeColor}</p>
                    <p className="text-xs sm:text-sm text-slate-600 break-words">{user.hair.color} {user.hair.type} hair</p>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Weight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                      <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">Physical</p>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-slate-800">{Math.round(user.height)} cm</p>
                    <p className="text-xs sm:text-sm text-slate-600">{Math.round(user.weight)} kg</p>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                      <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">Blood</p>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-slate-800">{user.bloodGroup}</p>
                    <p className="text-xs sm:text-sm text-slate-600">Type</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Rating */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-red-500/5"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-b-2xl sm:rounded-b-3xl"></div>
              
              <div className="relative">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Performance Rating</h3>
                </div>
                
                {/* Current Rating */}
                <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl border border-amber-200/50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg font-medium text-slate-700 mb-3">Current Performance Rating</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                                i < user.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300'
                              } transition-colors`}
                            />
                          ))}
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {user.rating}/5
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 sm:px-4 py-2 rounded-full text-white font-medium text-sm sm:text-base text-center ${
                      user.rating >= 4 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      user.rating >= 3 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                      user.rating >= 2 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                      'bg-gradient-to-r from-red-500 to-pink-600'
                    }`}>
                      {user.rating >= 4 ? 'Outstanding' : 
                       user.rating >= 3 ? 'Good' : 
                       user.rating >= 2 ? 'Satisfactory' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="text-center py-8 sm:py-12">
              <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Projects Information</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 px-4">Project data is not available in the current data source.</p>
              <div className="bg-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md mx-auto">
                <p className="text-xs sm:text-sm text-slate-500 mb-3">Available user data includes:</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs break-words">Department: {user.company.department}</span>
                  <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs break-words">Title: {user.company.title}</span>
                  <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs break-words">Company: {user.company.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="text-center py-8 sm:py-12">
              <Star className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Feedback Information</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 px-4">Detailed feedback data is not available in the current data source.</p>
              <div className="bg-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md mx-auto">
                <p className="text-xs sm:text-sm text-slate-500 mb-3">Current performance indicators:</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          i < user.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-slate-800">{user.rating}/5</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 px-2">
                  {user.rating >= 4 ? 'Outstanding performance across all metrics' : 
                   user.rating >= 3 ? 'Consistently good performance' : 
                   user.rating >= 2 ? 'Meeting expectations satisfactorily' : 'Areas identified for improvement'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}