export const selectStyleDark: any = {
	option: (provided: any, state: { isSelected: any }) => ({
		...provided,
		backgroundColor: state.isSelected ? '#4ADE80' : '#27272A',
		color: state.isSelected ? '#DCFCE7' : '#DCFCE7',
	}),
	menu: (provided: any) => ({
		...provided,
		backgroundColor: '#27272A',
	}),
	control: (provided: any) => ({
		...provided,
		backgroundColor: '#27272A',
		color: '#DCFCE7',
		borderWidth: 1,
		borderColor: '#3F3F46',
		borderRadius: 7,
		padding: 3,
		fontSize: 15,
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: '#DCFCE7',
	}),
	dropdownIndicator: (provided: any) => ({
		...provided,
		color: '#3F3F46',
		borderWidth: 0,
	}),
	indicatorSeparator: (provided: any) => ({
		...provided,
		backgroundColor: '#3F3F46',
	}),
	input: (provided: any) => ({
		...provided,
		color: '#DCFCE7',
		borderWidth: 0,
	}),
};
