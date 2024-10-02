import '@/components/base/navbar/navbar.css'
import { FC } from 'react';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';

const Navbar: FC = () => {

      // const HandleActiveNav = (props: NavLinkRenderProps) => {
      //     const {isActive} = props;

      //     if (isActive){
      //       return classes["activate_nav_items"];
      //     } else {
      //       return classes["nav_items"];
      //     };
      // }

    return (
      <header>
        <nav> 
          <div className='container'>
            <NavLink className={"nav_items"} to="/">
              <h2>Home</h2>
            </NavLink>
            <NavLink className={"nav_items"} to="/about">
              <h2>About Us</h2>
            </NavLink>
            <NavLink className={"nav_items"} to="/contact">
              <h2>Contact</h2> 
            </NavLink>
          </div>
        </nav>
      </header>
    );
  };

  Navbar.displayName = "Navbar component"

export default Navbar