import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/style.css";

export default function Navbar() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "student-admission", label: "Admission" },
    { id: "faculty-section", label: "Faculty" },
    { id: "vision", label: "Vision" },
    { id: "contact", label: "Contact" },
  ];

  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      for (let sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActive(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const offset = section.offsetTop - 70; 
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <header id="mainHeader" className="shadow-sm position-fixed w-100" style={{ zIndex: 1000, top: 0 }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-maroon">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#home">
            <img src="/assets/images/lightLogo.png" alt="Logo" className="me-2" style={{ height: "40px" }} />
            GSG
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav text-center">
              {sections.map(({ id, label }) => (
                <li className="nav-item" key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleSmoothScroll(e, id)}
                    className={`nav-link ${active === id ? "active fw-bold" : ""}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
