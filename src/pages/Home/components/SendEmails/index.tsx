import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { DataGrid } from '@material-ui/data-grid';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from 'react-loading';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import { sendMail } from '../../../../services/sendMail';
import NoRowsOverlay from '../NoRowsOverlay';

import {
  Container,
  CardHeader,
  InformationCard,
  FiltersContainer,
  Content,
  FormContent,
  LoadingContainer,
} from './styles';

interface Lead {
  id: string;
  usdot: string;
  companyName: string;
  email: string;
}

interface ISendEmailsData {
  email: string;
  mailTo: string;
  subject: string;
  variables: {
    [key: string]: number | string;
  };
}

interface IResponse {
  data: Lead[];
}

const SendEmails: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailType, setEmailType] = useState('authorized');
  const [formEmailType, setFormEmailType] = useState('authorized');
  const [resetEmailSelection, setResetEmailSelection] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (!isFiltered) {
      api
        .get(`/leads?page=${currentPage}&searchCriteria=email`)
        .then((response: IResponse) => {
          setLeads(response.data);
          setIsLoading(false);
        });
    }
  }, [currentPage, isFiltered]);

  const handleSubmit = useCallback(
    async _data => {
      setResetEmailSelection(false);

      let subject = '';
      switch (formEmailType) {
        case 'authorized': {
          subject = 'FMCSA Company Profile Update';
          break;
        }
        case 'notAuthorized': {
          subject = 'ACTION REQUIRED - Not Authorized';
          break;
        }
        case 'mcs150Outdated': {
          subject = 'ACTION REQUIRED - MCS150 update needed';
          break;
        }
        default: {
          throw new Error('Invalid email type');
        }
      }

      const mailData = leads.reduce((acc: ISendEmailsData[], lead: Lead) => {
        if (selectedIds.includes(lead.id)) {
          const data = {
            email: lead.email,
            mailTo: lead.companyName,
            subject,
            variables: {
              usdot: lead.usdot,
              companyName: lead.companyName,
            },
          };

          acc.push(data);
        }

        return acc;
      }, []);

      const sendMailData = { templateName: formEmailType, mailData };

      try {
        await sendMail(sendMailData);

        setSelectedIds([]);
        setResetEmailSelection(true);

        addToast({
          type: 'success',
          title: 'Search Emails Process Created',
          description:
            'You can run the process on the list, if there is no running process.',
        });
      } catch (err) {
        console.log(err);

        setSelectedIds([]);
        setResetEmailSelection(true);

        addToast({
          type: 'error',
          title: 'Search Emails Process Error',
          description:
            'An error have occurred in creating the process. Try again, please.',
        });
      }
    },
    [selectedIds, leads, addToast, formEmailType],
  );

  const onRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailType(event.target.value);
      setFormEmailType(event.target.value);
    },
    [],
  );

  const onFormRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormEmailType(event.target.value);
    },
    [],
  );

  const searchWithFilters = useCallback(
    async data => {
      setIsFiltered(true);
      setIsLoading(true);

      api
        .get(
          `/leads?page=${currentPage}&searchCriteria=email&emailType=${emailType}`,
        )
        .then((response: IResponse) => {
          setLeads(response.data);
          setIsLoading(false);
        });
    },
    [emailType, currentPage],
  );

  const handleRemoveFilters = useCallback(() => {
    setIsFiltered(false);
    setIsLoading(true);
  }, []);

  const columns = [
    { field: 'usdot', headerName: 'USDOT', width: 200 },
    { field: 'companyName', headerName: 'Company Name', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
  ];

  return (
    <Container>
      <Content>
        <h1>Send E-mails</h1>

        {resetEmailSelection ? (
          <>
            <FormContent>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <RadioGroup
                  aria-label="Email Type"
                  value={formEmailType}
                  row
                  onChange={onFormRadioChange}
                >
                  <FormControlLabel
                    value="mcs150Outdated"
                    control={<Radio />}
                    label="MCS150 Outdated"
                  />
                  <FormControlLabel
                    value="authorized"
                    control={<Radio />}
                    label="Authorized"
                  />
                  <FormControlLabel
                    value="notAuthorized"
                    control={<Radio />}
                    label="Not Authorized"
                  />
                </RadioGroup>
                <div>
                  <Button type="submit">Send Emails</Button>
                </div>
              </Form>
            </FormContent>

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
                <Form ref={formRef} onSubmit={searchWithFilters}>
                  <RadioGroup
                    aria-label="Search Type"
                    value={emailType}
                    row
                    onChange={onRadioChange}
                  >
                    <FormControlLabel
                      value="mcs150Outdated"
                      control={<Radio />}
                      label="MCS150 Outdated"
                    />
                    <FormControlLabel
                      value="authorized"
                      control={<Radio />}
                      label="Authorized"
                    />
                    <FormControlLabel
                      value="notAuthorized"
                      control={<Radio />}
                      label="Not Authorized"
                    />
                  </RadioGroup>
                  <section>
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
              components={{ noRowsOverlay: NoRowsOverlay }}
              rows={leads}
              density="compact"
              columns={columns}
              onSelectionChange={param => {
                setSelectedIds(param.rowIds as string[]);
              }}
              page={currentPage}
              paginationMode="server"
              disableSelectionOnClick
              checkboxSelection
              onPageChange={params => {
                setCurrentPage(params.page);
                if (Number(params.page) > 1) {
                  setIsLoading(true);
                }
              }}
              loading={isLoading}
              sortModel={[
                {
                  field: 'usdot',
                  sort: 'desc',
                },
              ]}
            />
          </>
        ) : (
          <LoadingContainer>
            <Loading type="spokes" color="white" height={150} width={75} />
          </LoadingContainer>
        )}
      </Content>
    </Container>
  );
};

export default SendEmails;
