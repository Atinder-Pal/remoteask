# remoteask
Remoteask Private

Pre-Requisities

1. Git
2. GitHub account
3. Access to repository
4. npm installed
5. Vue.js 3.0+ CLI
6. ionic framework CLI installed https://ionicframework.com/docs/intro/cli , or update to the latest ionic with 'npm i -g ionic'
7. Firebase CLI 



To start with the project:
  1. Clone the repository by running this command in Terminal:<br />
  `git clone git@github.com:JasPanesar/remoteask.git`
 
   You may be asked for your password if your id_rsa.pub file is not configured in github yet.
  
  2.  Install Firebase CLI to connect to Firebase tools
  
    npm install -g firebase-tools

  3. Go into the Project Folder in Terminal:
  `cd remoteAsk`
  
  4. Configure src/db-example.js file before building the project
      * Rename the file `db-example.js`to `db.js`
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
  
5. Run the following command to install all dependencies in terminal <br />
  `npm install`
  
6. To run the project, run the following command in terminal <br />
  `ionic serve`

## Publishing main branch to Firebase Hosting

7. Run the following commands to deploy app to firebase hosting
  
  1. `npm run build`
  2. `firebase deploy`
  
  This may not work if you do not have the Firebase CLI installed. If not, check step 2 to install the Firebase CLI  
  

# ANDROID BUILD INSTRUCTIONS
  ## To Start the project in android studio and run on emulator / android device
    
  
  **Run the following commands in the terminal**
  
  1. ionic build
  2. ionic cap sync
  3. ionic cap open android


  **Step 3 will open up android studio**
  
  1. open avd manager ( tools -> avd manager )
  2. From **Android Virtual Device Manager** launch a virtual device by pressing **green play button** under **actions** ( more details on how to setup if you dont have one https://developer.android.com/studio/run/managing-avds )
  3. Run the app in emulator ( Run -> Run 'app' )
  4. Instructions to run the app on real device from android studio https://developer.android.com/training/basics/firstapp/running-app
 
