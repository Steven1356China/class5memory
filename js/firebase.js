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
// 自动创建初始管理员账户
db.ref('users').once('value').then(snapshot => {
    if (!snapshot.exists()) {
        // 如果没有用户，创建管理员账户
        const adminUser = {
            name: "宋昊屿",
            studentId: "18",
            isAdmin: true,
            createdAt: new Date().toISOString()
        };
        
        db.ref('users').push(adminUser)
            .then(() => {
                console.log("管理员账户已创建: 宋昊屿 / 18");
            });
    } else {
        console.log("已有用户存在");
    }
});
