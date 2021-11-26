import "./Login.scss";
import Button from "./../../common-components/Button/Button";
import TextInput from "../../common-components/TextInput/TextInput";
import PasswordInput from "../../common-components/Password/PasswordInput";
import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "actions/auth_actions";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const notify = () => toast("Please Enter Login Details!");

  const handleUserNameChange = (value: string) => {
    setUserName(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if(!!username && !! password){
      const op : any = await dispatch(signinUser({username, password}))
      if (op.success) {
        navigate('/')
      }
    }else{
      notify()
    }
  };

  const renderLogin = () => {
    return (
      <div>
          <TextInput
            customClass={"username-input"}
            label={"Username"}
            value={username}
            onChange={handleUserNameChange}
            showLabel={true}
            name={"username"}
          />
          <PasswordInput
            customClass={"password-input"}
            label={"Password"}
            value={password}
            onChange={handlePasswordChange}
            showLabel={true}
            name={"password"}
          />
          <Button
            name={"email-submit"}
            customClass={"auth-submit"}
            title={"Continue"}
            onClick={handleSubmit}
            theme={"lightblue"}
          />
      </div>
    );
  };

  return (
    <div className={["auths-wrapper"].join(" ")}>
      <div className="auths-container">
        <div className="messagefields">
          <div className="greeting">
            <p className="heading">Welcome ,</p>
            <p className="access">Login to continue access</p>
          </div>
        </div>
        <div className="auth-forms">
          <p className="login-header">Login</p>
          {renderLogin()}
          <div className="sign-up-wrapper">
            <a href="/signup">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login