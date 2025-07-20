import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEmployeeContext } from '../context/EmployeeContext';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const { employees } = useEmployeeContext();
  console.log(employees);

  // Calculate average rating by department
  const calculateDepartmentAverages = () => {
    if (!employees || employees.length === 0) return { labels: [], data: [], counts: [] };

    const departmentData = {};

    employees.forEach(employee => {
      if (employee.company && employee.company.department && employee.rating) {
        const dept = employee.company.department;
        
        if (!departmentData[dept]) {
          departmentData[dept] = { totalRating: 0, count: 0 };
        }
        
        departmentData[dept].totalRating += employee.rating;
        departmentData[dept].count += 1;
      }
    });

    const labels = Object.keys(departmentData);
    const data = labels.map(dept => 
      Math.round((departmentData[dept].totalRating / departmentData[dept].count) * 10) / 10
    );
    const counts = labels.map(dept => departmentData[dept].count);

    return { labels, data, counts };
  };

  const { labels, data, counts } = calculateDepartmentAverages();

  // Generate dynamic colors for departments
  const generateColors = (count) => {
    const baseColors = [
      '#3b82f6', // Blue
      '#10b981', // Emerald
      '#f59e0b', // Amber
      '#ef4444', // Red
      '#8b5cf6', // Purple
      '#06b6d4', // Cyan
      '#84cc16', // Lime
      '#f97316', // Orange
      '#ec4899', // Pink
      '#6366f1'  // Indigo
    ];
    
    return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
  };

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Average Rating',
      data: data,
      backgroundColor: generateColors(labels.length).map(color => color + '80'), // Add transparency
      borderColor: generateColors(labels.length),
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: (context) => `${context[0].label} Department`,
          label: (context) => {
            const deptIndex = context.dataIndex;
            const employeeCount = counts[deptIndex];
            return [
              `Average Rating: ${context.parsed.y}/5`,
              `Employees: ${employeeCount}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
            weight: '500'
          },
          callback: function(value) {
            return value + '/5';
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
            weight: '600'
          },
          maxRotation: 45,
          minRotation: 0
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Data Available</h3>
              <p className="text-slate-600">Please load employee data to view analytics.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (labels.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Invalid Data</h3>
              <p className="text-slate-600">Employee data is missing department or rating information.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalEmployees = employees.length;
  const overallAverage = Math.round((data.reduce((a, b) => a + b, 0) / data.length) * 10) / 10;
  const topDepartment = labels[data.indexOf(Math.max(...data))];
  const topRating = Math.max(...data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                  Performance Analytics
                </h1>
                <p className="text-slate-600">Department-wise performance overview</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Total Employees</p>
                    <p className="text-2xl font-bold text-blue-800">{totalEmployees}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200/50">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Overall Average</p>
                    <p className="text-2xl font-bold text-emerald-800">{overallAverage}/5</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/50">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-600 uppercase tracking-wide">Top Department</p>
                    <p className="text-lg font-bold text-amber-800">{topDepartment}</p>
                    <p className="text-sm text-amber-700">{topRating}/5 Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 via-blue-500/5 to-indigo-500/5"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-3 rounded-2xl shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Average Performance by Department</h2>
            </div>

            <div className="h-96">
              <Bar data={chartData} options={options} />
            </div>

            {/* Department Summary */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {labels.map((dept, index) => (
                <div key={dept} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: generateColors(labels.length)[index] }}
                    ></div>
                    <p className="font-semibold text-slate-800">{dept}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">{counts[index]} employees</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      data[index] >= 4 ? 'bg-green-100 text-green-700' :
                      data[index] >= 3 ? 'bg-blue-100 text-blue-700' :
                      data[index] >= 2 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {data[index]}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}