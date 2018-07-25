
// "konstruktør"
$(document).ready(function() {
    console.log("ready!");

    // Toggler bakgrunnsbilde på knapp for å vise/skjule passord
    $("#frm").on("click", "#view-password", function() {
        togglePasswordIcon();
    });

    // Teller antall gjenstående tegn i textarea
    var maxLength = 1000;
    $(".textarea-container textarea").attr('maxlength', maxLength);
    // Looper over alle textarea som finnes i løsningen og setter antallet
    $.each($(".textarea-container textarea"), function() {
        myFunction($(this), maxLength);
    });
    // Setter antallet på et spesifikt textarea ved input
    $('#frm').on("input", ".textarea-container textarea", function () {
        myFunction($(this), maxLength);
    });

    // Viser/skjuler innhold i meny under gitt knapp
    $("#frm").on("click", ".accordion-btn", function() {
        var $accordion = $(this).closest(".accordion");
        $accordion.find(".btn-toggle-menu").toggleClass("open"); // Setter klassen "open" på knapp ettersom innholdet vises/skjules (for å rotere bilde-pil i CSS)
        $accordion.find(".accordion-content").toggle();
    });

    // Viser knapp for å vise/skjule passord bare hvis feltet ikke er tomt
    $("#frm").on("input", "#password-input", function() {
      if($(this).val().length > 0 )
        $("#view-password").show();
      else {
        $("#view-password").hide();
      }
    });

    $("#frm").on("focus blur", ".file-upload input", function() {
        var id = $(this).attr("id");
        $("label[for='" + id + "']").toggleClass("focused");
        console.log("Found: " + $("label[for='" + id + "']").length);
    });

    // Setter inputfelt til å kun godta tall og være på gitt form. Dette er inkludert gjennom eksternt bibliotek
    $('#format-case-number').mask('9999-99999');
});


 // Teller antall gjenstående tegn i textarea
function myFunction($textarea, maxLength) {
    var len = $textarea.val().length;
    $textarea.closest(".textarea-container").find(".char-count").text(len + "/" + maxLength);
}

// Toggler bakgrunnsbilde på knapp for å vise/skjule passord
function togglePasswordIcon() {
    var $input = $("#password-input");
    if ($input.attr("type") === "password") {
        $input.attr("type", "text");
        $("#view-password").css("background-image", "url('ImageDB?imageName=%22password_unvisible.png%22')");
    } else {
        $input.attr("type", "password");
        $("#view-password").css("background-image", "url('ImageDB?imageName=%22password_visible.png%22')");
    }
}
