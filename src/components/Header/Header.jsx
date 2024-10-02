import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Job Application Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Update Databases" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/CompanyDashboard">Company Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="/JobDashboard">Job Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="/ReviewDashboard">Review Dashboard</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link eventKey={1}>Login</Nav.Link>
                <Nav.Link eventKey={2}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Header

