


import InputMask from '@react-input/mask/InputMask';
import styles from './../InputField/InputField.module.scss';
import { PhoneFieldProps } from "./PhoneField.props";
import cn from 'classnames';
import { JSX } from 'react';
import { FormField } from '../FormField/FormField';

export const PhoneField = ({  labelText, required, error, name, ...props}: PhoneFieldProps): JSX.Element => {
	
	return (
		<FormField label={labelText} required={required ?? false} htmlFor={name ?? ""} error={error}>
			<InputMask
				mask="+7 (___) ___-__-__"
				replacement={{ _: /\d/ }}
				className={cn(styles.input, {
					[styles.input_error]: error !== '' && error !== undefined
				})}
				type="tel"
				name={name}
				{...props}
				
			/>
		</FormField>
			
	);
}