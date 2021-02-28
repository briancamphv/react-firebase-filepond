import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { FilePond, registerPlugin, File } from "react-filepond";

//import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import Navbar from './container/navbar'
import FileTable from './components/filetable'
import Logs from './components/logs'
import FileShare from './components/fileshare';



import firebase from 'firebase'
import MyStore from './config/store'

import Login from './container/login'
import { Provider, Consumer } from './config/context';
import DownloadFile from './components/download/download.component';
import SHA1 from './utilities/crypto/sha1';



// Register the plugins
registerPlugin(FilePondPluginImagePreview);
class App extends Component {

  constructor(props) {
    super(props);
    this.storageRef = MyStore.storage().ref();
    this.databaseRef = MyStore.database().ref();
    this.state = {
      files: [], // is used to store file upload information
      uploadValue: 0, // Used to view the process. Upload
      filesMetadata: [], // Used to receive metadata from Firebase.
      rows: [], // draw the DataTable
      messag: ''
    }
  }

  storageRef = MyStore.storage().ref();

  handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
    // handle file upload here
    console.log(" handle file upload here");
    console.log(this.storageRef.child(file.name).fullPath);
    


    const fileUpload = file;

    const task = this.storageRef.child(file.name).put(fileUpload)

    task.on(`state_changed`, (snapshort) => {
      console.log(snapshort.bytesTransferred, snapshort.totalBytes)
      let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
      //Process
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      //Error
      this.setState({
        messag: `Upload error : ${error.message}`
      })
    }, () => {
      //Success
      this.setState({
        messag: `Upload Success`,
        picture: task.snapshot.downloadURL //เผื่อนำไปใช้ต่อในการแสดงรูปที่ Upload ไป
      })

      //Get metadata
      this.storageRef.child(file.name).getMetadata().then((metadata) => {
        // Metadata now contains the metadata for 'filepond/${file.name}'
        let downloadURL = ''
        this.storageRef.child(file.name).getDownloadURL().then(url => {
          console.log(url)
          let metadataFile = {
            name: metadata.name,
            size: metadata.size,
            contentType: metadata.contentType,
            fullPath: metadata.fullPath,
            downloadURL: url

          }

          //Process save metadata

          this.databaseRef.push({ metadataFile });
        })
        alert("Uploaded Successfully")

      }).catch(function (error) {
        console.log(error)
      });
    })
  }
  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  

  render() {

    console.log('sha1');
    const a = 'brian.camp@fastsigns.com'
    
    console.log(SHA1(a));

    const b = 'brian.camp@fastsigns.com'
    
    console.log(SHA1(b));

    return (
      <Provider>
        <Consumer>
          {
            value => {

              const { user, myFiles, logs } = value
              return (
                user ? <div className="App container">


                  <Navbar
                    name={user.displayName}
                    img={user.photoURL}
                  />

                  <FileShare
                    uid={user.uid}

                  />

                  <main>
                    <section>
                      <FileTable
                        uid={user.uid}
                        myFiles={myFiles}
                      />
                    </section>
                    <section>
                      <DownloadFile />
                    </section>
                    <section>
                      <p>test</p>
                      <p> SHA1("test");</p>

                   
                    </section>
                    <aside>
                      <Logs
                        myLogs={logs}
                      />
                    </aside>
                  </main>

                </div> : <Login />
              )
            }
          }
        </Consumer>
      </Provider>
    );
  }
}

export default App;
