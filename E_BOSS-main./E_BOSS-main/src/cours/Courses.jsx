import React from 'react';
import { useTheme } from '../../context/theme-context';
import DashboardNavbar from './dashboard-navbar';
import Sidebar from './sidebar';
import Footer from '../footer';
import { useState } from 'react';

const Courses = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const courses = [
    { id: 1, title: 'React Avancé', status: 'En cours' },
    { id: 2, title: 'Node.js et Express', status: 'Terminé' },
    { id: 3, title: 'Tailwind CSS', status: 'En cours' },
  ];

  return (
    <>
      <DashboardNavbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
        <div className={`h-[calc(100vh-4rem)] p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Mes Cours
          </h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`p-4 rounded-lg border ${
                  theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}
              >
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {course.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {course.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Courses;
