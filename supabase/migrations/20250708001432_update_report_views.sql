
CREATE OR REPLACE VIEW public.seat_usage_daily_reports_view with(security_invoker=true) AS
  SELECT
    DATE(usages.created_at) AS date,

    COUNT(users.id) AS total_users, -- 全ての延べ利用数
    COUNT(DISTINCT users.id) AS unique_users, -- ユニークなユーザー数

    COUNT(CASE WHEN users.non_japanese = true THEN 1 END) AS total_overseas_users, -- 海外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.non_japanese = true THEN users.id END) AS unique_overseas_users, -- 海外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id NOT IN (99, 40) THEN 1 END) AS total_outside_fukuoka_pref_users, -- 福岡県外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id NOT IN (99, 40) THEN users.id END) AS unique_outside_fukuoka_pref_users, -- 福岡県外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 THEN 1 END) AS total_fukuoka_pref_users, -- 福岡県ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 THEN users.id END) AS unique_fukuoka_pref_users, -- 福岡県ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 AND users.city NOT LIKE '%福岡市%' THEN 1 END) AS total_outside_fukuoka_city_users, -- 福岡市外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 AND users.city NOT LIKE '%福岡市%' THEN users.id END) AS unique_outside_fukuoka_city_users, -- 福岡市外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 AND users.city LIKE '%福岡市%' THEN 1 END) AS total_fukuoka_city_users, -- 福岡市ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 AND users.city LIKE '%福岡市%' THEN users.id END) AS unique_fukuoka_city_users -- 福岡市ユーザーのユニーク数
  FROM
    seat_usage_logs AS usages
  JOIN
    users ON usages.user_id = users.id
  WHERE
    usages.is_delete IS NULL OR usages.is_delete = FALSE
  GROUP BY
    DATE(usages.created_at);


CREATE OR REPLACE VIEW public.seat_usage_monthly_reports_view with(security_invoker=true) AS
  SELECT
    TO_CHAR(DATE_TRUNC('month', usages.created_at), 'YYYY-MM') AS month,

    COUNT(users.id) AS total_users, -- 全ての延べ利用数
    COUNT(DISTINCT users.id) AS unique_users, -- ユニークなユーザー数

    COUNT(CASE WHEN users.non_japanese = true THEN 1 END) AS total_overseas_users, -- 海外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.non_japanese = true THEN users.id END) AS unique_overseas_users, -- 海外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id NOT IN (99, 40) THEN 1 END) AS total_outside_fukuoka_pref_users, -- 福岡県外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id NOT IN (99, 40) THEN users.id END) AS unique_outside_fukuoka_pref_users, -- 福岡県外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 THEN 1 END) AS total_fukuoka_pref_users, -- 福岡県ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 THEN users.id END) AS unique_fukuoka_pref_users, -- 福岡県ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 AND users.city NOT LIKE '%福岡市%' THEN 1 END) AS total_outside_fukuoka_city_users, -- 福岡市外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 AND users.city NOT LIKE '%福岡市%' THEN users.id END) AS unique_outside_fukuoka_city_users, -- 福岡市外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 AND users.city LIKE '%福岡市%' THEN 1 END) AS total_fukuoka_city_users, -- 福岡市ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 AND users.city LIKE '%福岡市%' THEN users.id END) AS unique_fukuoka_city_users -- 福岡市ユーザーのユニーク数
  FROM
    seat_usage_logs AS usages
  JOIN
    users ON usages.user_id = users.id
  WHERE
    usages.is_delete IS NULL OR usages.is_delete = FALSE
  GROUP BY
    DATE_TRUNC('month', usages.created_at);

CREATE OR REPLACE VIEW public.seat_usage_yearly_reports_view with(security_invoker=true) AS
  SELECT
    TO_CHAR(DATE_TRUNC('year', usages.created_at), 'YYYY') AS year,

    COUNT(users.id) AS total_users, -- 全ての延べ利用数
    COUNT(DISTINCT users.id) AS unique_users, -- ユニークなユーザー数

    COUNT(CASE WHEN users.non_japanese = true THEN 1 END) AS total_overseas_users, -- 海外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.non_japanese = true THEN users.id END) AS unique_overseas_users, -- 海外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id NOT IN (99, 40) THEN 1 END) AS total_outside_fukuoka_pref_users, -- 福岡県外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id NOT IN (99, 40) THEN users.id END) AS unique_outside_fukuoka_pref_users, -- 福岡県外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 THEN 1 END) AS total_fukuoka_pref_users, -- 福岡県ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 THEN users.id END) AS unique_fukuoka_pref_users, -- 福岡県ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 AND users.city NOT LIKE '%福岡市%' THEN 1 END) AS total_outside_fukuoka_city_users, -- 福岡市外ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 AND users.city NOT LIKE '%福岡市%' THEN users.id END) AS unique_outside_fukuoka_city_users, -- 福岡市外ユーザーのユニーク数

    COUNT(CASE WHEN users.prefecture_id = 40 AND users.city LIKE '%福岡市%' THEN 1 END) AS total_fukuoka_city_users, -- 福岡市ユーザーの延べ利用数
    COUNT(DISTINCT CASE WHEN users.prefecture_id = 40 AND users.city LIKE '%福岡市%' THEN users.id END) AS unique_fukuoka_city_users -- 福岡市ユーザーのユニーク数
  FROM
    seat_usage_logs AS usages
  JOIN
    users ON usages.user_id = users.id
  WHERE
    usages.is_delete IS NULL OR usages.is_delete = FALSE
  GROUP BY
    DATE_TRUNC('year', usages.created_at);
