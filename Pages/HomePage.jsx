import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [loading, setLoading] = useState(true);
  let [q, setQ] = useState("");
  let [language, setLanguage] = useState("");
  let [searchParam, setSearchParam] = useSearchParams();

  async function getNews() {
    try {
      setLoading(true);
      let response = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&language=${language}&sortBy=publishedAt&apiKey=0fb0536313d548eca8a8f4eca4d4f3ed`
      );
      let data = await response.json();

      if (data.status === "ok") {
        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
      }
    } catch (err) {
      console.error("News API error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNews();
  }, [q, language]);

  useEffect(() => {
    setQ(searchParam.get("q") ?? "All");
    setLanguage(searchParam.get("language") ?? "hi");
  }, [searchParam]);

  // ✅ INLINE NewsItem Component (no separate import needed)
  function NewsItem({ source, author, title, description, url, urlToImage, publishedAt }) {
    return (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100"> {/* ✅ className (not classNamme) */}
          {urlToImage && (
            <img src={urlToImage} className="card-img-top" alt={title} style={{ height: '200px', objectFit: 'cover' }} />
          )}
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="text-muted">
              <small>{source} | {new Date(publishedAt).toLocaleDateString()}</small>
            </p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h2>Articles ({totalResults})</h2>

      {loading && <div className="text-center py-5">Loading articles...</div>}

      <div className="row">
        {articles.map((item, index) => (
          <NewsItem
            key={item.url || index}
            source={item.source?.name || "Unknown"}
            author={item.author || "Unknown"}
            title={item.title || ""}
            description={item.description || ""}
            url={item.url}
            urlToImage={item.urlToImage}
            publishedAt={item.publishedAt}
          />
        ))}
      </div>
    </div>
  );
}
