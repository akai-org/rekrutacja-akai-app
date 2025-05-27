CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    password_hash VARCHAR(60) NOT NULL
);

INSERT INTO users (email, password_hash) VALUES ('marcin_kaczor', '$2a$12$f8Aa9.t4kmSe.80mp5tFseb31BUSx9d.E1KW/jEdG7.V7CFEYRpSK');
