# ToDo

- [ ] selvitä clinet / pool
## Ideat
- [ ] Lataa käyttäjät välimuistiin, jolloin validointi on nopeampaa
	- Kun uusi käyttäjä listätään, tämä lisätään kantaan, sekä käyttäjälistaan, joka on välimuistissa

- [ ] Kato jos kaikki relaatiot ja mökkien lisäämiset käyttäjälle onnistuu tietokannassa, eikä niitä tarvitse tehdä bäkkärissä
<br>
<br>
## Middleware
- [ ] Virheenkäsittely
- [ ] 404 -sivut
- [ ] Loggeri
<br>
<br>
## Käyttöliittymä
**React**

- [ ] Mockup käyttöliittymästä
<br>
<br>
## Tietokanta
**summerhouse**
<br>
<br>

## Testit

<br>
<br>

## "Objektit"
### Käyttäjät
- [x] Tyypitys
		- Id
		- Nimi
		- Käyttäjätunnus
		- Salasana
		- ?Sähköposti
			- salasanahallintaa (ei prio)
			- Notifikaatiot (ei prio)
		- Rooli
		- Timestamp
- [x] Luo tietokantayhteys
- [ ] CRUD
	- [ ] Luo
	- [ ] Muokkaa
		- Vain tekijä voi muokata
	- [ ] Poista
		- Vain tekijä voi poistaa
- [ ] Hashaa salasana




### Mökit
- [x] Tyypitys
		- Id
		- Nimi
		- Lisännyt käyttäjä (id)
		- ?Osoite/alue
		- ?Kapasiteetti
		- ?Kuva
		- Timestamp
- [x] Luo tietokantayhteys
- [ ] CRUD
	- [ ] Luo
	- [ ] Muokkaa
		- Vain tekijä voi muokata
	- [ ] Poista
		- Vain tekijä voi poistaa
 
 
 
### Viestit
 - [x] Tyypitys
		 - Id
		 - Lisännyt käyttäjä (id)
		 - Vastaanottaja
		 - Sisältö
		 - Timestamp
		 - Tekijä
- [x] Luo tietokantayhteys
- [ ] CRUD
	- [ ] Luo
	- [ ] Muokkaa
		- Vain tekijä voi muokata
	- [ ] Poista
		- Vain tekijä voi poistaa
- [x] Vastaukset
	- [ ] Tyypitys
		- Vastaaja
		- Viesti johon vastaus on (id)
 <br>
![image.png|200](file:///home/eetu/Pictures/viesti.png)
<br>
<br>
<br>
### Varaus
 - [x] Tyypitys
	 - Id
	 - Varaaja
	 - Varauksen aloitus
	 - Varauksen lopetus
	 - ?Kommentti
	 - Alustava varaus - boolean
- [x] Luo tietokantayhteys
- [ ] CRUD
	- [ ] Luo
	- [ ] Muokkaa
		- Vain tekijä voi muokata
	- [ ] Poista
		- Vain tekijä voi poistaa
 
 
 
 ### Puutteet
 - [x] Tyypitys
	 - Id
	- Lisännyt käyttäjä (id)
	 - Vapaa teksti
	 - Timestamp
- [x] Luo tietokantayhteys
- [ ] CRUD
	- [ ] Luo
	- [ ] Muokkaa
		- Vain tekijä voi muokata
	- [ ] Poista
		- Vain tekijä voi poistaa
 
### Notifikaatiot (Ei prio)
- Lähetetään sähköpostiin
	- Node email tms
	- [ ] Tyypitys
		- Id
		- Tyyppi
			- Viesti -ilmoitus (vastaus)
			- Muistutus (esim varauksesta)?
			- Puute -ilmoitus
		- Sisältö
		- Vastaanottaja
		- Timestamp
	- [ ] Toggle päälle - pois sovellukseen
<br>
<br>
<br>

# Tietokanta
### Taulut
#### app_user:
id (PK) NOT NULL
first_name NOT NULL
last_name NOT NULL
username NOT NULL
passwordHash NOT NULL
email
timestamp NOT NULL
<br>
<br>
#### house:
id (PK) NOT NULL
admin_id NOT NULL (user)
name NOT NULL
address
max_residents
image_url
timestamp NOT NULL
<br>
<br>
#### houses_user_has_access:
user_id NOT NULL
house_id NOT NULL
<br>
(many to many)
<br>
<br>
#### message:
id (PK) NOT NULL
author_id NOT NULL	(user)
content NOT NULL
timestamp NOT NULL
<br>
<br>
#### shortage:
id (PK) NOT NULL
author_id NOT NULL	(user)
content NOT NULL
resolved NOT NULL (boolean)
timestamp NOT NULL
<br>
<br>
#### reservation:
id (PK) NOT NULL
reservator_id NOT NULL	(user)
house_id NOT NULL
participant_amount
start_time NOT NULL
end_time NOT NULL
comment
is_final NOT NULL (boolean)
<br>
<br>



# Kirjastoja
- Node email tms
- Automaattinen id