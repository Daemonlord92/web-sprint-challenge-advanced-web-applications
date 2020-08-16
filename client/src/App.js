import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Container, Col } from 'reactstrap';
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import Row from "reactstrap/es/Row";

function App() {
    return (
        <Router>
            <Container className="App">
                <Row>
                    <Switch>
                        <PrivateRoute extact path="/bubbles" component={BubblePage}/>
                        <Route exact path="/" component={Login} />
                    </Switch>
                </Row>
                {/*
          Build a PrivateRoute component that will
          display BubblePage when you're authenticated
        */}
            </Container>
        </Router>
    );
}

export default App;
