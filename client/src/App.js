import './App.css';
import { Route, Routes } from "react-router-dom"
import Landing from "./views/landing/landing.component"
import Home from "./views/home/home.component"
import Detail from "./components/detail/detail.component.jsx"
import Form from "./views/form/form.component.jsx"
import Search from './views/search/search.component.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
