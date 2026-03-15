document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    
    // 检查用户是否存在
    const snapshot = await db.ref('users').once('value');
    const users = snapshot.val();
    
    let isValid = false;
    for (let key in users) {
        if (users[key].name === name && users[key].studentId === studentId) {
            isValid = true;
            localStorage.setItem('currentUser', JSON.stringify(users[key]));
            break;
        }
    }
    
    if (isValid) {
        window.location.href = 'main.html';
    } else {
        document.getElementById('errorMsg').textContent = '姓名或学号不正确';
    }
});
