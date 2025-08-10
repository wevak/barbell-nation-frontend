import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../redux/store";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

export default function Members() {
  const { token } = useSelector((state) => state.auth);
  const [customers, setCustomers] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const { data } = await axios.get(`${server}/customers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if(data == "") { setCustomers([]); return 0;} //cause api doesn't return empty array;
    setCustomers(data);
  };

  const [editCustomer, setEditCustomer] = useState({});

  const handleCustomerEdit = (customer) => {
    // debugger
    setEditCustomer(customer);
    setShow(true);
  };

  const handleCustomerEditSubmit = async () => {
    const { data } = await axios.put(
      `${server}/customers/${editCustomer.customerId}`,
      { ...editCustomer },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getCustomers();
    handleClose();
  };

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Gender</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => {
            return (
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
            );
          })}
        </tbody>
      </table>
      <>
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
                  value={editCustomer.name}
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
                  value={editCustomer.email}
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
                  value={editCustomer.phone}
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
                  value={editCustomer.gender}
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
      </>
    </>
  );
}
