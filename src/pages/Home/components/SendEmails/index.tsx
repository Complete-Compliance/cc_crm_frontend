import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from 'react-loading';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import { sendMail } from '../../../../services/sendMail';
import NoRowsOverlay from '../NoRowsOverlay';

import { Container, Content, FormContent, LoadingContainer } from './styles';

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
  const [resetEmailSelection, setResetEmailSelection] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    api
      .get(`/leads?page=${currentPage}&searchCriteria=email`)
      .then((response: IResponse) => {
        setLeads(response.data);
        setIsLoading(false);
      });
  }, [currentPage]);

  const handleSubmit = useCallback(
    async _data => {
      setResetEmailSelection(false);

      const mailData = leads.reduce((acc: ISendEmailsData[], lead: Lead) => {
        if (selectedIds.includes(lead.id)) {
          const data = {
            email: lead.email,
            mailTo: lead.companyName,
            subject: 'ACTION REQUIRED - Not Authorized',
            variables: {
              usdot: lead.usdot,
              companyName: lead.companyName,
            },
          };

          acc.push(data);
        }

        return acc;
      }, []);

      const sendMailData = { templateName: 'standard', mailData };

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
    [selectedIds, leads, addToast],
  );

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
                <div>
                  {/** ADD HERE ONE RADIO WITH TEMPLATE NAMES WHEN TIME COMES */}
                  <Button type="submit">Send Emails</Button>
                </div>
              </Form>
            </FormContent>

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
