import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isVisible }) => {
  return (
    <>
      {isVisible && (
        <div className="vh-100 d-flex align-items-center bg-light">
          <Navbar
            bg="light"
            expand="md"
            className="flex-md-column align-items-start"
          >
            <Container>
              <Nav className="justify-content-center flex-md-column d-flex align-items-center">
                <Nav.Link
                  as={NavLink}
                  to="/"
                  activeClassName="active"
                  className="text-lg text-truncate my-4"
                  style={{ maxWidth: "100%" }}
                >
                  HOME
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/add"
                  activeClassName="active"
                  className="text-lg text-truncate my-4"
                  style={{ maxWidth: "100%" }}
                >
                  ADD LEADS
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/faq"
                  activeClassName="active"
                  className="text-lg text-truncate my-4"
                  style={{ maxWidth: "100%" }}
                >
                  ABOUT
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/faq"
                  activeClassName="active"
                  className="text-lg text-truncate my-4"
                  style={{ maxWidth: "100%" }}
                >
                  WEBSITE
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default Sidebar;
