CREATE DATABASE orensayag_project3_initial;
USE orensayag_project3_initial;

CREATE TABLE users (
	id INT auto_increment,
    user_name VARCHAR(255),
    mail VARCHAR(255),
    hashed_pass VARCHAR(255),
    f_name VARCHAR(255),
    l_name VARCHAR(255),
		type VARCHAR(255),
    credits INT,
    img_src VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE locations(
	id INT auto_increment,
    name VARCHAR(255),
    country VARCHAR(255),
    x INT,
    y INT,
    img_src VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE club_products (
	id INT AUTO_INCREMENT,
    name VARCHAR(255),
    price INT,
    start_date DATE,
    end_date DATE,
    img_src VARCHAR(255),
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES locations(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE vacations(
	id INT AUTO_INCREMENT,
    name VARCHAR(255),
    price INT,
    discount INT,
    start_date DATE,
	
    end_date DATE,
    credits INT,
    location_id INT,
    img_src VARCHAR(255),
    description TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (location_id) REFERENCES locations(id)
         ON DELETE CASCADE
);

CREATE TABLE messages (
	id INT AUTO_INCREMENT,
    text TEXT,
type VARCHAR(255),
user_id INT,
    date_time DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE
);

CREATE TABLE vacation_follows (
	id INT AUTO_INCREMENT,
    vacation_id INT,
    user_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (vacation_id) REFERENCES vacations(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)     ON DELETE CASCADE
       ON UPDATE CASCADE
);

CREATE TABLE users_fav_locations (
	id INT AUTO_INCREMENT,
    user_id INT,
    location_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE
);

CREATE TABLE vacation_comments (
	id INT AUTO_INCREMENT,
    vacation_id INT,
    user_id INT,
    date DATETIME DEFAULT NOW(),
    text VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (vacation_id) REFERENCES vacations(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE
);

CREATE TABLE vacation_likes (
	id INT AUTO_INCREMENT,
    vacation_id INT,
    user_id INT,
    date DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (vacation_id) REFERENCES vacations(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE
);

CREATE TABLE purchases (
	id INT AUTO_INCREMENT,
    user_id INT,
    vacation_id INT,
    club_product_id INT,
    date DATETIME DEFAULT NOW(),
    amount_of_currency INT,
    PRIMARY KEY (id),
		FOREIGN KEY (vacation_id) REFERENCES vacations(id)
             ON DELETE CASCADE
       ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE,
    FOREIGN KEY (club_product_id) REFERENCES club_products(id)
         ON DELETE CASCADE
       ON UPDATE CASCADE
);

CREATE TABLE blog_posts (
	id INT auto_increment,
    text TEXT,
    title VARCHAR(255),
    date DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
);

INSERT INTO `locations` VALUES (1,'Los Angeles','USA',34.04640157743346,-118.23997080275203,'https://images.pexels.com/photos/1412235/pexels-photo-1412235.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),(2,'Miami','USA',25.773526298459252,-80.19406502835335,'https://images.pexels.com/photos/4366062/pexels-photo-4366062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),(8,'Mexico City','Mexico',19.43050741881059,-99.13349189104305,'https://images.pexels.com/photos/1720086/pexels-photo-1720086.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(10,'Beijing','China',39.90682357855464,116.4082903395766,'https://images.pexels.com/photos/2846075/pexels-photo-2846075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),(11,'Jerusalem','Israel',31.76381310867683,35.21600884262456,'https://images.pexels.com/photos/2087387/pexels-photo-2087387.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(12,'London','United Kingdoms',51.50164504296491,-0.12055186258447703,'https://images.pexels.com/photos/3220846/pexels-photo-3220846.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(13,'Madrid','Spain',40.414534720743816,-3.7061267642666618,'https://images.pexels.com/photos/670261/pexels-photo-670261.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(14,'Moscow','Russia',55.753341966992075,37.62046769819231,'https://images.pexels.com/photos/236294/pexels-photo-236294.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(15,'New Delhi','India',28.6122118612056,77.21850304060352,'https://images.pexels.com/photos/3233266/pexels-photo-3233266.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(16,'Paris','France',48.86270026175301,2.3625102494550543,'https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(17,'Rome','Italy',41.88250102398986,12.512782116789246,'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),(18,'Tokyo','Japan',35.74248232609063,139.85858150167263,'https://images.pexels.com/photos/5445000/pexels-photo-5445000.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO `vacations` VALUES (32,'Climb on the Great Wall and Enjoy Its Breathtaking Night View',4999,4599,'2021-08-18','2021-12-16',500,10,'https://images.pexels.com/photos/1423580/pexels-photo-1423580.jpeg?cs=srgb&dl=pexels-johannes-plenio-1423580.jpg&fm=jpg','The Great Wall of China extends 4,000 miles. There are several Great Wall sections around Beijing to choose form, both restored sections and rugged sections.\n\nYou could enjoy an easy walk at Mutianyu, take a challenging hike on the wild walls of Jinshanling or Jiankou, or take our exclusive tour to Simatai to appreciate the stunning night views of the Great Wall.'),(33,'Western Wall and Jewish Quarter',18663,NULL,'2021-12-17','2022-03-10',700,11,'https://images.pexels.com/photos/415713/pexels-photo-415713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The Western Wall is the surviving retaining wall of Jerusalem\'s First Temple.\n\nCommonly called the Wailing Wall due to the people\'s laments for the loss of the temple in AD 70, it is now the holiest site in Judaism and has been a place of pilgrimage for the Jewish people since the Ottoman era.\n\nThe Jewish Quarter of the Old City runs roughly from the Zion Gate east to the Western Wall Plaza. This part of the Old City was destroyed during the Israeli-Arab fighting in 1948 and has been extensively rebuilt since 1967.'),(34,'Explore the Citadel (Tower of David) and Surrounds',9092,7900,'2021-11-11','2022-02-16',900,11,'https://images.pexels.com/photos/2087392/pexels-photo-2087392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The Citadel, popularly known as the Tower of David, actually has no connection with David, having been erected by King Herod to protect the palace he built in approximately 24 BC.\n\nHis original citadel had three towers named after his brother Phasael, his wife Mariamne, and his friend Hippicus.\n\nAfter Titus\' conquest of the city in AD 70, the Romans stationed a garrison here, but later the citadel fell into disrepair. It was successively rebuilt by the Crusaders, Egypt\'s Mamelukes and Turks, during their years of reign over Jerusalem.'),(35,'The London Eye',13121,12566,'2021-09-02','2021-11-09',1500,12,'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Enjoy amazing 360-degree views over London from the London Eye, a rotating observation wheel which is 135 metres (443 ft) high. Spot some of the capital\'s most iconic landmarks, including Big Ben, the Houses of Parliament and Buckingham Palace.\n\nWithin each capsule, interactive guides allow you to explore the capital\'s iconic landmarks in several languages.'),(36,'Buckingham Palace and Garden',12059,NULL,'2021-07-22','2021-09-16',2000,12,'https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Buckingham Palace is a grand royal residence with 775 magnificent rooms. Highlights of the Buckingham Palace summer opening include:\n\nThe 19 beautifully decorated State Rooms, used for receiving guests and official functions.\nThe Throne Room – often used as a backdrop for royal wedding photos.\nThe magnificent Grand Staircase.\nPieces of fine art, including works by Canaletto, Rembrandt and Vermeer.\nA multimedia tour introduced by Prince Charles.'),(37,'Prado National Museum',12820,11999,'2021-10-13','2022-02-16',1400,13,'https://images.pexels.com/photos/4916250/pexels-photo-4916250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The Prado has one of the largest art collections in the world, and is best known for its diverse assortment of works by Velasquez, Goya and El Greco.'),(38,'Santiago Bernabeu Stadium',4128,3999,'2021-10-07','2021-11-11',800,13,'https://images.pexels.com/photos/3845970/pexels-photo-3845970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The Santiago Bernabéu is the home stadium of the Real Madrid football team, and its facilities –including the dressing rooms, trophy room and the dignitaries box– are open to visitors.\n\nThe stadium opened in 1947 under the name Nuevo Estadio Chamartín. Its current name is in honour of the man who was president of the club for 35 years, Santiago Bernabéu. After various remodelling projects, it is today classified as an elite stadium, and holds the UEFA\'s highest distinction of five stars. This is the second largest football stadium in Spain, with a capacity of around 80,000 spectators.'),(39,' Luis Barragán House and Studio',2381,NULL,'2021-09-09','2021-10-14',100,8,'https://images.pexels.com/photos/6850606/pexels-photo-6850606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The former home and studio of Pritzker-Prize-winning architect Luis Barragán has been transformed into a museum in Mexico City\'s Hidalgo District. Architecture and design lovers frequent the estate to study the artist\'s ingenious use of color, light, shadow, form, and texture. From the street, you\'d never guess the personality that lies inside: The stark-gray façade humbly blends in with neighboring homes, but walk to the interior of the estate and you\'ll find striking walls in a kaleidoscope of bright colors, fountains, and pools.'),(40,'Juarez ',6233,4999,'2021-08-19','2021-12-23',1000,8,'https://images.pexels.com/photos/5344794/pexels-photo-5344794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The Juarez neighborhood has evolved in recent years. Once gritty, the area is now teeming with great boutiques, bars, parks, and restaurants like Masala y Maiz, which blends Mexican and Indian cuisines, and Niddo, a sunny corner spot that serves a divine brunch. There are loads of hotspots around the leafy central Plaza Washington: La Rifa for artisanal chocolates, Loose Blues for vinyls and vintage denim, and Cicatriz Café for natural wines and bright bites like basil bean salads.'),(41,'Red Square',4795,NULL,'2021-10-14','2021-11-17',NULL,14,'https://images.pexels.com/photos/92412/pexels-photo-92412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The heart of Russia’s capital, Red Square is arguably Moscow’s most visited attraction. The cobblestone square is surrounded by beautiful architecture, and is the place where most of the city’s (and country’s) history unfolded. What was once a market square where traders would sell their goods is now a key location in the city, surrounded by unforgettable sites such as the Kremlin, St.Basil’s Cathedral, Lenin’s Mausoleum and other celebrated attractions.'),(42,'St Basil\'s Cathedral',8390,6999,'2021-09-16','2021-12-15',600,14,'https://images.pexels.com/photos/2842117/pexels-photo-2842117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Soak up the archetypal image of Russia’s capital with the glistening rainbow domes of St Basil’s cathedral. The onion-shaped domes were designed to make the building look like the shape of a flame on a bonfire. The cathedral was commissioned in the 1500s by Ivan the Terrible and according to legend, the Tsar thought it so beautiful he ordered that the architect be blinded so that he would never surpass this creation.'),(43,'Gawking at the Qutab Minar',5761,NULL,'2021-12-08','2022-02-02',3000,15,'https://images.pexels.com/photos/7821184/pexels-photo-7821184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Qutab Minar is one of Delhi’s top attraction and a renowned UNESCO world heritage site.\n\nStanding 240 feet tall, this tower was established in the year 1192, by the very first ruler of Delhi – Qutb-ud-din Aibak. This minaret is named after its creator.\n\nThis five storey tower is built purely from marble and red sandstone and has a spiral staircase which takes you to the top in 379 steps. However, this has been closed to public since 1974.'),(44,'Find Inner Peace at Lotus Temple',4332,NULL,'2021-11-18','2022-01-06',800,15,'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Lotus Temple is an architectural delight. The whole complex from top to bottom is made of pure marble.\n\nThe universal symbol of peace, a lotus flower, gives the temple not only its name but shape as well.\n\nPhotography is restricted in the inner sanctum and there is a strict code of silence to be maintained at all times. Open to all castes and creeds, the temple is an ideal place for anyone who wishes to  meditate and pray. The temple is also known as the place of Baha’i faith.'),(45,'The Louvre',7484,6999,'2021-09-23','2022-01-20',600,16,'https://images.pexels.com/photos/2739078/pexels-photo-2739078.jpeg?cs=srgb&dl=pexels-guillaume-meurice-2739078.jpg&fm=jpg','The world’s largest and most visited art museum has more than enough material for an article of its own.\n\nThe Louvre Palace started out as a medieval fortress, before becoming a gallery for artists to study antiquities and the works of Old Masters in the 1700s.\n\nFast forward 230 years and you have a museum that you’d need weeks to fully appreciate.\n\nThere are antiquities from scores of world cultures and a collection of Renaissance and Baroque art that puts every other museum in the world to shame.\n\nIf you are pressed for time, see the crème de la crème like the 2,200-year-old Winged Victory of Samothrace, Liberty Leading the People (Delacroix), the Portrait of François I (Jean Clouet), the enigmatic Gabrielle d’Estrées and one of her sisters (Unknown) and of course the Mona Lisa (Leonardo da Vinci).'),(46,'Musée d’Orsay',5185,NULL,'2021-10-14','2021-12-23',500,16,'https://images.pexels.com/photos/208636/pexels-photo-208636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','In the astonishing confines of a Beaux-Arts railway station is a compendium of French art and culture from the mid-19th century to 1914. The Gare d’Orsay is on the left bank of the Seine and was completed in 1900 for the Exposition Universelle.\n\nAfter becoming obsolete for modern rail travel the building sat idle before being listed and turned into one of the largest art museums in the world, filling the gap between the Louvre and the National Museum of Modern Art at the Pompidou Centre.\n\nIn this unforgettable environment are scores of iconic works of art by Impressionists and Post-Impressionists like Renoir (Bal du Moulin de la Galette), Cézanne (The Card Players and Apples and Oranges), van Gogh (Starry Night Over the Rhône) and Manet (Le Déjeuner sur l’Herbe).'),(47,'Colosseum',3506,NULL,'2021-09-16','2021-11-17',655,17,'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','This mighty structure is one of the most renowned and iconic landmarks in the world and a trip to Rome would not be complete without visiting the Colosseum.\n\nAlso known as the Flavian Amphitheatre, the Colosseum was constructed between 70-80 AD and at its peak was estimated to hold 80,000 spectators.'),(48,'St Peter’s Square',6901,5999,'2021-11-13','2021-12-03',1400,17,'https://images.pexels.com/photos/3762276/pexels-photo-3762276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Rome holds a small country within a country – The Vatican.\n\nThis independent state is one of the most important religious sites in the world and St. Peter’s Square is an iconic place where many significant events have taken place.\n\nLocated at the front of the Vatican state, the square is actually circular and is framed by two huge sets of colonnades – Standing on these columns are beautiful statues of various religious figures and previous popes.'),(49,'Visit Asakusa',6752,NULL,'2021-09-16','2021-11-11',300,18,'https://images.pexels.com/photos/5220043/pexels-photo-5220043.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','The Asakusa District of Tokyo is known for being the home of the Senso-ji temple which is also one of the top sights in the city.\n\nThe temple is covered in gorgeous design elements and carvings, and visitors flock here to pray and drink in the serene and relaxed vibes.\n\nAlso make sure that you spend time visiting the stalls that are set up outside the temple as these sell local arts and crafts, and there are shops close by that sell artifacts such as calligraphy.\n\nMany people also try to come here in the late afternoon as this is when the temple and grounds are bathed in golden light.'),(50,'Tour the Imperial Palace',8197,7399,'2021-11-24','2022-01-12',NULL,18,'https://images.pexels.com/photos/3155269/pexels-photo-3155269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','One of the top spots in Tokyo for visitors is the Imperial Palace which is the home of the emperor and sprawls over 2,000,000 square meters.\n\nLocated in the Marunouchi District close to central Tokyo Station, you need to book in advance if you want to visit.'),(51,'Visit the iconic Miami Beach',6365,NULL,'2021-06-27','2022-02-23',1200,2,'https://images.pexels.com/photos/105950/pexels-photo-105950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','When you think of Miami chances are you think of a sandy beach with the sun shining.\n\nMiami Beach is the best area in Miami for soaking up some rays on a sandy beach and it is something of a legend in the city.\n\nThe beach itself technically outside of the Miami municipality as it is located on an island. Aside from the beaches, the area is also known for its Art Deco district and the odd but beautiful buildings within.'),(52,'Explore Jungle Island',17293,14999,'2021-06-17','2021-07-29',NULL,2,'https://images.pexels.com/photos/4091042/pexels-photo-4091042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Jungle Island is one of the most popular attractions in the city of Miami.\n\nIt is located on Watson Island and was formerly known as Parrot Jungle and even had Winston Churchill visit in 1946.\n\nThe Jungle is only minutes away from South Beach and Downtown Miami.\n\nThrough interactive experiences, Jungle Island enthralls park visitors with a sense of adventure and discovery. Why not catch one of the exciting shows which are a daily occurrence.'),(53,'Hollywood Sign',8447,4499,'2021-08-12','2021-10-14',500,1,'https://images.pexels.com/photos/2695679/pexels-photo-2695679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Put up in 1923 and originally spelling “Hollywoodland”, a real estate development, the unmistakeable Hollywood Sign was only supposed to last for 18 months.\n\nThe arrival of the Golden Age of Hollywood changed all that, and the sign has remained on Mount Lee in Griffith Park ever since, and dropping “land” in 1949. This landmark was rebuilt in steel in 1978 and was last repainted in 2005. One of the easiest vantage points in the basin is the raised patio on the north-east corner of the Hollywood & Highland Center Mall, and there’s another atop the Home Depot parking garage on Sunset Boulevard.'),(54,'Venice',12886,NULL,'2021-07-01','2021-08-26',900,1,'https://images.pexels.com/photos/2763964/pexels-photo-2763964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','An eccentric neighbourhood and seaside resort, the world-famous Venice is Los Angeles at its most cosmopolitan and independent.\n\nAlthough gentrification has crept in, the 2.5-mile Venice Beach Boardwalk is still prowled by outlandish characters, and teems with tattoo parlours, cannabis shops, international cuisine, countless street vendors and a big cast of street performers.');

INSERT INTO users(user_name, hashed_pass, type, img_src)

VALUES ('admin', '$2b$10$CpU50cJwUxIotv9yODBiV.yGC6ahnotEdA0bTBk8pajtltXYo6Tu2', 'admin', 'https://randomuser.me/api/portraits/men/49.jpg')

-- FOR YOSI: admin pass: 12345678Aa
-- CHECK OUT ON HEROKU: once-more-round-the-sun.herokuapp.com



