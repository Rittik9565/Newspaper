import React, { useState, useEffect, use } from "react";
import { useSearchParams, Link } from "react-router-dom";  

export default function Navbar() {

  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);

  let [q, setQ] = useState("");                    
  let [language, setLanguage] = useState("");      
  let [searchParam, setSearchParam] = useSearchParams();  

  let [search, setSearch] = useState("");

  useEffect(() => { 
    setQ(searchParam.get("q") ?? "All");
    setLanguage(searchParam.get("language") ?? "hi");
  }, [searchParam]);
 
  async function getNews() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${q}&language=${language}&sortBy=publishedAt&apiKey=0fb0536313d548eca8a8f4eca4d4f3ed`
      );
      const data = await response.json();

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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to={`/?q=All&language=${language}`}>News Paper</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${q === "All" ? "active" : ""}`}
                aria-current="page" to={`/?q=All&language=${language}`}>Home</Link>
            </li>
            <li className="nav-item"><Link className="nav-link" to={`/?q=Crime&language=${language}`}>Crime</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/?q=Education&language=${language}`}>Education</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/?q=Sport&language=${language}`}>Sports</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/?q=Entertainment&language=${language}`}>Entertainment</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/?q=Lifestyle&language=${language}`}>Lifestyle</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/?q=Technology&language=${language}`}>Technology</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`/?q=Science&language=${language}`}>Science</Link></li>

            {/* Language Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                {language.toUpperCase()}
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={`/?q=${q}&language=hi`}>Hindi</Link></li>
                <li><Link className="dropdown-item" to={`/?q=${q}&language=en`}>English</Link></li>
              </ul>
            </li>

            {/* Country Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Country
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">India</a></li>
                <li><a className="dropdown-item" href="#">USA</a></li>
                <li><a className="dropdown-item" href="#">UK</a></li>
                <li><a className="dropdown-item" href="#">Canada</a></li>
                <li><a className="dropdown-item" href="#">Australia</a></li>
              </ul>
            </li>
          </ul>

          {/* Search Form */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search news..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>  
    </nav>
  );
}