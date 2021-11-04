### Kirjotettavaa:
- Tietokannan user -taulun nimi on varattu systeemin sisäiseen käyttöön, ei kannata käyttää

- Tietokannan taulujen yhteyksistä on hyvä kertoa
- Virheidenkäisttelystä -- millä tasolla ne tehdään ja miten (nyt router hoitaa virheet middlewarelle, eikä muualla ole virheenkäsittelyä --> Olisiko parempi että virheenkäsittelyä on useammassa paikassa? Onko virheenkäsittely erilaista, jos virheen heittävä asia ei ole niin relevantti, esim kun tässä on kyseessä paljon tiedon siirtelyä jne jonka tulee toimia oikein, mutta jos olisi jotain muita asioita, jotka eivät haittaa niin paljon jos menee pieleen. Esimerkiksi jokin käyttäjädatan saanti selaimesta tms)
- En päässyt sisään virheen typeen, niin silloin custom virheet hyödyntää error messagea
- Middlewaret (mukaan myös app.use(json())) --> ihan kaikki middlewaret
- Käyttäjän perustietojen muokkaus sisältää vain tiedot mitkä ovat jwt tokenissa
- Käyttäjän perustietojen muokkaus vaatii jwt updaten
- Ei tallenneta jwt -tokeniin talotietoja, koska sen tiedon muuttaminen on epäedullista. Pitää ottaa huomioon tokenin päivitys ja sen validina oloaika jne MOST IMPORTANT: ei haluu pitää liikaa tietoa jwt:ssä (katso onko jossain lähteessä "best practices for jwt" tms)
- Salasanana vaihto tehdään erikseen, koska sitä ei oo tokenissa


### Notet ohjausmiiteistä:
- Lähdeluettelo aakkosjärjestykseen
- Lähdeluetteloon lisää lähteitä mm. kirjoja
- Lähteisiin tulee viitata opinnäytetyössä
- Lisää ohjelmiston testaus
	- Käytettävyystestaus pois (ihmisen käyttö)
	- Otetaan vaan bäkkärin perustoimintojen testaus
	- Perus palvelimen tietoturvan testaus (ei voi kirjautua root root käyttä) tietokantapalvelimen portti ei oo auki kaikille ja tietokanta palvelimen käyttäjätunnus ja salasana tulee olla vahvat

- Tulee ilmaista että tämän ohjelman testaus ei ole maailman kattavin, mutta tarkoitus on saada sovellus testattua sen verran että a) kukaan ei voi sitä tuhota(kirjautua, syöttää väärää koodia tmsjne) B) sille on tehty perus tason bäkkärin testaukset  
- Scopeen tulee laittaa ylätasolla mitä tehdään
- Itse opparissa kerrotaan että miten tehtiin
- Rajataan mikkiksen selainten tuki ulkopuolelle
- Hahmotellaan projektin ongelmat valmiiksi joita ei voida eikä kannata ratkoa tuo uskottavuutta projektille

<br>
<br>

Ensikertaan 1/3 valmiina:
- Johdanto
- Teoriatausta
- 10 Tekstisivuu

# Tärkeää on muistaa että arivoidaan ainoastaan word kirjotuksia, ei koodia

### Muutoksia
- Puhekieli pois ja pasiivista kieltä tilalle
	- Suosiolla <-- puhekieltä
	- Projektista jätetään pois

<br>
<br>
<br>
<br>
<br>
Mikä opinnäytetyön tyyppi tulee olla? Tutkimus vai tuote?
	- EI hirveesti eroa, jos produktin koodi on hyvin toteutettu niin on yritetty sitä saada arvosanassa näkyviin
	- Tästä tehdään produkti
	- Etsi haaga-helian opinnäytetyökannasta samantyylinen (produkti)
	- Se kaivetaan esiin sitten


Miten koodi julkaistaa ja tuleeko sitä soursee esitellä?
	- On hyvä olla aika sidoksissa koodiin tämä koko setti
	- Githubissa pitää koodia ja viittaukset esimerkkityön mukaan ja linkki tulee sisältää kirjoitukseen
	- Katso esimerkkioppari


Seuraavaksi pitäisi määritellä tutkimusongelmat, kuten kuinka typescriptillä tehdään sovellus vs normi javascriptillä


Pitää ratkaista jokin ongelma:
	- Erilaisiin päätelaitteisiin toimivaksi
	- Julkaisu
	
Ensin kuvataan ongelma, sitten kuvataan ajatus omasta mahdollisesta ratkaisusta, suoritetaan ratkaisu ja kuvaillaan se, sitten todetaan loppuun että tuliko ongelmaan ratkaisu


Juslin sanoo:
- 2 tai 3 kertaa opinnäytetyöstä pidempi palaute
- Yksi mahdollisuus olis vertailla typescript toteutusta javascript toteutukseen
- Kertomuksessa voi olla paljonkin koodia ja sen vertailua
- Hyvässä opinnäytetyössä tulee olla reflektointia siihen liittyvistä ongelmista ja hyvistä puolista, kuten Postgresql on hidas, mutta siellä on hyvää json dokumenttimuoto
- Esimerkkioppari: sähköpostissa!(https://www.theseus.fi/handle/10024/153878)
- Eniten kiinnostaa asiaan liittyvät lähteet ja ongelmakuvaus
- 29.9. klo 15 katsotaan noi yllämainitut asiat
	- TÄtä varten haalitaan lähteet ja kuvataan ongelmat. Katso mallia sähköpostin työstä (tämän setin voi tehdä opinnäytetyöpohjaan)
- Projektisuunnitelma(1sivu riittää):
	- Päivämääriä
		- keskiviikko klo15 tapaamiset
		- Kypsyysnäytä
		- Urkunt
		- 2-3 kokousta, joiden yhteydessä tomitetaan kirjallinen palaute kontoon
		- Seminaari (näihin saa Mirja Jaakkolalta päivämäärät) Tässä tulisi 70% työstä olla valmis
		- Plagiointitarkistus (ei tarvitse välttämättä päivämääriä) mutta marraskuun loppupuolella tulisi olla valmista
		- Kyspyysnäyte
		- Arviointikokous
	- Eli luetellaan pakolliset asiat, joita on tehtävä ja niille päivämäärät
	
	
- Työ laitetaan kontoon ja liitetiedosto mailina Juslinille