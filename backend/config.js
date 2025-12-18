const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Đường dẫn tới file config local (tương đương config.local.php)
const localConfigPath = path.join(__dirname, 'config.local.js');

let dbConfig;

// 1. Kiểm tra: Nếu có file local thì dùng (Ưu tiên Local)
if (fs.existsSync(localConfigPath)) {
    dbConfig = require('./config.local.js');
} else {
    // 2. Nếu không thấy file local -> Đang ở trên Host -> Dùng thông số InfinityFree
    dbConfig = {
        host: 'sql308.infinityfree.com',
        user: 'if0_40096788',
        password: 'hiepnh305',
        database: 'if0_40096788_vexe'
    };
}

const pool = mysql.createPool(dbConfig);
module.exports = pool.promise();