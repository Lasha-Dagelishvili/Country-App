import './navbar.css'

const Navbar: React.FC = () => {
    return (
      <nav> 
        <div className='container'>
          <h2><a href='/'>Home</a></h2>
          <h2><a href='/'>Buy Ticket</a></h2> 
          <h2><a href='/'>About Us</a></h2> 
        </div>
      </nav>
    );
  };

  Navbar.displayName = "Navbar component"

export default Navbar