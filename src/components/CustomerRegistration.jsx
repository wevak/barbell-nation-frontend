import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { customerRegisterAsync } from "../redux/actionCreators/customerActionCreator";

export default function CustomerRegistration() {

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packageId, setPackageId] = useState(0);

  const dispatch = useDispatch();

  const handleCustomerRegistration = (e) => {
    e.preventDefault();
    dispatch(customerRegisterAsync({ name, email, gender, phone, packageId }));
  }

  return (
    <section className="register-section">
      <h2>
        <span>Become a Member!</span> Register
      </h2>
      <form className="register-form" onSubmit={handleCustomerRegistration}>
        <div className="form-row">
          <label className="customer-label">
            Name 
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
          {/* <label className="customer-label">
            Date of Join
            <input type="date" />
          </label> */}
          <label className="customer-label">
            Gender
            <input type="text" value={gender} onChange={e => setGender(e.target.value)} />
          </label>
        </div>
        <div className="form-row">
          <label className="customer-label">
            Email Address
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label className="customer-label">
            Contact No.
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
          </label>
        </div>
        <div className="form-row">
          <label className="customer-label">
            Package / Plan
            <input type="text" value={packageId} onChange={e => setPackageId(e.target.value)} />
          </label>
          <label className="customer-label">
            Price
            <input type="text" readOnly />
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit" className="primary">
            Avail Membership
          </button>
        </div>
      </form>
    </section>
  );
}
