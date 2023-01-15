import ProfileService, {Contact} from "../services/profile-service";
import {useEffect, useState} from "react";

export default function Profile() {
    let [contact1, setContact1] = useState<Contact>();
    let [contact2, setContact2] = useState<Contact>();
    let [contact3, setContact3] = useState<Contact>();

    useEffect(() => {
        ProfileService.getEmployeeContacts()
            .then(r => {
                console.log(r);
                if (r.length > 0)
                    setContact1((prevState) => r[0]);
                if (r.length > 1)
                    setContact2((prevState) => r[1]);
                if (r.length > 2)
                    setContact3((prevState) => r[2]);
                console.log(contact1, contact2, contact3);
            });
    }, [])


    let employeeEmail = localStorage.getItem("employeeEmail");

    return (
        <div>
            <h1>Profile works!</h1>
            <h2>Employee Email {employeeEmail}</h2>
            <h3>{contact1?.address}</h3>
            <h3>{contact2?.address}</h3>
            <h3>{contact3?.address}</h3>
            <button onClick={ProfileService.getEmployeeContacts}>getEmployeeContacts()</button>
        </div>
    );
}

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}