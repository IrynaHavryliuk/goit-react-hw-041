import { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from 'react-loader-spinner';
import SearchForm from "./components/SearchForm"; // Remove curly braces for default export

const ArticleList = ({ items }) => (
  <ul>
    {items.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchArticlesWithTopic = async (topic) => {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${topic}`
    );
    return response.data.hits;
  };

  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesWithTopic('react'); // Fetch articles on initial render
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && (
        <Audio
          height={80}
          width={80}
          radius={9}
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ textAlign: 'center' }}
          wrapperClass="loader-wrapper"
        />
      )}
      {error && <p>Whoops, something went wrong! Please try again later.</p>} {/* Assuming Error is a built-in component */}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

export default App;
