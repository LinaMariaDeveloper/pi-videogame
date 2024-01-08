import './App.css';
import { Route, Routes} from "react-router-dom"
import Navbar from './components/navbar.component.jsx'
import Landing from "./views/landing.component.jsx"
import Home from "./views/home.component.jsx"
import Detail from "./views/detail.component.jsx"
import Form from "./views/form.component.jsx"
import Search from './views/search.component.jsx';
import Error from './components/error.component.jsx'

function App() {

  return (
    <div className='app'>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/form" element={<Form/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
