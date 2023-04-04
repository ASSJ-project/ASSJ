import '@/components/domain/Error/ErrorPage.css';
import logo2 from 'assets/images/Error-logo.PNG';
import { Link } from 'react-router-dom';
import Header from './Header';
import Button from '@mui/material/Button';
import Footer from '@/components/Structure/Footer/Footer';

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="Error">
        <div className="Error-logo">
          <img src={logo2} alt="Error-logo2" className="Error-logo2" />
        </div>
        <div className="Error-text">
          <h2>주소가 잘못되었습니다!</h2>
          <h3>
            주소를 확인하거나
            <br />홈 버튼을 눌러주세요!{' '}
          </h3>
        </div>

        <Link to="/" style={{ textDecoration: 'None' }}>
          <Button className="Error-home" variant="contained">
            Home
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
