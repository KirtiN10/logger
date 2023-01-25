import React, { useState, useMemo } from "react";

import Table from "react-bootstrap/Table";
import "./LoggerList.scss";
import Pagination from "../../hooks/Pagination.js";
let PageSize = 10;
const LoggerList = ({ logs, handleSorting, getClassNamesFor }) => {

  const [currentPage, setCurrentPage] = useState(1);
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
              <span
			  	onClick={() => handleSorting("logId")}
				className={getClassNamesFor('logId')}	
			  >
                Log Id
              </span>
            </th>
            <th>
              <span
			  	onClick={() => handleSorting("applicationType")}
				className={getClassNamesFor('applicationType')}
			  >
                Application Type
              </span>
            </th>
            <th>
              <span
			  	onClick={() => handleSorting("applicationId")}
				className={getClassNamesFor('applicationId')}
			  >
                Application Id
              </span>
            </th>
            <th>
              <span
			  	onClick={() => handleSorting("actionType")}
				className={getClassNamesFor('actionType')}
			  >
                Action
              </span>
            </th>
            <th>
              <span
			  	onClick={() => handleSorting("actionDetails")}
				className={getClassNamesFor('actionDetails')}
			  >
                Action Details
              </span>
            </th>
            <th>
              <span
			  	onClick={() => handleSorting("date")}
				className={getClassNamesFor('date')}
			  >
                Date: Time
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((log) => (
            <tr key={log.logId}>
              <td>{log.logId}</td>
              <td>{log.applicationType ? log.applicationType : "-/-"}</td>
              <td>{log.applicationId ? log.applicationId : "-/-"}</td>
              <td>{log.actionType ? log.actionType : "-/-"}</td>
              <td>{log.actionDetails ? log.actionDetails : "-/-"}</td>
              <td>{log.creationTimestamp ? log.creationTimestamp : "-/-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={logs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default LoggerList;
