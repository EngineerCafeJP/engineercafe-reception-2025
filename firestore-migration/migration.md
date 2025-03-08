# old_users から users への移行計画

以下は、各カラムごとの対応方針および注意点の最終的なまとめです。

---

## 1. 主キー (id)
- **対応:**  
  - 旧 id は保持せず、users 側で自動採番される新しい id を利用する。

---

## 2. document_id
- **対応:**  
  - 移行対象外とする。

---

## 3. member_number → number (bigint)
- **対応:**  
  - member_number のテキスト値を数値に変換して移行する。
- **注意点:**  
  - 数値変換においてエラーは出ない想定。ただし、余計な空白や不正な文字が含まれていないことを前提とする。

---

## 4. full_name → name
- **対応:**  
  - そのままマッピングする。追加の変換や前処理は不要。

---

## 5. furigana → pronunciation
- **対応:**  
  - そのままマッピングする。

---

## 6. phone_number → phone
- **対応:**  
  - そのまま移行する。電話番号のフォーマット調整は不要。

---

## 7. email
- **対応:**  
  - そのまま移行する。

---

## 8. affiliation → belongs_id / belongs_other
- **対応:**  
  - affiliation の値を、belongs テーブル（例：'個人', 'コミュニティー', '法人'）と照合し、一致すれば該当する belongs_id をセットする。
  - 一致しない場合は、**belongs_id に「その他」の id をセット**し、**元の値は belongs_other に記録（結合）**する。

---

## 9. affiliation_detail → belongs_detail
- **対応:**  
  - affiliation_detail は affiliation と同様に扱う。追加の処理は不要。

---

## 10. attribute → job_id / job_other
- **対応:**  
  - attribute の値を、jobs テーブルの値（例：'学生', 'ネットワークエンジニア' など）と照合し、一致すれば job_id をセットする。
  - 一致しない場合または空文字の場合は、**job_id に「その他」の id をセット**し、**元の値は job_other に記録**する。
  - 前処理としてのトリムは不要。

---

## 11. prefecture → prefecture_id / prefecture_other
- **対応:**  
  - prefecture の値を、prefectures テーブルと完全一致で比較し、一致すれば該当する prefecture_id をセットする。
  - 一致しない場合は、その値をそのまま prefecture_other に保存する。

---

## 12. city
- **対応:**  
  - そのまま移行する。

---

## 13. address → address1
- **対応:**  
  - そのまま移行する。前処理（トリムなど）は不要。

---

## 14. building → address2
- **対応:**  
  - そのまま移行する。

---

## 15. how_did_you_know → found_id / found_other
- **対応:**  
  - how_did_you_know の値を、founds テーブルの値（例：'SNS', '職場', 'イベント' など）と照合し、一致すれば found_id をセットする。
  - 一致しない場合は、**found_id に「その他」の id をセット**し、**元の値は found_other に記録**する。

---

## 16. registration_datetime / acquisition_datetime → created_at
- **対応:**  
  - registration_datetime の値を users テーブルの created_at として採用する。  
  - acquisition_datetime は移行対象外とする。

---

## 17. コメント (comments) と警告 (warnings)
- **対応:**  
  - old_users に該当カラムが存在しないため、users では初期値として NULL または空文字を設定する。

# old_logs から seat_usage_logs への最終移行計画

以下は、old_logs の各カラムを seat_usage_logs に移行する際の最終的な対応方針です。

---

## 1. 主キー (id)
- **対応:**  
  old_logs の id は保持せず、seat_usage_logs の id は新規に自動採番されるものを使用する。

---

## 2. document_id
- **対応:**  
  このカラムは移行対象外とする。

---

## 3. member_number → user_id
- **対応:**  
  old_logs の member_number の値を基に、old_users から users への移行後の users テーブル内の該当レコードを照合し、そのユーザーの id を user_id に設定する。  
  **注意:**  
  対応するユーザーが見つからなかった場合は、そのレコードをスキップする。

---

## 4. space → seat_id
- **対応:**  
  old_logs の space の値は、old_seats の文字列情報からパースして該当する seat の id を取得し、seat_id に設定する。  
  **注意:**  
  該当する seat を特定できない場合は、そのレコードをスキップする。

---

## 5. start_time (time) → start_time (timestamptz)
- **対応:**  
  old_logs の start_time の値に、registration_datetime の日付部分を結合して完全な timestamptz として保存する。  
  **注意:**  
  - start_time が NULL の場合は、9:00 を設定する。  
  - タイムゾーン情報も適切に反映するように変換する。

---

## 6. end_time (time) → end_time (timestamptz)
- **対応:**  
  start_time と同様に、old_logs の end_time の値に registration_datetime の日付部分を結合して、完全な timestamptz として保存する。  
  **注意:**  
  - end_time が NULL の場合は、22:00 を設定する。  
  - タイムゾーン情報も適切に反映する。

---

## 7. registration_datetime → created_at
- **対応:**  
  old_logs の registration_datetime の値をそのまま、seat_usage_logs の created_at として利用する。

---

## 8. acquisition_datetime
- **対応:**  
  このカラムは移行対象外とする。

---

## 9. remarks
- **対応:**  
  old_logs に該当するカラムが存在しないため、seat_usage_logs の remarks は初期値として NULL とする。
