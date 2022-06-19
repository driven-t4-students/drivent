import styled from 'styled-components';
import { BiLogIn } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import * as api from '../../../services/activityApi';
import useToken from '../../../hooks/useToken';
import { useContext, useEffect, useState } from 'react';
import TicketContext from '../../../contexts/TicketContext';

export default function VacancieInfo({ vacancies, activity, getActivitySubscription, subscription, activities }) {
  const token = useToken();
  const { ticket, setTicket } = useContext(TicketContext);
  const [, setSubscription] = useState([]);
  const [activitySubscripted, setActivitySubscripted] = useState([]);

  console.log(activitySubscripted);

  function handleActivitySubscripted(data) {
    const aaaa = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < activities.length; j++) {
        if (data[i].activityId === activities[j].id) aaaa.push(activities[j]);
      }
    }

    setActivitySubscripted(aaaa);
  }

  useEffect(() => {
    api.subscribeOnActivity(token, { subscriptionId: activity.id, ticketId: ticket.id }).then((resp) => {
      setSubscription(resp.activities.activitySubscriptionId);
      getActivitySubscription(resp.activities.activitySubscriptionId);
      handleActivitySubscripted(resp.activities.activitySubscriptionId);
    });
  }, []);

  let cont = 0;
  vacancies.map((vacancy) => {
    if (vacancy.Ticket === null) {
      cont = cont + 1;
    }
  });

  async function teste(id) {
    const inscrito = [
      {
        id: 1,
        endsAt: 11,
        startsAt: 10,
      },
    ];

    let confereData = true;

    let inicio = 0;
    let fim = 0;

    // console.log(activity);

    const separaInicio = activity.startsAt.split(':');
    const separaFim = activity.endsAt.split(':');

    inicio = parseInt(separaInicio[0]);
    if (parseInt(separaInicio[1]) === 30) inicio += 0.5;

    fim = parseInt(separaFim[0]);
    if (parseInt(separaFim[1]) === 30) fim += 0.5;

    if (inscrito[0].startsAt <= inicio && inscrito[0].endsAt > inicio) confereData = false;
    if (inscrito[0].startsAt <= fim && inscrito[0].endsAt > fim) confereData = false;
  }

  return (
    <Vacancie>
      {cont === 0 ? (
        <Cancel>
          <GiCancel size={'18px'} />
          <p>Esgotado</p>
        </Cancel>
      ) : (
        <>
          <>
            {subscription[0]?.activityId === activity.id ? (
              <Subscripted onClick={() => teste(activity.id)}>
                <AiOutlineCheckCircle size={'18px'} />
                <p>Inscrito</p>
              </Subscripted>
            ) : (
              <Entry onClick={() => teste(activity.id)}>
                <BiLogIn size={'18px'} />
                <p>{cont} vagas</p>
              </Entry>
            )}
          </>
        </>
      )}
    </Vacancie>
  );
}

const Vacancie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: solid 1px #cfcfcf;
  padding-left: 16px;
  p {
    font-size: 9px;
  }
`;

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #078632;
  gap: 4px;
`;

const Subscripted = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #078632;
  gap: 4px;
`;

const Cancel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #cc6666;
  gap: 2px;
`;
