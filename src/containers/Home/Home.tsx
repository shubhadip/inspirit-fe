import { API_URL, getUserDetails, signoutUser } from "actions/auth_actions";
import { AUTH_USER } from "actions/types";
import { BitcoinValue } from "containers/Bitcoin/BitcoinValue";
import { getFromCookie, getTokenValues } from "credentials/access_credentials";
import { GetHeaders } from "credentials/access_headers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from './../../services/axios.instances';
import { Buy } from "./Buy";
import "./Home.scss";
import { Sell } from "./Sell";

function Home() {
  const auth = useSelector((state: any) => state.auth)
  const isAuthenticated = auth.authenticated

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getFromCookie("Access-Token");
    
    if(!token) {
      navigate('/login')
    }
    
    if (token && !isAuthenticated) {
      axios.post(`${API_URL}api/validate`, {}, GetHeaders())
        .then(() => {
          dispatch({type: AUTH_USER});
          const value = getTokenValues()
          dispatch(getUserDetails(value.sub));
        });
    }
  }, [isAuthenticated, dispatch, navigate]);
  
  const handleRedirect = () => {
    if(isAuthenticated) {
      dispatch(signoutUser());
      navigate('/login');
    }else {
      navigate('/login')
    }
  };
  
  return <div className="App">
    <div className="wrapper">
      <div className="header-class">
        <button className="btn" onClick={handleRedirect}> {isAuthenticated ? 'Logout' : 'Login'}</button>
      </div>
      <div className="content-class">
        <div>
          <BitcoinValue />
        </div>
        <div>
          <Buy {...auth} />
          <Sell {...auth} />
        </div>
      </div>
    </div>
  </div>;
}

export default Home;
