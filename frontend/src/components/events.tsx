import React from "react";
import dayjs, { Dayjs } from 'dayjs';

type CatEvent = {
    id: number;
    catId: number;
    title: string;
    date: string;
    type: string;
    notes?: string;
  };
  
  type eventsProp = {
    date(date: any): unknown;
    events: eventsProp[];
  };

  function CatEvents({ events }: eventsProp) {
    const today = dayjs().startOf('day');

    const upcomingEvents = events
    .filter(event => dayjs(event.date).isAfter(today))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
  }

  export default CatEvents;