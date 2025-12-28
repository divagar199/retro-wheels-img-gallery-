import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import { carData } from "./carsData";
import "./App.css";

function App() {
  const [view, setView] = useState("home");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false); 

  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem("retroGarage");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("retroGarage", JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCollection = (id) => {
    if (collection.includes(id)) {
      setCollection(collection.filter((carId) => carId !== id));
    } else {
      setCollection([...collection, id]);
    }
  };

  const getVisibleCars = () => {
    let cars = carData;
    if (view === "collection") {
      cars = cars.filter((car) => collection.includes(car.id));
    }
    if (filterCategory !== "All") {
      cars = cars.filter((car) => car.category === filterCategory);
    }
    if (searchTerm) {
      cars = cars.filter((car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return cars;
  };

  const visibleCars = getVisibleCars();
  const categories = ["All", ...new Set(carData.map((car) => car.category))];

  return (
    <div className="vintage-bg">
    
      <nav className={`sticky-navbar ${scrolled ? "visible" : ""}`}>
        <div className="nav-logo-small" onClick={() => setView("home")}>
          RW
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="nav-search-small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div id="nav-hero-filters" className="hero-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-badge ${
                filterCategory === cat ? "active" : ""
              }`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="nav-actions-small">
          <button onClick={() => setView("home")}>SHOWROOM</button>
          <button onClick={() => setView("collection")}>
            GARAGE ({collection.length})
          </button>
        </div>
      </nav>

      
      <header className="hero-section">
      
        <div className="video-container">
          <video autoPlay loop muted playsInline className="retro-video">
            <source
              src="https://www.pexels.com/download/video/10513744/"
              type="video/mp4"
            />
          </video>
          <div className="video-overlay"></div> {/* Adds the retro texture */}
        </div>

        <div className="hero-content">
          <h1 className="brand-logo-hero">RETRO WHEELS</h1>
          <p className="tagline-hero">EST. 1938 • AUTOMOTIVE ARCHIVE</p>

          <div className="hero-controls">
            <input
              type="text"
              placeholder="Search Classics..."
              className="retro-search-hero"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="hero-buttons">
              <button className="hero-btn" onClick={() => setView("home")}>
                ENTER SHOWROOM
              </button>
              <button
                className="hero-btn outline"
                onClick={() => setView("collection")}
              >
                MY GARAGE ({collection.length})
              </button>
            </div>
          </div>

        
          <div className="hero-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-badge ${
                  filterCategory === cat ? "active" : ""
                }`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container content-wrapper">
        <div className="section-header">
          <h2>
            {view === "home" ? "RETRO SHOWROOM" : "MY GARAGE"}
          </h2>
          {visibleCars.length === 0 && (
            <p className="empty-msg">No machines found.</p>
          )}
        </div>

        <div className="gallery-grid">
          {visibleCars.map((car) => (
            <ImageCard
              key={car.id}
              {...car}
              isCollected={collection.includes(car.id)}
              onToggle={toggleCollection}
            />
          ))}
        </div>
      </main>

      <footer className="retro-footer">
        <div className="retro-footer-div"><p>Contact US:</p><i class="fa-brands fa-facebook" ></i><br /><i class="fa-brands fa-youtube"></i><br /><i class="fa-brands fa-instagram"></i><br /><i class="fa-brands fa-whatsapp"></i></div>
        <div></div>
        <div><p>&copy; 2025 Retro Wheels by Divagar</p></div>
        
      </footer>
    </div>
  );
}

export default App;
