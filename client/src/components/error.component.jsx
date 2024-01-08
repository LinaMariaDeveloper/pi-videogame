import React from "react"
import {Link} from 'react-router-dom'

function pageError (){
  let message = 'Error 404... Esta página no exite'
return (
  <div className="container">
    <div className="center-message">
    <div className="message">{message}</div>
    <Link to="/" className="button">Regresar</Link>
    </div>
  </div>
)
}

export default pageError