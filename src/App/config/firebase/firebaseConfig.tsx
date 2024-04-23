import { initializeApp } from "firebase/app";
import { getToken, getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC1plcKKBX0rYcyjHwzTlWe7ErIaPvFPZ8",
  authDomain: "rt5-hack-72cd0.firebaseapp.com",
  projectId: "rt5-hack-72cd0",
  storageBucket: "rt5-hack-72cd0.appspot.com",
  messagingSenderId: "472912746541",
  appId: "1:472912746541:web:6d01058b7ba41473d480a4",
};

const UrlFirebaseConfig = new URLSearchParams(
  {
    apiKey: "AIzaSyC1plcKKBX0rYcyjHwzTlWe7ErIaPvFPZ8",
    authDomain: "rt5-hack-72cd0.firebaseapp.com",
    projectId: "rt5-hack-72cd0",
    storageBucket: "rt5-hack-72cd0.appspot.com",
    messagingSenderId: "472912746541",
    appId: "1:472912746541:web:6d01058b7ba41473d480a4",
  }.toString()
);

const swUrl = `/firebase-messaging-sw.js?${UrlFirebaseConfig}`;

export const firebaseApp = initializeApp(firebaseConfig);

export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    console.log("Firebase is not supported in this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

export const getOrRegisterServiceWorker = () => {
  if (
    "serviceWorker" in navigator &&
    typeof window.navigator.serviceWorker !== "undefined"
  ) {
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/firebase-push-notification-scope",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = async () => {
  try {
    const messagingResolve = await messaging;
    if (messagingResolve) {
      return getOrRegisterServiceWorker().then((serviceWorkerRegistration) => {
        return Promise.resolve(
          getToken(messagingResolve, {
            vapidKey: "BNY5dN_lF_WR7pREMgkNyzFpFLUtDgimpIecAemnKIcXMdNrtAK-OTuerB7U3-TbUYlfBgQkdOrSp-wC7s45gOs",
            serviceWorkerRegistration,
          })
        );
      });
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
};