import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../components/productCard/ProductCard.js";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
};

let status;

useEffect(() => {
  if (status === "idle") {
    dispatch(fetchProducts());
  }
}, [status, dispatch]);

if (status === "loading") {
  return <div>Loading...</div>;
}

if (status === "failed") {
  return <div>{error}</div>;
}

return (
  <div>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;
