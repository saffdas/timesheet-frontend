import profileService, {Contact} from "../../services/profile-service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

interface Props {
    index: string,
    contact: Contact
}

export default function ProfileDetails(props: Props) {
    console.log(props);

    let title: string;

    if (props.index === "main")
        title = "Employee Contact";
    else if (props.index === "1")
        title = "Emergency Contact 1";
    else
        title = "Emergency Contact 2";

    const [phoneNumber, setPhoneNumber] = useState(props.contact.phoneNumber ? props.contact.phoneNumber : "");
    const [address, setAddress] = useState(props.contact.address ? props.contact.address : "");
    const [name, setName] = useState(props.contact.name ? props.contact.name : "");

    const handleContactSubmit = async (event: any) => {
        event.preventDefault();
        console.log("Contact SUBMIT!");

        props.contact.name = name;
        props.contact.address = address;
        props.contact.phoneNumber = phoneNumber;
        console.log(props.contact);

        await profileService.saveEmployeeContact(props.contact)
            .then(r => alert("Contact has been updated successfully!"))
            .catch(e => alert(`${e}\nThere was an ERROR! Please try again!`));
    }

    return (
        <div>
            <h3>{title}</h3>
            <div className="Login" style={{marginLeft: 30}}>
                <Form style={{marginTop: 10, textAlign: "center"}} onSubmit={handleContactSubmit}>

                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={name}
                            placeholder="John Doe"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="email" style={{display: props.index !== "main" ? "none" : "block"}}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            disabled={true}
                            autoFocus
                            type="email"
                            value={localStorage.getItem("employeeEmail")!}
                            placeholder="John Doe"
                        />
                    </Form.Group>

                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control
                            type={"tel"}
                            value={phoneNumber}
                            placeholder="(917) 328-7765"
                            maxLength={15}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Address:</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            placeholder="200 Sayre Dr, Princeton, New Jersey"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Button style={{marginTop: 10, fontSize: 20}} size="lg" type="submit">
                        SAVE
                    </Button>
                </Form>
            </div>
        </div>
    );
}