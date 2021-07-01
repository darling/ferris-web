import { readdirSync } from 'fs';

readdirSync('./lib/interactions/componentActions').forEach((file) =>
	require('./' + file)
);
