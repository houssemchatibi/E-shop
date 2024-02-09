import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cartmanag = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/commande/getAllCommandes');
        setCommandes(response.data);
      } catch (error) {
        console.error('Error fetching commandes:', error);
      }
    };

    fetchCommandes();
  }, []);

  return (
    <div>
      <h1>Liste des commandes</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.id}>
              <td>{commande.id}</td>
              <td>{commande.total_price}</td>
              <td>
                <Link to={`/detailCart/${commande.id}`} className="btn btn-primary">Show Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cartmanag;
