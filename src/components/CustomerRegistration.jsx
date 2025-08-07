import React from "react";

export default function CustomerRegistration() {
  return (
    <section class="register-section">
      <h2>
        <span>Become a Member!</span> Register
      </h2>
      <form class="register-form">
        <div class="form-row">
          <label>
            Name of Participant
            <input type="text" />
          </label>
          <label>
            Date of Join
            <input type="date" />
          </label>
        </div>
        <div class="form-row">
          <label>
            Email Address
            <input type="email" />
          </label>
          <label>
            Contact No.
            <input type="text" />
          </label>
        </div>
        <div class="form-row">
          <label>
            Plan
            <input type="text" />
          </label>
          <label>
            Price
            <input type="text" />
          </label>
        </div>
        <div class="form-buttons">
          <button type="submit" class="primary">
            Avail Membership
          </button>
          <button type="button" class="secondary">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
