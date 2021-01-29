import * as React from 'react';
interface Props {
    matrix: string[][];
    headers?: any;
    className?: string;
    allowedDays?: boolean;
    cell: (value: string, key: number) => JSX.Element;
}
declare const TableMatrixView: React.FunctionComponent<Props>;
export default TableMatrixView;
