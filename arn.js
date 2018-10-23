
// "konstruktør"
$(document).ready(function() {

    // Toggler bakgrunnsbilde på knapp for å vise/skjule passord
    $("#frm").on("click", "#view-password", function() {
        togglePasswordIcon();
    });

    // Teller antall gjenstående tegn i textarea
    var maxLength = 1000;
    $(".textarea-container textarea").attr('maxlength', maxLength);
    // Looper over alle textarea som finnes i løsningen og setter antallet
    $.each($(".textarea-container textarea"), function() {
        characterCounter($(this), maxLength);
    });
    // Setter antallet på et spesifikt textarea ved input
    $('#frm').on("input", ".textarea-container textarea", function () {
        characterCounter($(this), maxLength);
    });

    // Viser/skjuler innhold i meny under gitt knapp
    $("#frm").on("click", ".accordion-btn", function() {

        // LITEN SKJERM
        // lukker alle content-containere
        if ($(this).hasClass("btn-toggle-menu")) {
            var $otherAccordions = $(".menu-container .btn-toggle-menu").not(this).closest(".accordion");
            $otherAccordions.find(".btn-toggle-menu").removeClass("open");
            $otherAccordions.find(".accordion-content").hide();
        }
        // åpner valgt content-container
        var $accordion = $(this).closest(".accordion"); // setter objektet vi bruker i dette scriptet til å være lik element med klasse "accordion" som er nærmeste forfeder
        $accordion.find(".btn-toggle-menu").toggleClass("open"); // Setter klassen "open" på knapp ettersom innholdet vises/skjules (for å rotere bilde-pil i CSS)
        $accordion.find(".accordion-content").toggle();


        // STOR SKJERM
        // toggler innhold på stor skjerm

        var id = $(this).attr("id"); // henter ut ID'en på knappen ("btn-....")
        var containerId = "#content" + id.substring(3, id.length); // klipper vekk "btn" og lager id for container som skal åpnes

        // lukker alle containere som ikke er den som er klikket på
        var $otherAccordions2 = $(this).closest(".wrap-page").find(".big-screen-container .accordion-content").not(containerId);
        $otherAccordions2.removeClass("open");
        $otherAccordions2.hide();


        var $container = $(this).closest(".wrap-page").find(containerId);

        // forhindrer at vi lukker containeren som er åpen (slik at det alltid er en som er åpen)
        if ($container.hasClass("open"))  return;

        // toggler den containeren som det er trykket på
        $container.toggleClass("open"); // setter klassen "open" på elementet for å sette det til synlig gjennom css
        $container.toggle();

        localStorage.removeItem("scrollOffset");
    });

    $("#frm").on("click", ".btn-toggle-attachments", function() {
        var text = $(this).text();
        if (text === "Visa bilagor") {
            $(this).text("Dölj bilagor");
        }
        else {
            $(this).text("Visa bilagor");
        }
    });

    $("#frm").on("change click", ".file-upload, .delete-btn", function() {
        var $element = $(".file-download").last().length ? $(".file-download").last() : $("#komplettering_group_vedlegg");
        localStorage.setItem("scrollOffset", ($element.offset().top + $element.height()));
    });

    if (localStorage.scrollOffset !== undefined) {
        $("html").animate({
            scrollTop: localStorage.scrollOffset,
        }, 10);

        $("#btn-komplettera").click();
    }


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
    $('.format-case-number').mask('0000-00000');

    $("#frm").on("click", "#to-top", function() {
        $("html").animate({
            scrollTop: 0,
        }, 500);
        
    });

    // Viser modal og gjør bakgrunnen statisk
    $("#frm").on("click", ".btn-shows-modal", function() {
        var scrollBarWidth = getScrollbarWidth();
        $("body").css("padding-right", scrollBarWidth + "px");
        $("body").css("overflow", "hidden");      
    });

    // Skjuler modal og gjør bakgrunn scrollbar
    $("#frm").on("click", ".btn-hides-modal", function() {
        $("body").css("padding-right", 0);
        $("body").css("overflow-y", "scroll");             
    });

    // Knapp for å scrolle til topp av vinduet (vises først når man har scrollet litt ned på siden)
    $(window).on("scroll", function() {
        if ($(this).scrollTop() >= 200) {
            $("#to-top").show();
        }
        else {
            $("#to-top").hide();   
        }
    });

    $("#wrap-case").removeClass("hidden");
});

// Når modal toggles må bredde på innhold justeres basert på om scrollbar vises eller ikke
function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

 // Teller antall gjenstående tegn i textarea
function characterCounter($textarea, maxLength) {
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
