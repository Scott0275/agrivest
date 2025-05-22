import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../../firebase'; // adjust this if your firebase file is named differently

const AdminDashboard = () => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin/admin" className="text-blue-600 hover:underline">Dashboard</a>
          <a href="/admin/plans" className="text-blue-600 hover:underline">Investment Plans</a>
          <a href="#" className="text-blue-600 hover:underline">Users</a>
          <a href="#" className="text-blue-600 hover:underline">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Welcome, Admin</h1>
        <p className="text-gray-700 mb-6">
          This dashboard allows you to manage core platform features.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">👥 Users</div>
          <div className="bg-white p-4 rounded-lg shadow-md">💼 Plans</div>
          <div className="bg-white p-4 rounded-lg shadow-md">📈 Reports</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
