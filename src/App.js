
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import LinkHome from './pages/LinkHome';


function App() {

   

  return (
    <div className="App">
          
      

         <Routes>
             
             <Route path = "/" element ={<Login/>} />
             <Route path = "/home" element ={<Home/>} />
             <Route path = "/:link" element ={<LinkHome/>} />
              


         </Routes>

       


    </div>
  );
}

export default App;
