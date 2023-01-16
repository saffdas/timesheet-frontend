import axios from "axios";

const summary_url = 'http://localhost:9000/timesheet-summary-service/timesheet/summary/';

class SummaryService{

    getTimeSheetSummary(){
        let employeeId = localStorage.getItem("employeeId");

        return axios.get(summary_url + employeeId)
            .then(response =>{
                return response.data;
            })
            .catch(error => console.log(error));

    }
}

export interface TimeSheetSummary{
    weekEnding: string,
    totalHours: string,
    submissionStatus: string,
    approvalStatus: string,
    comment: string
}

export default new SummaryService();