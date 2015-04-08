(function($) {
  var urlRegex = new RegExp("events-summary\/", "i");
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
            $event.find(".event-listing-information").append(confirmButton);
          }
          else if(data.booking.state === "confirmed" && $event) {
            confirmButton = "<a href='https://houseseven.com/e/"+data.id+"/cancel' class='simple-button button-cancel' style='float: right;'>Cancel Booking</a> ";
            $event.find(".event-listing-information").append(confirmButton);
          }
          maxGuests = data.booking.tickets - 1 + " / " + maxGuests;
        }
        if(data.booking_availability === "booking_not_yet_open"){
          $.get("/events/" + data.id + "/booking", function(html){
            var $data = $(html),
              date = $data.find(".booking-booking_not_yet_open");
              if(date && date[0]){
                $event.find(".event-listing-information").append("<span class='event-listing-badge event-listing-booked visible' style='float:left;position: relative !important;margin-left: 80px;'>" + date[0].innerText.trim() + "</span>");
              }
          });
        }
        data.message += guestsStr + maxGuests + guestsStrEnd;
      }
    }
  });
})(jQuery)
