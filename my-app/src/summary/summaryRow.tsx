import React from 'react'
import { TimeSheetSummary } from '../services/summary-service'

interface Props{
    index: number,
    summary: TimeSheetSummary
}

export default function SummaryRow(props: Props):JSX.Element{
    return(
        
            <tr key={props.index}>
                <td>{props.summary.weekEnding}</td>
                <td>{props.summary.totalHours} </td>
                <td>{props.summary.submissionStatus}</td>
                <td>{props.summary.approvalStatus}</td>
                <td>
                    View
                </td>
                <td>{props.summary.comment}</td>
            </tr>
        
    )
}