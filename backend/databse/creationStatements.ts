export const tableCreationStatements = `CREATE TABLE IF NOT EXISTS app_user (
    id varchar(255) NOT NULL UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    passwordHash varchar(255) NOT NULL,
    email varchar(255),
    role varchar(255),
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS house (
    id varchar(255) NOT NULL UNIQUE,
    admin_id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    max_residents int,
    image_url varchar(255),
    creation_date date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES app_user(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS houses_user_has_access_to   (
    user_id varchar(255) NOT NULL,
    house_id varchar(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user(id) ON UPDATE CASCADE,
    FOREIGN KEY (house_id) REFERENCES house(id) ON UPDATE CASCADE,
    CONSTRAINT house_access_pkey PRIMARY KEY (user_id, house_id)
  );

  CREATE TABLE IF NOT EXISTS message (
    id varchar(255) NOT NULL UNIQUE,
    author_id varchar(255) NOT NULL,
    content varchar(1024) NOT NULL,
    timestamp date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES app_user(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS shortage (
    id varchar(255) NOT NULL,
    author_id varchar(255) NOT NULL,
    content varchar(1024) NOT NULL,
    resolved BOOLEAN NOT NULL,
    timestamp date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES app_user(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS reservation (
    id varchar(255) NOT NULL,
    reservator_id varchar(255),
    house_id varchar(255),
    participant_amount int,
    start_time date NOT NULL,
    end_time date NOT NULL,
    comment varchar(255),
    is_final BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (reservator_id) REFERENCES app_user(id) ON DELETE CASCADE,
    FOREIGN KEY (house_id) REFERENCES house(id) ON DELETE CASCADE
  );
  `;
