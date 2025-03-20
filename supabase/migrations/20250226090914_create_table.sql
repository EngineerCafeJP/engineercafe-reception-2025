CREATE TABLE old_logs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  document_id integer,
  member_number text,
  space text,
  start_time time,
  end_time time,
  registration_datetime timestamp,
  acquisition_datetime timestamp
);

CREATE TABLE old_users (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  document_id text,
  member_number text,
  full_name text,
  furigana text,
  phone_number text,
  email text,
  affiliation text,
  affiliation_detail text,
  attribute text,
  prefecture text,
  city text,
  address text,
  building text,
  how_did_you_know text,
  registration_datetime timestamp,
  acquisition_datetime timestamp
);

CREATE TABLE old_nfcs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nfc_id text,
  number text
);

-- 都道府県テーブル
CREATE TABLE IF NOT EXISTS prefectures (
  id bigint PRIMARY KEY,
  created_at timestamptz DEFAULT now ()
);

INSERT INTO prefectures (id)
SELECT generate_series(1, 47);

INSERT INTO prefectures (id)
VALUES (99);

CREATE TABLE IF NOT EXISTS prefecture_translations (
  prefecture_id bigint NOT NULL,
  locale text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now (),
  PRIMARY KEY (prefecture_id, locale),
  FOREIGN KEY (prefecture_id) REFERENCES prefectures(id)
);

INSERT INTO prefecture_translations (prefecture_id, locale, name)
VALUES
  (1, 'ja', '北海道'),
  (2, 'ja', '青森県'),
  (3, 'ja', '岩手県'),
  (4, 'ja', '宮城県'),
  (5, 'ja', '秋田県'),
  (6, 'ja', '山形県'),
  (7, 'ja', '福島県'),
  (8, 'ja', '茨城県'),
  (9, 'ja', '栃木県'),
  (10, 'ja', '群馬県'),
  (11, 'ja', '埼玉県'),
  (12, 'ja', '千葉県'),
  (13, 'ja', '東京都'),
  (14, 'ja', '神奈川県'),
  (15, 'ja', '新潟県'),
  (16, 'ja', '富山県'),
  (17, 'ja', '石川県'),
  (18, 'ja', '福井県'),
  (19, 'ja', '山梨県'),
  (20, 'ja', '長野県'),
  (21, 'ja', '岐阜県'),
  (22, 'ja', '静岡県'),
  (23, 'ja', '愛知県'),
  (24, 'ja', '三重県'),
  (25, 'ja', '滋賀県'),
  (26, 'ja', '京都府'),
  (27, 'ja', '大阪府'),
  (28, 'ja', '兵庫県'),
  (29, 'ja', '奈良県'),
  (30, 'ja', '和歌山県'),
  (31, 'ja', '鳥取県'),
  (32, 'ja', '島根県'),
  (33, 'ja', '岡山県'),
  (34, 'ja', '広島県'),
  (35, 'ja', '山口県'),
  (36, 'ja', '徳島県'),
  (37, 'ja', '香川県'),
  (38, 'ja', '愛媛県'),
  (39, 'ja', '高知県'),
  (40, 'ja', '福岡県'),
  (41, 'ja', '佐賀県'),
  (42, 'ja', '長崎県'),
  (43, 'ja', '熊本県'),
  (44, 'ja', '大分県'),
  (45, 'ja', '宮崎県'),
  (46, 'ja', '鹿児島県'),
  (47, 'ja', '沖縄県'),
  (99, 'ja', 'その他');

INSERT INTO prefecture_translations (prefecture_id, locale, name)
VALUES
  (1, 'en', 'Hokkaido'),
  (2, 'en', 'Aomori'),
  (3, 'en', 'Iwate'),
  (4, 'en', 'Miyagi'),
  (5, 'en', 'Akita'),
  (6, 'en', 'Yamagata'),
  (7, 'en', 'Fukushima'),
  (8, 'en', 'Ibaraki'),
  (9, 'en', 'Tochigi'),
  (10, 'en', 'Gunma'),
  (11, 'en', 'Saitama'),
  (12, 'en', 'Chiba'),
  (13, 'en', 'Tokyo'),
  (14, 'en', 'Kanagawa'),
  (15, 'en', 'Niigata'),
  (16, 'en', 'Toyama'),
  (17, 'en', 'Ishikawa'),
  (18, 'en', 'Fukui'),
  (19, 'en', 'Yamanashi'),
  (20, 'en', 'Nagano'),
  (21, 'en', 'Gifu'),
  (22, 'en', 'Shizuoka'),
  (23, 'en', 'Aichi'),
  (24, 'en', 'Mie'),
  (25, 'en', 'Shiga'),
  (26, 'en', 'Kyoto'),
  (27, 'en', 'Osaka'),
  (28, 'en', 'Hyogo'),
  (29, 'en', 'Nara'),
  (30, 'en', 'Wakayama'),
  (31, 'en', 'Tottori'),
  (32, 'en', 'Shimane'),
  (33, 'en', 'Okayama'),
  (34, 'en', 'Hiroshima'),
  (35, 'en', 'Yamaguchi'),
  (36, 'en', 'Tokushima'),
  (37, 'en', 'Kagawa'),
  (38, 'en', 'Ehime'),
  (39, 'en', 'Kochi'),
  (40, 'en', 'Fukuoka'),
  (41, 'en', 'Saga'),
  (42, 'en', 'Nagasaki'),
  (43, 'en', 'Kumamoto'),
  (44, 'en', 'Oita'),
  (45, 'en', 'Miyazaki'),
  (46, 'en', 'Kagoshima'),
  (47, 'en', 'Okinawa'),
  (99, 'en', 'Other');

