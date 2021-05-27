import { readdirSync } from 'fs';

readdirSync('./lib/interactions/commands').forEach((file) =>
	require('./' + file)
);
