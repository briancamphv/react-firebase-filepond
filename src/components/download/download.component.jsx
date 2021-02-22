import React, {File} from 'react';
import MyStore from '../../config/store'



class DownloadFile extends React.Component {

    constructor(props) {
        super(props);
    }

  
    downloadEmployeeData = () => {

        const url = 'gs://crwn-db-743d6.appspot.com/'
        const fileName='CL_logo_600 (002) (1).jpg'
        const storageRef = MyStore.storage().ref();
        storageRef.child(fileName).getDownloadURL()
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    var blob = xhr.response;
                    var data = new Blob([xhr.response], {type: 'image/jpeg'});
                    var csvURL = window.URL.createObjectURL(data);
                    var tempLink = document.createElement('a');
                    tempLink.href = csvURL;
                    tempLink.setAttribute('download',fileName);
                    tempLink.click();
                };
                xhr.open('GET', url);
                xhr.send();

               

                // Or inserted into an <img> element
                // var img = document.getElementById('myimg');
                // img.setAttribute('src', url);

              
                    // const link = document.createElement('a');
                    // link.href = url;
                    // link.download=true;
                    // link.target='_blank'
                    // document.body.appendChild(link);
                    // link.click();
                    // document.body.removeChild(link);    
            })
            .catch((error) => {
                // Handle any errors
            });

            
    }


render() {
    return (
        <div id="container">
            <h1>Download File using React App</h1>
            <h3>Download Employee Data using Button</h3>
            <button onClick={this.downloadEmployeeData}>Download</button>
            <img id="myimg">
            </img>
            
            <p />
        </div>
    ) }
}



export default DownloadFile;