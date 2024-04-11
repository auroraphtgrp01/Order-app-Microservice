CREATE TABLE IF NOT EXISTS images (
    id UUID DEFAULT gen_random_uuid(),
    path TEXT NOT NULL,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP(3) DEFAULT NULL,
    createdBy JSONB,
    updatedBy JSONB,
    deletedAt TIMESTAMP(3) DEFAULT NULL,
    deletedBy JSONB,
    CONSTRAINT Image_pkey PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP(3) DEFAULT NULL,
    createdBy JSONB,
    updatedBy JSONB,
    deletedAt TIMESTAMP(3) DEFAULT NULL,
    deletedBy JSONB,
    CONSTRAINT Product_pkey PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS product_images (
    id UUID DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL,
    images_id UUID NOT NULL,
    CONSTRAINT PK_idProductImage PRIMARY KEY (id),
    CONSTRAINT FK_productId FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT FK_imageId FOREIGN KEY (images_id) REFERENCES images(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS variants(
    id UUID DEFAULT gen_random_uuid(),
    color VARCHAR(30),
    type VARCHAR(30),
    price VARCHAR(30),
    quantities INTEGER NOT NULL,
    idProduct UUID NOT NULL,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP(3) DEFAULT NULL,
    createdBy JSONB,
    updatedBy JSONB,
    deletedAt TIMESTAMP(3) DEFAULT NULL,
    deletedBy JSONB,
    CONSTRAINT Variant_pkey PRIMARY KEY (id),
    CONSTRAINT FK_productId FOREIGN KEY (idProduct) REFERENCES products(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid(),
    userId UUID NOT NULL,
    variant JSONB NOT NULL,
    total NUMERIC(50, 5) NOT NULL,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP(3) DEFAULT NULL,
    createdBy JSONB,
    updatedBy JSONB,
    deletedAt TIMESTAMP(3) DEFAULT NULL,
    deletedBy JSONB,
    CONSTRAINT FK_usersId FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT PK_Orders PRIMARY KEY (id)
);