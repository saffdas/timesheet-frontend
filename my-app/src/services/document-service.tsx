import axios from "axios";

const summary_url = 'http://localhost:9000/document-service/document/upload';

class DocumentService{

    uploadDocument(types: string, files: File){
        let employee = localStorage.getItem("employeeId");

        let formData = new FormData();

        formData.append("employeeId", employee!);
        formData.append("timeSheetId", "1");
        formData.append("type", types);
        formData.append("file", files);
        return axios.post(summary_url, formData)
          .then(function (response) {
            alert(response);
          })
          .catch(function (error) {
            alert(error);
          });

    }
}


export default new DocumentService();