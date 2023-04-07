import '@/components/domain/Error/ErrorPage.css';
import logo2 from '../assets/images/Error-logo.png';
import { Link } from 'react-router-dom';
import Header from '@/components/Structure/Header/Header';
import Button from '@mui/material/Button';
import Footer from '@/components/Structure/Footer/Footer';
import { useState, useEffect } from 'react';

const ErrorPage = () => {
  const [error, setError] = useState('');

  useEffect(() => {
    setError(sessionStorage.getItem('error_message'));
  }, [error]);
  return (
    <>
      <Header />
      <div className="Error">
        <div className="Error-logo">
          <img src={logo2} alt="Error-logo2" className="Error-logo2" />
        </div>
        <div className="Error-text">
          {error ? <h2>{error}</h2> : <h2>PAGE NOT FOUND</h2>}
        </div>
        <Link to="/" style={{ textDecoration: 'None' }}>
          <Button className="Error-home" variant="contained">
            HOME
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
