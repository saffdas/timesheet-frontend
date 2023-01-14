import React, {ChangeEventHandler, useContext, useState} from "react";
import { DayContext, IDayContext } from "./DayContext";
import 'bootstrap/dist/css/bootstrap.min.css';
interface Props {
    day: { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string };
}

type DayState = { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string }[];
export default function EndTime(props: Props): JSX.Element {
    const { updateDayTotalHours,updateEndTime } = useContext<IDayContext>(DayContext);
    const { day,date,startTime,endTime,totalHours,dayType } = props.day;
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        updateEndTime(day,e.target.value);
        updateDayTotalHours(day,startTime,endTime,totalHours);
    };

    return (

        <div id={day} className="day">

            <input
                type="time"
                value={endTime}
                onChange={handleChange}
                disabled={dayType!=="normal day"?true:false}
            ></input>
        </div>
    );
}
