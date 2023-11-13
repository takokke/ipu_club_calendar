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
    height: window.innerHeight-170,
    eventDisplay: "block",
    // timeGridDayのときのall-dayをなくす
    allDaySlot: false,
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'numeric' },
      },
      timeGridDay: {
        titleFormat: { year: 'numeric', month: 'numeric', day: 'numeric' },
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
      end: 'prev,next'
    },
    //休日を灰色にする
    // businessHours: true,
    locale: "jp",
    events: '/events',
    navLinks: false,
    //日付の「日」の字を消す
    dayCellContent: function(arg){
      // これをしないと、timeGridDayのとき、０時の横に余計な日付がつく
      if (arg.view.type == 'dayGridMonth') {
    	  return arg.date.getDate();
      }
    },
    // windowResize: function () {
    //   if (window.innerWidth < 991.98) {
    //     calendar.changeView('dayGridMonth');
    //     // calendar.setOption('height', 600);
    //   } else {
    //     calendar.changeView('dayGridMonth');
    //   }
    // },
    // クリック時の処理
    eventClick: function(arg) {
      // time表の時は詳細画面へ、デフォルトの状態はtime表へ
      if (arg.view.type == "timeGridDay" ) {
        var eventUrl = '/events/' + arg.event.id;
        window.location.href = eventUrl;
      } else if (arg.view.type == "dayGridMonth") {
        calendar.gotoDate(arg.event.start);
        calendar.changeView('timeGridDay');
      }
    },
    dateClick: function(info) {
      // alert('Clicked on: ' + info.dateStr);
      // alert('Current view: ' + info.view.type);
      calendar.gotoDate(info.dateStr);
      calendar.changeView('timeGridDay');
      // calendar.setOption('height', window.innerHeight-170);
    }
  });

  calendar.render();
});