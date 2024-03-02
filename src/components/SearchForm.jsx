export const SearchForm = ({ onSearch }) => {
  
	const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
	const topic = form.elements.topic.value;
    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" placeholder="Search articles..." />
      <button>Search</button>
    </form>
  );
};

export default SearchForm;