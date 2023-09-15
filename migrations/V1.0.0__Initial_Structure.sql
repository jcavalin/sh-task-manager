CREATE TABLE app.user (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE app.task (
    id SERIAL PRIMARY KEY NOT NULL,
    summary VARCHAR(2500) NOT NULL,
    date DATE NOT NULL,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    updated_at DATETIME,
    user_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY task_user (user_id)
        REFERENCES app.user (id)
        ON DELETE RESTRICT
);