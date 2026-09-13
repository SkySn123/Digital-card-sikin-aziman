/* =========================================================
   WRAPPER OVERLAY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const toggleContent = document.getElementById("toggle-content");
    const wrapper = document.querySelector(".wrapper");
    const card = document.querySelector(".card");
    const audioPlayer = document.getElementById("audio-player");

    if (toggleContent) {
        toggleContent.addEventListener("click", function () {

            if (wrapper) {
                wrapper.classList.add("hidden");

                wrapper.addEventListener(
                    "transitionend",
                    function () {
                        wrapper.style.display = "none";

                        if (card) {
                            card.style.display = "block";
                        }
                    },
                    { once: true }
                );

                /* Fallback jika transition CSS tidak berjalan */
                setTimeout(function () {
                    wrapper.style.display = "none";

                    if (card) {
                        card.style.display = "block";
                    }
                }, 1000);
            } else if (card) {
                card.style.display = "block";
            }

            /* Play music */
            if (audioPlayer) {
                audioPlayer.play().catch(function (error) {
                    console.log("Audio belum boleh dimainkan:", error);
                });
            }
        });
    }


    /* =========================================================
       COUNTDOWN
       SIKIN & AZIMAN
       19 DISEMBER 2026
       11:00 PAGI
       WAKTU MALAYSIA UTC+8
       ========================================================= */

    function setupCountdown() {

        const weddingDate = new Date(
            "2026-12-19T11:00:00+08:00"
        ).getTime();

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        function countdown() {

            const now = new Date().getTime();

            let gap = weddingDate - now;

            /* Jika majlis sudah bermula */
            if (gap < 0) {
                gap = 0;
            }

            const textDay = Math.floor(gap / day);
            const textHour = Math.floor((gap % day) / hour);
            const textMinute = Math.floor((gap % hour) / minute);
            const textSecond = Math.floor((gap % minute) / second);

            const dayElement =
                document.querySelector(".campaign-0 .day");

            const hourElement =
                document.querySelector(".campaign-0 .hour");

            const minuteElement =
                document.querySelector(".campaign-0 .minute");

            const secondElement =
                document.querySelector(".campaign-0 .second");

            if (dayElement) {
                dayElement.textContent = textDay;
            }

            if (hourElement) {
                hourElement.textContent = textHour;
            }

            if (minuteElement) {
                minuteElement.textContent = textMinute;
            }

            if (secondElement) {
                secondElement.textContent = textSecond;
            }
        }

        /* Jalankan terus */
        countdown();

        /* Update setiap 1 saat */
        setInterval(countdown, 1000);
    }

    setupCountdown();


    /* =========================================================
       CALENDAR
       ========================================================= */

    const weddingEvent = {
        title: "Majlis Perkahwinan Sikin & Aziman",

        /*
         * 19 Disember 2026
         * 11:00 AM Malaysia = 03:00 UTC
         */

        startDate: "20261219T030000Z",

        /*
         * 4:00 PM Malaysia = 08:00 UTC
         */

        endDate: "20261219T080000Z",

        location:
            "No 66 Blok 5B Jalan Merak, Felda Nitar 01, 86800 Mersing, Johor, Malaysia",

        description:
            "Majlis Perkahwinan Sikin & Aziman. Sabtu, 19 Disember 2026, 11:00 pagi hingga 4:00 petang."
    };


    /* =========================================================
       GOOGLE CALENDAR
       ========================================================= */

    function generateGoogleCalendarLink(eventData) {

        const baseUrl =
            "https://calendar.google.com/calendar/render?action=TEMPLATE";

        const params = new URLSearchParams({
            text: eventData.title,
            dates:
                eventData.startDate +
                "/" +
                eventData.endDate,
            details: eventData.description,
            location: eventData.location
        });

        return baseUrl + "&" + params.toString();
    }


    function addGoogleCalendar() {

        const googleLink =
            generateGoogleCalendarLink(weddingEvent);

        window.open(
            googleLink,
            "_blank"
        );
    }


    /* =========================================================
       APPLE CALENDAR / ICS
       ========================================================= */

    function escapeICSText(text) {

        return text
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");
    }


    function generateICS(eventData) {

        const title = escapeICSText(eventData.title);
        const location = escapeICSText(eventData.location);
        const description =
            escapeICSText(eventData.description);

        return [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Sikin & Aziman//Wedding//EN",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",
            "UID:sikin-aziman-2026@wedding",
            "DTSTAMP:20260912T000000Z",
            "DTSTART:" + eventData.startDate,
            "DTEND:" + eventData.endDate,
            "SUMMARY:" + title,
            "LOCATION:" + location,
            "DESCRIPTION:" + description,
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");
    }


    function downloadICS(filename, content) {

        const blob = new Blob(
            [content],
            {
                type: "text/calendar;charset=utf-8"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
    }


    function addAppleCalendar() {

        const icsContent =
            generateICS(weddingEvent);

        downloadICS(
            "Majlis-Perkahwinan-Sikin-Aziman.ics",
            icsContent
        );
    }


    /* =========================================================
       LOCATION
       ========================================================= */

    const weddingAddress =
        "No 66 Blok 5B Jalan Merak, Felda Nitar 01, 86800 Mersing, Johor, Malaysia";


    /* =========================================================
       GOOGLE MAPS
       ========================================================= */
function openGoogleMaps() {
    const latitude = 2.3807618;
    const longitude = 103.7116231;

    window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
        '_blank'
    );
                          }


    /* =========================================================
       WAZE
       ========================================================= */
function openWaze() {
    const latitude = 2.3807618;
    const longitude = 103.7116231;

    window.open(
        `https://www.waze.com/ul?ll=${latitude}%2C${longitude}&navigate=yes`,
        '_blank'
    );
                          }
  

    /* =========================================================
       CONTACT
       ========================================================= */

    /*
     * Nombor di bawah masih nombor contoh asal.
     *
     * Tukar kepada nombor sebenar apabila sudah ada.
     */

    const contactPhone =
        "+60123456789";


    /* =========================================================
       WHATSAPP
       ========================================================= */

    function openWhatsApp(phoneNumber) {

        const message =
            "Assalamualaikum. Saya ingin bertanyakan sesuatu berkenaan Majlis Perkahwinan Sikin & Aziman.";

        /*
         * Buang simbol +, space dan -
         * supaya nombor sesuai digunakan oleh WhatsApp.
         */

        const cleanPhone =
            String(phoneNumber)
                .replace(/\+/g, "")
                .replace(/\s/g, "")
                .replace(/-/g, "");

        const whatsappUrl =
            "https://wa.me/" +
            cleanPhone +
            "?text=" +
            encodeURIComponent(message);

        window.open(
            whatsappUrl,
            "_blank"
        );
    }


    /* =========================================================
       PHONE CALL
       ========================================================= */

    function makePhoneCall(phoneNumber) {

        window.location.href =
            "tel:" + phoneNumber;
    }


    /* =========================================================
       ANIMATION - REVEAL
       ========================================================= */

    function reveal() {

        const reveals =
            document.querySelectorAll(".reveal");

        for (let i = 0; i < reveals.length; i++) {

            const windowHeight =
                window.innerHeight;

            const elementTop =
                reveals[i]
                    .getBoundingClientRect()
                    .top;

            const elementVisible = 10;

            if (
                elementTop <
                windowHeight - elementVisible
            ) {

                reveals[i]
                    .classList
                    .add("active");

            } else {

                reveals[i]
                    .classList
                    .remove("active");
            }
        }
    }


    window.addEventListener(
        "scroll",
        reveal
    );

    reveal();


    /* =========================================================
       BACKGROUND PETAL ANIMATION
       ========================================================= */

    const petalContainer =
        document.querySelector(".petal-container");

    const maxPetals = 70;
    const petalInterval = 100;


    function createPetal() {

        if (
            !petalContainer ||
            petalContainer.childElementCount >= maxPetals
        ) {
            return;
        }

        const petal =
            document.createElement("div");

        petal.className = "petal";

        const startY =
            Math.random() * 100;

        const duration =
            4 + Math.random() * 2;

        const petalSize =
            5 + Math.random() * 10;

        const petalOpacity =
            0.3 + Math.random() * 0.5;


        petal.style.top =
            startY + "%";

        petal.style.width =
            petalSize + "px";

        petal.style.height =
            petalSize + "px";

        petal.style.opacity =
            petalOpacity;

        petal.style.animationDuration =
            duration + "s";


        const translateX =
            300 + Math.random() * 120;

        const translateY =
            300 + Math.random() * 120;


        petal.style.setProperty(
            "--translate-x",
            translateX + "px"
        );

        petal.style.setProperty(
            "--translate-y",
            translateY + "px"
        );


        petalContainer.appendChild(
            petal
        );


        setTimeout(function () {

            if (petal.parentNode) {

                petal.parentNode.removeChild(
                    petal
                );
            }

        }, duration * 1000);
    }


    setInterval(
        createPetal,
        petalInterval
    );


    /* =========================================================
       TOGGLE MENU
       ========================================================= */

    const toggleButtons = {

        "calendar-btn": "calendar-menu",

        "location-btn": "location-menu",

        "music-btn": "music-menu",

        "rsvp-btn": "rsvp-menu",

        "ucapan-btn": "ucapan-menu",

        "contact-btn": "contact-menu",

        "kehadiran-btn": "rsvp-menu",

        "btn-hadir": "success-menu"
    };


    /* =========================================================
       TOGGLE MENU FUNCTION
       ========================================================= */

    function toggleMenu(
        menuId,
        clickEvent
    ) {

        if (clickEvent) {
            clickEvent.stopPropagation();
        }

        const menu =
            document.getElementById(menuId);

        if (!menu) {
            return;
        }


        if (
            menu.classList.contains("open")
        ) {

            menu.classList.remove(
                "open"
            );

        } else {

            closeAllMenus();

            menu.classList.add(
                "open"
            );
        }
    }


    /* =========================================================
       CLOSE ALL MENUS
       ========================================================= */

    function closeAllMenus() {

        const menuIds =
            Object.values(toggleButtons);


        for (
            const menuId of menuIds
        ) {

            const menu =
                document.getElementById(
                    menuId
                );

            if (
                menu &&
                menu.classList.contains("open")
            ) {

                menu.classList.remove(
                    "open"
                );
            }
        }
    }


    /* =========================================================
       ADD CLICK EVENTS
       ========================================================= */

    for (
        const [buttonId, menuId]
        of Object.entries(toggleButtons)
    ) {

        const button =
            document.getElementById(
                buttonId
            );


        if (!button) {
            continue;
        }


        button.addEventListener(
            "click",
            function (clickEvent) {

                toggleMenu(
                    menuId,
                    clickEvent
                );
            }
        );
    }


    /* =========================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================================================= */

    document.addEventListener(
        "click",
        function () {

            closeAllMenus();
        }
    );


    /* =========================================================
       PREVENT MENU FROM CLOSING
       ========================================================= */

    const menuIds =
        Object.values(toggleButtons);


    for (
        const menuId of menuIds
    ) {

        const menu =
            document.getElementById(
                menuId
            );


        if (!menu) {
            continue;
        }


        menu.addEventListener(
            "click",
            function (clickEvent) {

                clickEvent.stopPropagation();
            }
        );
    }


    /* =========================================================
       CLOSE SPECIFIC MENU
       ========================================================= */

    function closeMenu(menuId) {

        const menu =
            document.getElementById(
                menuId
            );


        if (
            menu &&
            menu.classList.contains("open")
        ) {

            menu.classList.remove(
                "open"
            );
        }
    }


    /* =========================================================
       CLOSE BUTTON - UCAPAN
       ========================================================= */

    const closeButton =
        document.querySelector(
            "#ucapan-menu .tutup"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function (clickEvent) {

                clickEvent.preventDefault();

                clickEvent.stopPropagation();

                closeMenu(
                    "ucapan-menu"
                );
            }
        );
    }


    /* =========================================================
       FORM UCAPAN
       ========================================================= */

    const ucapanForm =
        document.getElementById(
            "form-ucapan"
        );


    if (ucapanForm) {

        ucapanForm.addEventListener(
            "submit",
            function (submitEvent) {

                submitEvent.preventDefault();


                const formData =
                    new FormData(
                        ucapanForm
                    );


                const actionUrl =
                    ucapanForm.action;


                fetch(
                    actionUrl,
                    {
                        method: "POST",
                        body: formData
                    }
                )

                    .then(
                        function (response) {

                            if (response.ok) {

                                return response.text();

                            } else {

                                throw new Error(
                                    "Form submission failed"
                                );
                            }
                        }
                    )

                    .then(
                        function () {

                            const successMenu =
                                document.getElementById(
                                    "success-menu"
                                );


                            if (successMenu) {

                                successMenu.innerHTML =
                                    "<div class='success-message'>" +
                                    "<i class='bx bx-check'></i>" +
                                    "<p>Mesej anda berjaya dihantar!</p>" +
                                    "</div>";


                                successMenu.classList.add(
                                    "open"
                                );
                            }


                            closeMenu(
                                "ucapan-menu"
                            );


                            ucapanForm.reset();
                        }
                    )

                    .catch(
                        function (error) {

                            console.error(
                                "Error:",
                                error
                            );

                            alert(
                                "Maaf, mesej tidak dapat dihantar."
                            );
                        }
                    );
            }
        );
    }


    /* =========================================================
       KEHADIRAN
       ========================================================= */

    function incrementCount(
        endpoint,
        successMessage,
        iconClass,
        closeMenuId
    ) {

        fetch(
            endpoint,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body:
                    "action=increment"
            }
        )

            .then(
                function (response) {

                    if (response.ok) {

                        return response.json();

                    } else {

                        throw new Error(
                            "Request failed"
                        );
                    }
                }
            )

            .then(
                function (data) {

                    if (data.attend) {

                        const successMenu =
                            document.getElementById(
                                "success-menu"
                            );


                        if (successMenu) {

                            successMenu.innerHTML =
                                "<div class='success-message'>" +
                                "<i class='" +
                                iconClass +
                                "'></i>" +
                                "<p>" +
                                successMessage +
                                "</p>" +
                                "</div>";


                            successMenu.classList.add(
                                "open"
                            );
                        }


                        if (closeMenuId) {

                            closeMenu(
                                closeMenuId
                            );
                        }

                    } else {

                        console.error(
                            "Increment count error:",
                            data.error
                        );

                        alert(
                            "Terjadi kesilapan: " +
                            (data.error || "Tidak diketahui")
                        );
                    }
                }
            )

            .catch(
                function (error) {

                    console.error(
                        "AJAX error:",
                        error
                    );

                    alert(
                        "Error processing the request."
                    );
                }
            );
    }


    /* =========================================================
       HADIR
       ========================================================= */

    const btnHadir =
        document.getElementById(
            "btn-hadir"
        );


    if (btnHadir) {

        btnHadir.addEventListener(
            "click",
            function (clickEvent) {

                clickEvent.stopPropagation();

                incrementCount(
                    "count_hadir.php",
                    "Kami menantikan kedatangan anda!",
                    "bx bxs-wink-smile",
                    "rsvp-menu"
                );
            }
        );
    }


    /* =========================================================
       TIDAK HADIR
       ========================================================= */

    const btnTidakHadir =
        document.getElementById(
            "btn-tidak-hadir"
        );


    if (btnTidakHadir) {

        btnTidakHadir.addEventListener(
            "click",
            function (clickEvent) {

                clickEvent.stopPropagation();

                incrementCount(
                    "count_tidak_hadir.php",
                    "Maaf, mungkin lain kali.",
                    "bx bxs-sad",
                    "rsvp-menu"
                );
            }
        );
    }


    /* =========================================================
       EXPOSE FUNCTIONS TO HTML
       =========================================================
       Diperlukan kerana index.html menggunakan:
       
       onclick="addGoogleCalendar()"
       onclick="addAppleCalendar()"
       onclick="openGoogleMaps()"
       onclick="openWaze()"
       onclick="makePhoneCall()"
       onclick="openWhatsApp()"
       ========================================================= */

    window.addGoogleCalendar =
        addGoogleCalendar;

    window.addAppleCalendar =
        addAppleCalendar;

    window.openGoogleMaps =
        openGoogleMaps;

    window.openWaze =
        openWaze;

    window.openWhatsApp =
        openWhatsApp;

    window.makePhoneCall =
        makePhoneCall;


    /* =========================================================
       END
       ========================================================= */

});
