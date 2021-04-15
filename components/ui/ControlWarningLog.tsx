import firebase from 'firebase';
import { take, toPairsIn } from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import { DiscordUser } from '../../interfaces';
import { getUserInfo } from '../../utils/discord-layer';

interface Props {
	children?: any;
	data?: any;
}

interface LogProps {
	reason?: string;
	user: string;
	by: string;
	timestamp: string;
}

const WarningLog = (props: LogProps) => {
	const [userData, setUserData] = useState<DiscordUser | undefined>(
		undefined
	);

	const [byData, setByData] = useState<DiscordUser | undefined>(undefined);

	useEffect(() => {
		if (!props.user) {
			return;
		}

		getUserInfo(props.user).then((data) => {
			if (data) {
				setUserData(data);
			}
		});

		getUserInfo(props.by).then((data) => {
			if (data) {
				setByData(data);
			}
		});
	}, [props.user, props.by]);

	if (!userData || !byData) {
		return <></>;
	}

	const time = firebase.firestore.Timestamp.fromMillis(
		Number(props.timestamp)
	).toDate();

	return (
		<li>
			<div className="relative pb-8">
				{/* SIDE BORDER */}
				{/* <span
					className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
					aria-hidden="true"
				></span> */}
				<div className="relative flex items-start space-x-3">
					<div className="relative">
						<img
							className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center ring-8 ring-gray-900"
							src={`https://cdn.discordapp.com/avatars/${
								byData.id
							}/${byData.avatar}.${
								byData.avatar?.startsWith('a_') ? 'gif' : 'png'
							}`}
							alt=""
						/>

						<span className="absolute -bottom-0.5 -right-1 bg-gray-900 rounded-tl px-0.5 py-px">
							<svg
								className="h-5 w-5 text-gray-400"
								data-todo-x-description="Heroicon name: solid/chat-alt"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
									clipRule="evenodd"
								></path>
							</svg>
						</span>
					</div>
					<div className="min-w-0 flex-1">
						<div>
							<div className="text-sm">
								<span className="font-medium text-green-200">
									{byData.username}
								</span>{' '}
								warned{' '}
								<span className="font-medium text-green-200">
									{userData.username}
								</span>
							</div>
							<p className="mt-0.5 text-sm text-gray-500">
								{time.toLocaleDateString()} at{' '}
								{time.toLocaleTimeString()}
							</p>
						</div>
						<div className="mt-2 text-sm text-gray-300">
							<p>{props.reason}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export const ControlWarningLog = (props: Props) => {
	const data: {
		[key: string]: { [time: string]: { by: string; reason: string } };
	} = props.data;

	let allWarningsAsTimestamp: {
		by: string;
		reason: string;
		timestamp: string;
		user: string;
	}[] = [];

	const unorganizedTimes = toPairsIn(data);

	unorganizedTimes.forEach(([userId, nonProcessedOffenses]) => {
		const offenses = toPairsIn(nonProcessedOffenses);

		offenses.forEach(([timestamp, warningObj]) => {
			const newWarningFeedData = {
				...warningObj,
				user: userId,
				timestamp,
			};

			allWarningsAsTimestamp.push(newWarningFeedData);
		});
	});

	return (
		<div>
			<div className="pb-5 border-b border-gray-200">
				<h3 className="text-lg leading-6 font-medium">Recent Warns</h3>
			</div>
			<div className="py-8">
				<div className="max-w-lg mx-auto px-6">
					<div className="flow-root">
						<ul className="-mb-8">
							{take(
								allWarningsAsTimestamp.sort(
									(a, b) =>
										Number(b.timestamp) -
										Number(a.timestamp)
								),
								8
							).map((data) => {
								return (
									<WarningLog
										key={data.timestamp}
										user={data.user}
										by={data.by}
										reason={data.reason}
										timestamp={data.timestamp}
									/>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
