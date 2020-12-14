ALTER TABLE movies ADD COLUMN rating SMALLINT;
ALTER TABLE movies ADD COLUMN genre ENUM('Comedy', 'Drama', 'Romance', 'Fantasy');

UPDATE movies SET rating = FLOOR(1 + RAND()*5);
UPDATE movies SET genre = CASE
  WHEN RAND() < 0.25 THEN 'Comedy'
  WHEN RAND() < 0.33 THEN 'Drama'
  WHEN RAND() < 0.5 THEN 'Romance'
  ELSE 'Fantasy'
END;
