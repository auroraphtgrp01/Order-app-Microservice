SELECT variants.id,
    variants.price,
    input_data->>'quantities' AS quantities
FROM (
        SELECT jsonb_array_elements($1::jsonb) AS input_data
    ) AS input_data
    JOIN variants ON input_data->>'id' = variants.id::text;