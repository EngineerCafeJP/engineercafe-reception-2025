-- 利用者登録後のユーザーIDを取得するための関数とviewを作成
-- RLSをバイパスするための関数を作成
CREATE OR REPLACE FUNCTION public.get_latest_registration_user_id()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT id FROM users ORDER BY created_at DESC LIMIT 1;
$$;

-- 関数を未認証でも実行できるようにする
GRANT EXECUTE ON FUNCTION public.get_latest_registration_user_id() TO public;

-- 最後に登録したユーザーのidを取得するviewを作成
CREATE VIEW public.latest_registration_user_view WITH (security_invoker=true) AS
SELECT public.get_latest_registration_user_id() AS id;
