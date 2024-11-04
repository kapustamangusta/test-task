import React from 'react';
import { Label } from '..';
import { FromFieldProps } from './FormField.props';
import styles from  './FormField.module.scss';

export const FormField = ({ children, label='', required=false, htmlFor, error }: FromFieldProps) => {
	return (
		<div className={styles.formfield}>
			<Label htmlFor={htmlFor} className={styles.formfield__label} labelText={label} isShowStar={required}/>
			<div className={styles.formfield__input}>{children}</div>
			{error && <p className={styles.formfield__error}>{error}</p>}
		</div>
	);
};
