import { readdirSync } from 'fs';

readdirSync('./lib/interactions/buttonActions').forEach((file) =>
	require('./' + file)
);
