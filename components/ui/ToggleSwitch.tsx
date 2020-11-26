import { useEffect, useState } from 'react';

interface Props {
	initialState?: boolean;
	toggleFunction?: (target: boolean) => any;
}

const ToggleSwitch = ({ toggleFunction, initialState = false }: Props) => {
	const [enabled, setEnabled] = useState<boolean>(false);

	useEffect(() => {
		setEnabled(initialState);
	}, [initialState]);

	function toggleSwitch() {
		console.log('switch now: ' + !enabled);
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
				'w-14 flex-none h-8 m-1 rounded-full flex-shrink p-1 transition-colors duration-75 ' +
				(!enabled ? 'bg-gray-500' : 'bg-green-300')
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
