import { useState, useEffect } from "react";
import "./Edit.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { formatImgUrl } from "../utils";
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: 0,
    image: null,
    category: "",
  });

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then(res => {
        setFormData(res.data);
        setImagePreview(formatImgUrl(res.data.productImage));
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = event => {
    setFormData(prev => ({
      ...prev,
      featured: event.target.checked,
    }));
  };

  const handleImage = event => {
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setFormData(prev => ({
        ...prev,
        image: uploadedImage,
      }));
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onload = e => {
        setImagePreview(e.target.result);
      };
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("details", formData.details);
    data.append("price", Number(formData.price));
    data.append("productImage", formData.image);
    data.append("category", formData.category);

    axios
      .put(`/api/products/${id}`, data)
      .then(() => history.push(`/products/${id}`))
      .catch(err => console.log(err));
  };

  const handleCancel = () => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit} className="form">
        <h1>Edit new product</h1>
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
            style={{ resize: "none" }}
            onChange={handleChange}
            value={formData.details}
            name="details"
            id="details"
            rows={10}
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
          <button
            className="btn secondary"
            type="button"
            onClick={handleCancel}
          >
            <ImCross />
          </button>
          <button className="btn primary" type="submit">
            <ImCheckmark />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
