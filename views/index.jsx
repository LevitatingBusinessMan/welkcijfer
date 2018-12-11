import React from "react";
import Login from "./components/Login.jsx"
//import 'semantic-ui-css/semantic.min.css'
//import "./components/semantic.min.css"

class App extends React.Component {
    render() {
      return (
        <div>
            <link rel="stylesheet" type="text/css" href="public/main.css" />
            <Login />
        </div>
      )
    }
  }

export default App