import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import Charts from './components/Charts'
import QuestionList from './components/QuestionList'

//decode HTML stuff from OpenTDB
const decodeHtml = (html) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export default function App(){
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    const cached = sessionStorage.getItem('trivia_questions_v1')
    if (cached) {
      const parsed = JSON.parse(cached)
      setQuestions(parsed)
      setLoading(false)
      return
    }
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=50')
        const json = await res.json()
        if (json.response_code !== 0) throw new Error('API returned error code ' + json.response_code)
        const decoded = json.results.map((q, idx) => ({
          id: idx + 1,
          category: decodeHtml(q.category),
          type: q.type,
          difficulty: q.difficulty,
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(a => decodeHtml(a))
        }))
        setQuestions(decoded)
        sessionStorage.setItem('trivia_questions_v1', JSON.stringify(decoded))
      } catch (err) {
        console.error(err)
        setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const categories = useMemo(() => {
    const set = new Set(questions.map(q => q.category))
    return Array.from(set).sort()
  }, [questions])

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) return prev.filter(c => c !== cat)
      return [...prev, cat]
    })
  }

  const filtered = useMemo(() => {
    let list = questions
    if (selectedCategories.length > 0) {
      list = list.filter(q => selectedCategories.includes(q.category))
    }
    if (search.trim() !== '') {
      const s = search.toLowerCase()
      list = list.filter(q => q.question.toLowerCase().includes(s) || q.correct_answer.toLowerCase().includes(s))
    }
    return list
  }, [questions, selectedCategories, search])

  return (
    <div className="app">
      <Header title="Trivia Train" subtitle="Explore 50 questions from Open Trivia DB" />
      <main className="container">
        <section className="controls">
          <Filters
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            search={search}
            setSearch={setSearch}
            reset={() => { setSelectedCategories([]); setSearch('') }}
          />
        </section>

        {loading ? (
          <div className="center">Loading questions…</div>
        ) : error ? (
          <div className="center error">Error: {error}</div>
        ) : (
          <>
            <section className="charts">
              <Charts questions={filtered} allQuestions={questions} />
            </section>

            <section className="list">
              <QuestionList questions={filtered} />
            </section>
          </>
        )}
      </main>
      <footer className="footer">
        <small>Built for JetBrains internship task • Data from: Open TriviaDB </small>
      </footer>
    </div>
  )
}
