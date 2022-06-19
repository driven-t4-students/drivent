import styled from 'styled-components';
import { BiLogIn } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import * as api from '../../../services/activityApi';
import * as ticketApi from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import { useContext, useEffect, useState } from 'react';
import TicketContext from '../../../contexts/TicketContext';
import { toast } from 'react-toastify';

export default function VacancieInfo({ vacancies, activity, getActivitySubscription, subscription, activities }) {
  const token = useToken();
  const { ticket } = useContext(TicketContext);
  const [, setSubscription] = useState([]);
  const [activitySubscripted, setActivitySubscripted] = useState([]);
  const [reload, setReload] = useState('');

  function handleActivitySubscripted(data) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < activities.length; j++) {
        if (data[i].activityId === activities[j].id) newData.push(activities[j]);
      }
    }

    setActivitySubscripted(newData);
  }

  useEffect(() => {
    ticketApi.getTicketWithSubscription(token, ticket.id).then((res) => {
      const data = res.ticket.activitySubscriptionId;
      setSubscription(data);
      getActivitySubscription(data);
      handleActivitySubscripted(data);
    });
  }, [reload, activitySubscripted]);

  let cont = 0;
  vacancies.map((vacancy) => {
    if (vacancy.Ticket === null) {
      cont = cont + 1;
    }
  });

  async function newSubscription() {
    let freedomSchedule = true;

    let activityStarts = new Date('2022-01-01 ' + activity.startsAt);
    let activityEnds = new Date('2022-01-01 ' + activity.endsAt);

    for (const subs of activitySubscripted) {
      let subscriptionStarts = new Date('2022-01-01 ' + subs.startsAt);
      let subscriptionEnds = new Date('2022-01-01 ' + subs.endsAt);

      if (subscriptionStarts < activityEnds && subscriptionStarts >= activityStarts) freedomSchedule = false;
      if (subscriptionEnds < activityEnds && subscriptionEnds > activityStarts) freedomSchedule = false;
    }

    if (freedomSchedule) {
      await api
        .subscribeOnActivity(token, { subscriptionId: activity.id, ticketId: ticket.id, cancelSubscription: 1 })
        .then((res) => {
          setReload(res.activities.activityId);
          toast('Inscrição confirmada!');
        });
    } else {
      toast('Horários conflitantes!');
    }
  }

  async function cancelSubscription() {
    await api
      .subscribeOnActivity(token, { subscriptionId: activity.id, ticketId: ticket.id, cancelSubscription: null })
      .then((res) => {
        setReload(res.activities.activityId);
        toast('Inscrição cancelada!');
      });
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
              <Subscripted onClick={() => cancelSubscription()}>
                <AiOutlineCheckCircle size={'18px'} />
                <p>Inscrito</p>
              </Subscripted>
            ) : (
              <Entry onClick={() => newSubscription()}>
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
