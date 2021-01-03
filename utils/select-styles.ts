import { Styles } from 'react-select';

export const selectStyleDark: Styles = {
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? '#4ADE80' : '#525252',
		color: state.isSelected ? '#DCFCE7' : '#DCFCE7',
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: '#525252',
	}),
	control: (provided) => ({
		...provided,
		backgroundColor: '#525252',
		color: '#DCFCE7',
		borderWidth: 0,
		borderRadius: 7,
		padding: 3,
		fontSize: 15,
	}),
	singleValue: (provided) => ({
		...provided,
		color: '#DCFCE7',
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: '#BBF7D0',
		borderWidth: 0,
	}),
	indicatorSeparator: (provided) => ({
		...provided,
		backgroundColor: '#DCFCE7',
	}),
	input: (provided) => ({
		...provided,
		backgroundColor: '#525252',
		color: '#DCFCE7',
	}),
};
