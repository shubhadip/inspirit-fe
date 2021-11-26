import './styles/main.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from 'react-redux';
import Login from 'containers/Login/Login';
import Register from 'containers/Register/Register';
import { store } from "./configureStore";
import Home from 'containers/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IGenericOption } from 'shared/interfaces';


const Router = () => {
  const isLoading = useSelector((state : IGenericOption) => state.common?.isLoading)
  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
        </div>
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Register />} />
      </Routes>
    </div>
  )
};

export const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      <ToastContainer />
    </Provider>
  )
}