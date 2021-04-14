// import clsx from 'clsx';
import { useRouter } from 'next/router';
import SidebarEntry from './SidebarEntry';

interface Props {
	guildIcon?: string;
	guildName?: string;
	entries: { name: string; path?: string }[];
	className?: string;
}

const Sidebar = ({ entries, guildIcon, guildName }: Props) => {
	const router = useRouter();

	return (
		<div className="flex flex-col">
			<img
				src={
					guildIcon
						? `https://cdn.discordapp.com/icons/${
								router.query.id
						  }/${guildIcon}.${
								guildIcon.startsWith('_a') ? 'gif' : 'png'
						  }`
						: '/img/placeholder-crystal.png'
				}
				alt="Guild"
				className="ml-4 w-12 h-12 rounded-md"
			/>
			<h1 className="pl-2 mt-2 mx-2 text-xl font-bold leading-relaxed">
				{guildName || 'Control Panel'}
			</h1>
			<div className="w-full mx-auto">
				<nav className="space-y-1" aria-label="Sidebar">
					{entries.map((entry) => {
						return (
							<SidebarEntry
								key={entry.name}
								name={entry.name}
								path={entry.path}
							/>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
