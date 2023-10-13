import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { formatImgUrl } from '../utils';
import Product from '../../components/Product';
import './Home.css';

const Home = () => {

  const [products,setProducts] = useState([]) 
  useEffect(() => {
    axios
    .get("/api/products")
    .then((res) => setProducts(res.data))
    .catch((err) => console.log(err))
  },[])


  return (
    <div className='home' >
      salam
      <div className="product">
    {products.map((product) => (
      <Product 
       
        id={product.id}
        category={product.category}
        country={formatImgUrl(product.country)}
        stock={product.stock ? (
          <p className="in-stock">В наличии</p>
        ) : (
          <p className="out-of-stock">Распродано</p>
        )}
        price={product.price}
        title={product.name}
        image={formatImgUrl(product.productImage)}
         /> 
    ))}
   
  </div>
  </div>
  )
}

export default Home