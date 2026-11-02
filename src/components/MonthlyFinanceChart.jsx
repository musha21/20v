import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { formatLKR } from '../utils/format'

export default function MonthlyFinanceChart({ data }) {
  return (
    <div className="card-surface rounded-2xl p-4">
      <h3 className="mb-3 font-display text-lg text-pitch-900">Monthly collection vs expenses</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatLKR(value)} />
            <Legend />
            <Bar dataKey="collection" name="Collection" fill="#16a34a" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" name="Expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
