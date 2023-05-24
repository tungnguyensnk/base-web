import React from 'react';
import './style.css';
import Form from "../../components/form";
import USER from "../../services/userService";
import {useNavigate} from "react-router-dom";

const Register = () => {
    let navigate = useNavigate();
    const callback = (message) => {
        if (message === "USER_CREATED")
            navigate('/');
    }
    return (
        <div className="d-flex align-items-center" style={{height: '100vh'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">Register</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="wrap p-0">
                            <h3 className="mb-4 text-center">Don't have an account?</h3>
                            <Form type={"register"} asynFunc={USER.register} callback={callback}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
