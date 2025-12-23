import Link from 'next/link';
import AlarmsTable from '@/components/Alarms/AlarmsTable';

export default function AlarmsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Alarms Management</h1>
            <p className="text-gray-400 mt-1">Monitor and manage system alarms and events</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <AlarmsTable />
      </main>
    </div>
  );
}