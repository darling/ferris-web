import { CheckCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { useAuth } from '../../contexts/auth';

const includedFeatures = [
	'Private channel access',
	'Priority curated features',
	'Secret updates',
	'Lots of love :)',
];

export default function PaymentPricing() {
	const user = useAuth();

	return (
		<div className="bg-green-500">
			<div className="pt-12 sm:pt-16 lg:pt-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-100 sm:text-4xl lg:text-5xl">
							{user?.displayName
								? `Power up your server, ${user.displayName}!`
								: 'Power up your Discord Server'}
						</h2>
						<p className="mt-4 text-xl text-green-100">
							Upgrade Ferris to its fullest potential.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-8 bg-gray-900 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
				<div className="relative">
					<div className="absolute inset-0 h-1/2 bg-green-500" />
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
							<div className="flex-1 bg-gray-900 px-6 py-8 lg:p-12">
								<h3 className="text-2xl font-extrabold text-gray-100 sm:text-3xl">
									Ferris Premium
								</h3>
								<p className="mt-6 text-base text-gray-300">
									We have a mission to provide our services to
									any community, and the best way to provide
									that is through your direct support.
								</p>
								<div className="mt-8">
									<div className="flex items-center">
										<h4 className="flex-shrink-0 pr-4 bg-gray-900 text-sm tracking-wider font-semibold uppercase text-green-300">
											What's included
										</h4>
										<div className="flex-1 border-t-2 border-gray-800" />
									</div>
									<ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
										{includedFeatures.map((feature) => (
											<li
												key={feature}
												className="flex items-start lg:col-span-1"
											>
												<div className="flex-shrink-0">
													<CheckCircleIcon
														className="h-5 w-5 text-green-400"
														aria-hidden="true"
													/>
												</div>
												<p className="ml-3 text-sm text-gray-300">
													{feature}
												</p>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="py-8 px-6 text-center bg-gray-800 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
								<p className="text-lg leading-6 font-medium text-gray-100">
									Get started today
								</p>
								<div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-white">
									<span>$3</span>
									<span className="ml-3 text-xl font-medium text-gray-500">
										/ mo.
									</span>
								</div>
								<div className="mt-6">
									<div className="rounded-md shadow">
										<Link href="/profile">
											<a className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900">
												Support Ferris
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
