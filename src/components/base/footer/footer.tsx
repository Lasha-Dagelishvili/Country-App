import '@/components/base/footer/footer.css'

const Footer: React.FC = () => {
  return (
    <>
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>About Countries App</h3>
                    <p>Discover details about different countries around the world.</p>
                </div>

                <div className="footer-section links">
                    <h3>Useful Links</h3>                               
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Explore</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p>Email: info@countriesapp.com</p>
                    <p>Phone: +123 456 789</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Countries App | All Rights Reserved</p>
            </div>
    </footer>
  </>
  );
};

  Footer.displayName = "Footer component"

export default Footer