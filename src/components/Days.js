import React, { useState } from 'react';
import dayjs from 'dayjs';
import './days.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function Days({ tasks, setPickedDate }) {
  const currentDay = dayjs();
  const [today, setToday] = useState(currentDay);

  const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
    const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');
    const arrayOfDate = [];

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({ date: firstDateOfMonth.date(i) });
    }
    return currentDay.month() === month
      ? arrayOfDate.filter((elem) => elem.date.format('DD') >= currentDay.format('DD'))
      : arrayOfDate;
  };

  const handleShowInfo = (date) => {
    setPickedDate(date.format('DD.MM.YYYY'));
  };

  const calendarArray = generateDate(today.month(), today.year()).map(({ date }) => {
    const fullDate = date.format('DD.MM.YYYY');
    const dayCurrent = date.format('D');
    const monthCurrent = date.format('MMMMM');
    const yearCurrent = date.format('YYYY');
    const day = date.format('dddd');
    const dayTodayClassname =
      fullDate === currentDay.format('DD.MM.YYYY') ? 'day-today' : 'day-item';
    const dayWorkClassname = day === 'Saturday' || day === 'Sunday' ? 'day-weekend' : 'day-work';

    return (
      <div className={dayTodayClassname} key={fullDate} onClick={() => handleShowInfo(date)}>
        <h4 className={dayWorkClassname}>{ day }</h4>
        <h2>{ dayCurrent }</h2>
        <h5>
          { monthCurrent }, { yearCurrent }
        </h5>
        <div className='tasks-status'>
          { tasks.map((item) => {
            const taskClassname = item.status === false ? 'task-undone ' : 'task-done ';
            return item.date === fullDate ? (
              <span key={item.id} className={taskClassname}></span>
            ) : null;
          }) }
        </div>
      </div>
    );
  });

  return (
    <div className='days-wrapper'>
      <div className='days-header'>
        <button
          className='move-month-btn'
          onClick={() => {
            setToday(today.month(today.month() - 1));
          }}
        >
          { '<' }
        </button>
        <h2>
          { months[today.month()] }, { today.year() }
        </h2>
        <button
          className='move-month-btn'
          onClick={() => {
            setToday(today.month(today.month() + 1));
          }}
        >
          { '>' }
        </button>
      </div>
      <div className='days-array'>{ calendarArray }</div>
    </div>
  );
}

export default Days;
