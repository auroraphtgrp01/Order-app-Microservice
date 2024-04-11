INSERT INTO orders(userid, variant, total)
VALUES($1, $2::jsonb, $3);