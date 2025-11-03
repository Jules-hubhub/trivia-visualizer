import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#1b5e20', '#2e7d32', '#388e3c', '#4caf50', '#66bb6a', '#81c784', '#a5d6a7']

export default function Charts({questions, allQuestions}){

  const byCategory = useMemo(() => {
    const map = new Map()
    (questions || []).forEach(q => {
      map.set(q.category, (map.get(q.category) || 0) + 1)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [questions])

  const byDifficulty = useMemo(() => {
    const levels = ['easy', 'medium', 'hard']
    return levels.map(lvl => ({
      name: lvl,
      value: (questions || []).filter(q => q.difficulty === lvl).length
    }))
  }, [questions])

  const overallByCategory = useMemo(() => {
    const map = new Map()
    (allQuestions || []).forEach(q => {
      map.set(q.category, (map.get(q.category) || 0) + 1)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [allQuestions])

  return (
    <div className="charts-grid">
      <div className="card">
        <h3>Questions by category (filtered)</h3>
        {byCategory.length === 0 ? <p className="muted">No questions match the filter.</p> : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byCategory}>
              <XAxis dataKey="name" tick={{fontSize:12}} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {
                  byCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="card">
        <h3>Questions by difficulty (filtered)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={byDifficulty} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {byDifficulty.map((entry, index) => (
                <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>All questions (original dataset)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={overallByCategory}>
            <XAxis dataKey="name" tick={{fontSize:12}} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2e7d32" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
