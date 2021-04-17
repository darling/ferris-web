import { useEffect, useState } from 'react';
import { DiscordUser } from '../../interfaces';
import { discordProfilePic, getUserInfo } from '../../utils/discord-layer';

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
	const [userData, setUserData] = useState<DiscordUser | undefined>(
		undefined
	);

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
							src={discordProfilePic(
								userData.id,
								userData.avatar || '0'
							)}
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
			{/* <td className="px-6 py-4 whitespace-nowrap">
				<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
					Active
				</span>
			</td> */}
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{Object.keys(props.warnData).length}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<a href="#" className="text-blue-600 hover:text-indigo-900">
					NOT ADDED YET
				</a>
			</td>
		</tr>
	);
};
