import { Switch } from '@headlessui/react';
import { XCircleIcon, XIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';

import { AutomodTabs } from '../../../../components/control/AutomodWrapper';
import ControlPanel from '../../../../components/ControlPanel';
import { ConfigContext, GuildContext } from '../../../../contexts/guild';
import { db } from '../../../../utils/auth/firebase';
import { addTagToGuild, delTagFromGuild } from '../../../../utils/automod';

const TagsToggle = () => {
	const config = useContext(ConfigContext);
	const guild = useContext(GuildContext);

	const enabled = config?.automod?.word_filter?.enabled || false;

	return (
		<Switch.Group as="div" className="flex items-center justify-between">
			<Switch.Label as="span" className="flex-grow flex flex-col" passive>
				<span className="text-sm font-medium">
					Toggle Word Filtering
				</span>
				<span className="text-sm text-gray-500">
					Word Filtering can be disabled and configured at the same
					time.
				</span>
			</Switch.Label>
			<Switch
				checked={enabled}
				onChange={() => {
					if (guild) {
						db.collection('configs')
							.doc(guild.id)
							.set(
								{
									automod: {
										word_filter: { enabled: !enabled },
									},
								},
								{ merge: true }
							);
					}
				}}
				className={classNames(
					enabled ? 'bg-green-600' : 'bg-gray-200',
					'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent border-gray-800 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
				)}
			>
				<span className="sr-only">Use setting</span>
				<span
					className={classNames(
						enabled ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-gray-800 shadow transform ring-0 transition ease-in-out duration-200'
					)}
				>
					<span
						className={classNames(
							enabled
								? 'opacity-0 ease-out duration-100'
								: 'opacity-100 ease-in duration-200',
							'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
						)}
						aria-hidden="true"
					>
						<svg
							className="bg-gray-800 h-3 w-3 text-gray-400"
							fill="none"
							viewBox="0 0 12 12"
						>
							<path
								d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					<span
						className={classNames(
							enabled
								? 'opacity-100 ease-in duration-200'
								: 'opacity-0 ease-out duration-100',
							'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
						)}
						aria-hidden="true"
					>
						<svg
							className="bg-gray-800 h-3 w-3 text-green-600"
							fill="currentColor"
							viewBox="0 0 12 12"
						>
							<path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
						</svg>
					</span>
				</span>
			</Switch>
		</Switch.Group>
	);
};

const FormError: FC<{
	errors: string[];
	resetStateHandler: Dispatch<SetStateAction<string[]>>;
}> = (props) => {
	if (props.errors.length < 1) return <></>;

	return (
		<div className="rounded-md bg-red-50 p-4 mt-2">
			<div className="flex">
				<div className="flex-shrink-0">
					<XCircleIcon
						className="h-5 w-5 text-red-400"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-red-800">
						There were {props.errors.length} errors with your
						submission
					</h3>
					<div className="mt-2 text-sm text-red-700">
						<ul className="list-disc pl-5 space-y-1">
							{props.errors.map((error) => (
								<li>{error}</li>
							))}
						</ul>
					</div>
				</div>
				<div className="ml-auto pl-3">
					<div className="-mx-1.5 -my-1.5">
						<button
							type="button"
							className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
							onClick={() => {
								props.resetStateHandler([]);
							}}
						>
							<span className="sr-only">Dismiss</span>
							<XIcon className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

interface Props {}

const AutomodIndex = (_props: Props) => {
	const guild = useContext(GuildContext);
	const config = useContext(ConfigContext);

	const [formTag, setFormTag] = useState<string>('');
	const [isCaseSensitive, setCaseSensitive] = useState<boolean>(false);
	const [isStrict, setStrict] = useState<boolean>(false);
	const [formErrors, setErrors] = useState<string[]>([]);

	function addTag(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		let errors: string[] = [];
		if (!guild?.id) {
			errors.push('No Guild found.');
		}
		if (formTag.length < 1) {
			errors.push('Please enter a key term.');
		}
		if (formTag.length > 64) {
			errors.push('This key term is a little long. Please shorten it.');
		}
		if (isStrict && formTag.includes(' ')) {
			errors.push('Strict terms can not include spaces.');
		}
		if (errors.length > 0) {
			setErrors(errors);
			return;
		}
		if (guild?.id)
			addTagToGuild(guild.id, formTag, {
				case_sensitive: isCaseSensitive,
				strict: isStrict,
			});
		setFormTag('');
		setCaseSensitive(false);
		setStrict(false);
	}

	return (
		<ControlPanel>
			<AutomodTabs />
			<div className="mt-2 mb-4">
				<div>
					<h3 className="text-lg leading-6 font-medium text-green-300">
						Tag/Keyword Management
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						Find and ban words that may be offensive to users or
						your community.
					</p>
				</div>
				<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
					<div className="col-span-6">
						<TagsToggle />
					</div>
				</div>
			</div>
			<FormError errors={formErrors} resetStateHandler={setErrors} />
			<form onSubmit={addTag} className="mt-2">
				<div className="shadow sm:rounded-md sm:overflow-hidden">
					<div className="border border-gray-900 bg-gray-800 py-6 px-4 space-y-6 sm:p-6">
						<div>
							<h3 className="text-lg leading-6 font-medium text-green-300">
								Create new Tag
							</h3>
							<p className="mt-1 text-sm text-gray-300">
								Just enter a phrase or word that you don't want
								in your server, and Ferris will warn for each
								infraction!
							</p>
						</div>

						<div className="grid grid-cols-3 gap-6">
							<div className="col-span-3 sm:col-span-2">
								<label
									htmlFor="company_website"
									className="block text-sm font-medium"
								>
									Keyword
								</label>
								<input
									type="text"
									name="tag"
									id="tag"
									onChange={(t) => {
										setFormTag(t.target.value);
									}}
									value={formTag}
									className="bg-gray-900 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md"
								/>
							</div>
						</div>
						<legend className="text-base font-medium">
							Extra options
						</legend>
						<div className="mt-4 space-y-4">
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="casesensitive"
										name="casesensitive"
										type="checkbox"
										className="focus:ring-green-500 h-4 w-4 text-green-600 rounded bg-gray-900"
										checked={isCaseSensitive}
										onChange={(e) => {
											setCaseSensitive(e.target.checked);
										}}
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="casesensitive"
										className="font-medium"
									>
										Case sensitive
									</label>
									<p className="text-gray-500">
										Text will be compared with capital
										letters and non-capital letters. Turn
										off if using non ASCII charcters.
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="strict"
										name="strict"
										type="checkbox"
										className="focus:ring-green-500 h-4 w-4 text-green-600 rounded bg-gray-900"
										checked={isStrict}
										onChange={(e) => {
											setStrict(e.target.checked);
										}}
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="strict"
										className="font-medium"
									>
										Strict word check
									</label>
									<p className="text-gray-500">
										Best for single words or curse words.
										This option will check whole words for
										matching terms.{' '}
										<span className="text-red-400">
											This option will not work with
											spaces.
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="px-4 py-3 bg-gray-700 text-right sm:px-6">
						<button
							type="submit"
							className="bg-green-600 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-green-50 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						>
							Add Tag
						</button>
					</div>
				</div>
			</form>
			{/* END OF THE FORM */}
			<div
				className="mt-2"
				hidden={(config?.automod?.word_filter?.tags?.length || 0) < 1}
			>
				<h3 className="text-lg leading-6 font-medium text-green-300">
					Tags/Keywords
				</h3>
				<p className="mt-1 text-sm text-gray-300">
					Delete and see existing tags here.
				</p>
			</div>
			<ul className="divide-y divide-gray-700">
				{config?.automod?.word_filter?.tags?.map((item) => (
					<li key={item.tag} className="py-4 mx-auto pr-2">
						<div className="flex justify-between">
							<div className="min-w-0 flex-1">
								<div className="block focus:outline-none">
									<p className="text-sm font-mono truncate">
										{item.tag}
									</p>
								</div>
							</div>
							<div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
								<div className="-mx-1.5 -my-1.5">
									<button
										type="button"
										className="inline-flex bg-gray-800 rounded-md p-1.5 text-red-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
										onClick={() => {
											if (guild?.id)
												delTagFromGuild(guild.id, item);
										}}
									>
										<span className="sr-only">Delete</span>
										<XIcon
											className="h-5 w-5"
											aria-hidden="true"
										/>
									</button>
								</div>
							</div>
						</div>
						<div className="mt-1">
							<p className="line-clamp-2 text-sm text-gray-600">
								{item.case_sensitive ? (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-800 text-green-100">
										Case Sensitive
									</span>
								) : null}{' '}
								{item.strict ? (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-800 text-green-100">
										Strict
									</span>
								) : null}
							</p>
						</div>
					</li>
				))}
			</ul>
		</ControlPanel>
	);
};

export default AutomodIndex;
