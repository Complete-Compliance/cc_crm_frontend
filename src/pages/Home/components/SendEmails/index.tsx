import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// import * as Yup from 'yup';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
// import { useToast } from '../../../../hooks/toast';
import NoRowsOverlay from '../NoRowsOverlay';
import api from '../../../../services/api';
// import getValidationErrors from '../../../../utils/getValidationErrors';

import { Container, Content, FormContent } from './styles';

interface Lead {
  id: string;
  usdot: string;
  email: string;
}

interface SendEmailsFormData {
  templateName: string;
  emails: string[];
}

interface IResponse {
  data: Lead[];
}

const SendEmails: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // const { addToast } = useToast();

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
    async (data: SendEmailsFormData) => {
      setResetEmailSelection(false);

      const emails = leads.reduce((acc: string[], lead: Lead) => {
        if (selectedIds.includes(lead.id)) {
          acc.push(lead.email);
        }

        return acc;
      }, []);

      console.log(emails);

      setTimeout(() => setResetEmailSelection(true), 2000);

      // TO DO
      // [] verify if the data.emails is empty
      // [] call by the end: setResetEmailSelection(true) and setSelectedIds([])

      // try {
      //   formRef.current?.setErrors({});

      //   const schema = Yup.object().shape({
      //     startDot: Yup.string().required('Start search required'),
      //     endDot: Yup.string().required('Start search required'),
      //   });

      //   await schema.validate(data, {
      //     abortEarly: false,
      //   });

      //   Object.assign(data, { category: 'search_emails' });

      //   await api.post('/scrapProcesses', data);

      //   setReloadProcessList(true);
      //   setIsLoading(true);

      //   addToast({
      //     type: 'success',
      //     title: 'Search Emails Process Created',
      //     description:
      //       'You can run the process on the list, if there is no running process.',
      //   });
      // } catch (error) {
      //   if (error instanceof Yup.ValidationError) {
      //     const errors = getValidationErrors(error);

      //     formRef.current?.setErrors(errors);

      //     return;
      //   }

      //   addToast({
      //     type: 'error',
      //     title: 'Search Emails Process Error',
      //     description:
      //       'An error have occurred in creating the process. Try again, please.',
      //   });
      // }
    },
    [selectedIds, leads],
  );

  const columns = [
    { field: 'usdot', headerName: 'USDOT', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
  ];

  return (
    <Container>
      <Content>
        <h1>Send E-mails</h1>
        <FormContent>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              {/** ADD HERE ONE RADIO WITH TEMPLATE NAMES */}
              <Button type="submit">Send Emails</Button>
            </div>
          </Form>
        </FormContent>

        {resetEmailSelection && (
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
        )}
      </Content>
    </Container>
  );
};

export default SendEmails;
