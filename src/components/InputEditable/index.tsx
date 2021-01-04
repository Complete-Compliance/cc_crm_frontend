import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { FiCheck, FiX, FiEdit } from 'react-icons/fi';
import { useField } from '@unform/core';
import { useToast } from '../../hooks/toast';
import { useLead } from '../../hooks/lead';
import api from '../../services/api';

import { Container, OuterContainer, ButtonsSection } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  text: string;
}

const InputEditable: React.FC<InputProps> = ({ name, text, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addToast } = useToast();
  const {
    setReloadLead,
    reloadLead,
    leadUpdateEndpoint,
    setIsLoading,
  } = useLead();

  const [editMode, setEditMode] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const updateInformation = useCallback(async () => {
    if (leadUpdateEndpoint === '') {
      return;
    }

    try {
      await api.put(leadUpdateEndpoint, { [name]: inputRef.current?.value });

      setReloadLead(!reloadLead);
      setEditMode(false);
      setIsLoading(true);

      addToast({
        type: 'success',
        title: 'Information updated!',
      });
    } catch (e) {
      console.log(e);

      addToast({
        type: 'error',
        title: 'An error have occurred. Try again later.',
        description: error,
      });
    }
  }, [
    addToast,
    leadUpdateEndpoint,
    reloadLead,
    setReloadLead,
    setIsLoading,
    name,
    error,
  ]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <OuterContainer>
      <Container>
        <strong>
          {text}
          :&nbsp;
        </strong>

        <input
          name={name}
          defaultValue={defaultValue}
          ref={inputRef}
          disabled={!editMode}
          {...props}
        />
      </Container>

      <ButtonsSection>
        {editMode ? (
          <>
            <button type="button" id="confirmBtn" onClick={updateInformation}>
              <FiCheck color="#4cd929" />
            </button>
            <button
              type="button"
              id="cancelBtn"
              onClick={() => setEditMode(false)}
            >
              <FiX color="#c53030" />
            </button>
          </>
        ) : (
          <button type="button" id="editBtn" onClick={() => setEditMode(true)}>
            <FiEdit color="#999591" />
          </button>
        )}
      </ButtonsSection>
    </OuterContainer>
  );
};

export default InputEditable;
