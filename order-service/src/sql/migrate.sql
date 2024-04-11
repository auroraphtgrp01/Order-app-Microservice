INSERT INTO public.images (
		id,
		"path",
		createdat,
		updatedat,
		createdby,
		updatedby,
		deletedat,
		deletedby
	)
VALUES (
		'd765a901-b45f-4c40-9c25-6d86fad62aa7',
		'https://cdn.tgdd.vn/Products/Images/42/281570/iphone-15-hong-thumb-1-600x600.jpg',
		'2024-04-11 13:50:06.147',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'9dacfb13-7300-40e2-a4ba-a0cc0a59b4bb',
		'https://stcv4.hnammobile.com/downloads/3/danh-gia-iphone-14-pro-14-pro-max-lieu-co-du-suc-khuynh-dao-gioi-cong-nghe-11663319473.jpg',
		'2024-04-11 13:50:06.147',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'3c868f12-c367-4ae4-973c-2f9e38c78764',
		'https://cdn.xtmobile.vn/vnt_upload/product/11_2023/thumbs/600_xiaomi_14_d_b6f8709d44fa433397ab_1.jpg',
		'2024-04-11 13:50:06.147',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'91fcca23-bdd0-43b3-9e7b-d3bc41a9217c',
		'https://cdn.tgdd.vn/Products/Images/42/320336/product-320336-141223-035308-600x600.jpg',
		'2024-04-11 13:50:06.147',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	);
INSERT INTO public.products (
		id,
		"name",
		description,
		createdat,
		updatedat,
		createdby,
		updatedby,
		deletedat,
		deletedby
	)
VALUES (
		'9238d63b-24f4-4e69-8dd1-be9220fec2be',
		'Iphone 15 Pro',
		'Đây là Iphone 15 Pro',
		'2024-04-11 13:50:42.769',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'd3b6dfb7-0b99-4cd6-8567-efeb7794f071',
		'Iphone 14 Pro',
		'Đây là Iphone 14 Pro',
		'2024-04-11 13:51:00.825',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'59971b5c-14e6-4089-9559-96d173c78d04',
		'Xiaomi 14',
		'Đây là Xiaomi 14',
		'2024-04-11 13:51:27.184',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'58ce8503-b492-44b2-9708-573c7428abbe',
		'Xiaomi 15',
		'Đây là Xiaomi 15',
		'2024-04-11 13:51:27.189',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	);
INSERT INTO public.product_images (id, product_id, images_id)
VALUES (
		'b6f78943-837c-4d0a-bb97-7d08f91c93b8',
		'58ce8503-b492-44b2-9708-573c7428abbe',
		'91fcca23-bdd0-43b3-9e7b-d3bc41a9217c'
	),
	(
		'92aedd6b-a63c-4ba2-b3f2-96000b002a25',
		'59971b5c-14e6-4089-9559-96d173c78d04',
		'3c868f12-c367-4ae4-973c-2f9e38c78764'
	),
	(
		'392d3700-74a7-425d-83e4-79944d599069',
		'd3b6dfb7-0b99-4cd6-8567-efeb7794f071',
		'9dacfb13-7300-40e2-a4ba-a0cc0a59b4bb'
	),
	(
		'fef491b4-560d-463f-84f1-e8b8dc0f9f16',
		'9238d63b-24f4-4e69-8dd1-be9220fec2be',
		'd765a901-b45f-4c40-9c25-6d86fad62aa7'
	);
INSERT INTO public.variants (
		id,
		color,
		"type",
		price,
		quantities,
		idproduct,
		createdat,
		updatedat,
		createdby,
		updatedby,
		deletedat,
		deletedby
	)
VALUES (
		'8c19b0b9-763a-44e8-89a1-47af12253ddf',
		'Xanh',
		'256GB',
		'19220000',
		8,
		'9238d63b-24f4-4e69-8dd1-be9220fec2be',
		'2024-04-11 14:00:42.065',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'd3b6dfb7-0b99-4cd6-8567-efeb7794f071',
		'Tím',
		'512GB',
		'19283922',
		12,
		'd3b6dfb7-0b99-4cd6-8567-efeb7794f071',
		'2024-04-11 14:01:26.949',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'8ce2879d-aa17-4a70-87c1-bf431aa5fcec',
		'Xanh Lam ',
		'128GB',
		'15090000',
		10,
		'59971b5c-14e6-4089-9559-96d173c78d04',
		'2024-04-11 14:02:11.524',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'29e94dfa-6020-4e84-b0ee-2ffc3dbbc543',
		'Hồng',
		'256GB',
		'21000000',
		7,
		'59971b5c-14e6-4089-9559-96d173c78d04',
		'2024-04-11 14:02:28.537',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'10c1bc80-a8a7-441f-9d17-91564aa6d27d',
		'Tím',
		'512GB',
		'18000000',
		2,
		'58ce8503-b492-44b2-9708-573c7428abbe',
		'2024-04-11 14:02:47.864',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'02db0279-e28f-4401-9ca6-ccab22be8cd5',
		'Vàng',
		'128GB',
		'17000000',
		11,
		'58ce8503-b492-44b2-9708-573c7428abbe',
		'2024-04-11 14:03:07.088',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'9c44c8e0-a387-47e4-a573-b97e257819c8',
		'Đỏ ',
		'128GB',
		'17000000',
		11,
		'9238d63b-24f4-4e69-8dd1-be9220fec2be',
		'2024-04-11 14:01:02.389',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	),
	(
		'd4ae162b-7ec3-4056-94d1-9ddd824c8697',
		'Vàng ',
		'128GB',
		'19000000',
		19,
		'd3b6dfb7-0b99-4cd6-8567-efeb7794f071',
		'2024-04-11 14:01:46.544',
		NULL,
		NULL,
		NULL,
		NULL,
		NULL
	);