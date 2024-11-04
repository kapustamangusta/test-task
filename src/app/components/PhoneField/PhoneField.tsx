


import InputMask from '@react-input/mask/InputMask';
import styles from './../../styles/FormField.module.scss';
import { PhoneFieldProps } from "./PhoneField.props";
import cn from 'classnames';
import { JSX } from 'react';

export const PhoneField = ({ htmlFor, labelText, required, placeholder, error, id, name, value, onChange }: PhoneFieldProps): JSX.Element => {
	
	return (<div className={styles.field}>
		<label className={styles.label} htmlFor={htmlFor}>
			{labelText} <span className={styles.requiredStar}>{required ? '*' : ''}</span>
		</label>
		<InputMask 
			mask="+7 (___) ___-__-__"
			replacement={{ _: /\d/ }}
			placeholder={placeholder}
			className={cn(styles.input, {
				[styles.errorBorder]: error !== '' && error !== undefined
			})}
			type="tel"
			id={id}
			name={name}
			value={value}
			onChange={onChange}
		/>
			
	</div>);
}