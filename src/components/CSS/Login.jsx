import "./Login.css";

import Label from "./Label.jsx";
import LabelTitle from "./LabelTitle.jsx";
import Button from "./Button.jsx";
import InputText from "./InputText.jsx";
import InputPassword from "./InputPassword.jsx";

function Login() {

  return (
    <div className="login-container">

      <form className="login-form">

        <LabelTitle texto="Login" />

        <div className="form-group">
          <Label texto="Usuário:" />
          <InputText placeholder="user..." />
        </div>

        <div className="form-group">
          <Label texto="Senha:" />
          <InputPassword placeholder="password..." />
        </div>

        <Button valor="Logar" />

      </form>

    </div>
  );
}

export default Login;