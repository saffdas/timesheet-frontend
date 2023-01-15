import axios from 'axios'
import authHeader from "../../services/auth-header";

interface Params {
    baseUrl: string
    headers : any
    method: string
}

const postConfig: Params = {
    baseUrl: "http://localhost:9000",
    headers: authHeader(),
    method: 'post'
}


interface Params {
    baseUrl: string
    headers : any
    method: string
}

export  const postAPI = async (url: string, data: any): Promise<any> =>{
    return await axios({
        ...postConfig,
        url: `${postConfig.baseUrl}/${url}`,
        data
    }).then ( (response) => {
        console.log(response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })
}
//config for get request note that the method as changed to get this is very important
// const getConfig : Params = {
//     baseUrl: "https://jsonplaceholder.typicode.com",
//     headers: {
//         "Authorization":"1"
//     },
//     method: 'get'
// }
// export const getAPI = async (url: string, data: any): Promise<any> =>{
//     return await axios({
//         ...getConfig,
//         url: `${getConfig.baseUrl}/${url}/${data}`,
//     }).then ( (response) => {
//         console.log(response)
//         return {
//             status: response.status,
//             data: response.data
//         }
//     }).catch((error) =>{
//         console.log(error)
//         return {
//             status: error.status,
//             data: error.response
//         }
//     })
// }

const token = localStorage.getItem('token');
const getConfig : Params = {
    baseUrl: "http://localhost:9000/timesheet-detail-service/timesheet/detail",
    headers: authHeader(),
    method: 'get'
}
function formatDate(date:any) {
    // date.setDate(date.getDate() + 1);
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
export const getTimesheetDetail = async (url: string, date: Date, employeeId?:any): Promise<any> =>{
    let data = formatDate(date)
    if(employeeId===undefined){
    return await axios({
        ...getConfig,
        url: `${getConfig.baseUrl}/${url}/${data}`,
    }).then ( (response) => {
        console.log(response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })}
    else{
        return await axios({
            ...getConfig,
            url: `${getConfig.baseUrl}/${url}/${employeeId}/${data}`,
        }).then ( (response) => {
            console.log(response)
            return {
                status: response.status,
                data: response.data
            }
        }).catch((error) =>{
            console.log(error)
            return {
                status: error.status,
                data: error.response
            }
        })

    }
}