import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { UserSignupAction } from '../../../redux/action/userSignupAction';

const AddUser = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  const signup = useSelector((state) => state.UserSignup);
  const APIURL = useSelector((state) => state.APIURL.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    dispatch(UserSignupAction(e.target.name, e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('username', signup.username);
      formData.append('email', signup.email);
      formData.append('mobile', signup.mobile);
      const response = await axios.post(`${APIURL}/users/`, formData,{headers});
      if (response.data.email) {
        navigate('/dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="sign">
      <div className="center">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <div className="profile flex justify-center py-4">
            <img src={previewImage} className="profile_img" alt="Profile" />
          </div>

          <div className="txt_field">
            <input
              type="text"
              title="Please enter a valid username"
              name="username"
              pattern="^(?!\\s)[^\s]+$"
              value={signup.username}
              onChange={onChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="txt_field">
            <input
              type="email"
              title="Please enter a valid email"
              name="email"
              value={signup.email}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

              onChange={onChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={signup.mobile}
              pattern="[0-9]{10}"
              onChange={onChange}
              required
            />
            <label>Mobile</label>
          </div>
         
          <div className="txt_field">
            <input type="file" id="image" name="image" onChange={handleImageChange} required />
          </div>
          <input type="submit" value="Submit" />

          <div className="signup_link">
             <Link to="/dashboard">Return Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
