import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Analytics from './pages/Analytics';
import BookMarks from './pages/BookMarks';
import Dashboard from './pages/Dashboard';
import EmployeeDetails from './pages/EmployeeDetails';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookmarks" element={<BookMarks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
