import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { CenteredLayout, MainButton, MainInput, MainSelect } from '~/components';
import axios from '../../axios';
const buttons: string[] = ['login'];

interface ButtonProps {
  button: string;
  selectedButton: string | null;
  setSelectedButton: (value: string) => void;
}

export const Login = (): JSX.Element => {
  const [createdStaff, setCreatedStaff] = useState<any>(null);
  const [allStaff, setAllStaff] = useState<any>(null);
  const [allSalaries, setAllSalaries] = useState<number>(0);
  const [staffInfo, setStaffInfo] = useState<any>(null);
  const [connectedSubordinate, setConnectedSubordinate] = useState<any>(null);

  useEffect(() => {
    fetchAllStaff();
    fetchUpdateAllSalary();
  }, []);

  useEffect(() => {
    fetchAllStaff();
    fetchUpdateAllSalary();
  }, [createdStaff, connectedSubordinate]);
  const fetchAllStaff = async () => {
    await axios('/api/staff')
      .then((response: any) => {
        setAllStaff(response.data);
      })
      .catch((err) => alert('error get all staff'));
  };

  const fetchUpdateAllSalary = async () => {
    await axios('/api/staff/getAllStaffSelery')
      .then((response: any) => {
        setAllSalaries(response.data);
      })
      .catch((err) => {
        alert('error fetch all salary');
      });
  };

  const handleRegisterStaff = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      // inputId: { value: number | typeof NaN | string };
      inputName: { value: string };
      inputHiredDate: { value: string };
      inputBasicSalary: { value: number };
      selectType: { value: string };
      selectCompany: { value: string };
    };

    const newStaffMember = {
      name: formElements.inputName.value,
      hiredDate: formElements.inputHiredDate.value + 'T09:28:24.000Z',
      baseSalary: +formElements.inputBasicSalary.value,
      currentSalary: +formElements.inputBasicSalary.value,
      typeName: formElements.selectType.value,
      companyName: formElements.selectCompany.value,
    };

    await axios
      .post('/api/staff', newStaffMember)
      .then((response: any) => {
        setCreatedStaff(response.data);
        setTimeout(() => {
          setCreatedStaff(null);
        }, 10000);
      })
      .catch((err) => {
        alert(`${err.response.data.message} or user with this name is already registered`);
      });
  };

  const handleAddSubordinate = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      selectSupervisor: { value: string };
      selectSubordinate: { value: string };
    };
    const body = {
      supervisorName: formElements.selectSupervisor.value,
      subordinateName:  formElements.selectSubordinate.value,
    }
    
    await axios
    .post('/api/staff/subordinates', body)
    .then((response: any) => {
    }).then((res) => {
      axios
      .put(`/api/staff/subordinates/${body.supervisorName}`)
      .then((response: any) => {

        setConnectedSubordinate(response.data);
        setTimeout(() => {
          setConnectedSubordinate(null);
        }, 10000);
      })
      .catch((err) => {
        alert(err.request.response);
      });
    })
    .catch((err) => {
      alert(err.request.response);
    });



  };

  const handleGetStaffSalary = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      inputId: { value: number | typeof NaN | string };
      selectStaffInfo: { value: any };
    };
    // const id = allStaff.filter((el: any) => el.name === formElements.selectStaffInfo.value)[0].id
    const id = formElements.selectStaffInfo.value;
    await axios(`/api/staff/${id}`)
      .then((response: any) => {
        setStaffInfo(response.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <CenteredLayout className="w-full h-full gap-4 flex justify-around items-center  text-white">
      <div className="text-3xl  h-auto flex flex-col items-start justify-center p-2 ml-[50px]">
        <h2>Add Staff member</h2>
        <form
          className="flex flex-col gap-1 justify-center items-center p-2"
          onSubmit={handleRegisterStaff}
        >
          <MainInput
            id="inputName"
            className="w-full"
            placeholder="Staff name"
            required={true}
          ></MainInput>
          <MainInput
            id="inputHiredDate"
            className="w-full"
            placeholder="Hired date"
            type="date"
            required={true}
          ></MainInput>
          <MainInput
            id="inputBasicSalary"
            className="w-full"
            placeholder="Basic salary"
            type="number"
            required={true}
          ></MainInput>
          <h2 className="text-[12px] mb-1 mt-2">Staff member type:</h2>
          <MainSelect id="selectType" className="w-full  uppercase">
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
            <option value="Employee">Employee</option>
          </MainSelect>

          <h2 className="text-[12px] mb-1 mt-2">Company:</h2>
          <MainSelect id="selectCompany" className="w-full  uppercase">
            <option value="Company-123">Company-123</option>
          </MainSelect>
          <MainButton type={'submit'} label="submit" className="p-2 mt-2"></MainButton>
        </form>
        {createdStaff && <h2>Staff: {createdStaff.name} was created</h2>}
      </div>
      <div className="h-auto p-2 flex flex-col items-start justify-center">
        <form
          className="flex flex-col gap-1 justify-center items-center"
          onSubmit={handleAddSubordinate}
        >
          <h2 className="text-[12px] mb-1 mt-2">Select supervisor</h2>
          <MainSelect id="selectSupervisor" className="w-full  uppercase">
            {allStaff &&
              allStaff
                .filter((staff: any) => staff.type && staff.type.name !== 'Employee')
                .map((staff: any) => {
                  return (
                    <option key={staff.id} value={staff.name}>
                      {staff.name} - {staff.type.name}
                    </option>
                  );
                })}
          </MainSelect>
          <h2 className="text-[12px] mb-1 mt-2">Connect Subordinate</h2>
          <MainSelect id="selectSubordinate" className="w-full  uppercase">
            {allStaff &&
              allStaff
                .filter((staff: any) => staff.type && staff.type.name !== 'Manager')
                .map((staff: any) => {
                  return (
                    <option value={staff.name} key={staff.id}>
                      {staff.name} - {staff.type.name}
                    </option>
                  );
                })}
          </MainSelect>
          <MainButton type={'submit'} label="submit" className="p-2 mt-2"></MainButton>
        </form>
        {connectedSubordinate && <h2>Connected!</h2>}
      </div>
      <div className="h-auto flex flex-col items-center gap-5 justify-center p-2 mr-[50px]">
        <h2>All staff member salaries:</h2>
        <h2>{allSalaries} $</h2>
        <MainButton
          label={'Update'}
          className=""
          onClick={() => fetchUpdateAllSalary()}
        ></MainButton>
      </div>
      <div className="h-auto flex flex-col items-center gap-5 justify-center p-2 mr-[50px]">
        <h2>Staff salary and info:</h2>
        <form
          className="flex flex-col gap-1 justify-center items-center"
          onSubmit={handleGetStaffSalary}
        >
          <MainSelect id="selectStaffInfo" className="w-full  uppercase">
            {allStaff &&
              allStaff.map((staff: any) => {
                return (
                  <option value={staff.id} key={staff.id}>
                    {staff.name} - {staff.type ? staff.type.name : ''}
                  </option>
                );
              })}
          </MainSelect>

          <MainButton label={'View'} className="mt-2" type="submit"></MainButton>
        </form>
        {staffInfo && (
          <div className="flex flex-col gap-3">
            <h2>Salary with years bonus and staff bonus: {staffInfo.currentSalary} $</h2>
            <h2 className="flex flex-row gap-2">
              <span>hiredDate :{staffInfo.hiredDate}</span>
              {/* <span className="max-w-[150px]"> Date now: {new Date(Date.now()).toString()}</span> */}
              {/* <span>
                Full years in company:{' '}
                {Math.floor((Date.parse(new Date(Date.now()).toString()) - Date.parse(staffInfo.hiredDate))/ 31536000000)}
              </span> */}
            </h2>
            <h2>subodinates count: {staffInfo.subordinate ? staffInfo.subordinate.length : 0}</h2>
            <h2>
              supervisor: {staffInfo.supervisor ? staffInfo.supervisor.name ? staffInfo.supervisor.name : '' : 'no supervisor'}
            </h2>
          </div>
        )}
      </div>
    </CenteredLayout>
  );
};
