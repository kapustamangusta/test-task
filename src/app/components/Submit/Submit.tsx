
import styles from './Submit.module.scss';
import { SubmitProps } from "./Submit.props";

export const Submit = ({ submissionTime }: SubmitProps ): JSX.Element => {
	return (<div className={styles.field}>
		<div className={styles.wrapper}>
			<button className={styles.submitButton} type="submit">Изменить</button>
			{submissionTime && (
				<p className={styles.lastUpdate}>последние изменения: {submissionTime}</p>
			)}
		</div>
	</div>);
}