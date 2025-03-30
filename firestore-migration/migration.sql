BEGIN;

-- イレギュラーデータの調整


--ユーザーのマイグレーション
INSERT INTO users (
  id,
  name,
  pronunciation,
  email,
  phone,
  prefecture_id,
  prefecture_other,
  city,
  address,
  building,
  belong_id,
  belong_other,
  job_id,
  job_other,
  found_id,
  found_other,
  created_at
)
SELECT
  CAST(trim(member_number) AS bigint) AS id,
  full_name,
  furigana,
  email,
  phone_number,
  p.prefecture_id AS prefecture_id,
  CASE WHEN p.prefecture_id IS NULL THEN prefecture ELSE NULL END AS prefecture_other,
  city,
  address,
  building,
  COALESCE(b.belong_id, (SELECT belong_id FROM belong_translations WHERE name = 'その他')) AS belong_id,
  CASE WHEN b.belong_id IS NULL THEN affiliation ELSE NULL END AS belongs_other,
  COALESCE(j.job_id, (SELECT job_id FROM job_translations WHERE name = 'その他')) AS job_id,
  CASE WHEN j.job_id IS NULL OR attribute = '' THEN attribute ELSE NULL END AS job_other,
  COALESCE(f.found_id, (SELECT found_id FROM found_translations WHERE name = 'その他')) AS found_id,
  CASE WHEN f.found_id IS NULL THEN how_did_you_know ELSE NULL END AS found_other,
  coalesce(registration_datetime,now()) AS created_at
FROM old_users
LEFT JOIN prefecture_translations p
  ON old_users.prefecture = p.name
  and p.locale='ja'
LEFT JOIN belong_translations b
  ON old_users.affiliation = b.name
  and b.locale='ja'
LEFT JOIN job_translations j
  ON old_users.attribute = j.name
  and j.locale='ja'
LEFT JOIN found_translations f
  ON old_users.how_did_you_know = f.name
  and f.locale='ja';


--座席ログのマイグレーション

WITH normalized AS (
  SELECT
    o.*,
    o.member_number AS old_member_number,
    translate(
      CASE
        WHEN o.space IS NULL OR trim(o.space) = '' THEN 'その他'
        WHEN o.space ILIKE 'underスペース%' THEN regexp_replace(o.space, '^underスペース', 'Underスペース')
        WHEN o.space ILIKE 'ミーティングスペース（コワーキング）%' THEN regexp_replace(o.space, '^ミーティングスペース（コワーキング）', 'ミーティングスペース')
        WHEN o.space ILIKE 'ミーティング%' AND o.space NOT ILIKE 'ミーティングスペース%' THEN regexp_replace(o.space, '^ミーティング', 'ミーティングスペース')
        ELSE o.space
      END,
      '：０１２３４５６７８９',
      ':0123456789'
    ) AS normalized_space
  FROM old_logs o
),
final_norm AS (
  SELECT
    *,
    CASE
      -- 「防音室」で終わる場合はそのまま採用
      WHEN normalized_space ~* '防音室$' THEN normalized_space
      -- 末尾が数字の場合、正規表現で「テキスト:数字」の形に整形
      WHEN normalized_space ~* '^(.*?)(:)?([0-9]+)$'
        THEN regexp_replace(normalized_space, '^(.+?)(:)?([0-9]+)$', '\1:\3')
      ELSE 'その他'
    END AS final_normalized_space
  FROM normalized
)
INSERT INTO seat_usage_logs (seat_id, user_id, start_time, end_time, remarks, created_at)
SELECT
  COALESCE(s.id, (SELECT id FROM seats WHERE name = 'その他')) AS seat_id,
  u.id AS user_id,
  (f.registration_datetime::date + COALESCE(f.start_time, '09:00'::time))::timestamptz AS start_time,
  (f.registration_datetime::date + COALESCE(f.end_time, '22:00'::time))::timestamptz AS end_time,
  NULL AS remarks,
  f.registration_datetime AS created_at
FROM final_norm f
INNER JOIN users u
  ON u.id = CAST(translate(trim(f.old_member_number), '０１２３４５６７８９', '0123456789') AS bigint)
LEFT JOIN seats s
  ON s.name = f.final_normalized_space;

-- NFCデータのマイグレーション
INSERT INTO nfcs (user_id, nfc_id)
SELECT u.id, o.nfc_id
FROM old_nfcs o
JOIN users u ON u.id = o.member_number::bigint;

COMMIT;
