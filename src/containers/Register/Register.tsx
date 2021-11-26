import * as React from "react";
import "./Register.scss";
import Button from "./../../common-components/Button/Button";
import TextInput from "../../common-components/TextInput/TextInput";
import PasswordInput from "../../common-components/Password/PasswordInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "actions/auth_actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const notify = () => toast("Please Enter SignIn Details!");
  
  const handleUserNameChange = (value: string) => {
    setUserName(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(!!username || !!password){
      const op : any = await dispatch(signupUser({username, password}))
      if (op.success) {
        navigate('/')
      }
    }else {
      notify()
    }
  };
  
  const renderSignUp = () => {
    return (
      <div>
        <TextInput
          customClass={"username-input"}
          label={"Username"}
          value={username}
          onChange={handleUserNameChange}
          showLabel={true}
        />
        <PasswordInput
          customClass={"password-input"}
          label={"Password"}
          value={password}
          onChange={handlePasswordChange}
          showLabel={true}
        />
        <Button
          customClass={"auth-submit"}
          title={"Continue"}
          onClick={handleSubmit}
          theme={"lightblue"}
        />
      </div>
    );
  };
  
  return (
    <div className={["reg-wrapper"].join(" ")}>
      <div className="reg-container">
        <div className="messagefields">
          <div className="greeting">
            <p className="heading">Welcome ,</p>
            <p className="access">SignUp to continue access</p>
          </div>
        </div>
        <div className="reg-forms">
          <p className="reg-header">Sign Up</p>
          {renderSignUp()}
          <div className="sign-up-wrapper">
            <a href="/login">Already a member? Login </a>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Register;