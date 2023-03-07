import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { CenteredLayout, MainButton, MainInput, MainSelect } from '~/components';
import axios from '../../axios';

export const Routes = (): JSX.Element => {
  return (
    <CenteredLayout className="flex flex-row w-full h-full gap-4 flex justify-around items-center  text-white">
      <div className="text-3xl  h-auto flex flex-col items-start justify-center p-2 ml-[50px] gap-5">
        <div>
          {' '}
          <span className="text-purple-300">/api/staff</span>{' '}
          <span className="text-yellow-400">Post</span> - creating staff member, body example:{' '}
          <p>
            "name": "Member1-Employee",
            <br />
            "hiredDate": "2018-03-04T09:28:24.000Z",
            <br /> "baseSalary": 1000,
            <br /> "currentSalary": 1000,
            <br /> "companyName": "Company-123",
            <br /> "typeName": "Employee"
          </p>
        </div>
        <div>
          {' '}
          <span className="text-purple-300">/api/staff</span>{' '}
          <span className="text-green-400">Get </span>
          - getting a list of all staff members <br />
          <br />
          <span className="text-purple-300">/api/staff/:id</span>{' '}
          <span className="text-green-400">Get </span> - getting one staff by id
          <br />
          <br />
          <span className="text-purple-300">/api/staff/:id</span>{' '}
          <span className="text-blue-400">Put </span> - updating one staff member, example:
          <p>
            "name": "Member1",
            <br /> "hiredDate": "2018-03-04T09:28:24.000Z",
            <br /> "baseSalary": 1000,
            <br /> "currentSalary": 1000,
            <br /> "companyName": "Company-123",
            <br /> "typeName": "Employee"
          </p>
          <br />
          <span className="text-purple-300">/api/staff/:id</span>{' '}
          <span className="text-red-400">Delete </span> - deleting one staff member by id
        </div>
        <div className="flex flex-col"></div>
      </div>
      <div>
        {' '}
        <span className="text-purple-300">/api/staff/getAllStaffSelery </span>{' '}
        <span className="text-green-400">Get </span> - calculation of the total salary<br /> of all staff
        members <br /> <br />
        <span className="text-purple-300">/api/staff/subordinates/:name</span>{' '}
        <span className="text-green-400">Get </span>
        getting a list of all<br /> subordinates by name <br /> <br />
        <span className="text-purple-300">/api/staff/subordinates/:name</span>{' '}
        <span className="text-blue-400">Put </span> recalculation of salary,<br /> taking into account
        <br />
        all the requirements (bonuses for years of work <br />
        and bonuses for subordinates) by name <br /> <br />
        <span className="text-purple-300">/api/staff/subordinates</span>{' '}
        <span className="text-red-400">Post </span> - adding a subordinate to a supervisor,<br /> example
        body request: <br />
        "supervisorName": "Member1", <br /> "subordinateName": "Member2"
        <br /> <br />
     
      </div>
    </CenteredLayout>
  );
};
