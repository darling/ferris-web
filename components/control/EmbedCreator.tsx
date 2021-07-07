import classNames from 'classnames';
import { Formik } from 'formik';
import { identity, pick, pickBy } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

import { GuildContext } from '../../contexts/guild';
import { Embed } from '../../interfaces/control';
import { FormLabel } from '../../pages/control/[id]/config';
import { db } from '../../utils/auth/firebase';

interface IEmbedCreator {
	onSubmit: (embed: Embed, commandName: string) => void;
	submitButton?: string;
	editExisting?: string;
}

const EmbedCreator = (props: IEmbedCreator) => {
	const guild = useContext(GuildContext);

	const [initValues, setInitValues] = useState({
		title: '',
		name: '',
		description: '',
		footer: '',
		color: '#6EE7B7',
		url: '',
		thumbnail: '',
		image: '',
	});

	useEffect(() => {
		if (!guild?.id) return;

		if (!props.editExisting) {
			setInitValues({
				title: '',
				name: '',
				description: '',
				footer: '',
				color: '#6EE7B7',
				url: '',
				thumbnail: '',
				image: '',
			});
			return;
		}

		console.log('FETCHING COMMAND ' + props.editExisting);

		db.collection('configs')
			.doc(`${guild.id}`)
			.get()
			.then((snapshot) => {
				console.log(snapshot.data());

				const data =
					snapshot.data()?.custom?.[props.editExisting!].embed ?? {};

				console.log(data);

				setInitValues({
					title: data.title || '',
					name: props.editExisting || '',
					description: data.description || '',
					footer: data.footer?.text || '',
					color: data.color
						? `#${data.color.toString(16)}`
						: '#6EE7B7',
					url: data.url || '',
					thumbnail: data.thumbnail?.url || '',
					image: data.image?.url || '',
				});
			});
	}, [props.editExisting, guild]);

	const inputClassName =
		'bg-gray-800 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md';

	function noAllowSpaces(event: any) {
		if (event.key === ' ') {
			event.preventDefault();
		}
	}

	return (
		<Formik
			onSubmit={(values, actions) => {
				const payload = pickBy(values, identity);
				const existingProps = pick(payload, ['description', 'url']);

				let embed: Embed = {
					...existingProps,
					title: values.title,
					color: parseInt(values.color.replace('#', ''), 16),
				};

				if (payload.thumbnail) {
					embed.thumbnail = {
						url: payload.thumbnail,
					};
				}

				if (payload.image) {
					embed.image = {
						url: payload.image,
					};
				}

				if (payload.footer) {
					embed.footer = {
						text: payload.footer,
					};
				}

				props.onSubmit(embed, values.name);

				actions.setSubmitting(false);
				actions.resetForm();
			}}
			initialValues={initValues}
			enableReinitialize={true}
		>
			{({
				values,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<form
					onSubmit={handleSubmit}
					className={classNames(
						'text-green-100 flex flex-col col-span-4',
						{
							'space-y-2': true,
						}
					)}
				>
					<FormLabel>General Information</FormLabel>

					<input
						type="text"
						name="name"
						required
						onChange={handleChange}
						onBlur={handleBlur}
						value={props.editExisting ?? values.name}
						disabled={!!props.editExisting}
						onKeyDown={noAllowSpaces}
						placeholder="commandname"
						className="bg-gray-800 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md col-span-6"
					/>
					<FormLabel>Embed Contents</FormLabel>
					<input
						type="text"
						name="title"
						placeholder="The title goes here"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.title}
						className={classNames(
							inputClassName,
							'font-bold',
							'text-lg'
						)}
					/>
					<textarea
						name="description"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.description}
						wrap={'true'}
						placeholder="Description... try putting something interesting here? You can try some **markdown**, but until I add some styling, it will just end up like text here LOL."
						className={classNames(inputClassName)}
					/>
					<input
						type="text"
						name="footer"
						placeholder="You can write anything you'd like in the footer"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.footer}
						className={inputClassName}
					/>
					<FormLabel htmlFor="name">Title URL</FormLabel>
					<input
						type="url"
						name="url"
						value={values.url}
						className={inputClassName}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="https://ferris.gg/img/placeholder-crystal.png"
					/>
					<FormLabel htmlFor="name">Large image</FormLabel>
					<input
						type="url"
						name="image"
						value={values.image}
						className={inputClassName}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="https://ferris.gg/img/placeholder-crystal.png"
					/>
					<FormLabel htmlFor="thumbnail">Thumbnail</FormLabel>
					<input
						type="url"
						name="thumbnail"
						value={values.thumbnail}
						className={inputClassName}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="https://ferris.gg/img/placeholder-crystal.png"
					/>
					<FormLabel htmlFor="name">Embed Color</FormLabel>
					<input
						type="color"
						name="color"
						value={values.color}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="#FFFFFF"
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						className={classNames(
							{
								'bg-white': !isSubmitting,
								'bg-gray-400': isSubmitting,
							},
							'text-gray-900',
							'p-3',
							'rounded-md',
							'hover:bg-gray-200'
						)}
					>
						{props.editExisting ? 'Save' : 'Create'}{' '}
						{values.name ? (
							<span className="font-mono">{values.name}</span>
						) : (
							values.name || 'Command'
						)}
					</button>
				</form>
			)}
			{/* <form className="text-green-100 flex flex-col gap-2">
				<input
					type="text"
					name="Name"
					id="name"
					required
					placeholder="name"
					className="rounded-lg bg-gray-900 shadow-xl mt-2 p-3 font-mono"
				/> */}
			{/* <div
					className="flex flex-col gap-2 bg-gray-900 p-3 rounded-md border-l-4"
					style={{ borderColor: color }}
				>
					<input
						type="text"
						name="Title"
						id="title"
						value={title}
						required
						onChange={saveTitle}
						placeholder="Title"
						className={inputClassName + ' font-bold text-lg'}
					/>
					<textarea
						name="Description"
						id="description"
						value={description}
						onChange={saveDescription}
						wrap={'true'}
						placeholder="Description... try putting something interesting here? You can try some **markdown**, but until I add some styling, it will just end up like text here LOL."
						className={inputClassName}
					/>
					<input
						type="text"
						name="Footer"
						id="footer"
						value={footer}
						onChange={saveFooter}
						placeholder="Footer"
						className={inputClassName + ' text-sm'}
					/>
					<div className="flex flex-col lg:flex-row w-full gap-2">
						<div className="lg:w-1/3">
							<h2 className="text-lg font-bold tracking-wide select-none">
								Images
							</h2>
							<label htmlFor="imageUrl" className="text-sm">
								The link to the main image
							</label>
							<input
								type="url"
								name="imageUrl"
								id="imageUrl"
								value={imageUrl}
								onChange={saveImageUrl}
								placeholder="https://example.com/image.png"
								className={inputClassName + ' w-full'}
							/>
							<label htmlFor="thumbnailUrl" className="text-sm">
								The link to the thumbnail on the right side.
							</label>
							<input
								type="url"
								name="thumbnailUrl"
								id="thumbnailUrl"
								value={thumbnailUrl}
								onChange={saveThumbnailUrl}
								placeholder="https://example.com/image.png"
								className={inputClassName + ' w-full'}
							/>
						</div>
						<div className="lg:w-1/3">
							<h2 className="text-lg font-bold tracking-wide select-none">
								Links
							</h2>
							<label htmlFor="titleUrl" className="text-sm">
								The link users will go to if they click{' '}
								{title ? `"${truncate(title)}"` : 'the title'}.
							</label>
							<input
								type="url"
								name="titleUrl"
								id="titleUrl"
								value={url}
								onChange={saveUrl}
								placeholder="https://ferris.gg/"
								className={inputClassName + ' w-full'}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h2 className="text-lg font-bold tracking-wide select-none">
								Details
							</h2>
							<div>
							</div>
							<div>
								<label htmlFor="color" className="text-sm">
									Choose the color of the embed.
								</label>
								<input
									type="color"
									name="Color"
									id="color"
									value={color}
									onChange={saveColor}
									className="cursor-pointer w-full"
								/>
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="bg-white text-gray-900 p-2 rounded-lg w-full md:w-1/3"
					>
						{props.submitButton || 'Create'}
					</button>
				</div> */}
			{/* </form> */}
		</Formik>
	);
};

export default EmbedCreator;
