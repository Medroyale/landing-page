import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";

const CustomNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section");
      let currentActive = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        const visibleThreshold = sectionHeight * 0.5; // 50% visible

        if (rect.top <= visibleThreshold && rect.bottom >= visibleThreshold) {
          currentActive = section.id;
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id); // Set active saat klik
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      fixed="top"
    >
      <Navbar.Brand href="/" className="navbar-brand">
        MedRoyale
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            onClick={() => handleNavClick("features")}
            className={`nav-text ${activeSection === "features" ? "active" : ""}`}
          >
            Features
          </Nav.Link>
          <Nav.Link
            onClick={() => handleNavClick("testimonials")}
            className={`nav-text ${activeSection === "testimonials" ? "active" : ""}`}
          >
            Testimonials
          </Nav.Link>
          <Nav.Link
            onClick={() => handleNavClick("contact")}
            className={`nav-text ${activeSection === "contact" ? "active" : ""}`}
          >
            Contact Us
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
