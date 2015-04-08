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
          else if(data.booking.satte === "confirmed" && $event) {
            confirmButton = "<a href='https://houseseven.com/e/"+data.id+"/cancel' class='simple-button button-cancel' style='float: right;'>Cancel Booking</a> ";
            $event.find(".event-listing-information").append(confirmButton);
          }
          maxGuests = data.booking.tickets - 1 + " / " + maxGuests;
        }
        data.message += guestsStr + maxGuests + guestsStrEnd;
      }
    }
  });
})(jQuery)
