import Head from 'next/head';

interface Props {
	title: string;
	desc?: string;
	image?: string;
}

export const CustomHead = ({
	title,
	desc,
	image = 'https://ferris.gg/img/Ferris-banner-meta.png',
}: Props) => {
	return (
		<Head>
			<meta
				name="description"
				content={
					desc ||
					'Ferris is a high-caliber moderation bot for Discord. Use Ferris to maintain and moderate your Discord server for free!'
				}
			/>
			<title>
				{title ||
					'Ferris Bot — A Discord bot for protecting your community.'}
			</title>
			<meta property="og:url" content="https://www.ferris.gg" />
			<meta property="og:type" content="website" />
			<meta
				property="og:title"
				content={
					title ||
					'Ferris Bot — A Discord bot for protecting your community.'
				}
			/>
			<meta
				property="og:description"
				content={
					desc ||
					'Ferris is a high-caliber moderation bot for Discord. Use Ferris to maintain and moderate your Discord server for free!'
				}
			/>
			<meta property="og:image" content={image} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content="ferris.gg" />
			<meta property="twitter:url" content="https://www.ferris.gg" />
			<meta
				name="twitter:title"
				content={
					title ||
					'Ferris Bot — A Discord bot for protecting your community.'
				}
			/>
			<meta
				name="twitter:description"
				content="Ferris is a high-caliber moderation bot for Discord. Use Ferris to maintain and moderate your Discord server for free!"
			/>
			<meta name="twitter:image" content={image} />

			<meta name="theme-color" content="#9AE6B4" />
		</Head>
	);
};
