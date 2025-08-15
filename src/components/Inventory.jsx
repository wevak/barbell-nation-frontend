import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../redux/store";
import { Button, Form, Modal } from "react-bootstrap";

export default function Inventory() {
  const { token, ownerId } = useSelector((state) => state.auth);

  const [name, setInventoryName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");

  const [inventories, setInventories] = useState([]);

  const getInventories = async () => {
    const { data } = await axios.get(`${server}/inventory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (data == "") {
      setInventories([]);
      return 0;
    } //cause api doesn't return empty array;
    setInventories(data);
  };
  useEffect(() => {
    getInventories();
  }, []);

  const handleSubmitInventory = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${server}/inventory/add`,
      { name, price, quantity, status, ownerId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getInventories();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [editInventory, setEditInventory] = useState({});
  const handleInventoryEdit = (inventory) => {
    // debugger
    setEditInventory(inventory);
    setShow(true);
  };

  const handleInventoryEditSubmit = async () => {
    const { data } = await axios.put(
      `${server}/inventory/${editInventory.inventoryId}`,
      { ...editInventory, ownerId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getInventories();
    handleClose();
  };

  return (
    <>
      <section className="form-section">
        <form onSubmit={handleSubmitInventory}>
          <div className="form-group">
            <label>Inventory Name</label>
            <input
              type="text"
              placeholder="Inventory Name"
              value={name}
              onChange={(e) => setInventoryName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label>Quantity</label>
            <input
              type="text"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label>Status</label>
            <input
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {inventories?.map((inventory) => {
            return (
              <tr key={inventory.inventoryId}>
                <th scope="row">{inventory.inventoryId}</th>
                <th>{inventory.name}</th>
                <td>{inventory.price}</td>
                <td>{inventory.quantity}</td>
                <td>{inventory.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleInventoryEdit(inventory)}
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
            <Modal.Title>Edit Inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="nameTextId">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editInventory.name}
                  onChange={(e) =>
                    setEditInventory({ ...editInventory, name: e.target.value })
                  }
                  placeholder="dumble / barbell"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="priceTextId">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={editInventory.price}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      price: e.target.value,
                    })
                  }
                  placeholder="price"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="quantityTextId">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  value={editInventory.quantity}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="eg: 4"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="statusTextId">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={editInventory.status}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      status: e.target.value,
                    })
                  }
                  placeholder="available/ inactive"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleInventoryEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}
