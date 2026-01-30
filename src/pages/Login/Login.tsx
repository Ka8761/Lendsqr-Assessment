import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import imagebanner from "../../assets/loginimage.png";
import logo from "../../assets/mainlogo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    localStorage.setItem("authToken", "fake-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="logo">
        <img src={logo} alt="Lendsqr Logo" />
      </div>

      <div className="login-image-section">
        <img
          src={imagebanner}
          alt="Login Banner"
          className="login-image"
        />
      </div>

      <div className="login-form-section">
        <div className="form-wrapper">
          <h1 className="welcome-text">Welcome!</h1>
          <p className="subtitle">Enter details to login.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
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
};

export default Login;
