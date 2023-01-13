import React from "react";
import "../App.scss";
import Login from "./Login";

export default class App {
    render(): React.ReactNode {
        return (
            <div className="Login">
                <Login/>
            </div>
        );
    }
}