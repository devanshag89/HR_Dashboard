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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded w-32"></div>
              <div className="h-3 bg-gradient-to-r from-blue-200 to-indigo-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1 shadow-2xl">
                <img 
                  src={user.image} 
                  alt={user.firstName} 
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full p-2 shadow-lg">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600 mb-4">
                <Mail className="w-4 h-4" />
                <span className="text-lg">{user.email}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium">{user.company.department}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <Building className="w-4 h-4" />
                  <span className="font-medium">{user.company.title}</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-white ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                    : 'bg-gradient-to-r from-gray-500 to-gray-600'
                }`}>
                  <Shield className="w-4 h-4" />
                  <span className="font-medium capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Contact and Address Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Contact Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                      <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Phone</p>
                        <p className="text-lg text-slate-800 font-medium">{user.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                      <User className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Username</p>
                        <p className="text-lg text-slate-800 font-medium">@{user.username}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-2xl shadow-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Address</h3>
                  </div>
                  
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                    <div className="space-y-2">
                      <p className="text-lg text-slate-800 font-medium">{user.address.address}</p>
                      <p className="text-lg text-slate-700">{user.address.city}, {user.address.state}</p>
                      <p className="text-lg text-slate-700">{user.address.postalCode}</p>
                      <div className="pt-2 border-t border-slate-200">
                        <p className="text-xl font-semibold text-slate-800">{user.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-rose-500/5"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded-2xl shadow-lg">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Age</p>
                    </div>
                    <p className="text-xl font-bold text-slate-800">{user.age} years</p>
                    <p className="text-sm text-slate-600">Born: {new Date(user.birthDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Eye className="w-5 h-5 text-green-600" />
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Eyes</p>
                    </div>
                    <p className="text-xl font-bold text-slate-800">{user.eyeColor}</p>
                    <p className="text-sm text-slate-600">{user.hair.color} {user.hair.type} hair</p>
                  </div>
                  
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Weight className="w-5 h-5 text-blue-600" />
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Physical</p>
                    </div>
                    <p className="text-lg font-bold text-slate-800">{Math.round(user.height)} cm</p>
                    <p className="text-sm text-slate-600">{Math.round(user.weight)} kg</p>
                  </div>
                  
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Droplets className="w-5 h-5 text-red-600" />
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Blood</p>
                    </div>
                    <p className="text-xl font-bold text-slate-800">{user.bloodGroup}</p>
                    <p className="text-sm text-slate-600">Type</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Rating */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-red-500/5"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-b-3xl"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-3 rounded-2xl shadow-lg">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Performance Rating</h3>
                </div>
                
                {/* Current Rating */}
                <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-slate-700 mb-2">Current Performance Rating</p>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-8 h-8 ${
                                i < user.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300'
                              } transition-colors`}
                            />
                          ))}
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {user.rating}/5
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-white font-medium ${
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
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Projects Information</h3>
              <p className="text-slate-600 mb-6">Project data is not available in the current data source.</p>
              <div className="bg-slate-100 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-sm text-slate-500">Available user data includes:</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Department: {user.company.department}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Title: {user.company.title}</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Company: {user.company.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Feedback Information</h3>
              <p className="text-slate-600 mb-6">Detailed feedback data is not available in the current data source.</p>
              <div className="bg-slate-100 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-sm text-slate-500 mb-3">Current performance indicators:</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < user.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-slate-800">{user.rating}/5</span>
                </div>
                <p className="text-sm text-slate-600">
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