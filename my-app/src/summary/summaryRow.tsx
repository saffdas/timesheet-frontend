import React from 'react'
import { TimeSheetSummary } from '../services/summary-service'
import {useNavigate} from "react-router-dom";

interface Props{
    index: number,
    summary: TimeSheetSummary
}

export default function SummaryRow(props: Props):JSX.Element{
    let option = props.summary.approvalStatus === "approved" ? "View" : "Edit";
    const navigate = useNavigate();
    function toTimesheetDetail() {
        console.log("toTimesheetDetail button clicked!");
        console.log(option, props.summary.weekEnding);
    }

    return(
            <tr key={props.index}>
                <td>{props.summary.weekEnding}</td>
                <td>{props.summary.totalHours} </td>
                <td>{props.summary.submissionStatus}</td>
                <td>{props.summary.approvalStatus}</td>
                <td>
                    <button onClick={toTimesheetDetail}>
                        {option}
                    </button>
                </td>
                <td>{props.summary.comment}</td>
            </tr>
        
    )
}