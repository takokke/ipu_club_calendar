import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from "@fullcalendar/list"; // レスポンシブ時のlist表示プラグイン
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";


document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    displayEventTime: false,
    height: "auto",
    eventDisplay: "block",
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'numeric' },
      },
      listMonth: {
        titleFormat: { year: 'numeric', month: 'numeric' },
        listDayFormat: { month: 'numeric', day: 'numeric', weekday: 'narrow' },
        listDaySideFormat: false,
      }
    },
    headerToolbar: {
      start: '',
      center: 'title',
      end: 'today prev,next'
    },
    //休日を灰色にする
    // businessHours: true,
    locale: "jp",
    events: '/events',
    navLinks: false,
    //日付の「日」の字を消す
    dayCellContent: function(arg){ 
    	return arg.date.getDate();
    },
    windowResize: function () {
      if (window.innerWidth < 991.98) {
        calendar.changeView('dayGridMonth');
        // calendar.setOption('height', 600);
      } else {
        calendar.changeView('dayGridMonth');
      }
    },
    // クリック時の処理
    eventClick: function(arg) {
    //クリックしたら詳細ページへ
      var eventUrl = '/events/' + arg.event.id;
      window.location.href = eventUrl;
    },
  });

  calendar.render();
});