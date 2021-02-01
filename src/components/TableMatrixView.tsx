import * as classNames from 'classnames';
import * as React from 'react';

interface Props {
  matrix: string[][];
  headers?:  any;
  className?: string;
  allowedDays?: boolean;
  cell: (value: string, key: number) => JSX.Element;
}

const TableMatrixView: React.FunctionComponent<Props> = ({ className, matrix, cell, headers, allowedDays }) => {
  let data: any = null;
  return (
    <table className={classNames('calendar__body--table', className)}>
      {headers && (
        <thead>
          <tr>
            {headers.map((v: string, i: number) => (
              <th key={i}>{v}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {matrix.map((row, i) => {
            if(allowedDays){
              data = row.slice(1, -1);
          }
              return(<tr key={i}>{data.map((v: any, j: number) => cell(v, i * matrix[i].length + j))}</tr>);
        })}
      </tbody>
    </table>
  );
};

export default TableMatrixView;
