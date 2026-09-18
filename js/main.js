/* =========================================================
   SIKIN & AZIMAN — WEDDING INVITATION
   main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const videoIntro =
        document.getElementById("videoIntro");

    const openingVideo =
        document.getElementById("openingVideo");

    const weddingOpening =
        document.getElementById("wedding-opening");

    const waxSeal =
        document.getElementById("open-invitation-btn");

    const doorScreen =
        document.getElementById("doorScreen");

    const card =
        document.getElementById("wedding-card");

    const audioPlayer =
        document.getElementById("audio-player");

    const petalContainer =
        document.querySelector(".petal-container");


    /* =====================================================
       SETTINGS
       ===================================================== */

    const VIDEO_START = 0;
    const VIDEO_DURATION = 11000;

    const MAX_PETALS = 45;
    const PETAL_INTERVAL = 450;

    const WEDDING_DATE =
        new Date("2026-12-19T11:00:00+08:00");


    /* =====================================================
       STATE
       ===================================================== */

    let openingShown = false;
    let invitationOpened = false;

    let petalsStarted = false;
    let petalTimer = null;


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    if (card) {
        card.style.display = "none";
    }

    if (doorScreen) {
        doorScreen.style.pointerEvents = "none";
    }

    if (videoIntro) {
        videoIntro.classList.remove("hide");
        videoIntro.style.opacity = "1";
        videoIntro.style.visibility = "visible";
        videoIntro.style.pointerEvents = "auto";
        videoIntro.style.zIndex = "20000";
    }

    if (weddingOpening) {
        weddingOpening.classList.remove("show");
        weddingOpening.classList.remove("opening-hide");

        weddingOpening.style.opacity = "0";
        weddingOpening.style.visibility = "hidden";
        weddingOpening.style.pointerEvents = "none";
    }


    /* =====================================================
       VIDEO INTRO + MUSIC
       VIDEO BERMAIN DAHULU SELAMA 11 SAAT
       ===================================================== */

    function showWeddingOpening() {

        if (openingShown) {
            return;
        }

        openingShown = true;


        /* -----------------------------------------
           Hentikan video
           ----------------------------------------- */

        if (openingVideo) {
            openingVideo.pause();
        }


        /* -----------------------------------------
           Hilangkan VIDEO sepenuhnya
           ----------------------------------------- */

        if (videoIntro) {

            videoIntro.classList.add("hide");

            videoIntro.style.opacity = "0";
            videoIntro.style.visibility = "hidden";
            videoIntro.style.pointerEvents = "none";

        }


        /* -----------------------------------------
           PAPARKAN OPENING
           ----------------------------------------- */

        if (weddingOpening) {

            weddingOpening.classList.remove(
                "opening-hide"
            );

            weddingOpening.classList.add(
                "show"
            );


            /* -------------------------------------
               PAKSA OPENING KELUAR
               UNTUK TELEFON & DESKTOP
               ------------------------------------- */

            weddingOpening.style.opacity = "1";
            weddingOpening.style.visibility = "visible";
            weddingOpening.style.pointerEvents = "auto";
            weddingOpening.style.zIndex = "11000";

        }

    }


    /* =====================================================
       MULAKAN LAGU
       ===================================================== */

    function startMusicAtBeginning() {

        if (!audioPlayer) {
            return;
        }


        audioPlayer.loop = true;
        audioPlayer.volume = 0.8;


        /* -----------------------------------------
           Lagu mula dari awal
           ----------------------------------------- */

        try {

            audioPlayer.currentTime = 0;

        }

        catch (error) {

            console.log(
                "Tidak dapat set audio ke 0:",
                error
            );

        }


        /* -----------------------------------------
           Cuba autoplay lagu
           ----------------------------------------- */

        audioPlayer.play()
            .catch(error => {

                console.log(
                    "Autoplay audio disekat browser:",
                    error
                );

            });

    }


    /* =====================================================
       FALLBACK AUDIO
       JIKA BROWSER BLOCK AUTOPLAY
       ===================================================== */

    document.addEventListener(
        "pointerdown",
        () => {

            if (
                audioPlayer &&
                audioPlayer.paused
            ) {

                audioPlayer.play()
                    .catch(() => {});

            }

        },
        {
            once: true
        }
    );


    /* =====================================================
       MULAKAN VIDEO
       ===================================================== */

    function startOpeningVideo() {

        if (openingVideo) {

            try {

                openingVideo.currentTime =
                    VIDEO_START;

            }

            catch (error) {

                console.log(
                    "Tidak dapat set video ke 0 saat:",
                    error
                );

            }


            openingVideo.muted = true;
            openingVideo.playsInline = true;
            openingVideo.loop = false;


            const playVideo = () => {

                openingVideo.play()
                    .catch(error => {

                        console.log(
                            "Autoplay video tidak dibenarkan:",
                            error
                        );

                    });

            };


            if (
                openingVideo.readyState >= 2
            ) {

                playVideo();

            }

            else {

                openingVideo.addEventListener(
                    "loadeddata",
                    playVideo,
                    {
                        once: true
                    }
                );

            }

        }


        /* -----------------------------------------
           LAGU MULA SEKARANG
           BUKAN MASA TEKAN BUKA
           ----------------------------------------- */

        startMusicAtBeginning();


        /* -----------------------------------------
           TEPAT 11 SAAT
           VIDEO HILANG
           OPENING MUNCUL
           ----------------------------------------- */

        setTimeout(() => {

            showWeddingOpening();

        }, VIDEO_DURATION);

    }


    /* =====================================================
       START VIDEO + MUSIC
       ===================================================== */

    startOpeningVideo();


    /* =====================================================
       OPEN INVITATION
       ===================================================== */

    if (waxSeal) {

        waxSeal.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                if (invitationOpened) {
                    return;
                }

                invitationOpened = true;


                /* -----------------------------------------
                   Pastikan video berhenti
                   ----------------------------------------- */

                if (openingVideo) {
                    openingVideo.pause();
                }


                /* -----------------------------------------
                   Hilangkan video sepenuhnya
                   ----------------------------------------- */

                if (videoIntro) {

                    videoIntro.classList.add(
                        "hide"
                    );

                    videoIntro.style.opacity =
                        "0";

                    videoIntro.style.visibility =
                        "hidden";

                    videoIntro.style.pointerEvents =
                        "none";

                }


                /* -----------------------------------------
                   Paparkan card
                   ----------------------------------------- */

                if (card) {

                    card.style.display =
                        "block";

                    window.scrollTo({
                        top: 0,
                        behavior: "auto"
                    });

                }


                /* -----------------------------------------
                   Hilangkan opening
                   ----------------------------------------- */

                if (weddingOpening) {

                    weddingOpening.classList.remove(
                        "show"
                    );

                    weddingOpening.classList.add(
                        "opening-hide"
                    );

                    weddingOpening.style.opacity =
                        "0";

                    weddingOpening.style.visibility =
                        "hidden";

                    weddingOpening.style.pointerEvents =
                        "none";

                }


                /* -----------------------------------------
                   Buka double door
                   ----------------------------------------- */

                setTimeout(() => {

                    if (doorScreen) {

                        doorScreen.style.pointerEvents =
                            "auto";

                        doorScreen.classList.add(
                            "open"
                        );

                    }

                }, 500);


                /* -----------------------------------------
                   Selepas pintu selesai buka
                   ----------------------------------------- */

                setTimeout(() => {

                    if (doorScreen) {

                        doorScreen.style.display =
                            "none";

                        doorScreen.style.pointerEvents =
                            "none";

                    }


                    reveal();

                    startPetals();

                }, 2600);

            }
        );

    }


    /* =====================================================
       PETALS
       ===================================================== */

    function createPetal() {

        if (!petalContainer) {
            return;
        }


        if (
            petalContainer.childElementCount >=
            MAX_PETALS
        ) {
            return;
        }


        const petal =
            document.createElement("div");


        petal.className =
            "petal";


        /* -----------------------------------------
           Posisi
           ----------------------------------------- */

        petal.style.left =
            Math.random() * 100 + "vw";

        petal.style.top =
            "-20px";


        /* -----------------------------------------
           Saiz
           ----------------------------------------- */

        const size =
            5 + Math.random() * 9;

        petal.style.width =
            size + "px";

        petal.style.height =
            size + "px";


        /* -----------------------------------------
           Opacity
           ----------------------------------------- */

        petal.style.opacity =
            0.3 + Math.random() * 0.5;


        /* -----------------------------------------
           Duration
           ----------------------------------------- */

        const duration =
            5 + Math.random() * 4;

        petal.style.animationDuration =
            duration + "s";


        /* -----------------------------------------
           Gerakan
           ----------------------------------------- */

        petal.style.setProperty(
            "--translate-x",
            (Math.random() * 300 - 150) + "px"
        );

        petal.style.setProperty(
            "--translate-y",
            (350 + Math.random() * 250) + "px"
        );


        petalContainer.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, duration * 1000);

    }


    function startPetals() {

        if (
            petalsStarted ||
            !petalContainer
        ) {
            return;
        }


        petalsStarted = true;


        /* -----------------------------------------
           Petal awal
           ----------------------------------------- */

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            setTimeout(() => {

                createPetal();

            }, i * 180);

        }


        /* -----------------------------------------
           Petal berterusan
           ----------------------------------------- */

        petalTimer =
            setInterval(
                createPetal,
                PETAL_INTERVAL
            );

    }


    /* =====================================================
       COUNTDOWN
       ===================================================== */

    function setupCountdown() {

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


        function updateCountdown() {

            const now =
                new Date();


            let gap =
                WEDDING_DATE.getTime() -
                now.getTime();


            if (gap < 0) {
                gap = 0;
            }


            const day =
                Math.floor(
                    gap /
                    (1000 * 60 * 60 * 24)
                );


            const hour =
                Math.floor(
                    (
                        gap %
                        (1000 * 60 * 60 * 24)
                    ) /
                    (1000 * 60 * 60)
                );


            const minute =
                Math.floor(
                    (
                        gap %
                        (1000 * 60 * 60)
                    ) /
                    (1000 * 60)
                );


            const second =
                Math.floor(
                    (
                        gap %
                        (1000 * 60)
                    ) /
                    1000
                );


            if (dayElement) {

                dayElement.textContent =
                    day;

            }


            if (hourElement) {

                hourElement.textContent =
                    String(hour)
                        .padStart(2, "0");

            }


            if (minuteElement) {

                minuteElement.textContent =
                    String(minute)
                        .padStart(2, "0");

            }


            if (secondElement) {

                secondElement.textContent =
                    String(second)
                        .padStart(2, "0");

            }

        }


        updateCountdown();


        setInterval(
            updateCountdown,
            1000
        );

    }


    setupCountdown();


    /* =====================================================
       CALENDAR DATA
       ===================================================== */

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


    /* =====================================================
       GOOGLE CALENDAR
       ===================================================== */

    function addGoogleCalendar() {

        const baseUrl =
            "https://calendar.google.com/calendar/render?action=TEMPLATE";


        const params =
            new URLSearchParams({

                text:
                    weddingEvent.title,

                dates:
                    weddingEvent.startDate +
                    "/" +
                    weddingEvent.endDate,

                details:
                    weddingEvent.description,

                location:
                    weddingEvent.location

            });


        window.open(
            baseUrl +
            "&" +
            params.toString(),
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* =====================================================
       APPLE CALENDAR / ICS
       ===================================================== */

    function escapeICSText(text) {

        return String(text)
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");

    }


    function getICSDate(date) {

        return date
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, "");

    }


    function generateICS() {

        const now =
            getICSDate(
                new Date()
            );


        return [

            "BEGIN:VCALENDAR",

            "VERSION:2.0",

            "PRODID:-//Sikin & Aziman//Wedding//MS",

            "CALSCALE:GREGORIAN",

            "METHOD:PUBLISH",

            "BEGIN:VEVENT",

            "UID:sikin-aziman-wedding-2026@example.com",

            "DTSTAMP:" +
            now,

            "DTSTART:" +
            weddingEvent.startDate,

            "DTEND:" +
            weddingEvent.endDate,

            "SUMMARY:" +
            escapeICSText(
                weddingEvent.title
            ),

            "LOCATION:" +
            escapeICSText(
                weddingEvent.location
            ),

            "DESCRIPTION:" +
            escapeICSText(
                weddingEvent.description
            ),

            "END:VEVENT",

            "END:VCALENDAR"

        ].join("\r\n");

    }


    function addAppleCalendar() {

        const blob =
            new Blob(
                [
                    generateICS()
                ],
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
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "Majlis-Perkahwinan-Sikin-Aziman.ics";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(() => {

            URL.revokeObjectURL(
                url
            );

        }, 1000);

    }


    /* =====================================================
       GOOGLE MAPS
       ===================================================== */

    function openGoogleMaps() {

        const address =
            "No 66 Blok 5B Jalan Merak, Felda Nitar 01, 86800 Mersing, Johor, Malaysia";


        const url =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURIComponent(
                address
            );


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* =====================================================
       WAZE
       ===================================================== */

    function openWaze() {

        const latitude =
            2.3807618;

        const longitude =
            103.7116231;


        const url =
            "https://www.waze.com/ul?ll=" +
            latitude +
            "%2C" +
            longitude +
            "&navigate=yes";


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* =====================================================
       WHATSAPP
       ===================================================== */

    function openWhatsApp(
        phoneNumber
    ) {

        const message =
            "Assalamualaikum. Saya ingin bertanyakan sesuatu berkenaan Majlis Perkahwinan Sikin & Aziman.";


        const cleanPhone =
            String(phoneNumber)
                .replace(
                    /\D/g,
                    ""
                );


        let whatsappPhone =
            cleanPhone;


        if (
            whatsappPhone.startsWith(
                "0"
            )
        ) {

            whatsappPhone =
                "60" +
                whatsappPhone.substring(
                    1
                );

        }


        const url =
            "https://wa.me/" +
            whatsappPhone +
            "?text=" +
            encodeURIComponent(
                message
            );


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* =====================================================
       PHONE
       ===================================================== */

    function makePhoneCall(
        phoneNumber
    ) {

        window.location.href =
            "tel:" +
            phoneNumber;

    }


    /* =====================================================
       REVEAL ON SCROLL
       ===================================================== */

    function reveal() {

        const reveals =
            document.querySelectorAll(
                ".reveal"
            );


        const windowHeight =
            window.innerHeight;


        reveals.forEach(
            element => {

                const elementTop =
                    element
                        .getBoundingClientRect()
                        .top;


                if (
                    elementTop <
                    windowHeight - 50
                ) {

                    element.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        reveal,
        {
            passive: true
        }
    );


    reveal();


    /* =====================================================
       MENU SYSTEM
       ===================================================== */

    const menuMap = {

        "calendar-btn":
            "calendar-menu",

        "location-btn":
            "location-menu",

        "music-btn":
            "music-menu",

        "rsvp-btn":
            "rsvp-menu",

        "contact-btn":
            "contact-menu",

        "ucapan-btn":
            "ucapan-menu",

        "kehadiran-btn":
            "rsvp-menu"

    };


    function getMenus() {

        return document.querySelectorAll(
            ".toggle-menu"
        );

    }


    function closeAllMenus() {

        getMenus().forEach(
            menu => {

                menu.classList.remove(
                    "open"
                );

            }
        );

    }


    function openMenu(
        menuId
    ) {

        const menu =
            document.getElementById(
                menuId
            );


        if (!menu) {
            return;
        }


        closeAllMenus();


        menu.classList.add(
            "open"
        );

    }


    Object.entries(
        menuMap
    )
    .forEach(
        ([buttonId, menuId]) => {

            const button =
                document.getElementById(
                    buttonId
                );


            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    const menu =
                        document.getElementById(
                            menuId
                        );


                    if (
                        menu &&
                        menu.classList.contains(
                            "open"
                        )
                    ) {

                        menu.classList.remove(
                            "open"
                        );

                    }

                    else {

                        openMenu(
                            menuId
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       KLIK LUAR MENU
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".toggle-menu"
                )
            ) {
                return;
            }


            if (
                event.target.closest(
                    ".menu"
                )
            ) {
                return;
            }


            closeAllMenus();

        }
    );


    /* =====================================================
       STOP PROPAGATION DALAM MENU
       ===================================================== */

    getMenus().forEach(
        menu => {

            menu.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                }
            );

        }
    );


    /* =====================================================
       CLOSE BUTTONS
       ===================================================== */

    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();


                        const menuId =
                            button.dataset.close;


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
        );


    /* =====================================================
       FORM UCAPAN
       ===================================================== */

    const ucapanForm =
        document.getElementById(
            "form-ucapan"
        );


    if (ucapanForm) {

        ucapanForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const submitButton =
                    ucapanForm.querySelector(
                        ".hantar"
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                }


                try {

                    const formData =
                        new FormData(
                            ucapanForm
                        );


                    const response =
                        await fetch(
                            ucapanForm.action,
                            {
                                method:
                                    "POST",

                                body:
                                    formData
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Gagal menghantar ucapan."
                        );

                    }


                    ucapanForm.reset();


                    showSuccess(
                        "Mesej anda berjaya dihantar!",
                        "bx bx-check-circle"
                    );

                }

                catch (error) {

                    console.error(
                        error
                    );


                    alert(
                        "Maaf, mesej tidak dapat dihantar. Sila cuba lagi."
                    );

                }

                finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                    }

                }

            }
        );

    }


    /* =====================================================
       SUCCESS MENU
       ===================================================== */

    function showSuccess(
        message,
        icon = "bx bx-check-circle"
    ) {

        const successMenu =
            document.getElementById(
                "success-menu"
            );


        if (!successMenu) {
            return;
        }


        const successBox =
            successMenu.querySelector(
                ".success-box"
            );


        if (!successBox) {
            return;
        }


        const iconElement =
            successBox.querySelector(
                "i"
            );


        const messageElement =
            successBox.querySelector(
                "p"
            );


        if (iconElement) {

            iconElement.className =
                icon;

        }


        if (messageElement) {

            messageElement.textContent =
                message;

        }


        closeAllMenus();


        successMenu.classList.add(
            "open"
        );

    }


    /* =====================================================
       RSVP
       ===================================================== */

    async function submitAttendance(
        endpoint,
        successMessage,
        icon
    ) {

        try {

            const response =
                await fetch(
                    endpoint,
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded"
                        },

                        body:
                            "action=increment"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Server error"
                );

            }


            const data =
                await response.json();


            if (
                data &&
                data.attend
            ) {

                showSuccess(
                    successMessage,
                    icon
                );

                return;

            }


            throw new Error(
                data?.error ||
                "Respons tidak sah."
            );

        }

        catch (error) {

            console.error(
                error
            );


            alert(
                "Maaf, terdapat masalah ketika menghantar kehadiran. Sila cuba lagi."
            );

        }

    }


    const btnHadir =
        document.getElementById(
            "btn-hadir"
        );


    if (btnHadir) {

        btnHadir.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                submitAttendance(
                    "count_hadir.php",
                    "Kami menantikan kedatangan anda!",
                    "bx bxs-wink-smile"
                );

            }
        );

    }


    const btnTidakHadir =
        document.getElementById(
            "btn-tidak-hadir"
        );


    if (btnTidakHadir) {

        btnTidakHadir.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                submitAttendance(
                    "count_tidak_hadir.php",
                    "Terima kasih kerana memaklumkan kepada kami.",
                    "bx bxs-sad"
                );

            }
        );

    }


    /* =====================================================
       MUSIC
       ===================================================== */

    const musicButton =
        document.getElementById(
            "music-btn"
        );


    if (
        musicButton &&
        audioPlayer
    ) {

        audioPlayer.addEventListener(
            "play",
            () => {

                musicButton
                    .querySelector("i")
                    ?.classList.replace(
                        "bx-music",
                        "bx-volume-full"
                    );

            }
        );


        audioPlayer.addEventListener(
            "pause",
            () => {

                musicButton
                    .querySelector("i")
                    ?.classList.replace(
                        "bx-volume-full",
                        "bx-music"
                    );

            }
        );

    }


    /* =====================================================
       EXPOSE GLOBAL FUNCTIONS
       ===================================================== */

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
