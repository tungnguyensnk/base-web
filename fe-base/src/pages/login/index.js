import React from 'react';
import './style.css';
import Form from "../../components/form";
import USER from "../../services/userService";
import {useNavigate} from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const callback = (message) => {
        if (message === "LOGIN_SUCCESS")
            navigate('/');
    }

    const myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMmEyY2YwNGUyNjExNDJjNjg2N2Q0ODQ2YTFiM2RhNDYiLCJtYWlsYm94Ijoic2Ftb2hhMjE1M0BhcHB4YXBpLmNvbSIsImlhdCI6MTY4Mzk2NzU3OX0.y_yJ_Ay2afAPuYgWzjWKVBAMfh1XXbfglcaVm85_l8M");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    (async () => {
        const response = await fetch("https://web2.temp-mail.org/messages", requestOptions);
        const result = await response.json();
        console.log(result);
    })();
    return (
        <div className="d-flex align-items-center" style={{height: '100vh'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">Login</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="wrap p-0">
                            <h3 className="mb-4 text-center">Have an account?</h3>
                            <Form type={"login"} asynFunc={USER.login} callback={callback}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
