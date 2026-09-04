import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const investments = [
  { name: 'Oceanview Apartments', type: 'Residential', invested: '$10,000', value: '$11,400', gain: '+14%', dist: '$600', status: 'Active' },
  { name: 'Downtown Commercial Plaza', type: 'Commercial', invested: '$5,000', value: '$5,400', gain: '+8%', dist: '$600', status: 'Active' },
];

function StatCard({ label, value, sub, subGreen = false }: { label: string; value: string; sub: string; subGreen?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-xs font-medium text-gray-500 mb-3">{label}</p>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <p className={`text-xs ${subGreen ? 'text-green' : 'text-gray-400'}`}>{sub}</p>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Invested" value="$15,000" sub="Across 2 properties" />
        <StatCard label="Current Value" value="$16,800" sub="+12% overall return" subGreen />
        <StatCard label="Total Distributions" value="$1,200" sub="Lifetime earnings" />
      </div>

      {/* Investments table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">My Investments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-gray-50">
                {['Property', 'Type', 'Invested', 'Current Value', 'Return', 'Distributions', 'Status'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 tracking-wide uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.name} className="border-t border-gray-100">
                  <td className="px-4 py-3.5 text-sm font-semibold text-navy">{inv.name}</td>
                  <td className="px-4 py-3.5">
                    <span className="bg-light-blue text-medium-blue px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {inv.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{inv.invested}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">{inv.value}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-green">{inv.gain}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{inv.dist}</td>
                  <td className="px-4 py-3.5">
                    <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {inv.status}
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
