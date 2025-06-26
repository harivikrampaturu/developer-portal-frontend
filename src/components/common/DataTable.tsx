import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DataTable<T>({
  columns,
  data,
  renderRow,
  page,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  totalCount,
  onPageChange,
  onRowsPerPageChange
}: DataTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
    <TableBody>
      {data.map((item, index) => (
        <React.Fragment key={(item as any).id ?? index}>
          {renderRow(item)}
        </React.Fragment>
      ))}
    </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
} 