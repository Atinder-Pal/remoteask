# remoteask
Remoteask Private

To start with the project:
  1. Clone the repository by running this command in Terminal:<br />
  `git clone https://github.com/JasPanesar/remoteask.git`
  
  2. Go into the Project Folder in Terminal:
  `cd remoteAsk`
  
  3. Configure db-example.js file before building the project
      * Rename the file `db-example.js` in src folder to `db.js`
      * Values of the below keys have been deleted intentionally. 
        Replace the below code with SDK's from your Firebase Project <br />
              ```
              let firebaseConfig = {
                  apiKey: "",
                  authDomain: "",
                  projectId: "",
                  storageBucket: "",
                  messagingSenderId: "",
                  appId: "",
                  measurementId: ""
                };
                ```
  

4. Run the following command to install all dependencies in terminal <br />
  `npm install`
  
5. To run the project, run the following command in terminal <br />
  `ionic serve`