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
			<div className="mb-2 px-3 py-2">
				<img
					src={
						guildIcon
							? `https://cdn.discordapp.com/icons/${
									router.query.id
							  }/${guildIcon}.${
									guildIcon.startsWith('a_') ? 'gif' : 'png'
							  }`
							: '/img/placeholder-crystal.png'
					}
					alt="Guild"
					className="mb-2 w-12 h-12 rounded-full duration-100 transition-all hover:rounded-md"
				/>
				<h1 className="text-xl font-bold leading-relaxed">
					{guildName || 'Control Panel'}
				</h1>
			</div>
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
