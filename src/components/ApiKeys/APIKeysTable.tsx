import { APIKeyTableRow } from './APIKeyTableRow';
import { DataTable } from '../common/DataTable';
import { APIKey } from '@/types/apiKeys'; // Assuming you have this type defined

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'key', label: 'API Key' },
  { id: 'type', label: 'Type' },
  { id: 'actions', label: 'Actions', align: 'right' as const }
];

interface APIKeysTableProps {
  apiKeys: APIKey[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function APIKeysTable({
  apiKeys,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}: APIKeysTableProps) {
  const paginatedData = apiKeys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <DataTable
      columns={columns}
      data={paginatedData}
      renderRow={(apiKey) => <APIKeyTableRow key={apiKey.id} apiKey={apiKey} />}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={apiKeys.length}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
} 