# null check
## query
```sql
SELECT 
  SUM(CASE WHEN document_id IS NULL THEN 1 ELSE 0 END) AS null_document_id,
  SUM(CASE WHEN member_number IS NULL THEN 1 ELSE 0 END) AS null_member_number,
  SUM(CASE WHEN space IS NULL THEN 1 ELSE 0 END) AS null_space,
  SUM(CASE WHEN start_time IS NULL THEN 1 ELSE 0 END) AS null_start_time,
  SUM(CASE WHEN end_time IS NULL THEN 1 ELSE 0 END) AS null_end_time,
  SUM(CASE WHEN registration_datetime IS NULL THEN 1 ELSE 0 END) AS null_registration_datetime,
  SUM(CASE WHEN acquisition_datetime IS NULL THEN 1 ELSE 0 END) AS null_acquisition_datetime
FROM old_logs;
```

## result
| null_document_id | null_member_number | null_space | null_start_time | null_end_time | null_registration_datetime | null_acquisition_datetime |
| ---------------- | ------------------ | ---------- | --------------- | ------------- | -------------------------- | ------------------------- |
| 63145            | 141                | 15         | 12              | 6494          | 0                          | 0                         |

# space
## query
```sql
SELECT space, COUNT(*) AS count
FROM old_logs
GROUP BY space
order by space;
```
## result
| space                 | count |
| --------------------- | ----- |
|                       | 3     |
| MAKERSスペース            | 488   |
| MAKERSスペース：３１         | 5029  |
| MAKERSスペース：３２         | 1879  |
| MAKERSスペース：３３         | 545   |
| MAKERSスペース：３４         | 112   |
| Underスペース：防音室         | 2204  |
| Underスペース：１１          | 4330  |
| Underスペース：１２          | 2643  |
| Underスペース：１３          | 1276  |
| Underスペース：１４          | 669   |
| Underスペース：１５          | 300   |
| underスペース             | 228   |
| underスペース：防音室         | 606   |
| underスペース：１１          | 2     |
| underスペース：１２          | 2     |
| イベント参加                | 100   |
| テラス                   | 12    |
| テラス：４１                | 271   |
| テラス：４２                | 45    |
| ミーティングスペース            | 474   |
| ミーティングスペース（コワーキング）：２１ | 2     |
| ミーティングスペース：２１         | 2039  |
| ミーティングスペース：２２         | 1626  |
| ミーティングスペース：２３         | 780   |
| ミーティングスペース：２４         | 267   |
| ミーティングスペース：２５         | 86    |
| ミーティングスペース：２６         | 24    |
| ミーティング：２１             | 2     |
| ミーティング：２２             | 4     |
| ミーティング：２３             | 4     |
| メインホール                | 78    |
| メインホール：１０7            | 2     |
| メインホール：１０１            | 9714  |
| メインホール：１０２            | 8441  |
| メインホール：１０３            | 7277  |
| メインホール：１０４            | 6259  |
| メインホール：１０５            | 5053  |
| メインホール：１０６            | 3916  |
| メインホール：１０７            | 4609  |
| メインホール：１０８            | 3413  |
| メインホール：１０９            | 2507  |
| メインホール：１１4           | 2     |
| メインホール：１１０            | 1607  |
| メインホール：１１１            | 1173  |
| メインホール：１１２            | 669   |
| メインホール：１１３            | 1479  |
| メインホール：１１４            | 779   |
| メインホール：１１５            | 428   |
| メインホール：１１６            | 162   |
| メインホール：１１７            | 63    |
| メインホール：１１８            | 34    |
| メインホール：１１９            | 57    |
| 登録のみ                  | 50    |
| 集中スペース3               | 2     |
| 集中スペース１               | 944   |
| 集中スペース２               | 614   |
| 集中スペース３               | 544   |
| 集中スペース４               | 294   |
| 集中スペース５               | 524   |
| 集中スペース６               | 992   |
| 集中スペース：1              | 2     |
| 集中スペース：１              | 8474  |
| 集中スペース：２              | 4227  |
| 集中スペース：３              | 4666  |
| 集中スペース：４              | 1792  |
| 集中スペース：５              | 3519  |
| 集中スペース：６              | 8495  |
| null                  | 15    |