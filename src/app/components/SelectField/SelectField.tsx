import styles from './../../styles/FormField.module.scss';
import { SelectFieldProps } from "./SelectField.props";
import cn from 'classnames';

export const SelectField = ({items, htmlFor, labelText, required, error, id, name, value, onChange }: SelectFieldProps): JSX.Element => {
	return (<div className={styles.field}>
		<label className={styles.label} htmlFor={htmlFor}>
			{labelText}<span className={styles.requiredStar}>{required ? '*' : ''}</span>
		</label>
		<select
			className={cn(styles.select, {
				[styles.errorBorder]: error !== '' && error !== undefined
			})}
			id={id}
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
		{error && <p className={styles.error}>{error}</p>}
	</div>);
}