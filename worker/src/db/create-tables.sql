DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS quests;

CREATE TABLE IF NOT EXISTS PROFILES {
	user_id INT NOT NULL,
	profile TEXT NOT NULL,
	owner TEXT NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	bio TEXT NOT NULL,
	country TEXT NOT NULL,
	socials TEXT,
	links TEXT
}

CREATE TABLE IF NOT EXISTS GAMES {
	game_id INT NOT NULL,
	name TEXT NOT NULL,
	owner TEXT NOT NULL PRIMARY KEY,
	contract TEXT NOT NULL,
	description TEXT NOT NULL,
	install TEXT NOT NULL,
	logo TEXT NOT NULL
}

CREATE TABLE IF NOT EXISTS QUESTS {
	game_id INT NOT NULL,
	quest_id INT NOT NULL,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	n_tries INT NOT NULL
	PRIMARY KEY(game_id, quest_id)
}