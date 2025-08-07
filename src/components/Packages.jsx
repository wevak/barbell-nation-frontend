import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../redux/store";
import { useSelector } from "react-redux";

export default function Packages() {
  const { token } = useSelector((state) => state.auth);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const { data } = await axios.get(`${server}/packages`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPackages(data);
    };
    getPackages();
  }, []);

  return (
    <>
      <section className="form-section">
        <div className="form-group">
          <label>Plan Name</label>
          <input type="text" placeholder="Enter Plan Name" />
        </div>
        <div className="form-group">
          <label>Validity</label>
          <input type="text" placeholder="Enter Validity" />
        </div>
        <div className="form-group full-width">
          <label>Amount</label>
          <input type="text" placeholder="Enter Amount" />
        </div>
        <div className="form-actions">
          <button className="save">Save</button>
          <button className="cancel">Cancel</button>
        </div>
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
          {packages.map((pkg) => {
            return (
              <tr key={pkg.packageId}>
                <th scope="row">{pkg.packageId}</th>
                <td>{pkg.name}</td>
                <td>{pkg.duration}</td>
                <td>{pkg.amount}</td>
                <td><button className="btn btn-primary btn-sm">Edit</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
