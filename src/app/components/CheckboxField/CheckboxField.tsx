
import styles from './../../styles/FormField.module.scss';
import { CheckboxFieldProps } from "./CheckboxField.props";

export const CheckboxField = ({ htmlFor, labelText,labelCheckbox, id, name, checked, onChange }: CheckboxFieldProps ): JSX.Element => {
	return (<div className={styles.field}>
		<label className={styles.label}>{labelText}</label>
		<div className={styles.wrapper}>
			<input
				className={styles.input}
				type="checkbox"
				id={id}
				name={name}
				checked={checked}
				onChange={onChange}
			/>
			<label className={styles.checkboxlabel} htmlFor={htmlFor}>

				{labelCheckbox}</label>
		</div>
	</div>);
}