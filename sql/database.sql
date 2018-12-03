CREATE TABLE security_lab.users (
	id INT(6) NOT NULL AUTO_INCREMENT,
	wallet_address VARCHAR(30) NOT NULL,
	pass_id INT(6),
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL,
	date_of_birth DATE,
	street VARCHAR(30),
	postal_code VARCHAR(30),
	city VARCHAR(30),
	PRIMARY KEY (id)
);

CREATE TABLE security_lab.consumables (
	id INT(6) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	type VARCHAR(30) NOT NULL,
	alcoholic BOOLEAN NOT NULL,
	cost INT(6) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE security_lab.transactions (
	id INT(6) NOT NULL AUTO_INCREMENT,
	txId VARCHAR(30) NOT NULL,
	token_amount INT(6) NOT NULL,
	incoming BOOLEAN NOT NULL,
	user_id INT(6),
	PRIMARY KEY (id)
);

--Make relation in pma users.id -> transactions.user_id