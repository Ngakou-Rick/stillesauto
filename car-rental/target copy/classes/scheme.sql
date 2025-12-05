-- Schéma de la base de données pour Stilles Auto

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(255),
    country VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des véhicules
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INT,
    fuel_type VARCHAR(50),
    color VARCHAR(50),
    mileage BIGINT,
    license_plate VARCHAR(50) UNIQUE,
    vin VARCHAR(100) UNIQUE,
    vehicle_type VARCHAR(50),
    status VARCHAR(50),
    daily_rental_price NUMERIC(10, 2),
    sale_price NUMERIC(10, 2),
    description TEXT,
    image_url VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des accessoires
CREATE TABLE IF NOT EXISTS accessories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2),
    stock INT,
    image_url VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des locations
CREATE TABLE IF NOT EXISTS rentals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL,
    client_id UUID NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    pickup_location VARCHAR(255),
    return_location VARCHAR(255),
    total_price NUMERIC(10, 2),
    deposit_amount NUMERIC(10, 2),
    status VARCHAR(50),
    contract_path VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des retours de location
CREATE TABLE IF NOT EXISTS rental_returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rental_id UUID NOT NULL,
    return_date TIMESTAMP WITH TIME ZONE NOT NULL,
    final_mileage BIGINT,
    damage_description TEXT,
    damage_charge NUMERIC(10, 2) DEFAULT 0,
    refund_amount NUMERIC(10, 2) DEFAULT 0,
    inspection_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE
);

-- Table des ventes
CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL,
    buyer_id UUID NOT NULL,
    asking_price NUMERIC(10, 2),
    sold_price NUMERIC(10, 2),
    status VARCHAR(50),
    buyer_notes TEXT,
    seller_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des commandes d'accessoires
CREATE TABLE IF NOT EXISTS accessory_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    accessory_id UUID NOT NULL,
    client_id UUID NOT NULL,
    quantity INT NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (accessory_id) REFERENCES accessories(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des demandes d'import/export
CREATE TABLE IF NOT EXISTS import_export_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_brand VARCHAR(255) NOT NULL,
    vehicle_model VARCHAR(255) NOT NULL,
    vehicle_year INT,
    origin_country VARCHAR(100),
    destination_country VARCHAR(100),
    request_type VARCHAR(50) NOT NULL,
    estimated_cost NUMERIC(10, 2),
    status VARCHAR(50),
    notes TEXT,
    document_path VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
