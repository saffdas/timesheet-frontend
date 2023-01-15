import React, {ChangeEventHandler, useContext, useState} from "react";
import { DayContext, IDayContext } from "./DayContext";
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
                                value="Holiday"
                                onChange={handleChange}
                                name={day}
                                checked={dayType==="Holiday"?true:false}
                            ></input>
                        </td>

            </tr>
        </div>
    );
}
