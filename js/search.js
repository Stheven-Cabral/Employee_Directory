/*JQuery Code for Search Bar Functionality*/
$(document).ready(function() {
    $("#search-input").on("keyup", function() {
      let lowerCaseInput = $(this).val().toLowerCase();
  
      $(".employee-card").filter(function() {
        $(this).toggle($("h2", this).html().toLowerCase().indexOf(lowerCaseInput) > -1);
      });
    });
  });