import HeaderPage from '../Header';
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { getWorkersList } from '../services/WorkerService';
import ExportExcelButton from '../ExportExcelButton';

const columns: GridColDef[] = [
  // { field: 'isAdmin', type: 'boolean', headerName: 'is admin', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'familyName', headerName: 'Last name', width: 130 },
  { field: 'identity', headerName: 'Identity', width: 90 },
  { field: 'dateStartWork', headerName: 'start work', width: 200 },
  {
    field: 'actions',
    type: 'actions',
    width: 100,
    getActions: () => [
      // <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      // <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  },
];

const Workers = () => {

  const dispatch = useDispatch();
  const { workers, roles } = useSelector(state => ({
    workers: state.workers,
    roles: state.roles
  }));

  React.useEffect(() => {
    if (!workers.length)
      dispatch(getWorkersList());
  }, []);

  const data = workers;
  return (
    <div>
      <HeaderPage />
      <ExportExcelButton data={data} />
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>
    </div >
  )
}

export default Workers;

