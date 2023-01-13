import React, {FormEventHandler, useContext, useState} from "react";
import { IDayContext, DayContext } from "./DayContext";
import Day from "./Day";
import Date from "./Date"
import StartingTime from "./StartingTime"
import EndTime from "./EndTime"
import TotalHours from "./TotalHours";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import DayType from "./DayType";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {getTimesheetDetail, postAPI} from "./Api";
import dayjs, {Dayjs} from 'dayjs';

interface Detail {
    weekEnding: string; totalBillingHours: number; totalCompensatedHours: number; employeeId:string;
    day1: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day2: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day3: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day4: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day5: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day6: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
    day7: { day: string; date: string; startTime: string; endTime: string; totalHours: string; dayType: string };
}
export default function Days(): JSX.Element {


    const { getData } = useContext<IDayContext>(DayContext);
    const { days,detail } = useContext<IDayContext>(DayContext);

    const [weekEndingValue, setweekEndingValue] = React.useState<string>("2023-01-14");
    const [postdetail, setDetail] = useState<Detail>(
        );

    const isSaturday = (date: Dayjs) => {
        const day = date.day();
        return day !== 6;
    };
    function formatDate(date:any) {
        // @ts-ignore
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate()),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '1' + day;

        return [year, month, day].join('-');
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(days[0].endTime)
        postData();
        postAPI("save",postdetail);
        console.log(postdetail);
    };
    const postData = (): void => {
        setDetail(
            {
                day1: {date: days[0].date.substring(0,10), day: days[0].day, dayType: days[0].dayType, endTime: days[0].endTime, startTime: days[0].startTime, totalHours: days[0].totalHours},
                day2: {date: days[1].date.substring(0,10), day: days[1].day, dayType: days[1].dayType, endTime: days[1].endTime, startTime: days[1].startTime, totalHours: days[1].totalHours},
                day3: {date: days[2].date.substring(0,10), day: days[2].day, dayType: days[2].dayType, endTime: days[2].endTime, startTime: days[2].startTime, totalHours: days[2].totalHours},
                day4: {date: days[3].date.substring(0,10), day: days[3].day, dayType: days[3].dayType, endTime: days[3].endTime, startTime: days[3].startTime, totalHours: days[3].totalHours},
                day5: {date: days[4].date.substring(0,10), day: days[4].day, dayType: days[4].dayType, endTime: days[4].endTime, startTime: days[4].startTime, totalHours: days[4].totalHours},
                day6: {date: days[5].date.substring(0,10), day: days[5].day, dayType: days[5].dayType, endTime: days[5].endTime, startTime: days[5].startTime, totalHours: days[5].totalHours},
                day7: {date: days[6].date.substring(0,10), day: days[6].day, dayType: days[6].dayType, endTime: days[6].endTime, startTime: days[6].startTime, totalHours: days[6].totalHours},
                totalCompensatedHours: totalCompensatedHours,
                weekEnding: weekEndingValue,
                totalBillingHours: totalBillingHours,
                employeeId:"1",
            })

    }

    const handleWeekEndingChange =(newValue:any) => {
        setweekEndingValue(newValue);
        console.log("in days");
        getData(newValue);
    }
    // const postData = (): void => {
    //     setDetail(
    //         {
    //             day1: {date: days[0].date, day: days[0].day, dayType: "", endTime: "", startTime: "", totalHours: ""},
    //             day2: {date: "", day: "", dayType: "", endTime: "", startTime: "", totalHours: ""},
    //             day3: {date: "", day: "", dayType: "", endTime: "", startTime: "", totalHours: ""},
    //             day4: {date: "", day: "", dayType: "", endTime: "", startTime: "", totalHours: ""},
    //             day5: {date: "", day: "", dayType: "", endTime: "", startTime: "", totalHours: ""},
    //             day6: {date: "", day: "", dayType: "", endTime: "", startTime: "", totalHours: ""},
    //             day7: {date: "", day: "", dayType: "", endTime: "", startTime: "", totalHours: ""},
    //             totalCompensatedHours: totalCompensatedHours,
    //             weekEnding: weekEndingValue,
    //             totalBillingHours: totalBillingHours}
    //     )
    //     console.log("after post")
    //     console.log(detail)
    // }
    let totalBillingHours: number = 0,
        totalCompensatedDay:number  = 0;
    let totalCompensatedHours:number=0;

    days.forEach(({ totalHours, dayType }) => {
        totalBillingHours +=+ totalHours;
        dayType!=="normal day"?totalCompensatedDay += 1:console.log("");
    });
    totalCompensatedHours=totalBillingHours+8*totalCompensatedDay;
    return (
        <div>
            <form onSubmit={handleSubmit}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="WeekEnding"
                        value={weekEndingValue}
                        shouldDisableDate={isSaturday}
                        onChange={(newValue)=>{
                            // @ts-ignore
                            handleWeekEndingChange(newValue)
                        }
                        }
                        renderInput={(params) => <TextField {...params} />}
                    />
                        <label>TotalBillingHours</label>
                        <input
                            type="text"
                            value={totalBillingHours}
                        ></input>
                        <label>TotalCompensatedHours</label>
                        <input
                            type="text"
                            value={totalCompensatedHours}
                        ></input>
            <Table striped bordered hover>

            <thead>
            <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Starting Time</th>
                <th>Ending Time</th>
                <th>Total Hours</th>
                <th>Floatting Day</th>
                <th>Holiday</th>
                <th>Vacation</th>
            </tr>
            </thead>
                <tbody>
                <td>
            {days.map((day) => (
                <Day key={day.day} day={day} />
            ))}
                </td>
                <td>
                    {days.map((day) => (
                        <Date key={day.day} day={day} />
                    ))}
                </td>
                <td>
                    {days.map((day) => (
                        <StartingTime key={day.day} day={day} />
                    ))}
                </td>
                <td>
                    {days.map((day) => (
                        <EndTime key={day.day} day={day} />
                    ))}
                </td>

                <td>
                    {days.map((day) => (
                        <TotalHours key={day.day} day={day} />
                    ))}
                </td>
                <td>
                    {days.map((day) => (
                        <DayType key={day.day} day={day} />
                    ))}
                </td>
                </tbody>
            </Table>
                    </LocalizationProvider>

            <button type="submit">Save</button>
        </form>
        </div>
    );
}