export const timeKeys = {
  '05:00': '5:00 - 5:30 AM',
  '05:30': '5:30 - 6:00 AM',
  '06:00': '6:00 - 6:30 AM',
  '06:30': '6:30 - 7:00 AM',
  '07:00': '7:00 - 7:30 AM',
  '07:30': '7:30 - 8:00 AM',
  '08:00': '8:00 - 8:30 AM',
  '08:30': '8:30 - 9:00 AM',
  '09:00': '9:00 - 9:30 AM',
  '09:30': '9:30 - 10:00 AM',
  '20:00': '8:00 - 8:30 PM',
  '20:30': '8:30 - 9:00 PM',
  '21:00': '9:00 - 9:30 PM',
  '21:30': '9:30 - 10:00 PM',
  '22:00': '10:00 - 10:30 PM',
  '22:30': '10:30 - 11:00 PM',
  '23:00': '11:00 - 11:30 PM',
  '23:30': '11:30 - 12:00 AM',
  '00:00': '12:00 - 12:30 AM',
  '00:30': '12:30 - 1:00 AM',
};

export const wakeupTimes = [
  { text: '5:00 - 5:30 AM', key: '05:00' },
  { text: '5:30 - 6:00 AM', key: '05:30' },
  { text: '6:00 - 6:30 AM', key: '06:00' },
  { text: '6:30 - 7:00 AM', key: '06:30' },
  { text: '7:00 - 7:30 AM', key: '07:00' },
  { text: '7:30 - 8:00 AM', key: '07:30' },
  { text: '8:00 - 8:30 AM', key: '08:00' },
  { text: '8:30 - 9:00 AM', key: '08:30' },
  { text: '9:00 - 9:30 AM', key: '09:00' },
  { text: '9:30 - 10:00 AM', key: '09:30' },
];

// need to fix keys
export const bedTimes = [
  { text: '8:00 - 8:30 PM', key: '20:00' },
  { text: '8:30 - 9:00 PM', key: '20:30' },
  { text: '9:00 - 9:30 PM', key: '21:00' },
  { text: '9:30 - 10:00 PM', key: '21:30' },
  { text: '10:00 - 10:30 PM', key: '22:00' },
  { text: '10:30 - 11:00 PM', key: '22:30' },
  { text: '11:00 - 11:30 PM', key: '23:00' },
  { text: '11:30 - 12:00 AM', key: '23:30' },
  { text: '12:00 - 12:30 AM', key: '00:00' },
  { text: '12:30 - 1:00 AM', key: '00:30' },
];

export const freqTypeText = {
  repeat_day: 'Daily',
  repeat_week: 'Weekly',
  repeat_month: 'Monthly',
};
export const goalTypeText = {
  goal_weeks: 'Weeks',
  goal_months: 'Months',
  goal_times: 'Times',
};
export const privacyText = {
  privacy_public: 'Public (Default)',
  privacy_private: 'Private',
};
export const shortPrivacyText = {
  privacy_public: 'Public',
  privacy_private: 'Private',
};
export const privacyIcon = {
  privacy_public: 'ios-globe',
  privacy_private: 'ios-lock',
};

export const durationTimes = [5, 10, 15, 20, 25, 30].map((i) => ({ text: `${i} minutes`, key: i }));
export const freqDays = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
