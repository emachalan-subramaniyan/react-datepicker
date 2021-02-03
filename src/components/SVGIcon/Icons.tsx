import * as React from 'react';
import { IDatePicker } from '../../common/@types';
import IconBase from './IconBase';

const Calendar: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
  <IconBase {...props}>
	  <path fill={'rgba(0, 0, 0, 0.54)'} d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
		{/* <path fill="none" d="M0 0h24v24H0z"/> */}
  </IconBase>
);

const Clear: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path fill="none" d="M0 0h24v24H0V0z"/>
		<path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
	</IconBase>
);

const LeftArrow: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		{/* <path d="M0 0h24v24H0z" fill="none"/> */}
		<path fill={'rgba(0, 0, 0, 0.54)'} d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
	</IconBase>
);

const RightArrow: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		{/* <path d="M0 0h24v24H0z" fill="none"/> */}
		<path fill={'rgba(0, 0, 0, 0.54)'} d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
	</IconBase>
);

const Time: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
 <IconBase {...props}>
	 <path fill={'rgba(0, 0, 0, 0.54)'} d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z" /><path d="M0 0h24v24H0z" fill="none"/>
	 {/* <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/> */}
	</IconBase>
);

const Up: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
		<path d="M0 0h24v24H0z" fill="none"/>
	</IconBase>
);

const Down: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
		<path fill="none" d="M0 0h24v24H0V0z"/>
	</IconBase>
);
export { Calendar, Clear, LeftArrow, RightArrow, Time, Up, Down };
