export default function Login() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-4 bg-body-tertiary min-vh-100">
        <div className="container">
          <div className="row">
            <main className="form-signin w-100 m-auto">
              <form>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div className="d-flex justify-content-evenly">
                  <button className="btn btn-success" type="button">
                    Customer Sign in
                  </button>
                  <button className="btn btn-danger" type="button">
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
                routerLink="/register"
              >
                New User? Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
