CREATE OR REPLACE FUNCTION get_product_by_condition(
        _id UUID DEFAULT NULL,
        _name VARCHAR DEFAULT NULL,
        _orderby VARCHAR DEFAULT NULL,
        _skip INTEGER DEFAULT NULL,
        _limit INTEGER DEFAULT NULL
    ) RETURNS TABLE (
        product_id UUID,
        product_name TEXT,
        product_description TEXT,
        image_paths TEXT [],
        variants JSONB []
    ) AS $$ BEGIN RETURN QUERY
SELECT p.id AS product_id,
    p.name AS product_name,
    p.description AS product_description,
    ARRAY(
        SELECT DISTINCT i.path
        FROM product_images pi
            LEFT JOIN images i ON pi.images_id = i.id
        WHERE pi.product_id = p.id
    ) AS image_paths,
    ARRAY_AGG(
        jsonb_build_object(
            'type',
            va.type,
            'color',
            va.color,
            'quantities',
            va.quantities,
            'price',
            va.price,
            'id',
            va.id
        )
    ) AS variants
FROM products p
    LEFT JOIN variants va ON va.idproduct = p.id
WHERE (
        p.id = COALESCE(_id, p.id)
        OR _id IS NULL
    )
    AND (
        p.name ILIKE COALESCE(_name, p.name)
        OR _name IS NULL
    )
GROUP BY p.id,
    p.name,
    p.description
ORDER BY CASE
        WHEN _orderby = 'DESC' THEN p.createdat
    END DESC NULLS LAST,
    p.createdat ASC NULLS LAST
LIMIT COALESCE(_limit, 10) OFFSET COALESCE(_skip, 0);
END;
$$ LANGUAGE plpgsql;