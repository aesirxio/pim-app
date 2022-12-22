import React from 'react';
import { withTranslation } from 'react-i18next';
const RecentsActivities = ({ t }) => {
  const dataActivities = [
    {
      name: 'Karina Tr',
      activities: 'logged in',
      role: 'Super Admin',
      avatar: '/assets/images/avatar-3.png',
      isAdmin: true,
    },
    {
      name: 'Adrian Q.',
      activities: '1 hours ago',
      role: 'Supplier',
      avatar: '/assets/images/avatar-4.png',
      isAdmin: false,
    },
    {
      name: 'Karina Tr',
      activities: '1 hours ago',
      role: 'Super Admin',
      avatar: '/assets/images/avatar-3.png',
      isAdmin: true,
    },
    {
      name: 'Karina Tr',
      activities: '4 hours ago',
      role: 'Super Admin',
      avatar: '/assets/images/avatar-3.png',
      isAdmin: true,
    },
    {
      name: 'Adrian Q.',
      activities: '4 hours ago',
      role: 'Supplier',
      avatar: '/assets/images/avatar-4.png',
      isAdmin: false,
    },
    {
      name: 'Karina Tr',
      activities: '6 hours ago',
      role: 'Super Admin',
      avatar: '/assets/images/avatar-3.png',
      isAdmin: true,
    },
    {
      name: 'Adrian Q.',
      activities: 'yesterday',
      role: 'Supplier',
      avatar: '/assets/images/avatar-4.png',
      isAdmin: false,
    },
  ];
  return (
    <div className="p-24 bg-white rounded-3 shadow-sm h-100 pb-0">
      <div className="d-flex justify-content-between align-items-center border-bottom-1">
        <h5 className="fw-bold text-blue-0 text-uppercase fs-6 mb-24">
          {t('txt_recents_activities')}
        </h5>
      </div>
      {dataActivities.map((item, key) => {
        return (
          <div
            key={key}
            className="d-flex justify-content-between align-items-center mt-16 mb-24 text-color"
          >
            <div className="d-flex align-items-center recents-activities">
              <img src={item.avatar} className="recents-activities-avatar me-16 "></img>
              <div className="d-flex flex-wrap fs-sm">
                <div className="w-100 mb-4px">{item.name}</div>
                <div className="w-100 text-gray">{item.activities}</div>
              </div>
            </div>
            <div className={`${item.isAdmin ? 'text-danger' : 'text-success'}`}>{item.role}</div>
          </div>
        );
      })}
    </div>
  );
};
export default withTranslation('common')(RecentsActivities);
