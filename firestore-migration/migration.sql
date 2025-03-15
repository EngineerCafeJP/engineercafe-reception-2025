BEGIN;

-- イレギュラーデータの調整


--ユーザーのマイグレーション
INSERT INTO users (
  number,
  name,
  pronunciation,
  email,
  phone,
  prefecture_id,
  prefecture_other,
  city,
  address,
  building,
  belongs_id,
  belongs_other,
  job_id,
  job_other,
  found_id,
  found_other,
  created_at
)
SELECT
  CAST(trim(member_number) AS bigint) AS number,
  full_name,
  furigana,
  email,
  phone_number,
  p.id AS prefecture_id,
  CASE WHEN p.id IS NULL THEN prefecture ELSE NULL END AS prefecture_other,
  city,
  address,
  building,
  COALESCE(b.id, (SELECT id FROM belongs WHERE name = 'その他')) AS belongs_id,
  CASE WHEN b.id IS NULL THEN affiliation ELSE NULL END AS belongs_other,
  COALESCE(j.id, (SELECT id FROM jobs WHERE name = 'その他')) AS job_id,
  CASE WHEN j.id IS NULL OR attribute = '' THEN attribute ELSE NULL END AS job_other,
  COALESCE(f.id, (SELECT id FROM founds WHERE name = 'その他')) AS found_id,
  CASE WHEN f.id IS NULL THEN how_did_you_know ELSE NULL END AS found_other,
  registration_datetime AS created_at
FROM old_users
LEFT JOIN prefectures p
  ON old_users.prefecture = p.name
LEFT JOIN belongs b
  ON old_users.affiliation = b.name
LEFT JOIN jobs j
  ON old_users.attribute = j.name
LEFT JOIN founds f
  ON old_users.how_did_you_know = f.name;

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
  ON u.number = CAST(translate(trim(f.old_member_number), '０１２３４５６７８９', '0123456789') AS bigint)
LEFT JOIN seats s
  ON s.name = f.final_normalized_space;

COMMIT;
