import React from 'react';
import { LabelProps } from './Label.props';

export const Label = ({ labelText, isShowStar, className, htmlFor }: LabelProps) => {
	return (
		<label className={className} htmlFor={htmlFor}>
			{labelText}<span className="text-red-500">{isShowStar ? '*' : ''}</span>
		</label>
	);
};
