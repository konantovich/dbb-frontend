import clsx from 'clsx';
import { ReactNode } from 'react';
import './layouts.css';
export const CenteredLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'flex  font-OpenSans-Bold   justify-center h-full min-h-[100vh]  text-[#FFFFFF] bg-gradient-to-r bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MainButton = ({ className, label, type, onClick, disabled }: any) => {
  return (
    <button
      type={type}
      className={clsx(
        'flex  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 justify-center',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export const MainInput = ({ className, id, type, placeholder, required = false }: any) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
      className={clsx(
        'block appearance-none [appearance:textfield] px-4  py-1  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
        className,
      )}
    ></input>
  );
};



export const MainSelect = ({ className, id, children}: any) => {
  return (
    <select
      id={id}
      className={clsx(
        'bg-gray-50 appearance-none [appearance:textfield] border py-1 text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
        className,
      )}
    >
      {children}
    </select>
  );
};