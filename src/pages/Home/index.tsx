import React, { useCallback, useRef } from 'react';
import 'react-day-picker/lib/style.css';
import { FiPlay, FiTrash } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { CellParams, DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import NoRowsOverlay from './components/NoRowsOverlay';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, ScrapProcess, ActionButton } from './styles';

interface ScrapProcess {
  id: string;
  startDot: string;
  endDot: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
interface IResponse {
  data: ScrapProcess[];
}

interface ScrapProcessFormData {
  startDot: string;
  endDot: string;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [scrapProcesses, setScrapProcesses] = useState<ScrapProcess[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [runningProcessExists, setRunningProcessExists] = useState(false);
  const [reloadProcessList, setReloadProcessList] = useState(true);

  useEffect(() => {
    api.get('/scrapProcesses').then((response: IResponse) => {
      setScrapProcesses(response.data);
      setIsLoading(false);
      setReloadProcessList(false);
      setRunningProcessExists(
        !!response.data.find(process => process.status === 'Running'),
      );
    });
  }, [reloadProcessList]);

  const handleSubmit = useCallback(
    async (data: ScrapProcessFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          startDot: Yup.string().required('Start search required'),
          endDot: Yup.string().required('Start search required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/scrapProcesses', data);

        setReloadProcessList(true);
        setIsLoading(true);

        addToast({
          type: 'success',
          title: 'Scrap Process Created',
          description:
            'You can run the process on the list, if there is no running process.',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Scrap Process Error',
          description:
            'An error have occurred in creating the process. Try again, please.',
        });
      }
    },
    [addToast],
  );

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params: CellParams) => {
        return (
          <>
            {runningProcessExists ? (
              <></>
            ) : (
              <ActionButton
                type="button"
                status={params.row.status}
                onClick={() => {
                  api
                    .post(`/scrapProcesses/scrap/${params.row.id}`)
                    .then(response => {
                      addToast({
                        type: 'success',
                        title: 'Script Running',
                        description: 'Script successfully running.',
                      });
                      setReloadProcessList(true);
                      setIsLoading(true);
                    });
                }}
              >
                <FiPlay color="#09b500" />
              </ActionButton>
            )}
          </>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params: CellParams) => {
        return (
          <ActionButton
            type="button"
            deletable={params.row.status}
            onClick={() => {
              api.delete(`/scrapProcesses/${params.row.id}`).then(response => {
                addToast({
                  type: 'success',
                  title: 'Process deleted',
                  description: 'This scrap process was deleted',
                });
                setReloadProcessList(true);
                setIsLoading(true);
              });
            }}
          >
            <FiTrash color="#ba382f" />
          </ActionButton>
        );
      },
    },
    { field: 'startDot', headerName: 'Start DOT#', width: 200 },
    { field: 'endDot', headerName: 'End DOT#', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
  ];

  return (
    <Container>
      <AppHeader />

      <Content>
        <h1>Lead Update</h1>
        <ScrapProcess>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <Input type="text" name="startDot" placeholder="Start DOT#: " />
              <Input type="text" name="endDot" placeholder="End DOT#: " />
              <Button type="submit"> Create Process</Button>
            </div>
          </Form>
        </ScrapProcess>

        <DataGrid
          components={{ noRowsOverlay: NoRowsOverlay }}
          rows={scrapProcesses}
          density="compact"
          columns={columns}
          disableSelectionOnClick
          loading={isLoading}
          sortModel={[
            {
              field: 'status',
              sort: 'desc',
            },
          ]}
        />
      </Content>
    </Container>
  );
};

export default Home;
