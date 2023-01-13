import React, {ChangeEventHandler, useContext, useState} from "react";
import { DayContext, IDayContext } from "./DayContext";
interface Props {
    day: { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string };
}

type DayState = { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string }[];
export default function Day(props: Props): JSX.Element {
    const { updateDayTotalHours } = useContext<IDayContext>(DayContext);
    const { day,date,startTime,endTime,totalHours,dayType } = props.day;
    const [state, setState] = useState<DayState>();
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        updateDayTotalHours(day,startTime,endTime,totalHours);
    };

    return (

            <div id={day} className="day">
                <tr>
                    <td>
                        {day}
                    </td>
                </tr>
            </div>
    );
}
