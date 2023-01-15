import axios, {AxiosResponse} from "axios";

const CONTACT_URL = "http://localhost:9000/contact-service/contacts";
const EMPLOYEE_URL = "http://localhost:9000/employee-service/employees";

class ProfileService {
    getEmployeeContacts() {
        let employeeId = localStorage.getItem("employeeId");

        return axios.get(CONTACT_URL + "/getContactsByEmployeeID/" + employeeId)
            .then(r => {
                console.log(r.data);
                return r.data;
            })
            .catch(error => console.log(error));
    }

    saveEmployeeContact(contact: Contact) {
        console.log("In saveEmployeeContact!");

        return axios.post(CONTACT_URL + "/updateContact", contact);
    }
}

export interface Contact {
    id: number,
    employeeId: number,
    name: string,
    address: string,
    phoneNumber: string,
    isEmergency: boolean
}

export default new ProfileService();