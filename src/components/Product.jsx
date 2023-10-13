import React from 'react'
import './Product.css'
import { Link } from 'react-router-dom'

const Product = ({ id, title,country,stock, price, image, description ,category,onClick }) => {
  return (
    <Link to={`/products/${id}`} className="productCard">
    <div className="card-top" >
    <div className="country-img">
    {category === 'velocycle' && ( <img src={country} alt="country" />)}
      </div>
      <p >{stock}</p>
    </div>
    <div className='card-bottom'>
    <div className="img-container">
        <img src={image} alt="product" />
      </div>
      <div className='info-container'>
      <h4 className="name">{title}</h4>
      <p className="price">{`Цена: ${price}$`}</p>

      </div>
    </div>
      

    </Link>
  )
}

export default Product