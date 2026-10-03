function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <label className="category-select-wrap">
      <span className="visually-hidden">Filter by genre</span>
      <select
        className="category-select"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <span className="select-chevron" aria-hidden="true">⌄</span>
    </label>
  )
}

export default CategoryFilter