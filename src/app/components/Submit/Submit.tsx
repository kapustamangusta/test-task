
import { FormField } from '../FormField/FormField';
import styles from './Submit.module.scss';
import { SubmitProps } from "./Submit.props";

export const Submit = ({ submissionTime, isSubmiting }: SubmitProps ): JSX.Element => {
	return (
		<FormField>
			<div className={styles.wrapper}>
				<button disabled={isSubmiting} className={styles.submitButton} type="submit">Изменить</button>
				{submissionTime && (
					<p className={styles.lastUpdate}>последние изменения: {submissionTime}</p>
				)}
			</div>
		</FormField>
	);	
}