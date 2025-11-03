import React from 'react'

export default function Header({title, subtitle}){
  return (
    <header className="header">
      <div className="brand">
        <div className="logo" aria-hidden="true">🚆</div>
        <div>
          <h1>{title}</h1>
          <p className="muted">{subtitle}</p>
        </div>
      </div>
    </header>
  )
}
