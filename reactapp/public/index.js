$("#showoff").click(function () {
  $("#idk").show(1000);
});

$("#idk").click(function () {
  $(this).animate({ fontSize: "20px" }, 2000);
  $("#showoff").animate({ width: "200px" }, 2000, function () {
    $("#idk").hide(1000);
    $("#showoff").hide(800, function () {
      $("#idk").text("To Do List App");
      $("#idk").show(500, function () {
        $("#idk").animate({ fontSize: "75px" }, 2000);
        $("#idk").off();
      });
    });
  });
});

$("li").click(function () {
  $(this).hide(700);
});
