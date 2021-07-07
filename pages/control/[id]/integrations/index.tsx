import { XCircleIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { flatMap, split, truncate } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import { ChannelSelectBox } from '../../../../components/control/ChannelSelectBox';
import {
	ControlContent,
	ControlMainTitle,
} from '../../../../components/control/ControlSidebar';
import ControlPanel from '../../../../components/ControlPanel';
import { useAuth } from '../../../../contexts/auth';
import { GuildContext } from '../../../../contexts/guild';
import { IYTDoc } from '../../../../interfaces/ytchannels';
import { fetchApi } from '../../../../utils/auth/fetch';
import { db } from '../../../../utils/auth/firebase';
import { FormLabel } from '../config';

const codes = [
	{
		code: '{links}',
		value: 'The links',
		fake: (
			<a
				className="text-green-400 hover:underline"
				href="https://www.youtube.com/watch?v=zNto-3DvDpw"
			>
				https://www.youtube.com/watch?v=zNto-3DvDpw
			</a>
		),
	},
	{
		code: '{channel_name}',
		value: 'The Channel Name',
		fake: <span className="text-green-300 font-mono">{'Safe'}</span>,
	},
];

const AutomodIndex = () => {
	const guild = useContext(GuildContext);
	const auth = useAuth();

	const [content, setContent] = useState<string>('');
	const [ytDoc, setYtDoc] = useState<IYTDoc>();
	const [newCID, setCID] = useState<string>('');

	const NO_CHANNEL = !!!ytDoc?.channel;

	useEffect(() => {
		if (!guild) return;

		const close = db
			.collection('ytchannels')
			.doc(guild.id)
			.onSnapshot((snap) => {
				setYtDoc(snap.data());

				if (snap.data()?.content) {
					setContent(snap.data()?.content);
				}
			});

		return () => {
			close();
		};
	}, [guild]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: { comment: content },
		onSubmit: async (values, { setSubmitting }) => {
			console.log(values);
			try {
				const result = await fetchApi('/ytsubcomment', {
					method: 'POST',
					body: {
						gid: guild?.id,
						content: values.comment,
					},
				});

				console.log('res: ', result); // TODO: SOMETHING WITH THIS
			} catch (err) {
				console.error(err);
			}
			setTimeout(() => {
				setSubmitting(false);
			}, 400);
		},
		validate: (values) => {
			let error: any = {};
			const empty = values.comment.length < 1;
			const tooLong = values.comment.length > 400;

			if (!values.comment) {
				// non existent
				error.comment = 'Required';
			}
			if (empty) {
				error.comment = 'You cannot upload an empty message.';
			}
			if (tooLong) {
				error.comment =
					'Your message is too long. Try changing it a bit';
			}
			if (values.comment === content) {
				error.comment = 'You can not submit the same message';
			}
			return error;
		},
	});

	const buttonClassname = classNames(
		'ml-3 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 disabled:bg-gray-600'
	);

	const textClassname = classNames(
		'mt-2 bg-gray-800 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md transition duration-200 disabled:bg-gray-700 invalid:ring-red-500 invalid:border-red-500'
	);

	const currentChannel = ytDoc?.channel
		? {
				label: guild?.channels?.[ytDoc?.channel].name,
				value: ytDoc?.channel,
		  }
		: undefined;

	const parseMessageTest = (content?: string) => {
		if (!content) {
			return (
				<p>
					<span className="text-green-300 font-mono">
						{auth?.displayName || 'Safe'}
					</span>{' '}
					has posted a new video:
					<br />
					<br />
					<a
						className="text-green-300 hover:underline "
						href="https://www.youtube.com/watch?v=zNto-3DvDpw"
					>
						https://www.youtube.com/watch?v=zNto-3DvDpw
					</a>
				</p>
			);
		}
		const hasCodes = codes
			.map((entry) => content.includes(entry.code))
			.includes(true);

		if (hasCodes) {
			// ITERATION ITERATION ITERATION ITERATION
			const regExDelim = ['{', '}'].join('|');
			const splitContent = split(content, new RegExp(regExDelim, 'g'));
			const spitOutput = flatMap(splitContent, (term) => {
				const faked = codes.find(
					({ code }) => `{${term}}` === code
				)?.fake;

				return faked || term;
			});
			return <p>{spitOutput}</p>;
		} else {
			return (
				<p>
					<span>{content}</span>
					<br />
					<br />
					<a
						className="text-green-400 hover:underline"
						href="https://www.youtube.com/watch?v=zNto-3DvDpw"
					>
						https://www.youtube.com/watch?v=zNto-3DvDpw
					</a>
				</p>
			);
		}
	};

	return (
		<ControlPanel>
			<ControlMainTitle>Integration Management</ControlMainTitle>
			<ControlContent>
				<div className="mt-2">
					<div>
						<h3 className="text-lg leading-6 font-medium text-green-300">
							General Config
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Integrations may be a little complex to setup, but
							these settings are laid out to help.
						</p>
					</div>
					<div className="grid grid-cols-3 lg:grid-cols-6 lg:space-x-8 mt-6">
						<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3 col-span-3">
							<div className="sm:col-span-6 space-y-4">
								<div>
									<FormLabel htmlFor="channel">
										Channel
									</FormLabel>
									<div
										hidden={!NO_CHANNEL}
										className="rounded-md bg-red-50 p-4"
									>
										<div className="flex">
											<div className="flex-shrink-0">
												<XCircleIcon
													className="h-5 w-5 text-red-400"
													aria-hidden="true"
												/>
											</div>
											<div className="ml-3">
												<h3 className="text-sm font-medium text-red-800">
													Please choose a valid text
													channel in order to
													add/manage integrations.
												</h3>
												<div className="mt-2 text-sm text-red-700">
													<ul className="list-disc pl-5 space-y-1">
														<li>
															Please check its
															permissions in the
															Discord and make
															sure it can talk in
															the said channel.
														</li>
														<li>Thank you</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<ChannelSelectBox
										id="channel"
										onChange={(newChannel: any) => {
											fetchApi('/ytsubchannel', {
												body: {
													gid: guild?.id,
													channel: newChannel.value,
												},
												method: 'POST',
											});
											return;
										}}
										channelData={currentChannel}
									/>
								</div>
								<form onSubmit={formik.handleSubmit}>
									<FormLabel htmlFor="comment">
										Message
									</FormLabel>
									{formik.touched.comment &&
										formik.errors.comment && (
											<div>{formik.errors.comment}</div>
										)}
									<textarea
										name="comment"
										id="comment"
										onChange={formik.handleChange}
										value={formik.values.comment}
										required
										placeholder={
											'{channel_name} has posted a new video:\n\n{links} <-- (Links are added to the bottom by default)'
										}
										disabled={NO_CHANNEL}
										className={textClassname}
									/>
									<div className="pt-5">
										<div className="flex justify-end">
											<button
												type="submit"
												disabled={
													formik.isSubmitting ||
													NO_CHANNEL
												}
												className={buttonClassname}
											>
												Update
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-span-3 mt-4 lg:mt-0">
							<FormLabel>Preview</FormLabel>
							<div className="flex p-4 bg-gray-800 rounded-md shadow-md mt-2 mb-4">
								<div className="mr-4 flex-shrink-0">
									<img
										src="/img/placeholder-crystal.png"
										alt="Ferris logo"
										className="h-10 w-10 lg:h-14 lg:w-14 rounded-full shadow-sm"
									/>
								</div>
								<div>
									<h4 className="text-lg font-bold">
										Ferris{' '}
										<span className="text-xs text-gray-500 font-normal select-none">
											Today at 7:00 PM
										</span>
									</h4>
									<div className="mt-1 overflow-hidden text-sm md:text-base text-gray-200 whitespace-pre-wrap">
										{parseMessageTest(content)}
									</div>
								</div>
							</div>
							<FormLabel>Variable Codes</FormLabel>
							<p className="text-gray-500 text-sm">
								If you want to have dynamic information within
								the announcement messages, you can type these
								'codes' into the message and Ferris will
								compensate.
							</p>
							<div className="mt-2">
								{/* CONTAINER START */}
								<div className="shadow overflow-hidden border-b border-gray-700 rounded-lg">
									<table className="min-w-full divide-y divide-gray-700">
										<thead className="bg-gray-800">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
												>
													code
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
												>
													value
												</th>
											</tr>
										</thead>
										<tbody>
											{codes.map((entry, personIdx) => (
												<tr
													key={entry.code}
													className={
														personIdx % 2 === 0
															? 'bg-gray-600'
															: 'bg-gray-700'
													}
												>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-mono select-all text-white ">
														{entry.code}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
														{entry.value}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<div>
						<h3 className="text-lg leading-6 font-medium text-green-300">
							Add a new Youtube Sub
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Add a new subscription. Click{' '}
							<a
								className="text-green-300"
								href="https://www.youtube.com/account_advanced"
							>
								here
							</a>{' '}
							to get your Channel ID.
						</p>
					</div>
					<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div className="sm:col-span-6">
							<div>
								<FormLabel htmlFor="comment">Message</FormLabel>
								<input
									type="text"
									name="comment"
									id="comment"
									onChange={(t) => {
										setCID(
											truncate(t.target.value, {
												length: 400,
											})
										);
									}}
									value={newCID}
									placeholder={'UCnUwh0iMZHFg4O3Tsussyfjtw'}
									disabled={NO_CHANNEL}
									className={textClassname}
								/>
								<div className="pt-5">
									<div className="flex justify-end">
										<button
											onClick={(event) => {
												event.preventDefault();

												if (!currentChannel) {
													return alert(
														'Please choose a channel first'
													);
												}

												if (newCID.length > 1)
													try {
														console.log(
															'adding new channel',
															newCID
														);
														fetchApi('/ytsubadd', {
															method: 'POST',
															body: {
																gid: guild?.id,
																cid: newCID,
															},
														});
													} catch (error) {
														console.error(error);
													}
											}}
											disabled={
												newCID.length < 1 || NO_CHANNEL
											}
											className={buttonClassname}
										>
											Update
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<div>
						<h3 className="text-lg leading-6 font-medium text-green-300">
							Current Subscriptions
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							All of the <span>{guild?.name}</span> Youtube
							subscriptions.
						</p>
					</div>
					<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div className="sm:col-span-6">
							<p>
								I'm about 9 hours into creating this and don't
								want to style anyting anymore so deal with the
								lightmode table.
							</p>
							<div className="flex flex-col">
								<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
										<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
											<table className="min-w-full divide-y divide-gray-200">
												<thead className="bg-gray-50">
													<tr>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
														>
															Channel Id
														</th>
														<th
															scope="col"
															className="relative px-6 py-3"
														>
															<span className="sr-only">
																Channel URL
															</span>
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
												<tbody className="bg-white divide-y divide-gray-200">
													{ytDoc?.cid?.map((cid) => (
														<tr key={cid}>
															<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
																{cid}
															</td>
															<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
																<a
																	href={`https://youtube.com/channel/${cid}`}
																	className="text-green-600 hover:text-green-900"
																>
																	Youtube Url
																</a>
															</td>
															<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
																<button
																	onClick={(
																		e
																	) => {
																		e.preventDefault();

																		fetchApi(
																			'/ytsubdel',
																			{
																				body: {
																					cid,
																					gid: guild?.id,
																				},
																			}
																		);
																	}}
																	className="text-red-600 hover:text-red-900"
																>
																	Delete
																</button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ControlContent>
		</ControlPanel>
	);
};

export default AutomodIndex;
