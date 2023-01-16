import ProfileService, {Contact} from "../services/profile-service";
import {useEffect, useState} from "react";
import ProfileDetails from "./ProfileDetails/ProfileDetails";

export default function Profile() {
    let [contact1, setContact1] = useState<Contact>();
    let [contact2, setContact2] = useState<Contact>();
    let [contact3, setContact3] = useState<Contact>();

    const [isLoading, setLoading] = useState(true);

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
                setLoading(false);
            });
    }, [])

    if (isLoading) {
        return (
            <h1>
                Waiting to fetch data from backend...
            </h1>
        );
    }

    return (
        <div>
            <ProfileDetails index={"main"} contact={contact1!}/>
            <ProfileDetails index={"1"} contact={contact2!}/>
            <ProfileDetails index={"2"} contact={contact3!}/>
        </div>
    );
}

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}