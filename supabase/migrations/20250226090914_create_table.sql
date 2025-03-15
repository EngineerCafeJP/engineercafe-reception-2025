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

-- 都道府県テーブル
CREATE TABLE
  IF NOT EXISTS prefectures (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now ()
  );

INSERT INTO
  prefectures (name)
VALUES
  ('北海道'),
  ('青森県'),
  ('岩手県'),
  ('宮城県'),
  ('秋田県'),
  ('山形県'),
  ('福島県'),
  ('茨城県'),
  ('栃木県'),
  ('群馬県'),
  ('埼玉県'),
  ('千葉県'),
  ('東京都'),
  ('神奈川県'),
  ('新潟県'),
  ('富山県'),
  ('石川県'),
  ('福井県'),
  ('山梨県'),
  ('長野県'),
  ('岐阜県'),
  ('静岡県'),
  ('愛知県'),
  ('三重県'),
  ('滋賀県'),
  ('京都府'),
  ('大阪府'),
  ('兵庫県'),
  ('奈良県'),
  ('和歌山県'),
  ('鳥取県'),
  ('島根県'),
  ('岡山県'),
  ('広島県'),
  ('山口県'),
  ('徳島県'),
  ('香川県'),
  ('愛媛県'),
  ('高知県'),
  ('福岡県'),
  ('佐賀県'),
  ('長崎県'),
  ('熊本県'),
  ('大分県'),
  ('宮崎県'),
  ('鹿児島県'),
  ('沖縄県'),
  ('その他');

-- 所属テーブル
CREATE TABLE
  IF NOT EXISTS belongs (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now ()
  );

INSERT INTO
  belongs (name)
VALUES
  ('個人'),
  ('コミュニティー'),
  ('法人'),
  ('その他');

-- 仕事テーブル
CREATE TABLE
  IF NOT EXISTS jobs (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now ()
  );

INSERT INTO
  jobs (name)
VALUES
  ('学生'),
  ('ネットワークエンジニア'),
  ('組み込みエンジニア'),
  ('サーバーエンジニア'),
  ('フロントエンドエンジニア'),
  ('プロジェクトマネージャー'),
  ('セキュリティエンジニア'),
  ('マークアップエンジニア'),
  ('ヘルプデスク'),
  ('営業'),
  ('コンサルティング'),
  ('経営者'),
  ('フリーランス'),
  ('その他');

-- きっかけテーブル
CREATE TABLE
  IF NOT EXISTS founds (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now ()
  );

INSERT INTO
  founds (name)
VALUES
  ('SNS'),
  ('職場'),
  ('イベント'),
  ('市政だより'),
  ('インターネットニュース'),
  ('新聞'),
  ('ラジオ'),
  ('知人の紹介'),
  ('その他');

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
    belongs_id bigint,
    -- 所属が「その他」の場合の自由入力欄
    belongs_other text,
    belongs_detail text,
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

INSERT INTO
  users (
    number,
    name,
    pronunciation,
    email,
    phone,
    prefecture_id,
    city,
    address,
    building,
    belongs_id,
    belongs_detail,
    job_id,
    found_id,
    comments
  )
VALUES
  (
    '999999',
    '山田太郎',
    'やまだたろう',
    'taro@example.com',
    '09012345678',
    (
      SELECT
        id
      FROM
        prefectures
      WHERE
        name = '東京都'
    ),
    '渋谷区',
    '神南1',
    '',
    (
      SELECT
        id
      FROM
        belongs
      WHERE
        name = '個人'
    ),
    'サンプルの詳細情報です。',
    (
      SELECT
        id
      FROM
        jobs
      WHERE
        name = '学生'
    ),
    (
      SELECT
        id
      FROM
        founds
      WHERE
        name = 'SNS'
    ),
    'サンプルのコメントです。'
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