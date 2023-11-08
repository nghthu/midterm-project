CREATE TABLE users (
    id              INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password        TEXT NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    tel             VARCHAR(255) NOT NULL,
    refresh_token   TEXT,
    sex             VARCHAR(255),
    address         TEXT,
)

INSERT INTO users(email, password, full_name, tel, refresh_token, sex, address)
VALUES ('example-user1@gmail.com', '$2b$10$lca/G7DsJE0kbXbHlOra6eRw3H6PQos.z06sTW.LcLWGDvOAaPhqa', 'Troye Sivan', '0123456789', '', 'male', 'Australia'),
('example-user2@gmail.com', '$2b$10$lca/G7DsJE0kbXbHlOra6eRw3H6PQos.z06sTW.LcLWGDvOAaPhqa', 'Adele', '0123456789', '', 'female', 'England'),
('example-user3@gmail.com', '$2b$10$lca/G7DsJE0kbXbHlOra6eRw3H6PQos.z06sTW.LcLWGDvOAaPhqa', 'Taylor Swift', '0123456789', '', 'female', 'America')