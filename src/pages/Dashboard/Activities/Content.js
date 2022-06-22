import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import * as api from '../../../services/activityApi';
import { Stack } from '@mui/material';
import SectionTitle from '../../../components/StyledSectionTitle';
import styled from 'styled-components';
import { useState } from 'react';
import Activities from './Activities';

export default function Content() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const [dates, setDates] = useState();

  const token = useToken();
  useEffect(() => {
    const promise = api.getAllActivities(token);
    promise
      .then((response) => {
        setActivities(response.activities);
        verifyDates(response.activities);
      })
      .catch(() => {});
  }, []);

  function verifyDates(activities) {
    const allDates = [];
    activities?.forEach((activity) => {
      if (activity.date) {
        allDates.push(activity.date);
      }
    });
    const filteredDates = allDates.filter((el, i) => allDates.indexOf(el) === i);
    setDates(filteredDates);
  }

  function handleSelect(date) {
    setIsSelected(date);

    const filteredActivitiesByDate = activities.filter((activity) => activity.date === date);
    setFilteredActivities(filteredActivitiesByDate);
  }
  return (
    <>
      <Stack>
        <SectionTitle>Primeiro, filtre pelo dia do evento</SectionTitle>
        <ContainerDates>
          {dates?.map((date, i) => (
            <EventDate key={i} onClick={() => handleSelect(date)} active={isSelected === date ? true : false}>
              {date}
            </EventDate>
          ))}
        </ContainerDates>
        {isSelected && <Activities activities={filteredActivities} />}
      </Stack>
    </>
  );
}

const ContainerDates = styled.div`
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 17px;
`;

const EventDate = styled.div`
  width: 131px;
  height: 37px;
  background-color: #e0e0e0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  margin-top: 23px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;

  ${(props) => (props.active ? 'background-color:#FFD37D;' : '')}
`;
