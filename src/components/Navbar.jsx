import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="w-100 fixed-top">
      <Container>
        {/* Brand Logo / Title */}
        <Navbar.Brand as={Link} to="/">API'S</Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">WEATHER</Nav.Link>
            <Nav.Link as={Link} to="/Dog">DOG</Nav.Link>
            <Nav.Link as={Link} to="/Movie">MOVIE</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
