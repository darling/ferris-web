import { useContext, useEffect, useState } from 'react';
import { LoggingSettings } from '../../../components/control/Settings/LoggingSettings';
import ControlPanel from '../../../components/ControlPanel';
import JSONstringify from '../../../components/dev/JSONstringify';
import { GuildContext } from '../../../contexts/guild';
import { db } from '../../../utils/auth/firebase';

const ControlConfig = () => {
	const guild = useContext(GuildContext);
	const [config, setConfig] = useState<any | null>(null);
	// const [newPrefix, setNewPrefix] = useState<string>('');

	useEffect(() => {
		if (!guild?.id) return;
		console.log('FETCHING CONFIG', guild?.id)
		const close = db.collection('configs').doc(guild.id).onSnapshot((snapshot) => {
			console.log('NEW DATA', snapshot.data())
			setConfig({...snapshot.data()} || null)
		}, (e) => {
			console.error(e)
		})

		return close;
	}, [guild?.id])

	function changePrefix(event: any) {
		event.preventDefault();

		if (event.target[0].value.length) {
			db.collection('configs').doc(guild?.id)
				.set({ prefix: event.target[0].value }, { merge: true });
		}
	}

	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Config Home'}
			</h1>
			<div>
				<div className="my-5">
					<h2 className="text-3xl font-bold tracking-wider  mb-1">
						Prefix
					</h2>
					<hr />
				</div>
				<div className="flex flex-col">
					<p>
						The prefix is currently{' '}
						<code className="bg-gray-800 rounded-md px-1">
							{config?.prefix || ';'}
						</code>
						.
					</p>
					<form
						onSubmit={changePrefix}
						className="flex flex-row gap-2 mt-2"
					>
						<input
							className="rounded-lg bg-gray-800 px-2 py-1"
							type="text"
							name="prefix-change"
							id="prefix-change"
						/>
						<button
							className="bg-green-600 text-white px-2 py-1 rounded-lg"
							type="submit"
						>
							Change
						</button>
					</form>
				</div>
			</div>
			<LoggingSettings config={config} />
		</ControlPanel>
	);
};

export default ControlConfig;
