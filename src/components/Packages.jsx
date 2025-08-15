import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { packageRegisterAsync } from "../redux/actionCreators/packageActionCreator";
import { Button, Form, Modal } from "react-bootstrap";

export default function Packages() {
  const { token, ownerId } = useSelector((state) => state.auth);

  const [name, setPlanName] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

  const [packages, setPackages] = useState([]);

  const getPackages = async () => {
    const { data } = await axios.get(`${server}/packages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if(data == "") { setPackages([]); return 0;}  //cause api doesn't return empty array;
    setPackages(data);
  };
  useEffect(() => {
    getPackages();
  }, []);

  const handleSubmitPackage = async (e) => {
    e.preventDefault();
    await dispatch(packageRegisterAsync({ name, duration, amount }));
    getPackages();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [editPackage, setEditPackage] = useState({});
  const handlePackageEdit = (pkg) => {
    // debugger
    setEditPackage(pkg);
    setShow(true);
  };

  const handlePackageEditSubmit = async () => {
    const { data } = await axios.put(
      `${server}/packages/${editPackage.packageId}`,
      { ...editPackage, ownerId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getPackages();
    handleClose();
  };

  return (
    <>
      <section className="form-section">
        <form onSubmit={handleSubmitPackage}>
          <div className="form-group">
            <label>Plan Name</label>
            <input
              type="text"
              placeholder="Enter Plan Name"
              value={name}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Validity</label>
            <input
              type="text"
              placeholder="Enter Validity"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label>Amount</label>
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </section>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Duration</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {packages?.map((pkg) => {
            return (
              <tr key={pkg.packageId}>
                <th scope="row">{pkg.packageId}</th>
                <td>{pkg.name}</td>
                <td>{pkg.duration}</td>
                <td>{pkg.amount}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handlePackageEdit(pkg)}
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
            <Modal.Title>Edit Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="nameTextId">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editPackage.name}
                  onChange={(e) =>
                    setEditPackage({ ...editPackage, name: e.target.value })
                  }
                  placeholder="monthly/ quaterly"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="durationTextId">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  value={editPackage.duration}
                  onChange={(e) =>
                    setEditPackage({ ...editPackage, duration: e.target.value })
                  }
                  placeholder="no. of months"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="amountTextId">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  value={editPackage.amount}
                  onChange={(e) =>
                    setEditPackage({ ...editPackage, amount: e.target.value })
                  }
                  placeholder="eg: 500"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePackageEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}
