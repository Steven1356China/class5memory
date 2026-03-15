async function loadTimeline() {
    const snapshot = await db.ref('files').once('value');
    const files = snapshot.val();
    const timelineContainer = document.getElementById('timeline');
    
    // 按日期分组
    const filesByDate = {};
    
    for (let key in files) {
        const file = files[key];
        if (!filesByDate[file.date]) {
            filesByDate[file.date] = [];
        }
        filesByDate[file.date].push(file);
    }
    
    // 按日期排序
    const sortedDates = Object.keys(filesByDate).sort((a, b) => 
        new Date(b) - new Date(a)
    );
    
    // 生成时间线
    sortedDates.forEach(date => {
        const dateSection = document.createElement('div');
        dateSection.className = 'timeline-day';
        dateSection.innerHTML = `
            <h3>${formatDate(date)}</h3>
            <div class="day-files">
                ${filesByDate[date].map(file => `
                    <div class="file-item">
                        <h4>${file.title}</h4>
                        <p>上传者: ${file.uploader}</p>
                        <a href="${file.fileUrl}" target="_blank">查看文件</a>
                    </div>
                `).join('')}
            </div>
        `;
        timelineContainer.appendChild(dateSection);
    });
}
