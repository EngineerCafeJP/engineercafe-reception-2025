const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// .env ファイルの読み込み
dotenv.config();

// Supabaseの初期設定（自身のURLとAPIキーに置き換えてください）
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// JSON ファイルが格納されているディレクトリパス
const directoryPath = path.join(__dirname, 'output');

/**
 * 与えられた値が空文字または null なら null を返す
 * @param {any} value 
 * @returns {any}
 */
function sanitizeField(value) {
    if (value == null) return null;
    if (typeof value === "string") {
        value = value.trim().replace(/^"(.+)"$/, '$1');
        return value || null;
    }
    return value;
}

/**
 * ログの timestamp (例："2024/09/28 10:31:25") を ISO 8601 形式に変換する
 * 空の場合は null を返す
 * @param {string} ts 
 * @returns {string|null}
 */
function convertLogTimestamp(ts) {
    const safeTs = sanitizeField(ts);
    if (!safeTs) return null;
    // "/" を "-" に置換し "T" 区切りにして末尾に "Z" を付与
    return safeTs.replace(/\//g, '-').replace(' ', 'T') + 'Z';
}

/**
 * 1ファイル分のデータを読み込み、logs と users をそれぞれテーブルへ挿入する
 * @param {string} filePath - ファイルパス
 * @param {number} documentId - ファイル名から抽出した document_id
 */
async function processFile(filePath, documentId) {
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(`ファイル ${filePath} の読み込みに失敗しました: ${err}`);
        return;
    }

    let data;
    try {
        data = JSON.parse(fileContent);
    } catch (err) {
        console.error(`ファイル ${filePath} のJSON解析に失敗しました: ${err}`);
        return;
    }

    // --- logs の処理 ---
    const logs = data.logs;
    for (const logKey in logs) {
        const log = logs[logKey];
        const safeTimestamp = sanitizeField(log.timestamp);
        const registration_datetime = safeTimestamp ? convertLogTimestamp(safeTimestamp) : null;
        const logInsertion = {
            document_id: documentId,
            member_number: sanitizeField(log.userId),
            space: sanitizeField(log.space),
            start_time: sanitizeField(log.start),
            end_time: sanitizeField(log.end),
            registration_datetime, // 変換後のタイムスタンプ（または null）
            acquisition_datetime: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('old_logs')
            .insert([logInsertion]);

        if (error) {
            console.error(`ログ(${logKey})の挿入エラー:`, error);
        }
    }

    // --- users の処理 ---
    const users = data.users;
    for (const userKey in users) {
        const user = users[userKey];
        const safeUserTimestamp = sanitizeField(user.timestamp);
        const registration_datetime = safeUserTimestamp ? new Date(safeUserTimestamp).toISOString() : null;
        const userInsertion = {
            document_id: documentId.toString(), // old_users の document_id は text 型
            member_number: sanitizeField(user.number),
            full_name: sanitizeField(user.name),
            furigana: sanitizeField(user.pronunciation),
            phone_number: sanitizeField(user.phone),
            email: sanitizeField(user.email),
            affiliation: sanitizeField(user.belongs),
            affiliation_detail: sanitizeField(user.details),
            attribute: sanitizeField(user.job),
            prefecture: sanitizeField(user.prefecture),
            city: sanitizeField(user.city),
            address: sanitizeField(user.address1),
            building: sanitizeField(user.address2),
            how_did_you_know: sanitizeField(user.found),
            registration_datetime,
            acquisition_datetime: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('old_users')
            .insert([userInsertion]);

        if (error) {
            console.error(`ユーザー(${userKey})の挿入エラー:`, error);
        }
    }

    const nfcs = data.nfc;
    for (const key in nfcs) {
      const record = nfcs[key];
      const safeNfcId = sanitizeField(record.nfc_id);
      const safeNumber = sanitizeField(record.number);
  
      // nfcs テーブルへの挿入用オブジェクトを作成
      const nfcInsertion = {
        nfc_id: safeNfcId,
        member_number: safeNumber,
      };
  
      const { error } = await supabase
        .from('old_nfcs')
        .insert([nfcInsertion]);
  
      if (error) {
        console.error(`NFC (${key}) の挿入エラー:`, error);
      }
    }
}

/**
 * outputディレクトリ内の全ファイルを処理する
 */
async function main() {
    // output-*.json というファイルを抽出
    const files = fs.readdirSync(directoryPath).filter(file => file.startsWith('output-') && file.endsWith('.json'));

    for (const file of files) {
        // 例: output-123.json の "123" 部分を document_id として抽出
        const match = file.match(/output-(\d+)\.json/);
        let documentId = match ? parseInt(match[1], 10) : 0;
        const filePath = path.join(directoryPath, file);
        console.log(`ファイル ${file} を処理中 (document_id: ${documentId})`);
        await processFile(filePath, documentId);
    }
}

main().catch(err => {
    console.error("処理中にエラーが発生しました:", err);
});
