import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Energy Management Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time monitoring and management system</p>
        </div>
      </header>
      

      <main className="max-w-7xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-8 text-center mb-6">
          <h3 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h3>
          <p className="text-gray-400 mb-6">
            Select a module above to get started with monitoring and management
          </p>
        </div>
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/power"
            className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Real-Time Power Flow</h2>
            <p className="text-gray-400">Monitor live power data with interactive charts</p>
          </Link>

          <Link
            href="/alarms"
            className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-orange-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Alarms Management</h2>
            <p className="text-gray-400">View and manage system alarms and events</p>
          </Link>

          <Link
            href="/site/1"
            className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-green-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Site Details</h2>
            <p className="text-gray-400">Energy reports and maintenance tickets</p>
          </Link>
        </nav>

      </main>
    </div>
  );
}