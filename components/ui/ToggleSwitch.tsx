import { useEffect, useState } from 'react';

interface Props {
	initialState?: boolean;
	toggleFunction?: (target: boolean) => any;
	className?: string;
}

const ToggleSwitch = ({
	toggleFunction,
	initialState = false,
	className,
}: Props) => {
	const [enabled, setEnabled] = useState<boolean>(false);

	useEffect(() => {
		setEnabled(initialState);
	}, [initialState]);

	function toggleSwitch() {
		setEnabled(!enabled);

		if (toggleFunction) {
			toggleFunction(!enabled);
		}
	}

	return (
		<div
			onClick={() => {
				toggleSwitch();
			}}
			className={
				'w-14 flex-none h-8 rounded-full flex-shrink p-1 transition-colors duration-75 cursor-pointer ' +
				(!enabled ? 'bg-gray-500' : 'bg-green-300') +
				` ${className}`
			}
		>
			<div
				className={
					'bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-75 ' +
					(!enabled ? '' : ' translate-x-6')
				}
			/>
		</div>
	);
};

export default ToggleSwitch;
