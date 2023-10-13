import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { formatImgUrl } from '../utils';
import {Link,useHistory} from 'react-router-dom';
import { ImBin } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";


import './SingleProduct.css'

const SingleProduct = () => {

  const history = useHistory();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const deleteProduct = () => {
    axios
      .delete(`/api/products/${id}`)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="single-page">
    <div className="product-detail">
      <div className="img-container">
        <img
          height="400px"
          width="400px"
          src={formatImgUrl(product?.productImage)}
          alt="product"
        />
      </div>
    </div>
    <div className="product-info">
      <h3 className="name">{product?.name}</h3>
      <p className="brend">{product?.brend}</p>
      {product?.stock !== undefined ? (
        <p className={product.stock ? "in-stock" : "out-of-stock"}>
          {product.stock ? "В наличии" : "Распродано"}
        </p>
      ) : (
        <p className="loading">Loading...</p>
      )}
      <h4 className="single-price">{product?.price} $</h4>
      <p className="single-des">{product?.details}</p>
      <Link to={`/edit/${id}`}><AiFillEdit className='edit-btn' /></Link>
      <button onClick={() => deleteProduct()} className="btn secondary delete"> <ImBin /></button>


    </div>
  </div>
  )
}

export default SingleProduct