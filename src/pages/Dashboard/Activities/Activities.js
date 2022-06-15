import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';

export default function Activities({ activities }) {
  const mainActivities = activities.filter((activity) => activity.place === 'main');
  const sideActivities = activities.filter((activity) => activity.place === 'side');
  const workshopActivities = activities.filter((activity) => activity.place === 'workshop');
  const allActivities = [mainActivities, sideActivities, workshopActivities];

  console.log({ mainActivities });
  console.log({ sideActivities });
  console.log({ workshopActivities });
  return (
    <>
      <Places>
        <div>Auditório Principal</div>
        <div>Auditório Lateral</div>
        <div>Sala de Workshop</div>
      </Places>
      <Schedule>
        {allActivities.map((activities) => (
          <ActivitySchedule>
            {activities.map((activity) => {
              const startsAt = `2019-01-25T${activity.startsAt}`;
              const endsAt = `2019-01-25T${activity.endsAt}`;
              const durationInMinutes = dayjs(endsAt).diff(startsAt, 'minutes');
              return (
                <Activity duration={durationInMinutes}>
                  <div>
                    <div id="activityName">{activity.name}</div>
                    <div id="activityDuration">{`${activity.startsAt} - ${activity.endsAt}`}</div>
                  </div>
                </Activity>
              );
            })}
          </ActivitySchedule>
        ))}
      </Schedule>
    </>
  );
}

const Places = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 61px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-align: center;

  color: #7b7b7b;
  padding-bottom: 13px;
`;

const Schedule = styled.div`
  display: flex;
  width: 100%;
`;

const ActivitySchedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.333%;
  gap: 1vmin;
  padding: 1vmin;
  border-top: 1px solid #d7d7d7;

  &:first-of-type,
  &:last-of-type {
    border-right: 1px solid #d7d7d7;
    border-left: 1px solid #d7d7d7;
  }
`;

const Activity = styled.div`
  background-color: #f1f1f1;
  display: flex;
  padding: 1vmin;
  min-height: 79px;
  height: ${({ duration }) => `${(duration * 79) / 60}px`};
  border-radius: 5px;
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

    color: #343434;
  }
`;
