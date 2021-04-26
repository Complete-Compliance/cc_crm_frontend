import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CellParams, DataGrid } from '@material-ui/data-grid';
import { FiExternalLink } from 'react-icons/fi';
import AppHeader from '../../components/AppHeader';
import NoRowsOverlay from './components/NoRowsOverlay';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container, Content, ViewMoreButton } from './styles';

interface Lead {
  id: string;
  usdot: string;
  entityType: string | null;
  operatingStatus: string | null;
  companyName: string | null;
  dbaName: string | null;
  fullName: string | null;
  primaryAddress: string | null;
  state: string | null;
  zipCode: string | null;
  altAddress: string | null;
  altState: string | null;
  altZipCode: string | null;
  phoneNumber: string | null;
  powerUnits: string | null;
  drivers: string | null;
  mcs150FormDate: string | null;
  operationClassification: string | null;
  carrierOperation: string | null;
  cargoCarried: string | null;
  email: string | null;
  bipdInsuranceRequired: string | null;
  cargoInsuranceRequired: string | null;
  bondInsuranceRequired: string | null;
  insuranceCarrier: string | null;
  policySurety: string | null;
  postedDate: string | null;
  coverageFrom: string | null;
  coverageTo: string | null;
  effectiveDate: string | null;
  cancellationDate: string | null;
}

// https://material-ui.com/pt/api/data-grid/
// https://material-ui.com/pt/components/data-grid/rendering/
const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowCount, setRowCount] = useState(0);
  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    api.get(`/leads?page=${currentPage}`).then(response => {
      setLeads(response.data);
      setIsLoading(false);
    });
  }, [history, currentPage]);

  useEffect(() => {
    api.get('/leads/count/all').then(response => {
      setRowCount(response.data);
    });
  }, []);

  const columns = [
    {
      field: 'view',
      headerName: 'View',
      width: 68,
      renderCell: (params: CellParams) => {
        return (
          <ViewMoreButton
            type="button"
            onClick={() => {
              history.push(`/lead/${params.row.id}`);
            }}
          >
            <FiExternalLink />
          </ViewMoreButton>
        );
      },
    },
    { field: 'usdot', headerName: 'USDOT', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone', width: 200 },
    { field: 'entityType', headerName: 'Entity Type', width: 200 },
    { field: 'operatingStatus', headerName: 'Operating Status', width: 200 },
    { field: 'dbaName', headerName: 'DBA Name', width: 200 },
    { field: 'fullName', headerName: 'Full name', width: 200 },
    { field: 'companyName', headerName: 'Company Name', width: 200 },
    { field: 'state', headerName: 'State', width: 200 },
    { field: 'zipCode', headerName: 'Primary ZIP', width: 200 },
    { field: 'powerUnits', headerName: 'Power Units', width: 200 },
    { field: 'drivers', headerName: 'Drivers', width: 200 },
    { field: 'mcs150FormDate', headerName: 'MCS-150 FormDate', width: 200 },
    {
      field: 'operationClassification',
      headerName: 'Operation Classification',
      width: 200,
    },
    { field: 'cargoCarried', headerName: 'Cargo Carrier', width: 200 },
    { field: 'altState', headerName: 'Secondary State', width: 200 },
    { field: 'altZipCode', headerName: 'Secondary ZIP', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
      field: 'bipdInsuranceRequired',
      headerName: 'BIPD Insurance',
      width: 200,
    },
    {
      field: 'cargoInsuranceRequired',
      headerName: 'Cargo Insurance',
      width: 200,
    },
    { field: 'bondInsuranceRequired', headerName: 'Company Name', width: 200 },
    { field: 'insuranceCarrier', headerName: 'Insurance Carrier', width: 200 },
    { field: 'policySurety', headerName: 'Policy Surety', width: 200 },
    { field: 'postedDate', headerName: 'Posted Date', width: 200 },
    { field: 'coverageFrom', headerName: 'Coverage From', width: 200 },
    { field: 'coverageTo', headerName: 'Coverage To', width: 200 },
    { field: 'effectiveDate', headerName: 'Effective Date', width: 200 },
    { field: 'cancellationDate', headerName: 'Cancellation Date', width: 200 },
  ];

  return (
    <Container>
      <AppHeader />

      <Content>
        <DataGrid
          components={{
            noRowsOverlay: NoRowsOverlay,
          }}
          rows={leads}
          columns={columns}
          pageSize={50}
          density="compact"
          headerHeight={40}
          paginationMode="server"
          rowCount={rowCount}
          scrollbarSize={7}
          loading={isLoading}
          disableSelectionOnClick
          page={currentPage}
          onPageChange={params => {
            setCurrentPage(params.page);
          }}
          onCellClick={(params: CellParams) => {
            if (params.field === 'view') {
              return;
            }
            navigator.clipboard.writeText(String(params.value));

            addToast({
              type: 'info',
              title: `Value of ${params.colDef.headerName} copied to clipboard`,
            });
          }}
        />
      </Content>
    </Container>
  );
};

export default Leads;
