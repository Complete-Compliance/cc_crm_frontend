import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CellParams, DataGrid } from '@material-ui/data-grid';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiExternalLink, FiArrowUp } from 'react-icons/fi';
import * as Yup from 'yup';
import AppHeader from '../../components/AppHeader';
import NoRowsOverlay from './components/NoRowsOverlay';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Content,
  ViewMoreButton,
  FiltersContainer,
  CardHeader,
  InformationCard,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

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

interface SearchDotFormData {
  dot: string;
}

const Leads: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowCount, setRowCount] = useState(0);
  const [dotSearchCriteria, setDotSearchCriteria] = useState('contains');
  const [isFiltered, setIsFiltered] = useState(false);

  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');

  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    if (rowCount === 0) {
      return;
    }
    if (isFiltered === true) {
      return;
    }
    api.get(`/leads?page=${currentPage}`).then(response => {
      setLeads(response.data);
      setIsLoading(false);
    });
  }, [history, currentPage, rowCount, isFiltered]);

  useEffect(() => {
    if (isFiltered === true) {
      return;
    }
    api.get('/leads/count/all').then(response => {
      setRowCount(response.data);
    });
  }, [isFiltered]);

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

  const onRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDotSearchCriteria(event.target.value);
    },
    [],
  );

  const onSearchSubmit = useCallback(
    async (data: SearchDotFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          dot: Yup.number().required('Start search required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsLoading(true);

        await api
          .get(
            `/leads/find?searchCriteria=${dotSearchCriteria}&page=1&dot=${data.dot}`,
          )
          .then(response => {
            setLeads(response.data.leads);
            setIsFiltered(true);
            setRowCount(response.data.leadsCount);
            setCurrentFilter(data.dot);
            setIsLoading(false);
          });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Search error',
          description: `An error have occurred: ${error.message}`,
        });
      }
    },
    [addToast, dotSearchCriteria],
  );

  const handleRemoveFilters = useCallback(() => {
    setIsFiltered(false);
    setIsLoading(true);
    setCurrentFilter('');
  }, []);

  return (
    <Container>
      <AppHeader />

      <Content>
        <InformationCard
          id="Filters"
          isExpanded={isFiltersExpanded}
          height="16em"
        >
          <CardHeader isExpanded={isFiltersExpanded}>
            <span>Search Filters</span>
            <button
              type="button"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            >
              <FiArrowUp />
            </button>
          </CardHeader>

          <FiltersContainer isExpanded={isFiltersExpanded}>
            <Form ref={formRef} onSubmit={onSearchSubmit}>
              <RadioGroup
                aria-label="Search Type"
                value={dotSearchCriteria}
                row
                onChange={onRadioChange}
              >
                <FormControlLabel
                  value="contains"
                  control={<Radio />}
                  label="Contains"
                />
                <FormControlLabel
                  value="exact"
                  control={<Radio />}
                  label="Exact"
                />
              </RadioGroup>
              <section>
                <Input type="text" name="dot" placeholder="USDOT #" />
                <Button type="submit">Search</Button>
              </section>
            </Form>
          </FiltersContainer>

          {isFiltered && (
            <Button type="button" onClick={handleRemoveFilters}>
              Remove Search Filters
            </Button>
          )}
        </InformationCard>

        <DataGrid
          components={{
            noRowsOverlay: NoRowsOverlay,
          }}
          rows={leads}
          columns={columns}
          pageSize={50}
          density="compact"
          headerHeight={60}
          paginationMode="server"
          rowCount={rowCount}
          rowsPerPageOptions={[]}
          scrollbarSize={7}
          loading={isLoading}
          disableSelectionOnClick
          page={currentPage}
          onPageChange={
            isFiltered
              ? params => {
                  setCurrentPage(params.page);
                  setIsLoading(true);
                  api
                    .get(
                      `/leads/find?searchCriteria=${dotSearchCriteria}&page=${params.page}&dot=${currentFilter}`,
                    )
                    .then(response => {
                      setLeads(response.data.leads);
                      setIsLoading(false);
                    });
                }
              : params => {
                  setCurrentPage(params.page);
                  if (Number(params.page) > 1) {
                    setIsLoading(true);
                  }
                }
          }
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
