(function($) {
  var urlRegex = new RegExp("events-summary\/", "i");
  $.ajaxSetup({
    success: function(data){
      if(urlRegex.exec(this.url)){ //we have event info
        var maxGuests = data.max_tickets_per_booking - 1,
        guestsStr = " ( guests: ",
        guestsStrEnd = " ) ",
        guests = "",
        confirmButton = "";
        if(data.booking) {
          if(data.booking.state === "booked"){
            confirmButton = "&nbsp;<a href='https://houseseven.com/e/"+data.id+"/confirm' style='text-decoration: underline; display: inline-block;'>Confirm Booking</a> ";
          }
          maxGuests = data.booking.tickets - 1 + " / " + maxGuests;
        }
        data.message += guestsStr + maxGuests + guestsStrEnd + confirmButton;
      }
    }
  });
})(jQuery)
