require('dotenv').config();

const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// Supabaseの初期設定（自身のURLとAPIキーに置き換えてください）
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// CSVファイルのパス（適宜変更してください）
const csvFilePath = './logs.csv';

// CSVの内容を保持する配列
const results = [];

// CSVファイルを読み込む
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => {
    // CSVのヘッダ名と同じキーでアクセス（例：「ドキュメントID」）
    results.push({
        document_id: data['ドキュメントID'] === '' ? null : parseInt(data['ドキュメントID'], 10),
        member_number: data['会員番号'] === '' ? null : data['会員番号'],
        space: data['利用スペース'] === '' ? null : data['利用スペース'],
        start_time: data['利用開始時間'] === '' ? null : data['利用開始時間'],
        end_time: data['利用終了時間'] === '' ? null : data['利用終了時間'],
        registration_datetime: data['登録日時'] === '' ? null : new Date(data['登録日時']),
        acquisition_datetime: data['取得日時'] === '' ? null : new Date(data['取得日時']),
      });
  })
  .on('end', async () => {
    // 各行ごとにSupabaseのold_logsテーブルへデータを挿入する
    var i = 0;
    for (const row of results) {
      const { error } = await supabase
        .from('old_logs')
        .insert(row);
      if (error) {
        console.error('Error inserting row:', error);
      }
    }
    console.log('CSV data inserted successfully!');
  });
