document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const file = document.getElementById('fileInput').files[0];
    const title = document.getElementById('fileTitle').value;
    const date = document.getElementById('fileDate').value;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // 生成唯一文件名
    const fileName = `${Date.now()}_${file.name}`;
    
    // 上传到Firebase Storage
    const storageRef = storage.ref(`uploads/${fileName}`);
    await storageRef.put(file);
    const fileUrl = await storageRef.getDownloadURL();
    
    // 保存文件信息到数据库
    await db.ref('files').push({
        title: title,
        date: date,
        fileName: fileName,
        fileUrl: fileUrl,
        uploader: user.name,
        uploadTime: new Date().toISOString(),
        fileType: file.type
    });
    
    alert('上传成功！');
    document.getElementById('uploadForm').reset();
    loadRecentFiles();
});
