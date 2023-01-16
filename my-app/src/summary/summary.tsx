import React, {useState, useEffect} from 'react';
import summaryService, { TimeSheetSummary } from '../services/summary-service';
import './summary.css';
import Spinner from 'react-bootstrap/Spinner';
import SummaryRow from './summaryRow';
// import useState from 'react-usestateref';



export default function Summary(): JSX.Element{

    const [summary, setSummary] = useState<TimeSheetSummary[]>([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        summaryService.getTimeSheetSummary()
        .then(response => {
            console.log(response.timesheetStatusList);
            if (response.timesheetStatusList.length > 0) {
                setSummary(response.timesheetStatusList);
                console.log(summary);
                setLoading(false);
            }
        })
    }, [])

    if (isLoading) {
        return (
            <div>
                <Spinner animation="border" />
        </div>
        )
    }
    
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
                    {summary.map((s, index) => (
                        <SummaryRow key={index} index={index} summary={s}/>
                    ))}
                </tbody>
                
            </table>
        </div>
    )
}