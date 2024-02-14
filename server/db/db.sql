CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,   
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role_id INT NOT NULL
);

CREATE TABLE albums (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(50),
    band VARCHAR(50),
    year INT NOT NULL check(year >=1970 and year <=2100),
    genre VARCHAR(50),
    picture VARCHAR(50),
    description TEXT,
    video TEXT
);

CREATE TABLE reviews (
    reviews_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    album_id INT NOT NULL REFERENCES "albums"("id"),
    rating INT NOT NULL CHECK(RATING >=1 AND RATING <=10)
);

CREATE TABLE favorites (
    user_id INT NOT NULL REFERENCES "users"("id"),
    album_id INT NOT NULL REFERENCES "albums"("id"),
    PRIMARY KEY (user_id, album_id)
);