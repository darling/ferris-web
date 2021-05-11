import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import { GuildContext } from '../../contexts/guild';
import { DiscordUser } from '../../interfaces';
import { getUserInfo } from '../../utils/discord-layer';

interface ControlProps {
	children?: any;
	id?: string;
	warnData: {
		[timestamp: string]: {
			by: string;
			reason: string;
		};
	};
}

export const ControlWarnedUserBar = (props: ControlProps) => {
	const [userData, setUserData] =
		useState<DiscordUser | undefined>(undefined);
	const guild = useContext(GuildContext);

	useEffect(() => {
		if (!props.id) {
			return;
		}

		getUserInfo(props.id).then((data) => {
			if (data) {
				setUserData(data);
			}
		});
	}, [props.id]);

	if (!userData) {
		return <></>;
	}

	return (
		<tr key={userData.id}>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="flex-shrink-0 h-10 w-10">
						<img
							className="h-10 w-10 rounded-full"
							src={userData.avatar}
							alt=""
						/>
					</div>
					<div className="ml-4">
						<div className="text-sm font-medium text-green-200">
							{userData.username}
							<span className="text-xs font-mono text-gray-400">
								#{userData.discriminator}
							</span>
						</div>
						<div className="text-sm text-gray-500"></div>
					</div>
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-green-200">{userData.id}</div>
				<div className="text-sm text-gray-500">
					{userData.bot ? 'BOT' : ''}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{Object.keys(props.warnData).length}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<Link
					href={{
						pathname: '/control/[id]/warns/[user]',
						query: { id: guild?.id, user: userData.id },
					}}
				>
					<a className="bg-blue-400 hover:bg-blue-600 p-2 rounded-md text-blue-50">
						View Warns
					</a>
				</Link>
			</td>
		</tr>
	);
};
