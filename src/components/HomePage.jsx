import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux";
// customerRegisterAsync is no longer needed for this specific flow,
// but it's kept here in case you use it elsewhere.
import { customerRegisterAsync } from "../redux/actionCreators/customerActionCreator";
import logo2 from "../../assets/logo2.png";
import logo1 from "../../assets/logo1.png";
import t1 from "../../assets/t1.jpg";
import t4 from "../../assets/t4.jpg";
import t3 from "../../assets/t3.jpg";
import p1 from "../../assets/p1.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import p2 from "../../assets/p2.jpg";

export default function HomePage() {
  // State for BMI Calculator
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  // State for Customer Registration Form
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packageId, setPackageId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // BMI handler remains the same
  const handleBmiSubmit = (e) => {
    e.preventDefault();
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
      setBmi('Invalid');
      setBmiCategory('Please enter valid height and weight.');
      return;
    }
    const heightInMeters = heightValue / 100;
    const bmiResult = weightValue / (heightInMeters * heightInMeters);
    setBmi(bmiResult.toFixed(2));
    let category = '';
    if (bmiResult < 18.5) category = 'Underweight';
    else if (bmiResult < 24.9) category = 'Normal weight';
    else if (bmiResult < 29.9) category = 'Overweight';
    else category = 'Obesity';
    setBmiCategory(`Category: ${category}`);
  };

  // This function now handles the entire flow: order creation -> payment -> registration
  const handleRegistrationAndPayment = async (e) => {
    e.preventDefault();
    if (!packageId || packageId.trim() === "") {
        alert("Please enter a valid Package/Plan ID.");
        return;
    }
    setIsSubmitting(true);

    try {
      // Step 1: Call your backend to create a Razorpay order.
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: Number(packageId) }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create payment order: ${errorText}`);
      }

      const orderDetails = await response.json();

      // Step 2: Configure and open Razorpay checkout.
      const options = {
        key: orderDetails.key,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: "Barbell Nation",
        description: "Membership Payment",
        order_id: orderDetails.orderId,
        handler: async function (paymentResponse) {
          // Step 3: Payment is successful. Now, make the API call to register the user and save the payment.
          try {
            const registrationPayload = {
              name, email, gender, phone,
              packageId: Number(packageId),
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            };

            // Replaced Redux dispatch with a direct fetch call to the correct endpoint
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/payments/add`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(registrationPayload),
            });
            
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText || 'Server error occurred.');
            }

            const paymentData = await response.json();
            
            navigate('/payment-success', { 
              state: { 
                amount: paymentData.amount, 
                transactionId: paymentData.razorpayPaymentId 
              } 
            });
          } catch (regError) {
            alert(`Registration Failed After Payment: ${regError.message}`);
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#3B3486" },
        modal: {
            ondismiss: function() {
                // Re-enable the button if the user closes the payment modal
                setIsSubmitting(false);
            }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (failureResponse) {
        alert(`Payment Failed: ${failureResponse.error.description}`);
        setIsSubmitting(false);
      });
      rzp.open();

    } catch (error) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header>
        <nav className="container">
            <a href="#" className="logo-nav">
                <img src={logo2} alt="Barbell Nation Small Logo" style={{ height: '100px', width: '120px' }} />
                <span>BARBELL<br />NATION</span>
            </a>
            <ul className="nav-links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#membership">Membership</a></li>
                <li><a href="#coaches">Coaches</a></li>
                <li><a href="#bmi-calculator">BMI Calculator</a></li>
                <li><a href="#visit">Contact</a></li>
            </ul>
            <Link to="/login" className="btn btn-login" style={{ backgroundColor: '#3B3486', color: '#fcfbf7ff' }}>Login</Link>
        </nav>
      </header>

      {/* --- Other sections remain the same --- */}
      <section id="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1>Start a better<br/>shape of you!<br/>Come Join Us!</h1>
                    <p>Your journey to a healthier, stronger you begins here. We provide the tools, you provide the will.</p>
                    <a href="#about" className="btn" style={{ backgroundColor: '#3B3486', color: '#fcfbf7ff' }}>Learn More</a>
                </div>
                <div className="hero-logo">
                    <img src={logo2} alt="Barbell Nation Main Logo"/>
                </div>
            </div>
        </section>

        <section id="about">
            <div className="container about-content">
                <div className="about-image">
                    <img src={logo1} alt="Man flexing in gym" />
                </div>
                <div className="about-text">
                    <h2>About<br/>BARBELL NATION GYM</h2>
                    <p>Barbell Nation Gym provides proper training program that can transform an individual into their best self. We have professional coaches who can guide you to your desired body shape. Beyond the body, we can also provide a nutritional guide that can help your mind and body stay fit.</p>
                </div>
            </div>
        </section>

        <section id="offer">
             <div className="container">
                <h2 className="section-title" style={{margin:20}}>What we offer</h2>
                <div className="offer-cards">
                    <div className="offer-card">
                        <i className="fa-solid fa-clock"></i>
                        <h3>24/7</h3>
                        <p>Access</p>
                    </div>
                    <div className="offer-card">
                        <i className="fa-solid fa-user-group"></i>
                        <h3>1 on 1</h3>
                        <p>Training</p>
                    </div>
                     <div className="offer-card">
                        <i className="fa-solid fa-file-alt"></i>
                        <h3>Nutritional</h3>
                        <p>Guide</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="membership">
            <div className="container">
                <h2 className="section-title">JOIN OUR MEMBERSHIP</h2>
                <p className="sub-title">Our Plan:</p>
                <div className="plan-cards">
                    <div className="plan-card weekly">
                        <i className="fa-solid fa-chess-pawn"></i>
                        <h3>Weekly Plan</h3>
                        <span>7 Days</span>
                    </div>
                    <div className="plan-card">
                         <i className="fa-solid fa-chess-knight"></i>
                        <h3>1 Month</h3>
                    </div>
                    <div className="plan-card">
                         <i className="fa-solid fa-chess-rook"></i>
                        <h3>6 Months</h3>
                    </div>
                    <div className="plan-card">
                         <i className="fa-solid fa-chess-king"></i>
                        <h3>1 Year</h3>
                    </div>
                </div>
            </div>
        </section>

        <section id="coaches">
            <div className="container">
                <h2 className="section-title" style={{margin:20}}>COACHES</h2>
                <div className="coach-profiles">
                    <div className="coach-card">
                        <img src={t1} alt="Coach John" />
                        <h3>Coach John</h3>
                    </div>
                    <div className="coach-card">
                        <img src={t4} alt="Coach Jarrell" />
                        <h3>Coach Jarrell</h3>
                    </div>
                    <div className="coach-card">
                        <img src={t3} alt="Coach Anne" />
                        <h3>Coach Anne</h3>
                    </div>
                </div>
            </div>
        </section>


      <section id="bmi-calculator">
        <div className="container">
          <h2 className="section-title">Calculate Your BMI</h2>
          <div className="bmi-calculator-wrapper">
            <form onSubmit={handleBmiSubmit}>
              <div className="input-group">
                <label htmlFor="height">Height (in cm)</label>
                <input
                  type="number"
                  id="height"
                  placeholder="e.g., 175"
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="weight">Weight (in kg)</label>
                <input
                  type="number"
                  id="weight"
                  placeholder="e.g., 70"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <button type="submit" className="btn">Calculate BMI</button>
            </form>
            <div id="bmi-result" className="bmi-result-area">
              <h3>Your BMI is:</h3>
              <p id="bmi-value">{bmi ? bmi : '-'}</p>
              <p id="bmi-category">{bmiCategory}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="visit">
            <div className="container visit-content">
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04363249043!2d73.73949818989528!3d18.64121544343135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b82f952ac23d%3A0x6442d1b747065f66!2sPimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1662804533519!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="visit-details">
                    <h2>VISIT OUR GYM</h2>
                    <p><i className="fa-solid fa-location-dot"></i> 123 Barbell Street, Pimpri-Chinchwad, Maharashtra</p>
                    <p><i className="fa-solid fa-phone"></i> (+91) 912 3456789</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </section>

      <section id="register-progress">
        <div className="container register-progress-content">
          <div className="register-form">
            <h2>CUSTOMER REGISTER</h2>
            <form onSubmit={handleRegistrationAndPayment}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required /> 
              
              <label htmlFor="gender">Gender</label>
              <input type="text" id="gender" value={gender} onChange={e => setGender(e.target.value)} required />
              
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
              
              <label htmlFor="contact-no">Contact No.</label>
              <input type="tel" id="contact-no" value={phone} onChange={e => setPhone(e.target.value)} required />
              
              <label htmlFor="packageId">Package/Plan ID</label>
              <input type="number" id="packageId" placeholder="Enter a number (e.g., 1 for weekly)" value={packageId} onChange={e => setPackageId(e.target.value)} required />
              
              <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Register & Pay'}
              </button>
            </form>
          </div>
          <div className="customer-progress">
            <h2>Customer's Progress</h2>
            <div className="progress-gallery">
                <img src={p1} alt="Customer progress 1"/>
                <img src={p5} alt="Customer progress 2"/>
                <img src={p6} alt="Customer progress 3"/>
                <img src={p2} alt="Customer progress 4"/>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container footer-content">
            <div className="footer-col">
              <h4>Info</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Help</h4>
              <ul>
                <li><a href="#">Support</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contacts</h4>
              <ul>
                <li><a href="#">Email</a></li>
                <li><a href="#">Location</a></li>
                <li><a href="#">Socials</a></li>
              </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>© 2025 Barbell Nation. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}