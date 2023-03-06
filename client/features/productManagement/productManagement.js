import React, {useEffect, useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addProductsAsync, deleteProductsAsync, fetchProductsAsync, selectProducts } from './productManageSlice';


//TODO: edit specific products.


const ProductManagement = ()=>{
    
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    const [pName, setPName] = useState("");
    const [pDesc, setPDesc] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [pImage, setPImage] = useState("");
    const [pQuantity, setPQuantity] = useState(0);

    

    useEffect(()=>{
        dispatch(fetchProductsAsync());
    },[dispatch]);

    const handleDelete = async(prodId)=>{
        await dispatch(deleteProductsAsync(prodId))
        await dispatch(fetchProductsAsync()) 
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        dispatch(addProductsAsync({pName,pDesc,pPrice,pImage,pQuantity})) 

        setPName("");
        setPDesc("");
        setPPrice(0);
        setPImage("");
        setPQuantity(0);

    }


    return(
        <div id="productmanagement">
            <div id ="allproductsview">
            {products && products.length ? products.map((product)=>(
                <div id = "productdiv" key ={`product ${product.id}`}>
                    <p>
                        id: {product.id}, 
                        name: {product.username}, 
                        price: {product.price},
                        stock quantity: {product.quantity},
                    </p>
                    <button onClick={()=>(handleDelete(product.id))}> Delete Product</button>
                </div>
            )):null}
            </div>

            <div id="addproduct-form" onSubmit={handleSubmit}>
                <h2>Add Product:</h2>
                <form>
                <label htmlFor='productname'>Name:</label>
                <input type="text" name="pName" value={pName} onChange={(event)=> setPName(event.target.value)}></input>

                <label htmlFor='productdesc'>Description:</label>
                <input type="text" name="pDesc" value={pDesc} onChange={(event)=> setPDesc(event.target.value)}></input>

                <label htmlFor='productprice'>Price:</label>
                <input type="text" name="pPrice" value={pPrice} onChange={(event)=> setPPrice(event.target.value)}></input>

                <label htmlFor='productimage'>ImgUrl:</label>
                <input type="text" name="pImage" value={pImage} onChange={(event)=> setPImage(event.target.value)}></input>

                <label htmlFor='productquantity'>Stock quantity:</label>
                <input type="text" name="pQuantity" value={pQuantity} onChange={(event)=> setPQuantity(event.target.value)}></input>

                <button type="submit">Submit</button>


                </form>
            </div>
        </div>
    )
}

export default ProductManagement;
