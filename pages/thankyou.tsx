import { HeartIcon } from '@heroicons/react/outline';
import Layout from '../components/Layout';

const people = [
	'Matt',
	'Cut',
	'Iara',
	'D',
	'Nookazon',
	'Top.gg',
	'Wyzing',
	'Yyummy!',
	'Trinity',
	'Goobie',
	'J',
	'Victor',
	'Goy',
	'Tan',
	'Heelie',
	'V',
	'FamTime',
	'Etherial',
	'0exe',
	'lolhi0404',
	'NoHacks',
	'Motte the Omen',
	'lorc',
	'Vortex',
	'Retr0',
	'Josiah',
	'Premium Users',
	'(my family)',
	'(my friends)',
	'(my dog)',
];

const ThankYou = () => {
	return (
		<Layout>
			<div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
				<div className="space-y-8 sm:space-y-12">
					<div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
						<h2 className="text-3xl text-white font-extrabold tracking-tight sm:text-4xl">
							Thank You
						</h2>
						<p className="text-xl text-gray-300">
							Many of you people have contributed to not only
							Ferris, but my life and my journey working on a
							passion project like this. I want to keep a spot for
							you guys not only in my heart, but for people to see
							that Ferris is the cumulation of many of your guys'
							help. Thank you.
						</p>
					</div>
					<ul className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
						{people.map((person) => (
							<li key={person}>
								<div className="justify-center flex">
									<HeartIcon className="w-16 h-16 mb-4 p-4 text-red-500 transition duration-200 hover:text-white hover:bg-gray-700 rounded-full" />
								</div>
								<div className="text-xs font-medium lg:text-sm text-red-200 hover:text-white transition duration-200">
									<h3>{person}</h3>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default ThankYou;
