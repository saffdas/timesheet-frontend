import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";
import authService from "../services/auth.service";
import AuthService from "../services/auth.service";
import JwtUtil from "../services/jwt-util";

export default function Login() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 2 && password.length > 2;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log("SUBMIT:")
        console.log(email, password);

        await AuthService.login(email, password)
            .then(response => alert(response.message))
            .catch(error => alert(`${error}\nLogin Unsuccessful! Please check you Email and Password!`));
    }

    return (
        <div className="Login" style={{marginLeft: 30}}>
            <Form style={{marginTop: 10, textAlign: "center"}} onSubmit={handleSubmit}>
                <h1>Timesheet Login Page</h1>

                <div style={{display: validateForm() ? "none" : "block"}}>
                    <h3 style={{color: "#EE5555"}}>Warning: Email and Password must be at least 3 characters!</h3>
                </div>

                <Form.Group controlId="email">
                    <Form.Label>Email:&emsp;&emsp;&emsp;</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        placeholder="123@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password: &emsp;</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button style={{marginTop: 10, fontSize: 20}} size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>

            <button onClick={authService.logout}>Log Out</button>
            <button onClick={JwtUtil.resolveToken}>Resolve Token</button>
        </div>
    );
}