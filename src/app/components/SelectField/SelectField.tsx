import { FormField } from '../FormField/FormField';
import styles from './SelectField.module.scss';
import { SelectFieldProps } from "./SelectField.props";
import cn from 'classnames';

export const SelectField = ({items, labelText, required, error, name, value, onChange }: SelectFieldProps): JSX.Element => {
	return (<FormField label={labelText} required={required ?? false} htmlFor={name ?? ""} error={error}>
		<select
			className={cn(styles.select, {
				[styles.select_error]: error !== '' && error !== undefined
			})}
			name={name}
			value={value}
			onChange={onChange}
			required
		>
			<option disabled={true} value=""></option >
			{items.map((e: string) => (
				<option key={e} value={e}>
					{e}
				</option>
			))}
		</select>
	</FormField>
		
		

	);
}