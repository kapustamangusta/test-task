
import styles from './../../styles/FormField.module.scss';
import { InputFieldProps } from "./InputField.props";
import cn from 'classnames';

export const InputField = ({ htmlFor, labelText, required, error, type, id, name, placeholder, value, onChange }: InputFieldProps ): JSX.Element => {
	return (<div className={styles.field}>
		<label className={styles.label} htmlFor={htmlFor}>
			{labelText} <span className={styles.requiredStar}>{required ? '*': ''}</span>
		</label>
		<input
			className={cn(styles.button,{
				[styles.errorBorder]: error !== '' && error !== undefined
			})}
			type={type}
			id={id}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
		{error && <p className={styles.error}>{error}</p>}
	</div>);
}