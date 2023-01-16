import React, {useState, useEffect} from 'react';
import summaryService, { TimeSheetSummary } from '../services/summary-service';
import './summary.css';
import Spinner from 'react-bootstrap/Spinner';



export default function Summary(): JSX.Element{

    const [summary, setSummary] = useState<TimeSheetSummary[]>([]);
    const [isLoading, setLoading] = useState(true);

    var summarys: TimeSheetSummary[] = [];

    useEffect(() => {
        summaryService.getTimeSheetSummary()
        .then(response => {
            console.log(response.timesheetStatusList);
            if (response.timesheetStatusList.length > 0) {
                setSummary((preState) => [...preState, response.timesheetStatusList]);
                console.log(summary);
                summarys = response.timesheetStatusList;
                setLoading(false);
            }
            console.log(summarys)
            
            
        })

    }, [])

    if (isLoading){
        return (
            <div>
            <table>
                <tr>
                    <th><Spinner animation="border" /></th>
                    <th><Spinner animation="border" /></th>
                    <th><Spinner animation="border" /></th>
                    <th><Spinner animation="border" /></th>
                    <th><Spinner animation="border" /></th>
                    <th><Spinner animation="border" /></th>
                </tr>
                
            </table>
        </div>
        )
    }
    else
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>WeekEnding</th>
                        <th>Total Hours</th>
                        <th>Submission Status</th>
                        <th>Approval Status</th>
                        <th>Option</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                {summary.map((s, index) => {
                    return [
                    <tr key={index}>
                        <td>s</td>
                        <td>{s.totalHours} </td>
                        <td>{s.submissionStatus}</td>
                        <td>{s.approvalStatus}</td>
                        <td><s>Edit</s></td>
                        <td>{s.comment}</td>
                    </tr>
                    ];
                })}
                </tbody>
                
            </table>
        </div>
    )
}