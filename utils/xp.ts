import { round } from 'lodash';

export const xpToNextLvl = (level: number) => {
	return round(0.04 * (level ^ 3) + 0.8 * (level ^ 2) + 2 * level);
};
