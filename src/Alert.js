import { useEffect } from 'react';

const Alert = ({ msg, type, setAlert, list }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			setAlert({
				...alert,
				show: false,
				type: '',
				msg: ''
			});
		}, 3000);
		return () => {
			clearTimeout(timeout);
		};
	}, [setAlert, list]);
	return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
