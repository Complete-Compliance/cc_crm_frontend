/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useRef, useState } from 'react';
import Loading from 'react-loading';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';
import { FiArrowUp } from 'react-icons/fi';
import { useLead } from '../../hooks/lead';

import api from '../../services/api';

import InputEditable from '../../components/InputEditable';
import Main from '../../components/Main';
import Section from '../../components/Section';
import AppHeader from '../../components/AppHeader';

/**
 * WHAT NEEDS TO BE DONE IN THIS PAGE:
 *
 * [ ] Finish Card section font styles(color, margin, size)
 * [ ] Build the cards section with API & Lead Information
 * (check lead interface to review the fields separated)
 * [X] Create a way to update the lead and cancel/submit the update
 * (probably will be lots of code, so do it in a "components" folder)
 */

import {
  Container,
  LoadingContainer,
  InformationCard,
  CardHeader,
} from './styles';

interface Lead {
  id: string;
  usdot: string;

  // Personal info
  companyName: string | undefined;
  fullName: string | undefined;
  entityType: string | undefined;
  phoneNumber: string | undefined;
  operatingStatus: string | undefined;
  email: string | undefined;

  // Address
  primaryAddress: string | undefined;
  state: string | undefined;
  zipCode: string | undefined;
  altAddress: string | undefined;
  altState: string | undefined;
  altZipCode: string | undefined;

  // Driver info
  mcs150FormDate: string | undefined;
  operationClassification: string | undefined;
  carrierOperation: string | undefined;
  cargoCarried: string | undefined;
  drivers: string | undefined;
  powerUnits: string | undefined;

  // Insurance
  bipdInsuranceRequired: string | undefined;
  cargoInsuranceRequired: string | undefined;
  bondInsuranceRequired: string | undefined;
  insuranceCarrier: string | undefined;
  policySurety: string | undefined;
  postedDate: string | undefined;
  coverageFrom: string | undefined;
  coverageTo: string | undefined;
  effectiveDate: string | undefined;
  cancellationDate: string | undefined;
}

const Lead: React.FC = () => {
  const location = useLocation();

  const formRef = useRef<FormHandles>(null);

  const {
    reloadLead,
    setLeadUpdateEndpoint,
    isLoading,
    setIsLoading,
  } = useLead();

  const [isPersonalExpanded, setIsPersonalExpanded] = useState(true);

  const [leadId, setLeadId] = useState<string>();
  const [lead, setLead] = useState<Lead>();

  useEffect(() => {
    const id = location.pathname.split('/').splice(-1).pop();

    setLeadId(id);
    setLeadUpdateEndpoint(`/leads/${id}`);
  }, [location, setLeadUpdateEndpoint]);

  useEffect(() => {
    api.get(`/leads/${leadId}`).then(response => {
      setLead(response.data);
      setIsLoading(false);
    });
  }, [leadId, reloadLead, setIsLoading]);

  return (
    <>
      <AppHeader />
      <Container>
        {!isLoading && lead && (
          <h1>
            Lead USDOT <strong>#{lead.usdot}</strong>
          </h1>
        )}
        {!isLoading && lead ? (
          <InformationCard isExpanded={isPersonalExpanded}>
            <CardHeader isExpanded={isPersonalExpanded}>
              <span>Personal Information</span>
              <button
                type="button"
                onClick={() => setIsPersonalExpanded(!isPersonalExpanded)}
              >
                <FiArrowUp />
              </button>
            </CardHeader>

            <Main>
              <Form ref={formRef} onSubmit={() => {}}>
                <Section>
                  <InputEditable
                    text="Company Name"
                    name="companyName"
                    defaultValue={lead.companyName}
                  />
                  <InputEditable
                    text="Full Name"
                    name="fullName"
                    defaultValue={lead.fullName}
                  />
                  <InputEditable
                    text="Entity Type"
                    name="entityType"
                    defaultValue={lead.entityType}
                  />
                </Section>

                <Section>
                  <InputEditable
                    text="Phone Number"
                    name="phoneNumber"
                    defaultValue={lead.phoneNumber}
                  />
                  <InputEditable
                    text="Operating Status"
                    name="operatingStatus"
                    defaultValue={lead.operatingStatus}
                  />
                  <InputEditable
                    text="E-mail"
                    name="email"
                    defaultValue={lead.email}
                  />
                </Section>
              </Form>
            </Main>
          </InformationCard>
        ) : (
          <LoadingContainer>
            <Loading type="spokes" color="white" height={150} width={75} />
          </LoadingContainer>
        )}
      </Container>
    </>
  );
};

export default Lead;
