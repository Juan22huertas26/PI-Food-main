import './App.css';
import DetailPage from './componentes/DetailPage/DetailPage';
import HomePage from './componentes/HomePage/HomePage';
import LandingPage from './componentes/Landing_page/Landing_Page'
import { Route, Routes } from 'react-router-dom';
import FormPage from './componentes/FormPage/FormPage';
import About from './componentes/About/About';
import { useLocation } from 'react-router-dom';
import NavBar from './componentes/NavBar/NavBar';


function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <div>{pathname === '/home' &&  <NavBar/>}</div>
      <Routes>
        <Route path='/' element={ <LandingPage/> } />
        <Route path='/home' element={ <HomePage/> } />
        <Route path='/home/:id' element={ <DetailPage/> } />
        <Route path='/createfood' element={ <FormPage /> } />
        <Route path='/about' element={ <About/>  } />
      </Routes>
    </div>
  );
}

export default App;
