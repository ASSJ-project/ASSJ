function ParentComponent() {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  return (
    <div>
      <CategoryDropdown
        selectedSubcategory={selectedSubcategory}
        onSubcategoryChange={handleSubcategoryChange}
      />
      <p>Selected subcategory: {selectedSubcategory}</p>
    </div>
  );
}

export default ParentComponent;
