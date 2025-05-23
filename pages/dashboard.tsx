import React from 'react';
import Link from 'next/link'; // Import Link for client-side navigation

// Assuming these icons are available globally or from a shared component file
// For now, I'll include them here for self-containation, similar to your index.tsx
const ChevronDownIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className} transition-transform duration-300`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const WalletIcon = ({ className = "w-10 h-10 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15m0-3.75v3.75m0 3.75v3.75M21 12c0 1.335-.63 2.597-1.76 3.424M21 12a2.25 2.25 0 0 1-.598 1.48M17.25 10.5a2.25 2.25 0 0 0-2.25 2.25V15m0 0v2.25c0 .621.504 1.125 1.125 1.125H21a2.25 2.25 0 0 0 2.25-2.25V15m-3 0V7.5a2.25 2.25 0 0 0-2.25-2.25H15M4.5 9.75v6.75m0 0H9m-4.5 0A2.25 2.25 0 0 1 2.25 17.25V15m0 0c0-1.335.63-2.597 1.76-3.424M4.5 15a2.25 2.25 0 0 0 .598-1.48M7.5 10.5a2.25 2.25 0 0 0-2.25 2.25V15m0 0v2.25c0 .621.504 1.125 1.125 1.125H9a2.25 2.25 0 0 0 2.25-2.25V15m-4.5 0V7.5a2.25 2.25 0 0 1 2.25-2.25H9M12 21.75V4.5a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 4.5v17.25Z" />
  </svg>
);

const ChartBarIcon = ({ className = "w-10 h-10 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 9.75 19.875V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export default function Dashboard() {
  // You'd typically get user data from your AuthContext here
  const userName = "User"; // Placeholder for now

  const dashboardCards = [
    {
      id: 1,
      title: 'Total Investments',
      value: '$1,250,000', // Placeholder
      icon: WalletIcon,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
    {
      id: 2,
      title: 'Current Earnings',
      value: '$150,000', // Placeholder
      icon: ChartBarIcon,
      color: 'bg-green-100',
      textColor: 'text-green-700',
    },
    {
      id: 3,
      title: 'Active Plans',
      value: '3', // Placeholder
      icon: ChevronDownIcon, // Reusing, consider a distinct icon
      color: 'bg-yellow-100',
      textColor: 'text-yellow-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="mb-8 md:mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800">
          Welcome, {userName}!
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Your AgriVest financial overview.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {dashboardCards.map((card) => (
          <div
            key={card.id}
            className={`p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4 ${card.color}`}
          >
            <div className={`p-3 rounded-full ${card.color.replace('bg-', 'bg-')}`}>
              <card.icon className={`w-8 h-8 ${card.textColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
              <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/plans" legacyBehavior>
            <a className="bg-green-600 text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 shadow-md">
              Explore New Plans
            </a>
          </Link>
          <Link href="/my-investments" legacyBehavior>
            <a className="bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-md">
              View My Investments
            </a>
          </Link>
          {/* Add more actions as needed */}
        </div>
      </section>

      {/* Recent Activity (Placeholder) */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <p className="text-gray-600">No recent activity to display. Make your first investment!</p>
          {/* You would map over actual activity data here */}
        </div>
      </section>
    </div>
  );
}