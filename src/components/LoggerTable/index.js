/* eslint-disable eqeqeq */
import React from "react";
import LoggerFilter from './LoggerFilter';
import LoggerList from './LoggerList';
import axios from 'axios';
import { Container } from "react-bootstrap";
const baseURL = "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f";

function LoggerTable () {
	const [filteredLogs, setFilteredLogs] = React.useState([]);
	const [logs, setLogs] = React.useState(null);
	const [actionType, setActionType] = React.useState([]);
	const [applicationType, setApplicationType] = React.useState([]);
	
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

	const useSortableData = (filteredLogs, config = null) => {
		const [sortConfig, setSortConfig] = React.useState(config);
		const sortedItems = React.useMemo(() => {
		  let sortableItems = [...filteredLogs];
		  if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
			  if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === "ascending" ? -1 : 1;
			  }
			  if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === "ascending" ? 1 : -1;
			  }
			  return 0;
			});
		  }
		  return sortableItems;
		}, [filteredLogs, sortConfig]);
	
		const handleSorting = (key) => {
		  let direction = "ascending";
		  if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
		  ) {
			direction = "descending";
		  }
		  setSortConfig({ key, direction });
		};
	
		return { filteredSortedLogs: sortedItems, handleSorting, sortConfig };
	  };

	  const { filteredSortedLogs, handleSorting, sortConfig } = useSortableData(filteredLogs);
	  const getClassNamesFor = (name) => {
		if (!sortConfig) {
		  return;
		}
		return sortConfig.key === name ? sortConfig.direction : undefined;
	  };

    if (!logs) return null;
	return <Container className="mt-3 mb-3">
		<LoggerFilter actionType={actionType} applicationType={applicationType} updateLogList={updateLogList} />
		<LoggerList logs={filteredSortedLogs} getClassNamesFor={getClassNamesFor} handleSorting={handleSorting} rowsPerPage={10} />
	</Container>
}
export default LoggerTable;
