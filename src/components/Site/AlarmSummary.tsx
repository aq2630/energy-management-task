interface AlarmSummaryProps {
    siteDown: number;
    critical: number;
    major: number;
    minor: number;
  }
  
  export default function AlarmSummary({ siteDown, critical, major, minor }: AlarmSummaryProps) {
    const summaryItems = [
      { label: 'Site Down', count: siteDown, color: 'bg-red-900 text-red-200' },
      { label: 'Critical', count: critical, color: 'bg-red-700 text-white' },
      { label: 'Major', count: major, color: 'bg-orange-600 text-white' },
      { label: 'Minor', count: minor, color: 'bg-yellow-600 text-white' },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {summaryItems.map((item) => (
          <div key={item.label} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-gray-400 text-sm mb-2">{item.label}</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-white">{item.count}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${item.color}`}>
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }