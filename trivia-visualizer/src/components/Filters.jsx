import React from 'react'

export default function Filters({categories, selectedCategories, toggleCategory, search, setSearch, reset}){
  return (
    <div className="filters">
      <div className="search-row">
        <input
          aria-label="Search questions"
          placeholder="Search questions or answers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={reset}>Reset</button>
      </div>

      <div className="cats">
        <div className="cats-title">Filter by categories (multi-select)</div>
        <div className="cat-list">
          {categories.map(cat => {
            const checked = selectedCategories.includes(cat)
            return (
              <label key={cat} className={`cat-item ${checked ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
