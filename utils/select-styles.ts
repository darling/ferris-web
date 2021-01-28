export const selectStyleDark: any = {
	option: (provided: any, state: { isSelected: any }) => ({
		...provided,
		backgroundColor: state.isSelected ? '#4ADE80' : '#525252',
		color: state.isSelected ? '#DCFCE7' : '#DCFCE7',
	}),
	menu: (provided: any) => ({
		...provided,
		backgroundColor: '#525252',
	}),
	control: (provided: any) => ({
		...provided,
		backgroundColor: '#525252',
		color: '#DCFCE7',
		borderWidth: 0,
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
		color: '#BBF7D0',
		borderWidth: 0,
	}),
	indicatorSeparator: (provided: any) => ({
		...provided,
		backgroundColor: '#DCFCE7',
	}),
	input: (provided: any) => ({
		...provided,
		backgroundColor: '#525252',
		color: '#DCFCE7',
	}),
};
