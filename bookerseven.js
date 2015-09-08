(function($) {
  var urlRegex = new RegExp("events-summary\/", "i");
  var eventSelector = ".events__item__details";
  $.ajaxSetup({
    success: function(data){
      if(urlRegex.exec(this.url)){ //we have event info
        var maxGuests = data.max_tickets_per_booking - 1,
        guestsStr = " ( guests: ",
        guestsStrEnd = " ) ",
        guests = "",
        $event = $('a[href*="' + data.id + '"]'),
        confirmButton = "";
        if(data.booking) {
          if(data.booking.state === "booked" && $event){
            confirmButton = "<a href='https://houseseven.com/e/"+data.id+"/confirm' class='simple-button' style='float: right;'>Confirm Booking</a> ";
            $event.find(eventSelector).prepend(confirmButton);
          }
          else if(data.booking.state === "confirmed" && $event) {
            confirmButton = "<a href='https://houseseven.com/e/"+data.id+"/cancel' class='simple-button button-cancel' style='float: right;'>Cancel Booking</a> ";
            $event.find(eventSelector).prepend(confirmButton);
          }
          maxGuests = data.booking.tickets - 1 + " / " + maxGuests;
        }
        if(data.booking_availability === "booking_not_yet_open"){
          $.get("/events/" + data.id + "/booking", function(html){
            var $data = $(html),
              date = $data.find(".booking-booking_not_yet_open");
              if(date && date[0]){
                $event.find(eventSelector).prepend("<span class='event-listing-badge event-listing-booked visible'>" + date[0].innerText.trim() + "</span>");
              }
          });
        }
        data.message += guestsStr + maxGuests + guestsStrEnd;
      }
    }
  });
})(jQuery)
