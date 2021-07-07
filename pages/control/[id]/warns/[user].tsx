import {
	ChevronRightIcon,
	ShieldExclamationIcon,
	XIcon,
} from '@heroicons/react/solid';
import firebase from 'firebase/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import {
	ControlContent,
	ControlMainTitle,
} from '../../../../components/control/ControlSidebar';

import ControlPanel from '../../../../components/ControlPanel';
import { GuildContext } from '../../../../contexts/guild';
import { DiscordUser } from '../../../../interfaces';
import { GuildWarns } from '../../../../interfaces/control';
import { db } from '../../../../utils/auth/firebase';
import { getUserInfo } from '../../../../utils/discord-layer';

const UserWarnPage: FC = () => {
	const router = useRouter();
	const guild = useContext(GuildContext);
	const [warnings, setWarnings] = useState<GuildWarns>({});
	const [reportee, setReportee] = useState<DiscordUser>();

	const uid = router.query['user'] as string | undefined;

	useEffect(() => {
		if (!guild?.id || !uid) return;

		const c = db
			.collection('guilds')
			.doc(guild.id)
			.collection('warnings')
			.doc(uid)
			.onSnapshot((snap) => {
				console.log('READ');
				setWarnings(snap.data() as GuildWarns);
			});

		getUserInfo(uid).then((user) => {
			setReportee(user);
		});

		return () => {
			c();
		};
	}, [uid, guild]);

	if (!uid) {
		return <p>error</p>;
	}

	return (
		<ControlPanel>
			<ControlMainTitle>Warning Management</ControlMainTitle>
			<ControlContent>
				<div className="lg:flex lg:items-center lg:justify-between">
					<div className="flex-1 min-w-0">
						<nav className="flex" aria-label="Breadcrumb">
							<ol
								className="flex items-center space-x-4"
								role="list"
							>
								<li>
									<Link
										href={{
											pathname: '/control/[id]/warns',
											query: { id: guild?.id },
										}}
									>
										<a className="text-sm font-medium text-gray-300 hover:text-white">
											Warns
										</a>
									</Link>
								</li>
								<li>
									<div className="flex items-center">
										<ChevronRightIcon
											className="flex-shrink-0 h-5 w-5 text-gray-500"
											aria-hidden="true"
										/>
										<Link
											href={{
												pathname: '/control/[id]/warns',
												query: { id: guild?.id },
											}}
										>
											<a className="ml-4 text-sm font-medium text-gray-300 hover:text-white">
												{reportee?.username}
											</a>
										</Link>
									</div>
								</li>
							</ol>
						</nav>
						<h2 className="mt-2 text-2xl font-bold leading-7 text-green-200 sm:text-3xl sm:truncate">
							{reportee?.username}
							<span className="font-mono text-xl">
								#{reportee?.discriminator}
							</span>
						</h2>
						<div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
							<div className="mt-2 flex items-center text-sm text-gray-300">
								<ShieldExclamationIcon
									className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
									aria-hidden="true"
								/>
								{Object.keys(warnings).length} warning
								{Object.keys(warnings).length > 1 ? 's' : ''}
							</div>
						</div>
					</div>
				</div>
				<ul className="divide-y divide-gray-700">
					{Object.keys(warnings).map((timestamp) => {
						return (
							<WarningEntry
								warnings={warnings}
								timestamp={timestamp}
								uid={uid}
							/>
						);
					})}
				</ul>
			</ControlContent>
		</ControlPanel>
	);
};

interface EntryProps {
	warnings: GuildWarns;
	timestamp: string;
	uid: string;
}

const WarningEntry = ({ warnings, timestamp, uid }: EntryProps) => {
	const guild = useContext(GuildContext);
	const [reporter, setReporter] = useState<DiscordUser>();

	useEffect(() => {
		getUserInfo(warnInfo.by).then((user) => {
			setReporter(user);
		});
	}, [warnings, timestamp, uid]);

	const warnInfo = warnings[timestamp];
	const time = firebase.firestore.Timestamp.fromMillis(Number(timestamp));

	return (
		<li key={timestamp} className="py-4">
			<div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<div className="flex flex-row w-full justify-between">
						<h3 className="text-lg leading-6 font-medium text-green-300">
							Warning by {reporter?.username || 'LOADING...'}
							<span className="text-sm font-mono">
								#{reporter?.discriminator}
							</span>
						</h3>
						<div className="-mx-1.5 -my-1.5">
							<button
								type="button"
								className="inline-flex bg-gray-800 rounded-md p-1.5 text-red-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
								onClick={() => {
									db.collection('guilds')
										.doc(guild?.id)
										.collection('warnings')
										.doc(uid)
										.set(
											{
												[timestamp]:
													firebase.firestore.FieldValue.delete(),
											},
											{ merge: true }
										);
								}}
							>
								<span className="sr-only">Delete</span>
								<XIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>
					<p className="mt-1 max-w-2xl text-sm text-gray-300">
						{time.toDate().toUTCString()}
					</p>
				</div>
				<div className="border-t border-gray-700 px-4 py-5 sm:px-6">
					<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
						<div className="sm:col-span-1">
							<dt className="text-sm font-medium text-gray-300">
								Reporter ID
							</dt>
							<dd className="mt-1 text-sm text-green-200">
								{reporter?.id || 'LOADING...'}
							</dd>
						</div>
						<div className="sm:col-span-1">
							<dt className="text-sm font-medium text-gray-300">
								Automated
							</dt>
							<dd className="mt-1 text-sm text-green-200">
								{warnInfo.automated ? 'true' : 'false'}
							</dd>
						</div>
						<div className="sm:col-span-2">
							<dt className="text-sm font-medium text-gray-300">
								Reason
							</dt>
							<dd className="mt-1 text-sm text-green-200">
								{warnInfo.reason}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</li>
	);
};

export default UserWarnPage;
