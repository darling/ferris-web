import React, { useContext, useEffect, useState } from 'react';

import { ControlMainTitle } from '../../../components/control/ControlSidebar';
import ControlPanel from '../../../components/ControlPanel';
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
		<ControlPanel>
			<ControlMainTitle>Warning Management</ControlMainTitle>
			<div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
				<main className="lg:col-span-12 xl:col-span-7">
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
				</main>
				<aside className="hidden xl:block xl:col-span-5">
					<div className="sticky top-6 space-y-4">
						<ControlWarningLog data={warningList} />
					</div>
				</aside>
			</div>
		</ControlPanel>
	);
};

export default ControlWarns;
