-- GET USER BY CONDITION
CREATE OR REPLACE FUNCTION get_users_by_condition(
        _skip INTEGER DEFAULT NULL,
        _limit INTEGER DEFAULT NULL,
        _orderby VARCHAR DEFAULT NULL,
        _id UUID DEFAULT NULL,
        _email VARCHAR DEFAULT NULL
    ) RETURNS SETOF users AS $$
DECLARE result RECORD;
BEGIN RETURN QUERY
SELECT *
FROM users
WHERE (
        id = _id
        OR _id IS NULL
    )
    AND (
        email = _email
        OR _email IS NULL
    )
ORDER BY CASE
        WHEN _orderby = 'DESC' THEN created_at
    END DESC NULLS LAST,
    created_at ASC NULLS LAST
LIMIT COALESCE(_limit, 10) OFFSET COALESCE(_skip, 0);
END;
$$ LANGUAGE plpgsql;
-- REGISTER NEW USER
CREATE OR REPLACE FUNCTION register(
        _email VARCHAR,
        _username VARCHAR,
        _password VARCHAR
    ) RETURNS TEXT AS $$
DECLARE _isExits BOOLEAN;
BEGIN
SELECT TRUE INTO _isExits
FROM users
WHERE email = _email
    OR username = _username
LIMIT 1;
IF _isExits THEN RETURN 'User with provided email or username already exists.';
ELSE
INSERT INTO users (username, password, email)
VALUES (_username, _password, _email);
RETURN 'User registered successfully.';
END IF;
END;
$$ LANGUAGE plpgsql;
-- COUNT RECORD
CREATE OR REPLACE FUNCTION countRecord(_tableName VARCHAR) RETURNS INTEGER AS $$
DECLARE _count INTEGER;
BEGIN EXECUTE 'SELECT COUNT(*) FROM ' || _tableName INTO _count;
RETURN _count;
END;
$$ LANGUAGE plpgsql;
-- UPDATE A USER
CREATE OR REPLACE FUNCTION updateUser(
        _id UUID DEFAULT NULL,
        _password VARCHAR DEFAULT NULL,
        _refresh_token VARCHAR DEFAULT NULL,
        _updatedBy JSONB DEFAULT NULL
    ) RETURNS VOID AS $$ BEGIN IF(_id IS NULL) THEN RETURN;
END IF;
UPDATE users
SET password = COALESCE(_password, password),
    updated_by = COALESCE(_updatedBy, updated_by),
    refresh_token = COALESCE(_refresh_token, refresh_token),
    updated_at = CURRENT_TIMESTAMP
WHERE id = _id;
END;
$$ LANGUAGE plpgsql;
-- SOFT DELETE USER RECORD
CREATE OR REPLACE FUNCTION softDelete(
        _id UUID DEFAULT NULL,
        _deleted_by JSONB DEFAULT NULL
    ) RETURNS VOID AS $$ BEGIN IF(_id IS NULL) THEN RETURN;
END IF;
UPDATE users
SET deleted_at = CURRENT_TIMESTAMP,
    deleted_by = COALESCE(_deleted_by, deleted_by)
WHERE id = _id;
END;
$$ LANGUAGE plpgsql;