-- 所属テーブル
CREATE TABLE IF NOT EXISTS belongs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now ()
);

INSERT INTO belongs (created_at)
SELECT now()
FROM generate_series(1, 4);

CREATE TABLE IF NOT EXISTS belong_translations (
  belong_id bigint NOT NULL,
  locale text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now (),
  PRIMARY KEY (belong_id, locale),
  FOREIGN KEY (belong_id) REFERENCES belongs(id)
);

INSERT INTO belong_translations (belong_id, locale, name)
VALUES
  (1, 'ja', '個人'),
  (1, 'en', 'Individual'),
  (2, 'ja', 'コミュニティー'),
  (2, 'en', 'Community'),
  (3, 'ja', '法人'),
  (3, 'en', 'Corporation'),
  (4, 'ja', 'その他'),
  (4, 'en', 'Other');

-- 仕事テーブル
CREATE TABLE IF NOT EXISTS jobs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now ()
);

INSERT INTO jobs (created_at)
SELECT now()
FROM generate_series(1, 14);

CREATE TABLE IF NOT EXISTS job_translations (
  job_id bigint NOT NULL,
  locale text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now (),
  PRIMARY KEY (job_id, locale),
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);

INSERT INTO job_translations (job_id, locale, name)
VALUES
  (1, 'ja', '学生'),
  (1, 'en', 'Student'),  
  (2, 'ja', 'ネットワークエンジニア'),
  (2, 'en', 'Network Engineer'),
  (3, 'ja', '組み込みエンジニア'),
  (3, 'en', 'Embedded Engineer'),
  (4, 'ja', 'サーバーエンジニア'),
  (4, 'en', 'Server Engineer'),
  (5, 'ja', 'フロントエンドエンジニア'),
  (5, 'en', 'Frontend Engineer'),
  (6, 'ja', 'プロジェクトマネージャー'),
  (6, 'en', 'Project Manager'),
  (7, 'ja', 'セキュリティエンジニア'),
  (7, 'en', 'Security Engineer'),
  (8, 'ja', 'マークアップエンジニア'),
  (8, 'en', 'Markup Engineer'),
  (9, 'ja', 'ヘルプデスク'),
  (9, 'en', 'Help Desk'),
  (10, 'ja', '営業'),
  (10, 'en', 'Sales'),
  (11, 'ja', 'コンサルティング'),
  (11, 'en', 'Consulting'),
  (12, 'ja', '経営者'),
  (12, 'en', 'Executive'),
  (13, 'ja', 'フリーランス'),
  (13, 'en', 'Freelance'),
  (14, 'ja', 'その他'),
  (14, 'en', 'Other');

-- きっかけテーブル
CREATE TABLE IF NOT EXISTS founds (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now ()
);

INSERT INTO founds (created_at)
SELECT now()
FROM generate_series(1, 11);

CREATE TABLE IF NOT EXISTS found_translations (
  found_id bigint NOT NULL,
  locale text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now (),
  PRIMARY KEY (found_id, locale),
  FOREIGN KEY (found_id) REFERENCES founds(id)
);

