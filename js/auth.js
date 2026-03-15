// 确保 DOM 完全加载后再绑定事件
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.error('找不到登录表单');
    }
});

// 登录处理函数
async function handleLogin(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    
    // 验证输入
    if (!name || !studentId) {
        if (errorMsg) {
            errorMsg.textContent = '请输入姓名和学号';
        }
        return;
    }
    
    // 管理员直接登录
    if (name === "宋昊屿" && studentId === "18") {
        const userData = {
            name: "宋昊屿",
            studentId: "18",
            isAdmin: true,
            id: "admin-" + Date.now(),
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        window.location.href = 'admin.html';
        return;
    }
    
    // 尝试 Firebase 验证
    try {
        if (typeof firebase !== 'undefined' && firebase.database) {
            const db = firebase.database();
            const snapshot = await db.ref('users').once('value');
            
            if (snapshot.exists()) {
                const users = snapshot.val();
                let userFound = false;
                
                for (let key in users) {
                    if (users[key].name === name && users[key].studentId === studentId) {
                        userFound = true;
                        const userData = {
                            ...users[key],
                            id: key
                        };
                        
                        localStorage.setItem('currentUser', JSON.stringify(userData));
                        
                        if (users[key].isAdmin) {
                            window.location.href = 'admin.html';
                        } else {
                            window.location.href = 'main.html';
                        }
                        break;
                    }
                }
                
                if (!userFound && errorMsg) {
                    errorMsg.textContent = '姓名或学号不正确';
                }
            } else {
                if (errorMsg) {
                    errorMsg.textContent = '系统未初始化，请联系管理员';
                }
            }
        } else {
            if (errorMsg) {
                errorMsg.textContent = '系统错误，请刷新页面';
            }
        }
    } catch (error) {
        console.error('登录错误:', error);
        if (errorMsg) {
            errorMsg.textContent = '登录失败: ' + error.message;
        }
    }
}
