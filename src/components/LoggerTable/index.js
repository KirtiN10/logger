/* eslint-disable eqeqeq */
import React from "react";
import LoggerFilter from './LoggerFilter';
import LoggerList from './LoggerList';
import axios from 'axios';
import { Container } from "react-bootstrap";
const baseURL = "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f";

function LoggerTable () {
	const [filteredLogs, setFilteredLogs] = React.useState(null);
	const [logs, setLogs] = React.useState(null);
	const [actionType, setActionType] = React.useState([]);
	const [applicationType, setApplicationType] = React.useState([]);
	// const navigate = useNavigate();

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
  			const allLogs = response.data.result.auditLog;
			setLogs(allLogs);
			setFilteredLogs(allLogs);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	React.useEffect(() => {
		if(logs !== null)
		{
			let actionTypeTemp = [];
			let applicationTypeTemp = [];
			logs.forEach(element => {
				actionTypeTemp = [ ...actionTypeTemp, element.actionType];
				applicationTypeTemp = [ ...applicationTypeTemp, element.applicationType];
			});

			actionTypeTemp = actionTypeTemp.filter((val,id,array) => array.indexOf(val) == id);
			applicationTypeTemp = applicationTypeTemp.filter((val,id,array) => array.indexOf(val) == id);
			setActionType(actionTypeTemp);
			setApplicationType(applicationTypeTemp);
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logs]);
	const updateLogList = (filterArray, fromDate, toDate, e) =>  {
		e.stopPropagation();
		let filteredArray;
		console.log('abc');
		const isEmpty = Object.values(filterArray).every(x => x === null || x === '' || x === 'Select');
		if(isEmpty && !(fromDate || toDate)) {
			setFilteredLogs(logs);
		} else {

			filteredArray = logs.filter((el) => {	
				return el.applicationId == filterArray.applicationId ||
					el.logId == filterArray.logId ||
					el.actionType == filterArray.actionType ||
					el.applicationType == filterArray.applicationType;
			}
			);
			setFilteredLogs(filteredArray);
		}
	}

    if (!logs) return null;
	return <Container className="mt-3 mb-3">
		<LoggerFilter actionType={actionType} applicationType={applicationType} updateLogList={updateLogList} />
		<LoggerList logs={filteredLogs} rowsPerPage={10} />
	</Container>
}
export default LoggerTable;
