// React core
import React, { useEffect, useState } from 'react';
// External modules / Third-party libraries
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import { X } from 'lucide-react';
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import {
	ICON_SIZE_M,
	ICON_STROKE_M,
	STANDARD_COLOR_DANGER,
} from '@/config/constantes';
import { MINIMUM_ALLOWED_DATE } from '@/config/projectSettings';
// Styles
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickers.module.css';

type TDatePickerProps = {
	field: {
		name: string;
		value: string;
		onChange: (dates: [Date | null, Date | null]) => void;
	};
	placeHolder?: string;
	minDate?: Date;
};

export const DatePickers = ({
	field,
	placeHolder,
	minDate,
}: TDatePickerProps) => {
	const [datesRange, setDatesRange] = useState<[Date | null, Date | null]>([
		null,
		null,
	]);
	const [startDate, endDate] = datesRange;

	const handleChange = (update: [Date | null, Date | null]) => {
		if (update.every((d) => d !== null && d instanceof Date)) {
			field.onChange(update);
		}
	};

	const handleReset = () => {
		setDatesRange([null, null]);
		field.onChange([null, null]);
	};

	// Reset form action
	useEffect(() => {
		if (field.value === undefined) {
			setDatesRange([null, null]);
		}
	}, [field.value]);

	return (
		<div className={`${styles.container}`}>
			<DatePicker
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				dateFormat={'dd/MM/yy'}
				minDate={subDays(minDate || MINIMUM_ALLOWED_DATE, 0)}
				maxDate={addDays(new Date(), 1)}
				/* selected={minDate || MINIMUM_ALLOWED_DATE} */
				placeholderText={capitalize(field.name) || placeHolder}
				onChange={(update: [Date | null, Date | null]) => {
					setDatesRange(update), handleChange(update);
				}}
				className={styles.date_picker}
			/>
			<div className={styles.button} onClick={() => handleReset()}>
				<X
					size={ICON_SIZE_M}
					strokeWidth={ICON_STROKE_M}
					color={STANDARD_COLOR_DANGER}
				></X>
			</div>
		</div>
	);
};
