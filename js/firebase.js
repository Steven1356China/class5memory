// Firebase配置
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    appId: "YOUR_APP_ID"
};

// 初始化Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();
