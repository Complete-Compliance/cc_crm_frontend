/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useRef, useState } from 'react';
import Loading from 'react-loading';
import { FormHandles } from '@unform/core';
// import { Form } from '@unform/web';
// import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { FiArrowUp } from 'react-icons/fi';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

// import getValidationErrors from '../../utils/getValidationErrors';

// import Input from '../../components/Input';
// import Button from '../../components/Button';
import Main from '../../components/Main';
import Section from '../../components/Section';
import AppHeader from '../../components/AppHeader';

/**
 * WHAT NEEDS TO BE DONE IN THIS PAGE:
 *
 * [ ] Finish Card section font styles(color, margin, size)
 * [ ] Build the cards section with API & Lead Information
 * (check lead interface to review the fields separated)
 * [ ] Create a way to update the lead and cancel/submit the update
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
  companyName: string | null;
  fullName: string | null;
  entityType: string | null;
  phoneNumber: string | null;
  operatingStatus: string | null;
  email: string | null;

  // Address
  primaryAddress: string | null;
  state: string | null;
  zipCode: string | null;
  altAddress: string | null;
  altState: string | null;
  altZipCode: string | null;

  // Driver info
  mcs150FormDate: string | null;
  operationClassification: string | null;
  carrierOperation: string | null;
  cargoCarried: string | null;
  drivers: string | null;
  powerUnits: string | null;

  // Insurance
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

const Lead: React.FC = () => {
  const location = useLocation();
  // const history = useHistory();

  // const formRef = useRef<FormHandles>(null);
  // const { addToast } = useToast();

  const [isPersonalExpanded, setIsPersonalExpanded] = useState(true);

  const [leadId, setLeadId] = useState<string>();
  const [lead, setLead] = useState<Lead>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLeadId(location.pathname.split('/').splice(-1).pop());
  }, [location]);

  useEffect(() => {
    api.get(`/leads/${leadId}`).then(response => {
      setLead(response.data);
      setIsLoading(false);
    });
  }, [leadId]);

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
              <Section>
                <p>
                  <strong>Field Name:&nbsp;</strong> Field Value
                </p>
                <p>
                  <strong>Field Name:&nbsp;</strong> Field Value
                </p>
                <p>
                  <strong>Field Name:&nbsp;</strong> Field Value
                </p>
              </Section>

              <Section>
                <p>
                  <strong>Field Name:&nbsp;</strong> Field Value
                </p>
                <p>
                  <strong>Field Name:&nbsp;</strong> Field Value
                </p>
                <p>
                  <strong>Field Name:&nbsp;</strong> Field Value
                </p>
              </Section>
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
