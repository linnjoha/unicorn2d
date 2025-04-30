export const walls = new Set();

walls.add(`64, 64`);
walls.add(`64, 80`); //tree
walls.add(`64, 96`); //squares
walls.add(`80, 80`);
walls.add(`80, 96`);

walls.add(`112, 96`); //water
walls.add(`128, 96`);
walls.add(`144, 96`);
walls.add(`160, 96`);

walls.add(`128, 64`);
walls.add(`144, 64`);

walls.add(`192, 112`); //stones
walls.add(`208, 112`); //stones
walls.add(`224, 112`); //stones

walls.add(`224, 80`); //house
walls.add(`208, 80`); //tree next to house

walls.add(`224, 48`); //upper tree