INSERT INTO found_translations (found_id, locale, name)
VALUES
  (1, 'ja', 'LinkedIn'),
  (1, 'en', 'LinkedIn'),
  (2, 'ja', 'WhatsApp'),
  (2, 'en', 'WhatsApp'),
  (3, 'ja', 'その他SNS（X,Facebook,etc）'),
  (3, 'en', 'Other SNS (X, Facebook, etc)'),
  (4, 'ja', '職場'),
  (4, 'en', 'Workplace'),
  (5, 'ja', 'イベント'),
  (5, 'en', 'Event'),
  (6, 'ja', '市政だより'),
  (6, 'en', 'Municipal Newsletter'),
  (7, 'ja', 'インターネットニュース'),
  (7, 'en', 'Internet News'),
  (8, 'ja', '新聞'),
  (8, 'en', 'Newspaper'),
  (9, 'ja', 'ラジオ'),
  (9, 'en', 'Radio'),
  (10, 'ja', '知人の紹介'),
  (10, 'en', 'Referral'),
  (11, 'ja', 'その他'),
  (11, 'en', 'Other');

-- 座席カテゴリテーブル
CREATE TABLE
  IF NOT EXISTS seat_categories (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now ()
  );

INSERT INTO
  seat_categories (name)
VALUES
  ('集中スペース'),
  ('Underスペース'),
  ('ミーティングスペース'),
  ('MAKERSスペース'),
  ('テラス'),
  ('メインホール'),
  ('その他');

-- 座席テーブル
CREATE TABLE
  IF NOT EXISTS seats (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamptz DEFAULT now (),
    FOREIGN KEY (category_id) REFERENCES seat_categories (id)
  );

-- 集中スペース: 1～6
INSERT INTO seats (category_id, name)
SELECT id, concat('集中スペース', ':', gs.num)
FROM seat_categories, generate_series(1, 6) AS gs(num)
WHERE seat_categories.name = '集中スペース';

-- Underスペース: 11～15
INSERT INTO seats (category_id, name)
SELECT id, concat('Underスペース', ':', gs.num)
FROM seat_categories, generate_series(11, 15) AS gs(num)
WHERE seat_categories.name = 'Underスペース';

-- 防音室: 単一レコードとして登録
INSERT INTO seats (category_id, name)
SELECT id, 'Underスペース:防音室'
FROM seat_categories
WHERE name = 'Underスペース';

-- ミーティングスペース: 21～26
INSERT INTO seats (category_id, name)
SELECT id, concat('ミーティングスペース', ':', gs.num)
FROM seat_categories, generate_series(21, 26) AS gs(num)
WHERE seat_categories.name = 'ミーティングスペース';

-- MAKERSスペース: 31～34
INSERT INTO seats (category_id, name)
SELECT id, concat('MAKERSスペース', ':', gs.num)
FROM seat_categories, generate_series(31, 34) AS gs(num)
WHERE seat_categories.name = 'MAKERSスペース';

-- テラス: 41～42
INSERT INTO seats (category_id, name)
SELECT id, concat('テラス', ':', gs.num)
FROM seat_categories, generate_series(41, 42) AS gs(num)
WHERE seat_categories.name = 'テラス';

-- メインホール: 101～119
INSERT INTO seats (category_id, name)
SELECT id, concat('メインホール', ':', gs.num)
FROM seat_categories, generate_series(101, 119) AS gs(num)
WHERE seat_categories.name = 'メインホール';

-- その他: 単一レコードとして登録
INSERT INTO seats (category_id, name)
SELECT id, 'その他'
FROM seat_categories
WHERE name = 'その他';


CREATE TABLE
  IF NOT EXISTS users (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    number bigint UNIQUE,
    name text,
    pronunciation text,
    email text,
    phone text,
    prefecture_id bigint,
    prefecture_other text,
    city text,
    address text,
    building text,
    belong_id bigint,
    -- 所属が「その他」の場合の自由入力欄
    belong_other text,
    belong_detail text,
    job_id bigint,
    -- 職業が「その他」の場合の自由入力欄
    job_other text,
    found_id bigint,
    -- 見つけたきっかけが「その他」の場合の自由入力欄
    found_other text,
    comments text,
    warnings text,
    created_at timestamptz DEFAULT now (),
    FOREIGN KEY (prefecture_id) REFERENCES prefectures (id),
    FOREIGN KEY (belongs_id) REFERENCES belongs (id),
    FOREIGN KEY (job_id) REFERENCES jobs (id),
    FOREIGN KEY (found_id) REFERENCES founds (id)
  );

-- NFC
CREATE TABLE
  IF NOT EXISTS nfcs (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id bigint,
    nfc_id TEXT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

-- 座席利用
CREATE TABLE
  IF NOT EXISTS seat_usage_logs (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    seat_id bigint NOT NULL,
    user_id bigint NOT NULL,
    start_time timestamptz NOT NULL,
    end_time timestamptz,
    remarks text,
    created_at timestamptz NOT NULL DEFAULT now (),
    FOREIGN KEY (seat_id) REFERENCES seats (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );