import React, {useState, Context, FormEventHandler, ChangeEventHandler} from "react";
import {getTimesheetDetail, postAPI} from "./Api";

type DayState = { day: string; date: string; startTime: string; endTime: string;totalHours:string;dayType:string }[];
interface Detail {
    weekEnding: string; totalBillingHours: number; totalCompensatedHours: number;employeeId:string; totalHours:string;
    day1: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day2: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day3: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day4: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day5: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day6: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day7: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
}
export interface IDayContext {
    detail:Detail;
    days: DayState;
    updateDayTotalHours: (day: string, startTime: string,endTime:string, totalHours:string) => void;
    updateStartTime:(day:string,startTime:string)=>void;
    updateEndTime:(day:string,endTime:string)=>void;
    updateDayType:(day:string,dayType:string)=>void;
    updateWeekEnding:(field:string)=>void;
    getData(date:string):any;
}
export const DayContext: Context<IDayContext> = React.createContext(
    {} as IDayContext
);

interface Props {
    children: JSX.Element[];
}
export default function DayProvider({ children }: Props): JSX.Element {
    const [days, setDays] = useState<DayState>([
        { day: "Sunday", date: '2023-01-31', startTime: '9:00 AM', endTime: '2:00 PM',totalHours:"4",dayType:"normal day"},
        { day: "Monday", date: '2023-01-01', startTime: '9:00 AM', endTime: '2:00 PM',totalHours:"4",dayType:"normal day"},
        { day: "Tuesday", date: '2023-01-01', startTime: '9:00 AM', endTime: '2:00 PM',totalHours:"4",dayType:"normal day"},
        { day: "WEd", date: '2023-01-01', startTime: '9:00 AM', endTime: '2:00 PM',totalHours:"4",dayType:"normal day"},
        { day: "Thur", date: '2023-01-01', startTime: '9:00 AM', endTime: '2:00 PM',totalHours:"4",dayType:"normal day"},
        { day: "Fri", date: '2023-01-01', startTime: '9:00 AM', endTime: '2:00 PM',totalHours:"4",dayType:"normal day"},
        { day: "Sat", date: '2023-01-01', startTime: '9:00 AM', endTime: '2:00 PM',totalHours:"4",dayType:"normal day"},
    ]);
    const [detail, setDetail] = useState<Detail>(
        // weekEnding: new Date("2023-01-14"), totalBillingHours: 32, totalCompensatedHours: 40,
        // day1: {day: "ddd", date: "dd", startTime: "dddd", endTime: "end", totalHours: "4", dayType: "none"},
        // day2: {day: "ddd", date: "dd", startTime: "dddd", endTime: "end", totalHours: "4", dayType: "none"},
        // day3: {day: "ddd", date: "dd", startTime: "dddd", endTime: "end", totalHours: "4", dayType: "none"},
        // day4: {day: "ddd", date: "dd", startTime: "dddd", endTime: "end", totalHours: "4", dayType: "none"},
        // day5: {day: "ddd", date: "dd", startTime: "dddd", endTime: "end", totalHours: "4", dayType: "none"},
        // day6: {day: "ddd", date: "dd", startTime: "dddd", endTime: "end", totalHours: "4", dayType: "none"},
        // day7: {day: "ddd", date: "dd", startTime: "dddd", endTime: "end", totalHours: "4", dayType: "none"}

    );
    React.useEffect(() => {
        getData("2023-01-15")
    }, [])
    const getData = (date:any) => getTimesheetDetail("employee/weekEnding", date,localStorage.getItem("employeeId")).then(
        (res) => {
            if (res.status === 200) {
                setDetail(res.data)
                setDays([])
                setDays(
                    [res.data.day1,
                        res.data.day2,
                        res.data.day3,
                        res.data.day4,
                        res.data.day5,
                        res.data.day6,
                        res.data.day7,
                        ]);
            } else {
                console.log(res)
            }
        }
    )

    const updateDayTotalHours = (day: string, startTime: string,endTime:string, totalHours:string): void => {

        const hours1 = startTime.substring(0,2);
        const minutes1 = startTime.substring(3,5);
        const hours2 = endTime.substring(0,2);
        const minutes2 = endTime.substring(3,5);

        // @ts-ignore
        const modifiedDate1 = new Date(new Date().setHours(Number(hours1), minutes1));
        // @ts-ignore
        const modifiedDate2 = new Date(new Date().setHours(Number(hours2), minutes2));
        const msBetweenDates = (modifiedDate2.getTime() - modifiedDate1.getTime())/1000/60/60;
        // @ts-ignore
        setDays((prevState) =>
            prevState.map((days) =>
                days.day === day ? { ...days, totalHours: msBetweenDates} : { ...days }
            )
        );
    };
    const updateStartTime = (day: string, startTime: string): void => {
        setDays((prevState) =>
            prevState.map((d) =>
                d.day === day ? { ...d, startTime: startTime } : { ...d }
            )
        );
    };
    const updateEndTime = (day: string, endTime: string): void => {
        setDays((prevState) =>
            prevState.map((d) =>
                d.day === day ? { ...d, endTime: endTime } : { ...d }
            )
        );
    };
    const updateDayType = (day: string, dayType: string): void => {
        // @ts-ignore
        setDays((prevState) =>
            prevState.map((d) =>
                d.day === day ? { ...d,  totalHours:0,dayType: dayType } : { ...d }
            )
        );
    };

    const updateWeekEnding =
        (field: string): ChangeEventHandler<HTMLInputElement> =>
            (e) => {
                // @ts-ignore
                setDetail((prevState) => ({
                    ...prevState, [field]: e.target.value ,
                }));
            };

    return (
        <>
            <DayContext.Provider
                value={{
                    days,
                    detail,
                    getData,
                    updateDayTotalHours,
                    updateDayType,
                    updateEndTime,
                    updateStartTime,
                    updateWeekEnding
                }}>
                {children}
            </DayContext.Provider></>
    );
}
