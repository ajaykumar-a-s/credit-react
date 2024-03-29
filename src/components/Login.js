import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/LoginService";
function Login() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (await loginService.isCustomerLoggedIn()) {
        setLoginStatus("customer");
      } else if (await loginService.isAdminLoggedIn()) {
        setLoginStatus("admin");
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (loginStatus === "customer") {
      navigate("/customer");
    } else if (loginStatus === "admin") {
      navigate("/card/view-requests");
    }
  }, [navigate, loginStatus]);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState("");
  const onCustomerLogin = () => {
    loginService
      .customerLogin(loginForm)
      .then((response) => {
        localStorage.setItem("customer", JSON.stringify(response.data));
        navigate("/customer");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };
  const onAdminLogin = () => {
    loginService
      .adminLogin(loginForm)
      .then((response) => {
        localStorage.setItem("admin", JSON.stringify(response.data));
        navigate("/card/view-requests");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-4 bg-body-tertiary min-vh-100">
        <div className="container">
          <div className="row">
            <main className="form-signin w-25 m-auto">
              <form>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={loginForm.email}
                    onChange={handleChange}
                    name="email"
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleChange}
                    name="password"
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-flex justify-content-evenly mt-5">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={onCustomerLogin}
                    disabled={!loginForm.email || !loginForm.password}
                  >
                    Customer Sign in
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={onAdminLogin}
                    disabled={!loginForm.email || !loginForm.password}
                  >
                    Admin Sign in
                  </button>
                </div>
              </form>
            </main>
          </div>
          <div className="row w-25 m-auto">
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => navigate("/register")}
              >
                New User? Register Here
              </button>
            </div>
          </div>
          {errorMessage && (
            <div className="row w-50 m-auto mt-5 text-center">
              <div className="alert alert-danger">{errorMessage}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
