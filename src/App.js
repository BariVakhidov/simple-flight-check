import './App.css';
import React  from 'react';
import Login from "./components/Login/Login";
import {Route} from "react-router";
import DeparturesContainer from "./components/Departures/DeparturesContainer";
import useToken from "./components/Login/useToken";

const App = () => {
    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <div className="App">
            <Route exact path={"/"} render={() => <DeparturesContainer setToken={setToken}/>}/>
        </div>
    );
}

export default App;
