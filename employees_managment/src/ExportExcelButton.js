import { Button } from '@mui/material';
import React from 'react';
import * as XLSX from 'xlsx';

const ExportExcelButton = ({ data }) => {
  const exportToExcel = () => {
    const fileName = "employees.xlsx";
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const dataBlob = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + fileExtension;
    link.click();
  };

  return (
    <Button variant="success" onClick={exportToExcel}>
      Export to Excel
    </Button>
  );
};

export default ExportExcelButton;
