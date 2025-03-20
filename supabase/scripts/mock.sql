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