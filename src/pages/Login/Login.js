import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import imagebanner from "../../assets/images/loginimage.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("authToken", "fake-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {/* LEFT IMAGE SECTION */}
      <div className="login-image-section">
        <img
          src={imagebanner}
          alt="Login Banner"
          className="login-image"
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="login-form-section">
        {/* LOGO */}
        <div className="logo">
          <img src="/images/logo.png" alt="Lendsqr Logo" />
        </div>

        <div className="form-wrapper">
          <h1 className="welcome-text">Welcome!</h1>
          <p className="subtitle">Enter details to login.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
