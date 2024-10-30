// generate events
var eventDates = {}

let day3 = formatDate(new Date(new Date().setDate(new Date().getDate() + 0)))
eventDates[day3] = [
  'Stand-up Comedy : The Laugh Store by Pratyush Chaubey',
]
let day2 = formatDate(new Date(new Date().setDate(new Date().getDate() + 10)))
eventDates[day2] = [
  'Musical Theatre : Emma | The Musical by Jane Austen',
]

// set maxDates
var maxDate = {
  1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
  2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
  3: new Date(new Date().setMonth(new Date().getMonth() + 9))
};

var flatpickrInstance = $('#calendar .placeholder').flatpickr({
  inline: true,
  minDate: 'today',
  maxDate: maxDate[3],
  showMonths: 1,
  enable: Object.keys(eventDates),
  disableMobile: "true",
  onChange: function(date, str, inst) {
    var contents = '';
    if(date.length) {
      for(i=0; i < eventDates[str].length; i++) {
        contents += '<div class="event"><div class="date">' + flatpickrInstance.formatDate(date[0], 'l J F') + '</div><div class="location">' + eventDates[str][i] + '</div></div>';
      }
    }
    $('#calendar .calendar-events').html(contents);
  },
  locale: {
    weekdays: {
      shorthand: ["S", "M", "T", "W", "T", "F", "S"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]
    }
  }
});

// Responsive adjustments based on screen width
function eventCalendarResize($el) {
  var width = $el.width();
  
  // Clear selected date to prevent formatting issues
  if(flatpickrInstance.selectedDates.length) {
    flatpickrInstance.clear();
  }

  // Update the number of months to display based on screen width
  if(width >= 992 && flatpickrInstance.config.showMonths !== 3) {
    flatpickrInstance.set('showMonths', 3);
    flatpickrInstance.set('maxDate', maxDate[3]);
  } else if(width < 992 && width >= 768 && flatpickrInstance.config.showMonths !== 2) {
    flatpickrInstance.set('showMonths', 2);
    flatpickrInstance.set('maxDate', maxDate[2]);
  } else if(width < 768 && flatpickrInstance.config.showMonths !== 1) {
    flatpickrInstance.set('showMonths', 1);
    flatpickrInstance.set('maxDate', maxDate[1]);
    $('.flatpickr-calendar').css('width', '');
  }

  // Adjust font size and spacing dynamically
  if (width >= 992) {
    $('.flatpickr-day').css({ 'font-size': '1.5rem', 'margin': '0.2rem', 'line-height': '2rem' });
    $('.flatpickr-current-month').css({ 'font-size': '1.8rem', 'line-height': '1rem' });
  } else if (width < 992 && width >= 768) {
    $('.flatpickr-day').css({ 'font-size': '1.6rem', 'margin': '0.15rem', 'line-height': '2rem' });
    $('.flatpickr-current-month').css({ 'font-size': '1.9rem', 'line-height': '1rem' });
  } else {
    $('.flatpickr-day').css({ 'font-size': '1.7rem', 'margin': '0.1rem', 'line-height': '2rem' });
    $('.flatpickr-current-month').css({ 'font-size': '2rem', 'line-height': '1rem' });
  }
}

// Initial call and listener for resizing
eventCalendarResize($(window));
$(window).on('resize', function() {
  eventCalendarResize($(this));
});

// Helper function to format date
function formatDate(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

// Preserve state on interaction or refresh
$(document).ready(function() {
  var savedDate = localStorage.getItem('selectedDate');
  if (savedDate) {
    flatpickrInstance.setDate(savedDate, true);
  }

  // Save the selected date to localStorage on change
  flatpickrInstance.config.onChange.push(function(date, str, inst) {
    if (date.length) {
      localStorage.setItem('selectedDate', str);
    } else {
      localStorage.removeItem('selectedDate');
    }
  });
});