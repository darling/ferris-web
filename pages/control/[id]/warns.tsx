import { useContext, useEffect, useState } from 'react';

import ControlPanel from '../../../components/ControlPanel';
import { SectionHeading } from '../../../components/ui-atoms/SectionHeading';
import { ControlWarnedUserBar } from '../../../components/ui/ControlWarnedUser';
import { ControlWarningLog } from '../../../components/ui/ControlWarningLog';
import { GuildContext } from '../../../contexts/guild';
import { db } from '../../../utils/auth/firebase';

// import { getUserInfo } from '../../../utils/discord-layer';

const ControlWarns = () => {
	const guild = useContext(GuildContext);
	const [warningList, setWarningList] = useState<any>();

	useEffect(() => {
		if (!guild?.id) return;
		console.log('FETCHING WARNINGS', guild?.id);

		const c = db
			.collection('guilds')
			.doc(guild.id)
			.collection('warnings')
			.limit(20)
			.onSnapshot({
				next: (snapshot) => {
					let dupedList: any = {};

					snapshot.docChanges().forEach((docSnap) => {
						if (docSnap.type !== 'removed') {
							const data = docSnap.doc.data();
							dupedList[docSnap.doc.id] = data;
							console.log(
								docSnap.doc.id,
								docSnap.type.toUpperCase()
							);
						} else if (docSnap.type === 'removed') {
							dupedList[docSnap.doc.id] = null;
						}
					});

					setWarningList((state: any) => ({
						...state,
						...dupedList,
					}));
				},
				error: (e) => {
					console.error(e);
				},
			});

		return () => {
			console.log('UNSUB');
			c();
		};
	}, [guild?.id]);

	const warnRows = Object.keys(warningList || {}).map((id) => (
		<ControlWarnedUserBar key={id} id={id} warnData={warningList[id]} />
	));

	return (
		<ControlPanel right={<ControlWarningLog data={warningList} />}>
			<SectionHeading heading="Warnings" />
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-900 sm:rounded-lg my-2">
							<table className="min-w-full divide-y divide-gray-900">
								<thead className="bg-gray-800">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
										>
											User
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
										>
											ID
										</th>
										{/* <th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
										>
											Status
										</th> */}
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
										>
											Warnings
										</th>
										<th
											scope="col"
											className="relative px-6 py-3"
										>
											<span className="sr-only">
												Edit
											</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-gray-700 divide-y divide-gray-900">
									{warnRows}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</ControlPanel>
	);
};

export default ControlWarns;
