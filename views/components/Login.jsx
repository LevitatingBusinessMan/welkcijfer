import React from 'react'
import schools from "./schools"

const options = schools.map(x => ({value: x.Name, text: x.Name}))

const Login = () => (
    <div>
        <script src="public/semantic.min.js"></script>
        <h1>Login met Magister:</h1>
        <select className="ui search dropdown">
            <option value="">School</option>
            {options.map(x => (<option value={x.value}>{x.text}</option>))}
        </select>
        <input placeholder="Gebruikersnaam"></input>
        <input placeholder="Wachtwoord" type="password"></input>
        <span>Cijfer om te behouden:</span><input value="5,5"></input>
        <button>checken</button>
    </div>
)

export default Login