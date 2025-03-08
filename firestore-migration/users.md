# null check
## query
```sql
SELECT
  SUM(CASE WHEN document_id IS NULL THEN 1 ELSE 0 END) AS null_document_id,
  SUM(CASE WHEN member_number IS NULL THEN 1 ELSE 0 END) AS null_member_number,
  SUM(CASE WHEN full_name IS NULL THEN 1 ELSE 0 END) AS null_full_name,
  SUM(CASE WHEN furigana IS NULL THEN 1 ELSE 0 END) AS null_furigana,
  SUM(CASE WHEN phone_number IS NULL THEN 1 ELSE 0 END) AS null_phone_number,
  SUM(CASE WHEN email IS NULL THEN 1 ELSE 0 END) AS null_email,
  SUM(CASE WHEN affiliation IS NULL THEN 1 ELSE 0 END) AS null_affiliation,
  SUM(CASE WHEN affiliation_detail IS NULL THEN 1 ELSE 0 END) AS null_affiliation_detail,
  SUM(CASE WHEN attribute IS NULL THEN 1 ELSE 0 END) AS null_attribute,
  SUM(CASE WHEN prefecture IS NULL THEN 1 ELSE 0 END) AS null_prefecture,
  SUM(CASE WHEN city IS NULL THEN 1 ELSE 0 END) AS null_city,
  SUM(CASE WHEN address IS NULL THEN 1 ELSE 0 END) AS null_address,
  SUM(CASE WHEN building IS NULL THEN 1 ELSE 0 END) AS null_building,
  SUM(CASE WHEN how_did_you_know IS NULL THEN 1 ELSE 0 END) AS null_how_did_you_know,
  SUM(CASE WHEN registration_datetime IS NULL THEN 1 ELSE 0 END) AS null_registration_datetime,
  SUM(CASE WHEN acquisition_datetime IS NULL THEN 1 ELSE 0 END) AS null_acquisition_datetime
FROM old_users;

```

## result
| null_document_id | null_member_number | null_full_name | null_furigana | null_phone_number | null_email | null_affiliation | null_affiliation_detail | null_attribute | null_prefecture | null_city | null_address | null_building | null_how_did_you_know | null_registration_datetime | null_acquisition_datetime |
| ---------------- | ------------------ | -------------- | ------------- | ----------------- | ---------- | ---------------- | ----------------------- | -------------- | --------------- | --------- | ------------ | ------------- | --------------------- | -------------------------- | ------------------------- |
| 0                | 0                  | 1              | 8             | 74                | 195        | 3                | 6359                    | 4              | 2               | 2         | 271          | 2818          | 17                    | 6548                       | 0                         |

# affiliation
## query
```sql
SELECT affiliation, COUNT(*) AS count
FROM old_users
GROUP BY affiliation
ORDER BY affiliation;

```
## result
一部抜粋
| affiliation       | count |
| ----------------- | ----- |
| Community         | 4     |
| Corporate         | 21    |
| Individual        | 336   |
| TECH::EXPERT      | 1     |
| others            | 3     |
| アルバイト             | 1     |
| コミニティー            | 15    |
| コミュニティ            | 18    |
| コミュニティー           | 92    |
| コミュニティ（Community） | 28    |
| ジーズアカデミー受講生       | 1     |
| フリーランス            | 1     |

# attribute
## query
```sql
SELECT attribute, COUNT(*) AS count
FROM old_users
GROUP BY attribute
ORDER BY attribute;
```
## result
一部抜粋
| attribute              | count |
| ---------------------- | ----- |
| 8                      | 1     |
| Bridge system engineer | 1     |
| Business Development   | 1     |
| CADオペレーター              | 1     |
| CTO                    | 2     |
| CoderDojo              | 1     |
| Consulting             | 16    |
| DX                     | 1     |
| DX推進                   | 1     |
| Designer               | 23    |

# prefecture
一部抜粋
## query
```sql
SELECT prefecture, COUNT(*) AS count
FROM old_users
GROUP BY prefecture
ORDER BY prefecture;
```
## result
| prefecture        | count |
| ----------------- | ----- |
| -                 | 1     |
| 15 Bruce Ace      | 1     |
| 810-0031          | 1     |
| 812-0011          | 1     |
| Baden-Württemberg | 1     |
| Bergamo           | 1     |
| Berlin            | 2     |
| California        | 1     |
| California        | 1     |
| Cambridgeshire    | 1     |

# how_did_you_know
一部抜粋
## query
```sql
SELECT how_did_you_know, COUNT(*) AS count
FROM old_users
GROUP BY how_did_you_know
ORDER BY how_did_you_know;
```
## result
| how_did_you_know                                                                           | count |
| ------------------------------------------------------------------------------------------ | ----- |
|                                                                                            | 1     |
|  hhkb トライスポット                                                                              | 1     |
|  i have met a girl called Yukari San at an international event and she suggested this cafe | 1     |
|  知人                                                                                        | 1     |
|  知人の紹介                                                                                     | 1     |
| AIPでのインターン                                                                                 | 1     |
| Acquaintance                                                                               | 1     |
| Artist Cafe Fukuoka                                                                        | 1     |
| At the event                                                                               | 32    |
| Billy                                                                                      | 1     |