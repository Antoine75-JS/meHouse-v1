import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

const OrganisationDetailsPage: React.FC = () => {
  const [organisation, setOrganisation] = useState<IOrganisation>();
  const location = useLocation();
  const { orga } = location.state;

  useEffect(() => {
    setOrganisation(orga);
  }, [orga]);

  return (
    <div className='m-4 flex flex-col gap-4'>
      <h2 className='text-4xl font-bold pb-4'>{organisation?.orgName} :</h2>
      <div>
        <div className='flex flex-col font-bold mb-2'>Members :</div>
        {organisation?.orgUsers?.map((user) => (
          <span className='pl-4' key={user?.id}>
            User
          </span>
        ))}
      </div>
      <div>
        <div className='flex flex-col font-bold mb-2'>Tasks :</div>
        {organisation?.orgTasks?.map((task) => (
          <span className='pl-4' key={task?.id}>
            Task
          </span>
        ))}
      </div>
    </div>
  );
};

export default OrganisationDetailsPage;