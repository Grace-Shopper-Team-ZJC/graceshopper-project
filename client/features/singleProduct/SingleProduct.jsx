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
};
