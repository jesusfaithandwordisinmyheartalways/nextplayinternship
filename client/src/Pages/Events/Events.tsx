


import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { socket } from '../../utils/socket';




const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);


  


  const fetchEvents = async () => {
    const res = await fetch('https://nextplayinternshipserver.onrender.com/calendar-events');
    const data = await res.json();
    setEvents(data);
  };





  useEffect(() => {
    fetchEvents();
    socket.on('calendarChange', fetchEvents);

    return () => {
      socket.off('calendarChange');
    };
  }, []);




  // Tooltip on hover to show description
  const handleEventDidMount = (info: any) => {
    if (info.event.extendedProps.description) {
      const tooltip = document.createElement('div');
      tooltip.innerText = info.event.extendedProps.description;
      tooltip.className = 'tooltip';
      tooltip.style.position = 'absolute';
      tooltip.style.background = 'rgba(0, 0, 0, 0.75)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px 10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.fontSize = '12px';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.zIndex = '1000';

      info.el.addEventListener('mouseenter', (e: MouseEvent) => {
        document.body.appendChild(tooltip);
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
      });

      info.el.addEventListener('mousemove', (e: MouseEvent) => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
      });

      info.el.addEventListener('mouseleave', () => {
        tooltip.remove();
      });
    }
  };






  return (
    <div className=' custom-event-container '>
      
      <h1 className="text-xl font-bold mb-4">Upcoming Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventDidMount={handleEventDidMount}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,listWeek',
        }}
      />


    </div>
  );
};





export default Events;