// use for service worker registration
// see in floor.js line 24
importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/8.2.4/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "986920374298",
    apiKey: "AIzaSyDzTtrPVa296z-7cu0pOkJ7PVsDdEyqDPU",
    projectId: "test-508c4",
    appId: "1:986920374298:web:38b6afde8f7d778bc541a3",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );

    // Customize notification here
    const notificationTitle = "Notification";
    const notificationOptions = {
        body: "You have a notification unopened.",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
