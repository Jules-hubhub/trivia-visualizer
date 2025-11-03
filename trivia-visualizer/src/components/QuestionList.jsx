import React from 'react'

export default function QuestionList({questions}){
  if (!questions || questions.length === 0) return <div className="muted">No questions to show.</div>

  return (
    <div className="questions">
      <h3>Questions ({questions.length})</h3>
      <ul>
        {questions.map(q => (
          <li key={q.id} className="question">
            <div className="q-meta">
              <strong className="q-cat">{q.category}</strong>
              <span className="q-difficulty">{q.difficulty}</span>
            </div>
            <div className="q-text">{q.question}</div>
            <details>
              <summary>Show answers</summary>
              <div className="answers">
                <div><strong>Correct:</strong> {q.correct_answer}</div>
                <div><strong>Incorrect:</strong>
                  <ul>
                    {q.incorrect_answers.map((a,i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}
