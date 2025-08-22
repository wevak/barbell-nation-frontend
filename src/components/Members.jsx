import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../redux/store";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap"; // You will need to link Bootstrap for this
import "./Member.css"; // Create and import this CSS file

export default function Members() {
  const { token } = useSelector((state) => state.auth);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // useEffect to fetch data when the component mounts or the token changes
  useEffect(() => {
    getCustomers();
  }, [token]);

  // Function to fetch customers from the API
  const getCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${server}/customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the data to the console for debugging
      console.log("API Response Data:", data);

      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        // Handle unexpected response format
        console.error("Received data is not an array:", data);
        setCustomers([]);
        setError("Invalid data format received from the server.");
      }
    } catch (err) {
      // Handle different types of errors
      console.error("Failed to fetch customers:", err);
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(`Error: ${err.response.status} - ${err.response.data}`);
      } else if (err.request) {
        // Request was made but no response received
        setError("Network error: Could not connect to the server.");
      } else {
        // Something else happened
        setError("An unexpected error occurred.");
      }
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const [editCustomer, setEditCustomer] = useState({});

  const handleCustomerEdit = (customer) => {
    setEditCustomer(customer);
    setShow(true);
  };

  const handleCustomerEditSubmit = async () => {
    try {
      await axios.put(
        `${server}/customers/${editCustomer.customerId}`,
        { ...editCustomer },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCustomers(); // Refresh the list after a successful edit
      handleClose();
    } catch (err) {
      console.error("Failed to update customer:", err);
      // You could add an alert or toast message here
      alert("Failed to save changes. Please try again.");
    }
  };

  // Conditional Rendering
  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="6" className="text-center">
            <span className="spinner-border text-primary" role="status"></span>
            <span className="visually-hidden">Loading...</span>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="6" className="text-center text-danger">
            {error}
          </td>
        </tr>
      );
    }

    if (customers.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center">
            No members found.
          </td>
        </tr>
      );
    }

    return customers.map((customer) => (
      <tr key={customer.customerId}>
        <th scope="row">{customer.customerId}</th>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>{customer.phone}</td>
        <td>{customer.gender}</td>
        <td>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleCustomerEdit(customer)}
          >
            Edit
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="members-container">
      <h2>Manage Members</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nameTextId">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editCustomer.name || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, name: e.target.value })
                }
                placeholder="John Doe"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="emailTextId">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={editCustomer.email || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, email: e.target.value })
                }
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneTextId">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={editCustomer.phone || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, phone: e.target.value })
                }
                placeholder="1234567890"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="genderTextId">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={editCustomer.gender || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, gender: e.target.value })
                }
                placeholder="Male/ Female"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCustomerEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}