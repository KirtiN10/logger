import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function LoggerFilter(props) {
  const {actionType , applicationType} = props;
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const [filterArray, setFilterArray] = useState(
	{	
		logId: '',
		applicationId: '',
    applicationType: '',
    actionType: ''
	}
  );
  return (
    <Form>
      <Row>
        <Col>
          <Form.Label htmlFor="basic-url">Login ID</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              id="basic-url"
              aria-describedby="basic-addon3"
              value={filterArray.logId}
          		onChange={e => setFilterArray({ ...filterArray, logId: e.target.value })}
              aria-label="LogID"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Label htmlFor="basic-url">Action Type</Form.Label>
          <Form.Select onChange={e => setFilterArray({ ...filterArray, actionType: e.target.value })}>
            <option value={null}>Select</option>
            {
              actionType.map((action) => 
                (<option key={action} value={action}>{action}</option>))
            }
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="basic-url">Application Type</Form.Label>
          <Form.Group className="mb-3">
            <Form.Select onChange={e => setFilterArray({ ...filterArray, applicationType: e.target.value })}>
              <option>Select</option>
              {applicationType.map((application) => 
                (<option key={application} value={application}>{application}</option>))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Label htmlFor="basic-url">From Date</Form.Label>
          <Form.Group className="mb-3">
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="form-control"
              placeholderText="Select Date"
              id="from-datepicker" />
          </Form.Group>
		</Col>
		<Col>
          <Form.Label htmlFor="basic-url">To Date</Form.Label>
          <Form.Group className="mb-3">
            <DatePicker
              selected={toDate}
              placeholderText="Select Date"
              onChange={(date) => setToDate(date)}
              className="form-control"
              id="to-datepicker"
			      />
          </Form.Group>
        </Col>
		<Col>
          <Form.Label htmlFor="basic-url">Application ID</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="e.g. 219841/2021"
              aria-label="Application ID"
              value={filterArray.applicationId}
              onChange={e => setFilterArray({ ...filterArray, applicationId: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={ (e) => props.updateLogList(filterArray, fromDate, toDate, e) } className="form-control submit-button mt-3">
            Search Logger
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default LoggerFilter;
