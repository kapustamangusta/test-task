
import { FormField } from '../FormField/FormField';
import styles from './CheckboxField.module.scss';
import { CheckboxFieldProps } from "./CheckboxField.props";

export const CheckboxField = ({ labelText,labelCheckbox, name, checked, onChange }: CheckboxFieldProps ): JSX.Element => {
	return (<FormField label={labelText}  htmlFor={name ?? ""}>
		<div className={styles.wrapper}>
			<input
				className={styles.input}
				type="checkbox"
				name={name}
				checked={checked}
				onChange={onChange}
			/>
			<label className={styles.checkboxlabel} htmlFor={name}>

				{labelCheckbox}</label>
		</div>
	</FormField>
	);
}