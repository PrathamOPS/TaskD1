function Footer() {
  return (
    <footer id="contact">

      <div className="newsletter">

        <h2>
          SIGN UP FOR OUR DAILY INSIDER
        </h2>

        <div className="subscribe-box">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>
            Subscribe
          </button>

        </div>

      </div>


      <div className="footer-main">

        <div className="footer-column">

          <h3>Explore</h3>

          <a href="#about">Home</a>
          <a href="#portfolio">Questions</a>
          <a href="#articles">Articles</a>
          <a href="#tutorials">Tutorials</a>

        </div>


        <div className="footer-column">

          <h3>Support</h3>

          <a href="#">FAQs</a>
          <a href="#">Help</a>
          <a href="#contact">Contact Us</a>

        </div>


        <div className="footer-column social-column">

          <h3>Stay connected</h3>

          <div className="social-icons">

            <a href="#" aria-label="Facebook">
              f
            </a>

            <a href="#" aria-label="Twitter">
              𝕏
            </a>

            <a href="#" aria-label="Instagram">
              ◎
            </a>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <h3>DEV@Deakin 2022</h3>

        <div className="legal-links">

          <a href="#">Privacy Policy</a>

          <a href="#">Terms</a>

          <a href="#">Code of Conduct</a>

        </div>

      </div>

    </footer>
  )
}

export default Footer