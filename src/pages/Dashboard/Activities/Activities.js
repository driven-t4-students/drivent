import { useState } from 'react';
import styled from 'styled-components';
import VacancieInfo from './VacancieInfo';

export default function Activities({ activities }) {
  const [activitySubscription, setActivitySubscription] = useState([]);

  function getActivitySubscription(data) {
    setActivitySubscription(data);
  }

  return (
    <>
      <Schedule>
        <Place column="main">Auditório Principal</Place>
        <Place column="side">Auditório Lateral</Place>
        <Place column="workshop">Sala de Workshop</Place>

        {activities.map((activity, i) => (
          <Activity
            key={activity.id}
            column={activity.place}
            row={`time-${activity.startsAt} / time-${activity.endsAt}`.replace(/:/g, '')}
            teste={activitySubscription.filter((e) => e.activityId === activity.id).length === 1}
          >
            <ActivityInfo>
              <div id="activityName">{activity.name}</div>
              <div id="activityDuration">{`${activity.startsAt} - ${activity.endsAt}`}</div>
            </ActivityInfo>
            <VacancieInfo
              vacancies={activity.ActivitySubscription}
              activity={activity}
              getActivitySubscription={getActivitySubscription}
              subscription={activitySubscription.filter((e) => e.activityId === activity.id)}
              activities={activities}
            />
          </Activity>
        ))}
      </Schedule>
    </>
  );
}

const Schedule = styled.div`
  display: grid;
  margin-top: 5vmin;
  gap: 1vmin;

  grid-template-rows:
    [places] 1fr
    [time-0900] 1fr
    [time-0930] 1fr
    [time-1000] 1fr
    [time-1030] 1fr
    [time-1100] 1fr
    [time-1130] 1fr
    [time-1200] 1fr;

  grid-template-columns:
    [main] 1fr
    [side] 1fr
    [workshop] 1fr;
`;

const Place = styled.div`
  grid-row: places;
  grid-column: ${({ column }) => column};

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #7b7b7b;
`;

const Activity = styled.div`
  min-height: 70px;
  display: flex;
  align-items: center;
  grid-row: ${({ row }) => row};
  grid-column: ${({ column }) => column};

  background-color: ${(props) => (props.teste ? '#D0FFDB' : '#f1f1f1')};
  padding: 1vmin;
  border-radius: 5px;
  cursor: pointer;

  #activityName {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;

    color: #343434;
  }

  #activityDuration {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-top: 6px;

    color: #343434;
  }
`;

const ActivityInfo = styled.div`
  width: 200px;
`;
