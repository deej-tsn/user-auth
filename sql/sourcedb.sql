USE userauth;

CREATE TABLE posts (
    `id` SERIAL NOT NULL,
    `title` character varying(50) NOT NULL,
    `body` text NOT NULL,
    `rank` ENUM('beginner', 'intermediate', 'expert') DEFAULT (ELT(0.5 + RAND() * 3, 'beginner', 'intermediate', 'expert'));
);

CREATE TABLE users (
    id SERIAL NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    last_login timestamp default now(),
    passhash character varying(256) NOT NULL,
    `rank` ENUM('beginner','intermediate','expert') DEFAULT 'beginner'
);
