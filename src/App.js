import './App.css';
import React from 'react';
import Login from "./components/Login/Login";
import DeparturesContainer from "./components/Departures/DeparturesContainer";
import useToken from "./components/Login/useToken";


const App = ({requestToken}) => {
    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <div className="App">
          <DeparturesContainer setToken={setToken}/>
        </div>
    );
}

export default App;