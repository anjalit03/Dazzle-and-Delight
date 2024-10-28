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
}

var flatpickr = $('#calendar .placeholder').flatpickr({
  inline: true,
  minDate: 'today',
  maxDate: maxDate[3]
,
  showMonths: 1,
  enable: Object.keys(eventDates),
  disableMobile: "true",
  onChange: function(date, str, inst) {
    var contents = '';
    if(date.length) {
        for(i=0; i < eventDates[str].length; i++) {
        contents += '<div class="event"><div class="date">' + flatpickr.formatDate(date[0], 'l J F') + '</div><div class="location">' + eventDates[str][i] + '</div></div>';
      }
    }
    $('#calendar .calendar-events').html(contents)
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
})

eventCaledarResize($(window));
$(window).on('resize', function() {
  eventCaledarResize($(this))
})

function eventCaledarResize($el) {
  var width = $el.width()
  if(flatpickr.selectedDates.length) {
    flatpickr.clear()
  }
  if(width >= 992 && flatpickr.config.showMonths !== 3) {
    flatpickr.set('showMonths', 3)
    flatpickr.set('maxDate', maxDate[3])
  }
  if(width < 992 && width >= 768 && flatpickr.config.showMonths !== 2) {
    flatpickr.set('showMonths', 2)
    flatpickr.set('maxDate', maxDate[2])
  }
  if(width < 768 && flatpickr.config.showMonths !== 1) {
    flatpickr.set('showMonths', 1)
    flatpickr.set('maxDate', maxDate[1])
    $('.flatpickr-calendar').css('width', '')
  }
}

function formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1; //Month from 0 to 11
    let y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

        // Scroll to top button functionality here
        const scrollTopBtn = document.getElementById("scrollTopBtn");
        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };
        
        scrollTopBtn.onclick = function () {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        };


        
