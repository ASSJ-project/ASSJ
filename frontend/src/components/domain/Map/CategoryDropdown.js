import React, { useState } from 'react';
import data from './job_code.json';

const CategoryDropdown = () => {
  const [categories, setItems] = useState(data);

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const selectedCategoryObj = categories.find(
    (category) => category.id === selectedCategory
  );

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map(
          (category) => (
            console.log(category),
            (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          )
        )}
      </select>

      {selectedCategoryObj && (
        <div>
          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
          >
            <option value="">Select a subcategory</option>
            {selectedCategoryObj.subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.subcategories}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
