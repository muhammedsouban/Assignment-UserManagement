import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const API_URL = useSelector(state => state.APIURL.url);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      if (response.data && response.data.admin) {
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign">
      <div className="center">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              title="Please enter a valid email address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label>Email</label>
          </div>

          <div className="txt_field">
            <input
              type="password"
              title="Password should contain at least 6 characters"
              pattern=".{6,}"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
            <label>Password</label>

          </div>

          <input style={{marginBottom:'20px'}} type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
