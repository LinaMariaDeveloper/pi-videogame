import './App.css';
import {Route} from "react-router-dom"
import Home from "./views/home/home.component"

function App() {
  return (
      <div>
        <Route exact path="/home" component={ <Home/>}/>
      </div>
  );
}

export default App;
