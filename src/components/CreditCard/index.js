import React, { useContext, useState } from 'react';
import Card from 'react-credit-cards';
import * as api from '../../services/ticketApi';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../../utils/CreditCard.js';
import 'react-credit-cards/es/styles-compiled.css';
import './style.css';
import styled from 'styled-components';
import Button from '../../components/Form/Button';
import TicketContext from '../../contexts/TicketContext.js';
import useToken from '../../hooks/useToken.js';
import UserContext from '../../contexts/UserContext.js';
import { toast } from 'react-toastify';

export default function ReactCreditCards() {
  const { ticket, setTicket } = useContext(TicketContext);
  const token = useToken();
  const { userData } = useContext(UserContext);

  const [form, setForm] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  function handleBookingTickets(e) {
    e.preventDefault();
    const formData = {
      type: ticket.type,
      hotel: ticket.hotel,
      totalValue: ticket.value,
      userId: userData.user.id,
    };
    if (form.cvc || form.expiry || form.focus || form.name || form.number) {
      const promise = api.postBooking(token, formData);
      promise
        .then((e) => {
          setTicket((ticket) => ({ ...ticket, payment: true }));
        })
        .catch((error) => { });
    } else {
      toast('Favor preencher os dados do cartão!');
    }
  }
    
  const handleInputFocus = (e) => {
    setForm({ ...form, focus: e.target.name });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <>
      <Form >
        <div className="App-payment">
          <Card
            cvc={form.cvc}
            expiry={form.expiry}
            focused={form.focus}
            name={form.name}
            number={form.number}
          />
          <ContainerFormData >
            <FormNumber>
              <input
                type="tel"
                name="number"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={(e) => handleInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </FormNumber>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                maxLength={45}
                required
                onChange={(e) => handleInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
              />
            </div>
            <ContainerFormBottom>
              <div className="col-6">
                <input
                  type="expiry"
                  name="expiry"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={(e) => handleInputChange(e)}
                  onFocus={(e) => handleInputFocus(e)}
                />
              </div>
              <div className="col-6">
                <input
                  type="cvc"
                  name="cvc"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={(e) => handleInputChange(e)}
                  onFocus={(e) => handleInputFocus(e)}
                />
              </div>
            </ContainerFormBottom>
          </ContainerFormData>
        </div>
        <Button onClick={handleBookingTickets}>
            FINALIZAR PAGAMENTO
        </Button>
      </Form>
    </>
  );
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormNumber = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & small {
    margin-left: 5px;
  }
`;

const ContainerFormBottom = styled.div`
  display: flex;

  gap: 10px;

  input {
    width: 195px;
  }
`;

const ContainerFormData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 200px;
  input {
    height: 45px;
  }
`;

