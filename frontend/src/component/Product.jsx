import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Product = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/produits/allProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>

      <div className="container my-5">
        <div className="row">
          {products.map((product) => {
            return (

              <div key={product.id} className="col-lg-4 col-md-6 my-3 text-center">
                <div className="card" style={{ width: "18rem" }}>


                  <div className="card-body">
                    <Link to={`/product/${product.id}`}>
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <button className="btn btn-primary mx-3">
                        {product.price} DT
                      </button>
                      <button>Add To Cart</button>
                    </Link>
                  </div>

                </div>
              </div>


            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Product
