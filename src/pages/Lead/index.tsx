/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Loading from 'react-loading';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';
import { FiArrowUp, FiTrash2 } from 'react-icons/fi';
import { useLead } from '../../hooks/lead';

import api from '../../services/api';

import InputEditable from '../../components/InputEditable';
import Main from '../../components/Main';
import Section from '../../components/Section';
import AppHeader from '../../components/AppHeader';

import {
  Container,
  LoadingContainer,
  LeadCardsContainer,
  LeadHeader,
  InformationCard,
  CardHeader,
} from './styles';

interface Lead {
  id: string;
  usdot: string;

  // Personal info
  companyName: string | undefined;
  fullName: string | undefined;
  dbaName: string | undefined;
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
  const history = useHistory();

  const {
    reloadLead,
    setLeadUpdateEndpoint,
    isLoading,
    setIsLoading,
  } = useLead();

  const [isPersonalExpanded, setIsPersonalExpanded] = useState(true);
  const [isAddressExpanded, setIsAddressExpanded] = useState(true);
  const [isDriverExpanded, setIsDriverExpanded] = useState(true);
  const [isInsuranceExpanded, setIsInsuranceExpanded] = useState(true);

  const [leadId, setLeadId] = useState<string>();
  const [lead, setLead] = useState<Lead>();

  const deleteLead = useCallback(() => {
    api.delete(`/leads/${leadId}`).then(() => {
      history.push('/leads');
    });
  }, [history, leadId]);

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
        {!isLoading && lead ? (
          <LeadCardsContainer>
            <LeadHeader>
              <h1>
                Lead USDOT <strong>#{lead.usdot}</strong>
              </h1>

              <button type="button" onClick={deleteLead}>
                <FiTrash2 />
              </button>
            </LeadHeader>

            <InformationCard
              id="Personal"
              isExpanded={isPersonalExpanded}
              height="21em"
            >
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
                      text="DBA Name"
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

            <InformationCard id="Address" isExpanded={isAddressExpanded}>
              <CardHeader isExpanded={isAddressExpanded}>
                <span>Addresses</span>
                <button
                  type="button"
                  onClick={() => setIsAddressExpanded(!isAddressExpanded)}
                >
                  <FiArrowUp />
                </button>
              </CardHeader>

              <Main>
                <Form ref={formRef} onSubmit={() => {}}>
                  <Section>
                    <InputEditable
                      text="Primary Address"
                      name="primaryAddress"
                      defaultValue={lead.primaryAddress}
                    />
                    <InputEditable
                      text="State"
                      name="state"
                      defaultValue={lead.state}
                    />
                    <InputEditable
                      text="Primary Postal Code"
                      name="zipCode"
                      defaultValue={lead.zipCode}
                    />
                  </Section>

                  <Section>
                    <InputEditable
                      text="Alt. Address"
                      name="altAddress"
                      defaultValue={lead.altAddress}
                    />
                    <InputEditable
                      text="Alt. State"
                      name="altState"
                      defaultValue={lead.altState}
                    />
                    <InputEditable
                      text="Alt. Zip Code"
                      name="altZipCode"
                      defaultValue={lead.altZipCode}
                    />
                  </Section>
                </Form>
              </Main>
            </InformationCard>

            <InformationCard id="Driver" isExpanded={isDriverExpanded}>
              <CardHeader isExpanded={isDriverExpanded}>
                <span>Driver Information</span>
                <button
                  type="button"
                  onClick={() => setIsDriverExpanded(!isDriverExpanded)}
                >
                  <FiArrowUp />
                </button>
              </CardHeader>

              <Main>
                <Form ref={formRef} onSubmit={() => {}}>
                  <Section>
                    <InputEditable
                      text="MCS-150 Form Date"
                      name="mcs150FormDate"
                      defaultValue={lead.mcs150FormDate}
                    />
                    <InputEditable
                      text="Operation Classification"
                      name="operationClassification"
                      defaultValue={lead.operationClassification}
                    />
                    <InputEditable
                      text="Carrier Operation"
                      name="carrierOperation"
                      defaultValue={lead.carrierOperation}
                    />
                  </Section>

                  <Section>
                    <InputEditable
                      text="Cargo Carried"
                      name="cargoCarried"
                      defaultValue={lead.cargoCarried}
                    />
                    <InputEditable
                      text="Drivers"
                      name="drivers"
                      defaultValue={lead.drivers}
                    />
                    <InputEditable
                      text="Power Units"
                      name="powerUnits"
                      defaultValue={lead.powerUnits}
                    />
                  </Section>
                </Form>
              </Main>
            </InformationCard>

            <InformationCard
              id="Insurance"
              isExpanded={isInsuranceExpanded}
              height="25em"
            >
              <CardHeader isExpanded={isInsuranceExpanded}>
                <span>Insurance</span>
                <button
                  type="button"
                  onClick={() => setIsInsuranceExpanded(!isInsuranceExpanded)}
                >
                  <FiArrowUp />
                </button>
              </CardHeader>

              <Main>
                <Form ref={formRef} onSubmit={() => {}}>
                  <Section>
                    <InputEditable
                      text="BIPD Insurance Required"
                      name="bipdInsuranceRequired"
                      defaultValue={lead.bipdInsuranceRequired}
                    />
                    <InputEditable
                      text="Cargo Insurance Required"
                      name="cargoInsuranceRequired"
                      defaultValue={lead.cargoInsuranceRequired}
                    />
                    <InputEditable
                      text="Bond Insurance Required"
                      name="bondInsuranceRequired"
                      defaultValue={lead.bondInsuranceRequired}
                    />

                    <InputEditable
                      text="Insurance Carrier"
                      name="insuranceCarrier"
                      defaultValue={lead.insuranceCarrier}
                    />

                    <InputEditable
                      text="Policy Surety"
                      name="policySurety"
                      defaultValue={lead.policySurety}
                    />
                  </Section>

                  <Section>
                    <InputEditable
                      text="Posted Date"
                      name="postedDate"
                      defaultValue={lead.postedDate}
                    />
                    <InputEditable
                      text="Coverage From"
                      name="coverageFrom"
                      defaultValue={lead.coverageFrom}
                    />
                    <InputEditable
                      text="Coverage To"
                      name="coverageTo"
                      defaultValue={lead.coverageTo}
                    />

                    <InputEditable
                      text="Effective Date"
                      name="effectiveDate"
                      defaultValue={lead.effectiveDate}
                    />

                    <InputEditable
                      text="Cancelation Date"
                      name="cancellationDate"
                      defaultValue={lead.cancellationDate}
                    />
                  </Section>
                </Form>
              </Main>
            </InformationCard>
          </LeadCardsContainer>
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
