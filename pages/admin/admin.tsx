import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth'; // Only import onAuthStateChanged
import { auth } from '../../lib/firebase'; // <--- Change: Import 'auth' directly
import Link from 'next/link'; // Import Link for internal navigation

// Icons for Admin Dashboard
const UsersIcon = ({ className = "w-10 h-10 text-blue-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.125A7.5 7.5 0 0 0 12 9.75a7.5 7.5 0 0 0-3 9.375m9 0V17.25a2.25 2.25 0 0 0-2.25-2.25H15M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-9 6.75a3 3 0 1 1 6 0v.75a6 6 0 0 1-6 6v-.75ZM21 16.5a3 3 0 1 0-6 0v.75a6 6 0 0 0 6 6v-.75Z" />
  </svg>
);

const PlansIcon = ({ className = "w-10 h-10 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const ReportsIcon = ({ className = "w-10 h-10 text-purple-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);


const AdminDashboard = () => {
  const router = useRouter();
  // const auth = getAuth(firebaseApp); // <--- Original line
  // The 'auth' object is already initialized and exported from firebase.ts
  // So, we just import it directly from the firebase config file.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // <--- Use 'auth' directly
      // You might want to check if the user is an actual admin here
      // e.g., by checking a custom claim or a document in Firestore
      if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
      }
      // Add more sophisticated admin check if needed
    });

    return () => unsubscribe();
  }, [router]); // 'auth' doesn't need to be in dependency array if it's a constant export

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 p-6 shadow-xl text-white md:min-h-screen">
        <h2 className="text-3xl font-bold mb-10 text-green-400">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin/admin" legacyBehavior>
            <a className={`block py-2 px-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors ${router.pathname === '/admin/admin' ? 'bg-gray-700 text-green-400' : 'text-gray-200'}`}>
              Dashboard
            </a>
          </Link>
          <Link href="/admin/plans" legacyBehavior>
            <a className={`block py-2 px-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors ${router.pathname === '/admin/plans' ? 'bg-gray-700 text-green-400' : 'text-gray-200'}`}>
              Investment Plans
            </a>
          </Link>
          <Link href="/admin/users" legacyBehavior>
            <a className={`block py-2 px-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors ${router.pathname === '/admin/users' ? 'bg-gray-700 text-green-400' : 'text-gray-200'}`}>
              Users
            </a>
          </Link>
          <Link href="/admin/settings" legacyBehavior>
            <a className={`block py-2 px-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors ${router.pathname === '/admin/settings' ? 'bg-gray-700 text-green-400' : 'text-gray-200'}`}>
              Settings
            </a>
          </Link>
          {/* Add a logout link */}
          <button
            onClick={() => auth.signOut().then(() => router.push('/login'))}
            className="w-full text-left py-2 px-3 rounded-lg text-lg font-medium text-red-400 hover:bg-gray-700 transition-colors mt-6"
          >
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">Welcome, Admin!</h1>
        <p className="text-lg text-gray-700 mb-10">
          This dashboard provides an overview and management tools for the AgriVest platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-100">
              <UsersIcon className="w-8 h-8 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
              <p className="text-2xl font-bold text-blue-700">1,234</p> {/* Placeholder data */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <PlansIcon className="w-8 h-8 text-green-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Active Plans</h3>
              <p className="text-2xl font-bold text-green-700">15</p> {/* Placeholder data */}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-purple-100">
              <ReportsIcon className="w-8 h-8 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Investments Made</h3>
              <p className="text-2xl font-bold text-purple-700">5,678</p> {/* Placeholder data */}
            </div>
          </div>
        </div>
        {/* More admin sections/widgets can be added here */}
      </main>
    </div>
  );
};

export default AdminDashboard;