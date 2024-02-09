import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailCart = () => {
  const { id } = useParams();
  const [detailCommandes, setDetailCommandes] = useState([]);

  useEffect(() => {
    const fetchDetailCommandes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/commande/${id}/detailcommandes`);
        setDetailCommandes(response.data);
      } catch (error) {
        console.error('Error fetching detail commandes:', error);
      }
    };

    fetchDetailCommandes();
  }, [id]);

  return (
    <div>
      <h1>Details de la commande {id}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Produit ID</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          {detailCommandes.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.product_id}</td>
              <td>{detail.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailCart;
