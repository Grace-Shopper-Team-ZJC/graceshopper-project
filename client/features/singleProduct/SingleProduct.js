import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleProduct, fetchSingleProduct } from "./SingleProductSlice";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const oneProduct = useSelector((state) => state.singleProduct.product);
  const status = useSelector((state) => state.singleProduct.status);
  const error = useSelector((state) => state.singleProduct.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSingleProduct(id));
    }
  }, [status, dispatch, id]);

  const [name, setName] = useState(oneProduct.name);
  const [price, setPrice] = useState(oneProduct.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSingleProduct({ id, name, price }));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            defaultValue={product?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="float"
            id="price"
            defaultValue={product?.price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default SingleProduct;
