import Label from './Label.jsx';
import Labelln from './Labelln.jsx';
import Button from './Button.jsx';
import InputText from './InputText.jsx';

function Login() {
  return (
    <>
      <Labelln texto="Login" />
      <Label texto="Usuário: " />
      <InputText placeholder="user..." /> <br />
      <Label texto="Senha: " />
      <InputText placeholder="password..." /> <br />
      <Button valor="Logar" />
    </>
  );
}

export default Login;
