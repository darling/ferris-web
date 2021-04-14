import { useContext } from 'react';
import { useAuth } from '../contexts/auth';
import { GuildContext } from '../contexts/guild';
import { BetaWarningBanner } from './control/BetaWarningBanner';
import { ControlBase } from './control/ControlBase';
import Sidebar from './control/Sidebar';
import Layout from './Layout';

const ControlPanel = (props: any) => {
	const guild = useContext(GuildContext);
	const user = useAuth();
	// const router = useRouter();

	if (!user) {
		console.error('NO AUTH');
		return <Layout>Not authenticated</Layout>;
	}

	if (user && !guild) {
		return (
			<Layout>
				<p className="animate-pulse">Loading</p>
			</Layout>
		);
	}

	if (!guild?.hasFerris) {
		return (
			<Layout
				title={`${
					guild?.name || 'Guild Management'
				} | Ferris Control Panel`}
			>
				<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
					<div className="max-w-xl sm:mx-auto lg:max-w-2xl">
						<div className="flex flex-col mb-16 sm:text-center sm:mb-0">
							<a href="/" className="mb-6 sm:mx-auto">
								<div className="flex items-center justify-center w-12 h-12 rounded-full">
									<svg
										className="w-10 h-10 text-green-400"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
										/>
									</svg>
								</div>
							</a>
							<div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
								<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-green-100 sm:text-4xl md:mx-auto">
									<span className="relative inline-block">
										<svg
											viewBox="0 0 52 24"
											fill="currentColor"
											className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
										>
											<defs>
												<pattern
													id="e77df901-b9d7-4b9b-822e-16b2d410795b"
													x="0"
													y="0"
													width=".135"
													height=".30"
												>
													<circle
														cx="1"
														cy="1"
														r=".7"
													/>
												</pattern>
											</defs>
											<rect
												fill="url(#e77df901-b9d7-4b9b-822e-16b2d410795b)"
												width="52"
												height="24"
											/>
										</svg>
										<span className="relative">Ferris</span>
									</span>{' '}
									is not in this Guild.
								</h2>
								<p className="text-base text-green-200 md:text-lg">
									Add Ferris to your Discord server to be able
									to use the panel.
								</p>
							</div>
							<div>
								<a
									href={
										'https://discord.com/api/oauth2/authorize?client_id=637804742935838751&permissions=2134207679&scope=bot&guild_id=' +
										guild?.id
									}
									className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-green-800 transition duration-200 rounded shadow-md bg-green-200 hover:bg-green-100 focus:shadow-outline focus:outline-none"
								>
									Add Ferris
								</a>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	if (guild?.blocked) {
		return (
			<Layout>
				<p className="">Access Denied</p>
			</Layout>
		);
	}

	// In guild view
	return (
		<Layout
			title={`${
				guild?.name || 'Guild Management'
			} | Ferris Control Panel`}
		>
			<ControlBase
				sidebar={
					<Sidebar
						entries={[
							{ name: 'Home' },
							{ name: 'Config', path: '/config' },
							{ name: 'Warns', path: '/warns' },
							{
								name: 'Custom Commands',
								path: '/custom-commands',
							},
						]}
						guildName={guild?.name}
						guildIcon={guild?.icon}
					/>
				}
				optionalRight={<BetaWarningBanner />}
			>
				{props.children}
			</ControlBase>
			{/* <div className="flex flex-col items-start md:flex-row">
				<Sidebar
					entries={[
						{ name: 'Home' },
						{ name: 'Config', path: '/config' },
						{ name: 'Warns', path: '/warns' },
						{ name: 'Custom Commands', path: '/custom-commands' },
					]}
					guildName={guild?.name}
					guildIcon={guild?.icon}
				/>
				<div className="mt-2 md:mx-2 sm:w-4/5 w-screen">
					{props.children}
				</div>
				<div></div>
			</div> */}
		</Layout>
	);
};

export default ControlPanel;
