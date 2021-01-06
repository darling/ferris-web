import { snakeCase, truncate } from 'lodash';
import { FormEvent, useState } from 'react';

import { Embed } from '../../interfaces/control';

interface IEmbedCreator {
	onSubmit: (embed: Embed, commandName: string) => void;
	submitButton?: string;
}

const EmbedCreator = (props: IEmbedCreator) => {
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		let embed: Embed = {
			title,
			description,
			footer: {
				text: footer,
			},
			url: url || 'https://ferris.gg/',
			color: parseInt(color.replace('#', ''), 16),
		};

		if (imageUrl) {
			embed.image = {
				url: imageUrl,
			};
		}

		if (thumbnailUrl) {
			embed.thumbnail = {
				url: thumbnailUrl,
			};
		}

		props.onSubmit(embed, commandName);
	};

	const [commandName, setCommandName] = useState<string>('');
	const [title, setTitle] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [footer, setFooter] = useState<string>();
	const [color, setColor] = useState<string>('#FFFFFF');
	const [url, setUrl] = useState<string>();
	const [imageUrl, setImageUrl] = useState<string>();
	const [thumbnailUrl, setThumbnailUrl] = useState<string>();

	const saveName = (event: FormEvent) => {
		setCommandName(
			snakeCase((event.target as HTMLInputElement).value.toLowerCase())
		);
	};

	const saveTitle = (event: FormEvent) => {
		setTitle((event.target as HTMLInputElement).value);
	};

	const saveDescription = (event: FormEvent) => {
		setDescription((event.target as HTMLInputElement).value);
	};

	const saveFooter = (event: FormEvent) => {
		setFooter((event.target as HTMLInputElement).value);
	};

	const saveColor = (event: FormEvent) => {
		setColor((event.target as HTMLInputElement).value);
	};

	const saveUrl = (event: FormEvent) => {
		setUrl((event.target as HTMLInputElement).value);
	};

	const saveImageUrl = (event: FormEvent) => {
		setImageUrl((event.target as HTMLInputElement).value);
	};

	const saveThumbnailUrl = (event: FormEvent) => {
		setThumbnailUrl((event.target as HTMLInputElement).value);
	};

	const inputClassName =
		'rounded-lg bg-gray-800 shadow-lg p-3 focus:bg-gray-900 focus:shadow-none transition-all duration-100';

	return (
		<form
			className="text-green-100 flex flex-col gap-2"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				name="Name"
				id="name"
				required
				value={commandName}
				onChange={saveName}
				placeholder="name"
				className="rounded-lg bg-gray-900 shadow-xl mt-2 p-3 font-mono"
			/>
			<div
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
							{/* <label className="text-sm">
								Add a timestamp to the end of the footer?
							</label>
							<ToggleSwitch
								toggleFunction={saveTimestamp}
								initialState={timestamp}
							/> */}
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
			</div>
		</form>
	);
};

export default EmbedCreator;
