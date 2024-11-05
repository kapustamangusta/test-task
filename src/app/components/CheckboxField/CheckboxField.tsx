
import { FormField } from '../FormField/FormField';
import styles from './CheckboxField.module.scss';
import { CheckboxFieldProps } from "./CheckboxField.props";

export const CheckboxField = ({ labelText,labelCheckbox, name, ...props }: CheckboxFieldProps ): JSX.Element => {
	return (<FormField label={labelText}  htmlFor={name ?? ""}>
		<div className={styles.field}>
			<input
				className={styles.field__input}
				type="checkbox"
				name={name}
				{...props}
			/>
			<label className={styles.field__checkboxlabel} htmlFor={name}>

				{labelCheckbox}</label>
		</div>
	</FormField>
	);
}