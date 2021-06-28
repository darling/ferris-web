import { GetStartedButton } from '../home/ui/GetStartedButton';

export const HomeCTA = () => {
	return (
		<div className="bg-green-500">
			<div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
					<span className="block">Boost your community.</span>
					<span className="block">Start using Ferris today.</span>
				</h2>
				<p className="mt-4 mb-8 text-lg leading-6 text-green-200">
					Ferris will change the way you manage your communities. Sign
					in with Discord and get started in seconds.
				</p>
				<GetStartedButton />
			</div>
		</div>
	);
};
