

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "./config";
import { SignupType } from "../../enum/common.enum";
import _ from "lodash";


class Firebase {
  constructor() {
    this.firebase = firebase;
    this.app = firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.storage = firebase.storage();
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          resolve(userCredential);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteUserFromAuthentication(uid) {
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      user
        .delete()
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteLoggedInUser() {
    const user = this.auth.currentUser;
    if (!user) return;
    user
      .delete()
      .then(function (result) {
      })
      .catch(function (error) {
        console.log("failed", error);
      });
  }

  async logout() {
    let data = await this.auth.signOut();
    return data;
  }

  async getToken() {
    const authResponse = await this.auth.currentUser.getIdTokenResult();
    return authResponse.token;
  }

  async register(email, password) {
    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        return res;
      })
      .catch((error) => {
        console.log("error", error);
        return { status: false, message: error.message };
      });
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  isUserLoggedIn() {
    return !_.isEmpty(this.auth.currentUser);
  }

  uploadFile = (file, callback) => {
    return new Promise((resolve, reject) => {
      const ref = this.storage
        .ref()
        .child(`profile2/${this.auth.currentUser.uid}-${file.name}`);
      const task = ref.put(file);

      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
        },
        (error) => {
          console.log("file not uploaded", error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  updateProfile = async (params) => {
    const user = this.getCurrentUser();
    if (_.isEmpty(user)) {
      return;
    }
    const req = {};
    if (params.displayName) {
      req.displayName = params.displayName;
    }
    if (params.photoURL) {
      req.photoURL = params.photoURL;
    }
    if (params.phone) {
      req.phoneNumber = params.phone;
    }
    if (_.isEmpty(params)) {
      return;
    }
    return new Promise((resolve, reject) => {
      user
        .updateProfile(req)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * Facebook Authentication
   **/
  facebookProvider() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");
    provider.addScope("public_profile");
    provider.setCustomParameters({
      display: "popup",
    });
    return provider;
  }

  facebookSignInPopup() {
    const provider = this.facebookProvider();
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let user = result.user;
          user = this.onSignIn(user, SignupType.Facebook);
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Google Authentication
   **/
  googleProvider() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    return provider;
  }

  googleSignInPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let user = result.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  googleSignInPopup2() {
    const provider = this.googleProvider();
    let user = this.getCurrentUser();
    return new Promise((resolve, reject) => {
      user
        .linkWithPopup(provider)
        .then((result) => {
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  onGoogleSignIn(user, signupType) {
    const provider = user.providerData[0];
    return {
      displayName: provider.displayName,
      email: provider.email,
      phoneNumber: provider.phoneNumber,
      photoURL: provider.photoURL,
      socialToken: provider.uid,
      token: provider.refreshToken,
      signupType,
    };
  }

  onSignIn(user, signupType) {
    const provider = user.providerData[0];
    return {
      displayName: provider.displayName,
      email: provider.email,
      phoneNumber: provider.phoneNumber,
      photoURL: provider.photoURL,
      socialToken: provider.uid,
      signupType,
    };
  }
}

export default new Firebase();
