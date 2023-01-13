import React from "react";
import DayProvider from "./DayContext";
import Days from "./Days"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export default function ContextApp(): JSX.Element {

    return (
        <div className="App">
            <Table striped bordered hover>
            <DayProvider>
                <td>
            <Days/>
                </td>
                <h1></h1>
            </DayProvider>
            </Table>
        </div>
    );
}