
import styles from './../../styles/FormField.module.scss';
import { PhoneFieldProps } from "./PhoneField.props";
import InputMask from 'react-input-mask';
import cn from 'classnames';

export const PhoneField = ({ htmlFor, labelText, required, placeholder, error, id, name, value, onChange }: PhoneFieldProps): JSX.Element => {
	return (<div className={styles.field}>
		<label className={styles.label} htmlFor={htmlFor}>
			{labelText} <span className={styles.requiredStar}>{required ? '*' : ''}</span>
		</label>
		<InputMask
			mask="+7 (999) 999-99-99"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			required
		>
			{() => {
				return <input className={cn(styles.button, {
					[styles.errorBorder]: error !== '' && error !== undefined
				})} type="tel" id={id} name={name} />;
			}}
		</InputMask>
	</div>);
}