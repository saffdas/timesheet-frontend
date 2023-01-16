import React, { useState } from 'react';
import documentService from '../../services/document-service';

export default function Upload():JSX.Element{
    let f:any;

    const [selectedFile, setSelectedFile] = useState(f);
    const [docType, setDocType] = useState('approved');

    function handleFileSelect (event:any) {
        setSelectedFile(event.target.files[0])
        console.log(selectedFile)
    }

    function handleTypeSelect (event:any) {
        setDocType(event.target.value)
        console.log(docType)
    }

    function handleSubmit () {
        documentService.uploadDocument(docType, selectedFile)
        .then(res => {
            alert(res)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={docType} onChange={handleTypeSelect} >
                    <option value="approved">approved timesheet</option>
                    <option value="unapproved">unapproved timesheet</option>
                </select>
                <input type="file" onChange={handleFileSelect}/>
                <input type="submit" />
            </form>
        </div>
    )

}

