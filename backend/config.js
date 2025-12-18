const fs = require('fs');
const path = require('path');

const localConfigPath = path.join(__dirname, 'config.local.js');

let dbConfig;

// Nếu thấy file config.local.js -> Dùng cấu hình máy bạn (XAMPP)
if (fs.existsSync(localConfigPath)) {
    dbConfig = require('./config.local.js');
} else {
    // Nếu KHÔNG thấy -> Đang ở trên Host -> Dùng thông số InfinityFree
    dbConfig = {
        host: 'sql308.infinityfree.com',
        user: 'if0_40096788',
        password: 'hiepnh305',
        database: 'if0_40096788_vexe'
    };
}

module.exports = dbConfig;