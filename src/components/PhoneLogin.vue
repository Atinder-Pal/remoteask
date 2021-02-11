<template>
  <h2>Sign In with Phone number</h2>

      <ion-list>
        <ion-item>
          +1 <ion-input
            type="number"
            v-model="phNo"
            placeholder="  Enter phone number"
          />

          <ion-button expand="block" @click="sendOtp" class="margin-ra">
            Get code
          </ion-button>
        </ion-item>

  
        <ion-item>
          <ion-button
            expand="block"
            fill="outline"
            @click="sendOtp()"
            class="margin-ra"
          >
            Resend Verification code
          </ion-button>

        
        </ion-item>

        <ion-item>
          <ion-input
            type="number"
            v-model="otp"
            placeholder="Enter verification Code"
          />

          <ion-button expand="block" @click="verifyOtp" class="margin-ra">
            Sign In
          </ion-button>
        </ion-item>
      </ion-list>

<div id="recaptcha-container"></div>

</template>

<script>
import { IonButton, IonInput } from "@ionic/vue";
import firebase from "firebase";
export default {
  name: "PhoneLogin",

  components: {
    IonButton,
    IonInput,
  },

  data() {
    return {
      phNo: "",
      appVerifier: "",
      otp: "",
    };
  },
  methods: {
    sendOtp() {
      if (this.phNo.length != 10) {
        alert("Invalid Phone Number Format !");
      } else {
        //
        let countryCode = "+1"; //Canada
        let phoneNumber = countryCode + this.phNo;
        //
        let appVerifier = this.appVerifier;
        //
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            //
            alert("SMS sent");
          })
          .catch(function (error) {
            // Error; SMS not sent
            // ...
            alert("Error ! SMS not sent" + error);
          });
      }
    },
    //
    verifyOtp() {
      if (this.phNo.length != 10 || this.otp.length != 6) {
        alert("Invalid Phone Number/OTP Format !");
      } else {
        //
        let code = this.otp;
        //
        window.confirmationResult
          .confirm(code)
          .then(function () {
            // User signed in successfully.
            // ...
            //route to set password !
            this.$router.push({ path: "/upload" });
          })
          .catch(function () {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log("bad verification code");
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function () {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function () {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  created() {
    this.initReCaptcha();
  },
};
</script>