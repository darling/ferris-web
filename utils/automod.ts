import firebase from 'firebase';

import { IBannedWord } from '../interfaces/control';
import { db } from './auth/firebase';

export async function addTagToGuild(
	guild_id: string,
	tag: string,
	options: Partial<IBannedWord>
): Promise<void> {
	db.collection('configs')
		.doc(guild_id)
		.set(
			{
				automod: {
					word_filter: {
						tags: firebase.firestore.FieldValue.arrayUnion({
							tag,
							...options,
						}),
					},
				},
			},
			{ merge: true }
		);
}

export async function delTagFromGuild(
	guild_id: string,
	tag: IBannedWord
): Promise<void> {
	db.collection('configs')
		.doc(guild_id)
		.set(
			{
				automod: {
					word_filter: {
						tags: firebase.firestore.FieldValue.arrayRemove(tag),
					},
				},
			},
			{ merge: true }
		);
}
