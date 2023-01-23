import React, { useState, useMemo } from "react";

import Table from 'react-bootstrap/Table';
import './LoggerList.scss';
import Pagination from "../../hooks/Pagination.js";
import { useSortableTable } from "../../hooks/useSortableTable";
let PageSize = 10;
const LoggerList = ({ logs, handleSorting }) => {

  const [currentPage, setCurrentPage] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleSorting = (sortField, sortOrder) => {
// 		if (sortField) {
// 			const sorted = [...logs].sort((a, b) => {
// 				if (a[sortField] === null) return 1;
// 				if (b[sortField] === null) return -1;
// 				if (a[sortField] === null && b[sortField] === null) return 0;
// 				return (
// 				a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
// 					numeric: true,
// 				}) * (sortOrder === "asc" ? 1 : -1)
// 				);
// 			});
// 			setSortedLogs(sorted);
// 		}
// 	}

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return logs.slice(firstPageIndex, lastPageIndex);
	  }, [currentPage, logs]);

  return (
    <>
      <Table>
        <thead>
			<tr>
				<th>
					Log Id <span onClick={()=> handleSorting("logId")}> &#8593; </span>
				</th>
				<th>
					Application Type <span onClick={()=> handleSorting("applicationType")}> &#8593; </span>
				</th>
				<th>
					Application Id <span onClick={()=> handleSorting("applicationID")}> &#8593; </span>
				</th>
				<th>
					Action <span onClick={()=> handleSorting("action")}> &#8593; </span>
				</th>
				<th>
					Action Details <span onClick={()=> handleSorting("acctionDetail")}> &#8593; </span>
				</th>
				<th>
					Date: Time <span onClick={()=> handleSorting("date")}> &#8593; </span>
				</th>
			</tr>
        </thead>
        <tbody>
		{
				currentTableData.map((log, index)=> (
					<tr key={log.logId}>
						<td>
						{log.logId}
						</td><td>
						{ (log.applicationType ? log.applicationType : '-/-') }
						</td>
						<td>
						{ (log.applicationId ? log.applicationId : '-/-') }
						</td>
						<td>
						{ ( log.actionType ? log.actionType : '-/-') }
						</td>
						<td>
						{ (log.actionDetails ? log.actionDetails : '-/-') }
						</td>
						<td>
						{ (log.creationTimestamp ? log.creationTimestamp : '-/-') }
						</td>
						</tr>
				))
			}
        </tbody>
      </Table>
	  <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={logs.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
};

export default LoggerList;