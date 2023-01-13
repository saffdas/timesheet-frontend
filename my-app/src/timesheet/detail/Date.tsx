import React, {ChangeEventHandler, useContext, useState} from "react";
import { DayContext, IDayContext } from "./DayContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
interface Props {
    day: { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string };
}

type DayState = { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string }[];
export default function Date(props: Props): JSX.Element {
    const { updateDayTotalHours } = useContext<IDayContext>(DayContext);
    const { day,date,startTime,endTime,totalHours,dayType } = props.day;
    const [state, setState] = useState<DayState>();
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        updateDayTotalHours(day,startTime,endTime,totalHours);
    };

    return (

        <div id={day} className="day">

                <td>{date}</td>        </div>
    );
}
