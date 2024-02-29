
import './App.css';
//importing  the required modules from react library
import Header from './Components/header';
import Footer from './Components/footer';
import Login from './Pages/login';
import Register from './Pages/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addsale from './Pages/add-sale';
import Topsale from './Pages/topsale';
import Totalrev from './Pages/totalrevenue';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Routes>
        {/* Implementing the routes from react router dom */}
        <Route path='/' element={<Login />} />
        <Route path='/addsale' element={<Addsale />} />
        <Route path='/topsale' element={<Topsale />} />
        <Route path='/totalrevenue' element={<Totalrev />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
