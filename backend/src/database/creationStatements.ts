export const tableCreationStatements = `CREATE TABLE IF NOT EXISTS app_user (
  app_user_id varchar(255) NOT NULL UNIQUE,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  username varchar(255) NOT NULL UNIQUE,
  passwordHash varchar(255) NOT NULL,
  email varchar(255),
  role varchar(255) NOT NULL,
  PRIMARY KEY (app_user_id)
);

CREATE TABLE IF NOT EXISTS house (
  house_id varchar(255) NOT NULL UNIQUE,
  admin_id varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  max_residents int,
  image_url varchar(255),
  creation_date varchar(255) NOT NULL,
  PRIMARY KEY (house_id),
  FOREIGN KEY (admin_id) REFERENCES app_user(app_user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS house_users (
  user_id varchar(255) NOT NULL,
  house_id varchar(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES app_user(app_user_id) ON UPDATE CASCADE,
  FOREIGN KEY (house_id) REFERENCES house(house_id) ON UPDATE CASCADE,
  CONSTRAINT house_access_pkey PRIMARY KEY (user_id, house_id)
);


CREATE TABLE IF NOT EXISTS message (
  message_id varchar(255) NOT NULL UNIQUE,
  author_id varchar(255) NOT NULL,
  house_id varchar(255) NOT NULL,
  content varchar(1024) NOT NULL,
  timestamp varchar(255) NOT NULL,
  PRIMARY KEY (message_id),
  FOREIGN KEY (author_id) REFERENCES app_user(app_user_id) ON DELETE CASCADE,
  FOREIGN KEY (house_id) REFERENCES house(house_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS message_reply (
  message_reply_id varchar(255) NOT NULL UNIQUE,
  author_id varchar(255) NOT NULL,
  reply_to_id varchar(255) NOT NULL,
  content varchar(1024) NOT NULL,
  timestamp varchar(255) NOT NULL,
  PRIMARY KEY (message_reply_id),
  FOREIGN KEY (author_id) REFERENCES app_user(app_user_id) ON DELETE CASCADE,
  FOREIGN KEY (reply_to_id) REFERENCES message(message_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shortage (
  shortage_id varchar(255) NOT NULL,
  author_id varchar(255) NOT NULL,
  house_id varchar(255) NOT NULL,
  content varchar(1024) NOT NULL,
  resolved BOOLEAN NOT NULL,
  timestamp varchar(255) NOT NULL,
  PRIMARY KEY (shortage_id),
  FOREIGN KEY (author_id) REFERENCES app_user(app_user_id) ON DELETE CASCADE,
  FOREIGN KEY (house_id) REFERENCES house(house_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservation (
  reservation_id varchar(255) NOT NULL,
  reservator_id varchar(255),
  house_id varchar(255),
  participant_amount int,
  start_time varchar(255) NOT NULL,
  end_time varchar(255) NOT NULL,
  comment varchar(255),
  is_final BOOLEAN NOT NULL,
  PRIMARY KEY (reservation_id),
  FOREIGN KEY (reservator_id) REFERENCES app_user(app_user_id) ON DELETE CASCADE,
  FOREIGN KEY (house_id) REFERENCES house(house_id) ON DELETE CASCADE
);
`;

export const databaseSeedStatements = `
    INSERT INTO app_user VALUES (
      'ID for esko aho',
      'Esko',
      'Aho',
      'eAho',
      'salainen',
      'e.aho@mail.com',
      'User'
    );

    INSERT INTO app_user VALUES (
      'ID for aaro eho',
      'Aaro',
      'eho',
      'aEho',
      'salainen',
      'a.eho@mail.com',
      'User'
    );

    INSERT INTO app_user VALUES (
      'ID for jaana pelkonen',
      'Jaana',
      'Pelkonen',
      'pelkis',
      'salainen',
      'pelkonen@mail.com',
      'User'
    );

    INSERT INTO house VALUES (
      'ID for eka mökki',
      'ID for esko aho',
      'Eka Mokki',
      'Mökkitie :D',
      3,
      'kuva.com',      
      NOW()
    );

    INSERT INTO house VALUES (
      'ID for toka mökki',
      'ID for aaro eho',
      'Toka Mökki',
      'Mökkitie :D',
      3,
      'kuva.com',
      NOW()
    );

    INSERT INTO house_users VALUES (
      'ID for esko aho',
      'ID for eka mökki'
    );

    INSERT INTO house_users VALUES (
      'ID for aaro eho',
      'ID for eka mökki'
    );

    INSERT INTO house_users VALUES (
      'ID for jaana pelkonen',
      'ID for eka mökki'
    );

    INSERT INTO house_users VALUES (
      'ID for aaro eho',
      'ID for toka mökki'
    );

    INSERT INTO message VALUES (
      'ID for eka viesti hello this is messageman jne',
      'ID for esko aho',
      'ID for eka mökki',
      'Yes hello this is message man. I bring message about an incident that happened. I want cottage, pls give cottage. Not resolved yet, waiting for gottage',
      NOW()
    );

    INSERT INTO message VALUES (
      'ID for toka viesti this is another messageman jne',
      'ID for aaro eho',
      'ID for eka mökki',
      'This is another message man, want cottage also, pls give.',
      NOW()
    );

    INSERT INTO message_reply VALUES (
      'ID for first message respond this is response to you jne',
      'ID for jaana pelkonen',
      'ID for toka viesti this is another messageman jne',
      'This is response to you, message man. You should send more messages, then get cottage.',
      NOW()
    );

    INSERT INTO shortage VALUES (
      'ID for first shortage',
      'ID for aaro eho',
      'ID for toka mökki',
      'He need some milk',
      FALSE,
      NOW()
    );

    INSERT INTO reservation VALUES (
      'ID for first reservation',
      'ID for aaro eho',
      'ID for eka mökki',
      2,
      '2021-11-27',
      '2021-11-28',
      'Yes this is dog',
      FALSE
    );

    INSERT INTO reservation VALUES (
      'ID for second reservation',
      'ID for jaana pelkonen',
      'ID for toka mökki',
      12,
      '2021-12-17',
      '2021-12-23',
      'Bring the heat',
      TRUE
    );
`;
