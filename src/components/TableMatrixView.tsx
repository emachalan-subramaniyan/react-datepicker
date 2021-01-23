import * as classNames from 'classnames';
import * as React from 'react';

interface Props {
  matrix: string[][];
  headers?: string[];
  className?: string;
  allowedDays?: boolean;
  cell: (value: string, key: number) => JSX.Element;
}

const TableMatrixView: React.FunctionComponent<Props> = ({ className, matrix, cell, headers, allowedDays }) => {
  return (
    <table className={classNames('calendar__body--table', className)}>
      {headers && (
        <thead>
          <tr>
            {headers.map((v, i) => (
              <th key={i}>{v}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {matrix.map((row, i) => (
          allowedDays &&(row.shift(),
          row.pop()),
          <tr key={i}>{row.map((v, j) => cell(v, i * matrix[i].length + j))}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMatrixView;
