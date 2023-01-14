import React, {ChangeEventHandler, MouseEventHandler, useContext, useState} from "react";
import { DayContext, IDayContext } from "./DayContext";
import {Simulate} from "react-dom/test-utils";
import doubleClick = Simulate.doubleClick;
interface Props {
    day: { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string };
}

type DayState = { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string }[];
export default function DayType(props: Props): JSX.Element {
    const { updateDayType} = useContext<IDayContext>(DayContext);
    const { day,date,startTime,endTime,totalHours,dayType } = props.day;
    const [state, setState] = useState<DayState>();
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        updateDayType(day,e.target.value);
    };



    return (

        <div id={day} className="day">

            <tr>

                        <td>
                            <input
                                type="radio"
                                value="normal day"
                                onChange={handleChange}
                                name={day}
                                checked={dayType==="normal day"?true:false}
                            ></input>
                        </td>
            </tr>
        </div>
    );
}
