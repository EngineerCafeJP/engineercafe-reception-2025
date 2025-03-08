require('dotenv').config(); // .envから環境変数をロード

const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// .envからSupabaseの接続情報を取得
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// CSVファイルのパス（適宜変更してください）
const csvFilePath = './users.csv';

// CSVの内容を保持する配列
const results = [];

// CSVファイルを読み込む
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      document_id: data['ドキュメントID'] === '' ? null : data['ドキュメントID'],
      member_number: data['会員番号'] === '' ? null : data['会員番号'],
      full_name: data['フルネーム'] === '' ? null : data['フルネーム'],
      furigana: data['ふりがな'] === '' ? null : data['ふりがな'],
      phone_number: data['電話番号'] === '' ? null : data['電話番号'],
      email: data['メールアドレス'] === '' ? null : data['メールアドレス'],
      affiliation: data['所属'] === '' ? null : data['所属'],
      affiliation_detail: data['所属詳細'] === '' ? null : data['所属詳細'],
      attribute: data['属性'] === '' ? null : data['属性'],
      prefecture: data['お住まいの都道府県'] === '' ? null : data['お住まいの都道府県'],
      city: data['市町村'] === '' ? null : data['市町村'],
      address: data['住所・番地'] === '' ? null : data['住所・番地'],
      building: data['建物名・部屋番号'] === '' ? null : data['建物名・部屋番号'],
      how_did_you_know: data['エンジニアカフェをどこで知りましたか？'] === '' ? null : data['エンジニアカフェをどこで知りましたか？'],
      registration_datetime: data['登録日時'] === '' ? null : new Date(data['登録日時']),
      acquisition_datetime: data['取得日時'] === '' ? null : new Date(data['取得日時'])
    });
  })
  .on('end', async () => {
    // 各行ごとにSupabaseのold_usersテーブルへデータを挿入する
    for (const row of results) {
      const { error } = await supabase
        .from('old_users')
        .insert(row);
      if (error) {
        console.error('Error inserting row:', error);
      }
    }
    console.log('CSV data inserted successfully!');
  });
