import { DetailedHTMLProps, LabelHTMLAttributes } from "react";


export interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
	labelText: string,
	isShowStar: boolean,
}
