import React from 'react';
import { Form } from "../../components";
import { useLocation } from 'react-router';


function Login(props) {
    const location = useLocation()
    return (
        <div>
            <Form/>
        </div>
    );
}

export default Login;