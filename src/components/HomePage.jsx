import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <header className="navbar">
        <div className="logo">STAMINA FITNESS CENTRE</div>
        <nav>
          <a href="#">About</a>
          <a href="#">Offers</a>
          <a href="#">Plans</a>
          <a href="#">Coaches</a>
          <a href="#">Register</a>
          <button className="btn-join">Join Now</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>
            Start a better shape of you!
            <br />
            <span>Come Join Us!</span>
          </h1>
          <button className="learn-btn">Learn More</button>
        </div>
      </section>

      <section className="about">
        <h2>About STAMINA GYM FOR MAN & WOMAN</h2>
        <p>
          Stamina Gym Centre provides proper training to help clients reach
          their goals. Our gym is equipped with modern facilities and expert
          trainers to guide you every step of the way.
        </p>
      </section>

      <section className="offers">
        <h3>What we offer</h3>
        <div className="offer-boxes">
          <div className="offer">24/7 Access</div>
          <div className="offer">1-on-1 Coaching</div>
          <div className="offer">Nutrition Guide</div>
        </div>
      </section>

      <section className="plans">
        <h3>
          Our Plan: <span>JOIN OUR MEMBERSHIP</span>
        </h3>
        <div className="plan-cards">
          <div className="plan-card">
            <h4>7 Days</h4>
            <p>Weekly Pass</p>
          </div>
          <div className="plan-card">
            <h4>1 Month</h4>
            <p>Monthly Plan</p>
          </div>
          <div className="plan-card">
            <h4>6 Months</h4>
            <p>Extended Entry</p>
          </div>
          <div className="plan-card">
            <h4>1 Year</h4>
            <p>Annual Membership</p>
          </div>
        </div>
      </section>

      <section className="coaches">
        <h3>COACHES</h3>
        <div className="coach-cards">
          <div className="coach-card">
            <img src="https://via.placeholder.com/100" alt="Coach John" />
            <p>Coach John</p>
          </div>
          <div className="coach-card">
            <img src="https://via.placeholder.com/100" alt="Coach Marcel" />
            <p>Coach Marcel</p>
          </div>
          <div className="coach-card">
            <img src="https://via.placeholder.com/100" alt="Coach Ansel" />
            <p>Coach Ansel</p>
          </div>
        </div>
      </section>

      <section className="visit">
        <h3>VISIT OUR GYM</h3>
        <div className="visit-info">
          <iframe
            src="https://maps.google.com/maps?q=bhopal&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="200"
            style="border:0;"
            allowfullscreen
            loading="lazy"
          ></iframe>
          <div className="address">
            <p>Address: CITY B, GENERAL PATHA VILLAGES AB BARI</p>
            <p>Phone: 1234567890</p>
            <p>Email: stamina@gmail.com</p>
            <p>Follow us:</p>
            <div className="socials">
              <a href="#">🐦</a>
              <a href="#">📘</a>
              <a href="#">📷</a>
            </div>
          </div>
        </div>
      </section>

      <section className="register">
        <h3>REGISTER</h3>
        <form className="register-form">
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="First Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Phone" />
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="progress">
        <h3>Customer's Progress</h3>
        <div className="gallery">
          <img src="https://via.placeholder.com/140x180" alt="progress1" />
          <img src="https://via.placeholder.com/140x180" alt="progress2" />
          <img src="https://via.placeholder.com/140x180" alt="progress3" />
          <img src="https://via.placeholder.com/140x180" alt="progress4" />
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Stamina Fitness Centre. All rights reserved.</p>
      </footer>
    </>
  );
}
