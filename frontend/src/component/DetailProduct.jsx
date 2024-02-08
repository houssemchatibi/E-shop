
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

const DetailProduct = ({ productId, addToCart }) => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const productResponse = await fetch(`http://localhost:3000/api/produits/${id}`);
        const productData = await productResponse.json();
        console.log(productData)
        if (productResponse.ok) {
          setProduct(productData);

          // Fetch category details based on category_id
          const categoryResponse = await fetch(`http://localhost:3000/api/categories/${productData.category_id}`);
          const categoryData = await categoryResponse.json();

          if (categoryResponse.ok) {
            setCategory(categoryData.name);
          } else {
            console.error('Failed to fetch category');
          }
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product || !category) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
  };

  return (
    <div className="container con">
      <div className="text-center">
        <h1 className="card-title">{product.name}</h1>
        <p className="card-text">{category}</p>
        <p className="card-text">{product.description}</p>

        <button className="btn btn-primary mx-3">{product.price} DT</button>
        <Link to={`/cart`} className="btn btn-outline-success mx-3" onClick={handleAddToCart}>
          Add To Cart
        </Link>
      </div>
    </div>
  );
}

export default DetailProduct
