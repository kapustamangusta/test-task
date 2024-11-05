
import { FormField } from '../FormField/FormField';
import styles from './InputField.module.scss';
import { InputFieldProps } from "./InputField.props";
import cn from 'classnames';

export const InputField = ({ labelText, required, error, name,  ...props }: InputFieldProps ): JSX.Element => {
	return (
		<FormField label={labelText} required={required ?? false} htmlFor={name ?? ""} error={error}>
			<input
				className={cn(styles.input, {
					[styles.input_error]: error !== '' && error !== undefined
				})}

				
				{...props}
				required
				name={name}
			/>
		</FormField>
	);
}