/* =========================================================
   WEDDING OPENING + DOUBLE DOOR OPENING ASAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const weddingOpening = document.querySelector(".wedding-opening");
    const waxSeal = document.querySelector(".wax-seal");
    const doorScreen = document.querySelector(".door-screen");
    const card = document.querySelector(".card");
    const audioPlayer = document.getElementById("audio-player");


    /* =========================================================
       OPEN WEDDING INVITATION
       ========================================================= */

    if (waxSeal) {

        waxSeal.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();


            /* 1. Opening asal hilang */

            if (weddingOpening) {

                weddingOpening.classList.add(
                    "opening-hide"
                );

            }


            /* =====================================================
               PAPARKAN CARD DI BELAKANG PINTU
               ===================================================== */

            if (card) {

                card.style.display = "block";

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

                reveal();

            }


            /* =====================================================
               PAPARKAN PAGE UTAMA DI BELAKANG PINTU
               ===================================================== */

            if (card) {

                card.style.display = "block";

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }


            /* =====================================================
               BUKA DOUBLE DOOR
               ===================================================== */

            setTimeout(function () {

                if (doorScreen) {

                    doorScreen.style.pointerEvents = "auto";

                    doorScreen.classList.add("open");

                }

            }, 650);


            /* =====================================================
               SELEPAS PINTU HABIS BUKA
               ===================================================== */

            setTimeout(function () {

                if (doorScreen) {

                    doorScreen.style.display = "none";

                    doorScreen.style.pointerEvents = "none";

                }

                if (card) {

                    reveal();

                }

                /* MULA PETAL SELEPAS PINTU BUKA */

                startPetals();

            }, 2900);


            /* =====================================================
               PLAY MUSIC
               ===================================================== */

            if (audioPlayer) {

                audioPlayer
                    .play()
                    .catch(function (error) {

                        console.log(
                            "Audio belum boleh dimainkan:",
                            error
                        );

                    });

            }

        });

    }


    /* =========================================================
       PETALS
       ========================================================= */

    let petalsStarted = false;
    let petalTimer = null;


    function createPetal() {

        const container =
            document.querySelector(".petal-container");


        if (!container) {

            console.warn(
                "petal-container tidak dijumpai dalam HTML."
            );

            return;

        }


        const petal =
            document.createElement("div");


        petal.className = "petal";


        /* Kedudukan mula */

        petal.style.left =
            Math.random() * 100 + "vw";

        petal.style.top =
            "-20px";


        /* Saiz */

        const size =
            5 + Math.random() * 10;


        petal.style.width =
            size + "px";

        petal.style.height =
            size + "px";


        /* Opacity */

        petal.style.opacity =
            0.3 + Math.random() * 0.5;


        /* Kelajuan */

        const duration =
            4 + Math.random() * 3;


        petal.style.animationDuration =
            duration + "s";


        petal.style.animationDelay =
            "0s";


        /* Gerakan kiri / kanan */

        petal.style.setProperty(
            "--translate-x",
            (Math.random() * 300 - 150) + "px"
        );


        petal.style.setProperty(
            "--translate-y",
            (300 + Math.random() * 200) + "px"
        );


        /* Tambah petal */

        container.appendChild(petal);


        /* Buang selepas selesai */

        setTimeout(function () {

            if (petal.parentNode) {

                petal.parentNode.removeChild(
                    petal
                );

            }

        }, duration * 1000);

    }


    function startPetals() {

        if (petalsStarted) {

            return;

        }


        petalsStarted = true;


        const container =
            document.querySelector(".petal-container");


        if (!container) {

            console.warn(
                "petal-container tidak dijumpai."
            );

            return;

        }


        /* Petal pertama */

        for (let i = 0; i < 15; i++) {

            setTimeout(function () {

                createPetal();

            }, i * 180);

        }


        /* Petal seterusnya */

        petalTimer = setInterval(function () {

            createPetal();

        }, 350);

    }


    /* =========================================================
       COUNTDOWN
       SIKIN & AZIMAN
       19 DISEMBER 2026
       11:00 PAGI
       MALAYSIA UTC+8
       ========================================================= */

    function setupCountdown() {

        const weddingDate =
            new Date(
                "2026-12-19T11:00:00+08:00"
            ).getTime();


        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;


        function countdown() {

            const now =
                new Date().getTime();


            let gap =
                weddingDate - now;


            if (gap < 0) {

                gap = 0;

            }


            const textDay =
                Math.floor(gap / day);


            const textHour =
                Math.floor(
                    (gap % day) / hour
                );


            const textMinute =
                Math.floor(
                    (gap % hour) / minute
                );


            const textSecond =
                Math.floor(
                    (gap % minute) / second
                );


            const dayElement =
                document.querySelector(
                    ".campaign-0 .day"
                );


            const hourElement =
                document.querySelector(
                    ".campaign-0 .hour"
                );


            const minuteElement =
                document.querySelector(
                    ".campaign-0 .minute"
                );


            const secondElement =
                document.querySelector(
                    ".campaign-0 .second"
                );


            if (dayElement) {

                dayElement.textContent =
                    textDay;

            }


            if (hourElement) {

                hourElement.textContent =
                    textHour;

            }


            if (minuteElement) {

                minuteElement.textContent =
                    textMinute;

            }


            if (secondElement) {

                secondElement.textContent =
                    textSecond;

            }

        }


        countdown();

        setInterval(
            countdown,
            1000
        );

    }


    setupCountdown();


    /* =========================================================
       CALENDAR
       ========================================================= */

    const weddingEvent = {

        title:
            "Majlis Perkahwinan Sikin & Aziman",

        startDate:
            "20261219T030000Z",

        endDate:
            "20261219T080000Z",

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


        const params =
            new URLSearchParams({

                text: eventData.title,

                dates:
                    eventData.startDate +
                    "/" +
                    eventData.endDate,

                details:
                    eventData.description,

                location:
                    eventData.location

            });


        return (
            baseUrl +
            "&" +
            params.toString()
        );

    }


    function addGoogleCalendar() {

        const googleLink =
            generateGoogleCalendarLink(
                weddingEvent
            );


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

        const title =
            escapeICSText(
                eventData.title
            );


        const location =
            escapeICSText(
                eventData.location
            );


        const description =
            escapeICSText(
                eventData.description
            );


        return [

            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Sikin & Aziman//Wedding//EN",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",

            "UID:sikin-aziman-2026@wedding",

            "DTSTAMP:20260913T000000Z",

            "DTSTART:" +
            eventData.startDate,

            "DTEND:" +
            eventData.endDate,

            "SUMMARY:" +
            title,

            "LOCATION:" +
            location,

            "DESCRIPTION:" +
            description,

            "END:VEVENT",
            "END:VCALENDAR"

        ].join("\r\n");

    }


    function downloadICS(
        filename,
        content
    ) {

        const blob =
            new Blob(
                [content],
                {
                    type:
                        "text/calendar;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            filename;


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        setTimeout(function () {

            URL.revokeObjectURL(
                url
            );

        }, 1000);

    }


    function addAppleCalendar() {

        const icsContent =
            generateICS(
                weddingEvent
            );


        downloadICS(
            "Majlis-Perkahwinan-Sikin-Aziman.ics",
            icsContent
        );

    }


    /* =========================================================
       GOOGLE MAPS
       ========================================================= */

    function openGoogleMaps() {

        const latitude = 2.3807618;
        const longitude = 103.7116231;


        window.open(
            "https://www.google.com/maps/dir/?api=1&destination=" +
            latitude +
            "," +
            longitude,
            "_blank"
        );

    }


    /* =========================================================
       WAZE
       ========================================================= */

    function openWaze() {

        const latitude = 2.3807618;
        const longitude = 103.7116231;


        window.open(
            "https://www.waze.com/ul?ll=" +
            latitude +
            "%2C" +
            longitude +
            "&navigate=yes",
            "_blank"
        );

    }


    /* =========================================================
       WHATSAPP
       ========================================================= */

    function openWhatsApp(phoneNumber) {

        const message =
            "Assalamualaikum. Saya ingin bertanyakan sesuatu berkenaan Majlis Perkahwinan Sikin & Aziman.";


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
       PHONE
       ========================================================= */

    function makePhoneCall(phoneNumber) {

        window.location.href =
            "tel:" +
            phoneNumber;

    }


    /* =========================================================
       REVEAL
       ========================================================= */

    function reveal() {

        const reveals =
            document.querySelectorAll(".reveal");


        for (
            let i = 0;
            i < reveals.length;
            i++
        ) {

            const windowHeight =
                window.innerHeight;


            const elementTop =
                reveals[i]
                    .getBoundingClientRect()
                    .top;


            const elementVisible = 10;


            if (
                elementTop <
                windowHeight -
                elementVisible
            ) {

                reveals[i]
                    .classList
                    .add("active");

            }

        }

    }


    window.addEventListener(
        "scroll",
        reveal
    );


    reveal();


    /* =========================================================
       PETALS
       ========================================================= */

    const petalContainer =
        document.querySelector(
            ".petal-container"
        );


    const maxPetals = 70;
    const petalInterval = 100;


    function createPetalOriginal() {

        if (
            !petalContainer ||
            petalContainer.childElementCount >= maxPetals
        ) {

            return;

        }


        const petal =
            document.createElement("div");


        petal.className = "petal";


        petal.style.top =
            Math.random() * 100 + "%";


        const duration =
            4 + Math.random() * 2;


        const petalSize =
            5 + Math.random() * 10;


        petal.style.width =
            petalSize + "px";


        petal.style.height =
            petalSize + "px";


        petal.style.opacity =
            0.3 + Math.random() * 0.5;


        petal.style.animationDuration =
            duration + "s";


        petal.style.setProperty(
            "--translate-x",
            300 + Math.random() * 120 + "px"
        );


        petal.style.setProperty(
            "--translate-y",
            300 + Math.random() * 120 + "px"
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
        createPetalOriginal,
        petalInterval
    );


    /* =========================================================
       TOGGLE MENU
       ========================================================= */

    const toggleButtons = {

        "calendar-btn":
            "calendar-menu",

        "location-btn":
            "location-menu",

        "music-btn":
            "music-menu",

        "rsvp-btn":
            "rsvp-menu",

        "ucapan-btn":
            "ucapan-menu",

        "contact-btn":
            "contact-menu",

        "kehadiran-btn":
            "rsvp-menu",

        "btn-hadir":
            "success-menu"

    };


    function closeAllMenus() {

        const menuIds =
            [
                ...new Set(
                    Object.values(
                        toggleButtons
                    )
                )
            ];


        menuIds.forEach(
            function (menuId) {

                const menu =
                    document.getElementById(
                        menuId
                    );


                if (menu) {

                    menu.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    function toggleMenu(
        menuId,
        clickEvent
    ) {

        if (clickEvent) {

            clickEvent.stopPropagation();

        }


        const menu =
            document.getElementById(
                menuId
            );


        if (!menu) {

            return;

        }


        const isOpen =
            menu.classList.contains(
                "open"
            );


        closeAllMenus();


        if (!isOpen) {

            menu.classList.add(
                "open"
            );

        }

    }


    Object.entries(
        toggleButtons
    ).forEach(
        function ([buttonId, menuId]) {

            const button =
                document.getElementById(
                    buttonId
                );


            if (!button) {

                return;

            }


            button.addEventListener(
                "click",
                function (event) {

                    toggleMenu(
                        menuId,
                        event
                    );

                }
            );

        }
    );


    document.addEventListener(
        "click",
        function () {

            closeAllMenus();

        }
    );


    document
        .querySelectorAll(".toggle-menu")
        .forEach(
            function (menu) {

                menu.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                    }
                );

            }
        );


    /* =========================================================
       CLOSE UCAPAN
       ========================================================= */

   /* =========================================================
   CLOSE BUTTON X SEMUA MENU
   ========================================================= */

document
    .querySelectorAll(".menu-close")
    .forEach(function (closeButton) {

        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const menuId =
                    closeButton.getAttribute(
                        "data-close"
                    );

                if (menuId) {

                    const menu =
                        document.getElementById(
                            menuId
                        );

                    if (menu) {

                        menu.classList.remove(
                            "open"
                        );

                    }

                }

            }
        );

    });


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
            function (event) {

                event.preventDefault();


                const formData =
                    new FormData(
                        ucapanForm
                    );


                fetch(
                    ucapanForm.action,
                    {
                        method: "POST",
                        body: formData
                    }
                )

                .then(
                    function (response) {

                        if (!response.ok) {

                            throw new Error(
                                "Form submission failed"
                            );

                        }


                        return response.text();

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
                                "<div class='success-box'>" +
                                "<i class='bx bx-check-circle'></i>" +
                                "<h2>Terima Kasih</h2>" +
                                "<p>Mesej anda berjaya dihantar!</p>" +
                                "</div>";


                            closeAllMenus();


                            successMenu.classList.add(
                                "open"
                            );

                        }


                        ucapanForm.reset();

                    }
                )

                .catch(
                    function (error) {

                        console.error(
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

                if (!response.ok) {

                    throw new Error(
                        "Request failed"
                    );

                }


                return response.json();

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
                            "<div class='success-box'>" +
                            "<i class='" +
                            iconClass +
                            "'></i>" +
                            "<h2>Terima Kasih</h2>" +
                            "<p>" +
                            successMessage +
                            "</p>" +
                            "</div>";


                        closeAllMenus();


                        successMenu.classList.add(
                            "open"
                        );

                    }


                    if (closeMenuId) {

                        const menu =
                            document.getElementById(
                                closeMenuId
                            );


                        if (menu) {

                            menu.classList.remove(
                                "open"
                            );

                        }

                    }

                } else {

                    console.error(
                        data.error
                    );


                    alert(
                        "Terjadi kesilapan: " +
                        (
                            data.error ||
                            "Tidak diketahui"
                        )
                    );

                }

            }
        )

        .catch(
            function (error) {

                console.error(
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
            function (event) {

                event.stopPropagation();


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
            function (event) {

                event.stopPropagation();


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
       EXPOSE FUNCTIONS
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

});
