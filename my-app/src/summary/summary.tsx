import React from 'react';
import './summary.css';


export default function Summary(): JSX.Element{
    return (
        <div>
            <table>
                <tr>
                    <th>WeekEnding</th>
                    <th>Total Hours</th>
                    <th>Submission Status</th>
                    <th>Approval Status</th>
                    <th>Option</th>
                    <th>Comment</th>
                </tr>
                <tr>
                    <td>3/24/2018</td>
                    <td>40</td>
                    <td>Not Started</td>
                    <td>N/A</td>
                    <td><button>Edit</button></td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}