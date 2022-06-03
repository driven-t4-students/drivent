import React from 'react';
import Card from 'react-credit-cards';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from '../../utils/CreditCard.js';
import 'react-credit-cards/es/styles-compiled.css';
import './style.css';
import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';

export default class App extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer } = this.state;

    return (
      <>
        <ContainerForm>
          <div className="App-payment">
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            <ContainerFormData ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
              <FormNumber >
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <small>E.g.: 49..., 51..., 36..., 37...</small>
              </FormNumber>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <ContainerFormBottom>
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </ContainerFormBottom>
              <input type="hidden" name="issuer" value={issuer} />
              <div className="form-actions">
              </div>
            </ContainerFormData>
          </div>
        </ContainerForm>
        <StyledMuiButton className="btn btn-primary btn-block">FINALIZAR PAGAMENTO</StyledMuiButton>
      </>  
    );
  }
}

const ContainerForm = styled.div`
    display: flex;
`;

const StyledMuiButton = styled(MuiButton)`
  margin-top: 18px !important;
  width: 200px;
`;

const FormNumber = styled.div`
`;

const ContainerFormBottom = styled.div`
  display: flex;

  gap: 10px;
   
  input{
    width: 195px;
  }
`;

const ContainerFormData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    height: 200px;
    input{
      height: 45px;
    }
`;

