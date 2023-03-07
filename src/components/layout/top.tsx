import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

export function UnauthenticatedNav({ toggleSidebar }) {
  return (
    <Navbar
      bg="light"
      expand="md"
      className="py-3 border-bottom zIndex-700"
      style={{ zIndex: 700 }}
    >
      <Container>
        <Button variant="secondary" onClick={toggleSidebar} className="mr-auto">
          <FaBars size={24} />
        </Button>
        <Navbar.Brand href="/" className="mx-auto text-center text-muted">
          <strong>SAPIEN SYSTEMS</strong>
        </Navbar.Brand>
        <Nav className="mr-auto" />
      </Container>
    </Navbar>
  );
}
