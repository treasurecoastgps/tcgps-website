import React from 'react';

const rows = [
  { period: 'Q1 2025', property: 'Oceanview Apartments', amount: '$600', date: 'Apr 1, 2025', method: 'ACH', status: 'Paid' },
  { period: 'Q4 2024', property: 'Oceanview Apartments', amount: '$600', date: 'Jan 2, 2025', method: 'ACH', status: 'Paid' },
  { period: 'Q4 2024', property: 'Downtown Commercial Plaza', amount: '$350', date: 'Jan 2, 2025', method: 'ACH', status: 'Paid' },
  { period: 'Q2 2025', property: 'Downtown Commercial Plaza', amount: '$375', date: 'Jul 1, 2025', method: 'ACH', status: 'Upcoming' },
];

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-xs font-medium text-gray-500 mb-3">{label}</p>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

export default function Distributions() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Received" value="$1,550" sub="Lifetime distributions" />
        <StatCard label="YTD Distributions" value="$600" sub="January–April 2025" />
        <StatCard label="Next Distribution" value="Jul 1, 2025" sub="Estimated $375" />
      </div>

      {/* Distribution history table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Distribution History</h3>
          <button className="border border-gray-200 rounded-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-50">
                {['Period', 'Property', 'Amount', 'Date', 'Method', 'Status'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 tracking-wide uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-700">{r.period}</td>
                  <td className="px-4 py-3.5 text-sm text-navy">{r.property}</td>
                  <td className="px-4 py-3.5 text-sm font-bold text-gray-900">{r.amount}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{r.date}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{r.method}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      r.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
