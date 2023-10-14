import { useState } from "react";
import "./Create.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Create = () => {
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: 0,
    image: null,
    category: "",

    stock: true,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      stock: event.target.checked,
    }));
  };

  const handleImage = (event) => {
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setFormData((prev) => ({
        ...prev,
        productImage: uploadedImage,
      }));
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("details", formData.details);
    data.append("price", Number(formData.price));
    data.append("productImage", formData.productImage);
    data.append("category", formData.category);
    
    data.append("stock", formData.stock ? true : false);

    axios
      .post("/api/products", data)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };
  
  const handleCancel = () => {
    history.push('/');
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit} className="form">
        <h1>Create new product</h1>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="details">Details</label>
          <textarea
          style={{resize:"none"}}
            onChange={handleChange}
            value={formData.details}
            name="details"
            id="details"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            onChange={handleChange}
            value={formData.price}
            type="number"
            id="price"
            name="price"
          />
        </div>

        <div className="form-control">
          <label htmlFor="stock">stock ?</label>
          <input
            onChange={handleCheckboxChange}
            
            checked={formData.stock}
            type="checkbox"
            id="stock"
            name="stock"
          />
        </div>

        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            value={formData.category}
            onChange={handleChange}
            id="category"
            name="category"
          >
            <option value="velocycle">velocycle</option>
            <option value="accessory">accessory</option>
          </select>
        </div>
      
        <div className="form-control">
          <label htmlFor="image">Upload image</label>
          <input onChange={handleImage} type="file" id="image" name="image" />
        </div>
        {imagePreview && (
          <img width="200px" height="200px" src={imagePreview} alt="preview" />
        )}
        <div className="btn-container">
          <button className="btn secondary" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
