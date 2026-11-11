
import './index.css'
const About = () => {
  return (
    <main className="about-page">
      <div className="about-container">
        <section className="about-hero">
          <p className="about-label">
            ABOUT SHOPEASY
          </p>

          <h1>
            A Smarter Way to
            <br />
            Shop Online.
          </h1>

          <p className="about-intro">
            ShopEasy is a modern e-commerce platform
            designed to provide a simple, fast and
            reliable online shopping experience.
          </p>
        </section>

        <section className="about-story">
          <div>
            <p className="about-section-label">
              OUR MISSION
            </p>

            <h2>
              Making online shopping simple and
              enjoyable.
            </h2>
          </div>

          <p>
            We believe shopping online should be
            straightforward. From discovering products
            to adding items to your cart and completing
            checkout, every part of the experience is
            designed with simplicity in mind.
          </p>
        </section>

        <section className="about-features">
          <article className="about-feature-card">
            <div>🛍️</div>

            <h3>Wide Selection</h3>

            <p>
              Discover products across electronics,
              clothing, footwear and accessories.
            </p>
          </article>

          <article className="about-feature-card">
            <div>⚡</div>

            <h3>Easy Shopping</h3>

            <p>
              Search, filter, sort and discover products
              quickly through an intuitive interface.
            </p>
          </article>

          <article className="about-feature-card">
            <div>🔒</div>

            <h3>Secure Checkout</h3>

            <p>
              A simple checkout experience with
              customer and delivery validation.
            </p>
          </article>

          <article className="about-feature-card">
            <div>📱</div>

            <h3>Responsive Design</h3>

            <p>
              Enjoy a consistent shopping experience
              across desktop, tablet and mobile devices.
            </p>
          </article>
        </section>

        <section className="about-testing">
          <p className="about-section-label">
            PROJECT PURPOSE
          </p>

          <h2>
            Built with quality and testing in mind.
          </h2>

          <p>
            ShopEasy is also designed as an
            automation-testing project. Its core
            shopping workflows provide realistic
            scenarios for testing search, filtering,
            product details, cart management, checkout
            and order completion.
          </p>
        </section>
      </div>
    </main>
  )
}

export default About

