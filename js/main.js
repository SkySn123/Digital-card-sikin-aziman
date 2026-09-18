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

    let musicStarted = false;

    let petalsStarted = false;
    let petalTimer = null;


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    if (card) {

        card.style.display = "none";
        card.style.visibility = "hidden";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";

    }


    if (doorScreen) {

        doorScreen.style.display = "none";
        doorScreen.style.visibility = "hidden";
        doorScreen.style.opacity = "0";
        doorScreen.style.pointerEvents = "none";
        doorScreen.style.zIndex = "-1";

    }


    if (videoIntro) {

        videoIntro.classList.remove("hide");

        videoIntro.style.display = "flex";
        videoIntro.style.opacity = "1";
        videoIntro.style.visibility = "visible";
        videoIntro.style.pointerEvents = "auto";
        videoIntro.style.zIndex = "20000";

    }


    if (weddingOpening) {

        weddingOpening.classList.remove("show");
        weddingOpening.classList.remove("opening-hide");

        weddingOpening.style.display = "flex";
        weddingOpening.style.opacity = "0";
        weddingOpening.style.visibility = "hidden";
        weddingOpening.style.pointerEvents = "none";
        weddingOpening.style.zIndex = "11000";

    }


    /* =====================================================
       VIDEO INTRO → OPENING
       SELEPAS 11 SAAT
       ===================================================== */

    function showWeddingOpening() {

        if (openingShown) {
            return;
        }

        openingShown = true;


        /* -----------------------------------------
           STOP VIDEO
           ----------------------------------------- */

        if (openingVideo) {

            try {

                openingVideo.pause();

            }

            catch (error) {

                console.log(
                    "Video gagal dihentikan:",
                    error
                );

            }

        }


        /* -----------------------------------------
           HILANGKAN VIDEO
           ----------------------------------------- */

        if (videoIntro) {

            videoIntro.classList.add("hide");

            videoIntro.style.display = "none";
            videoIntro.style.opacity = "0";
            videoIntro.style.visibility = "hidden";
            videoIntro.style.pointerEvents = "none";
            videoIntro.style.zIndex = "-1";

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

            weddingOpening.style.display = "flex";
            weddingOpening.style.opacity = "1";
            weddingOpening.style.visibility = "visible";
            weddingOpening.style.pointerEvents = "auto";
            weddingOpening.style.zIndex = "11000";

        }

    }


    /* =====================================================
       MUSIC
       AUTOPLAY + FALLBACK
       ===================================================== */

    function startMusic() {

        if (
            !audioPlayer ||
            musicStarted
        ) {
            return;
        }


        audioPlayer.loop = true;
        audioPlayer.volume = 0.8;


        /* -----------------------------------------
           MULA DARI 0:00
           ----------------------------------------- */

        try {

            audioPlayer.currentTime = 0;

        }

        catch (error) {

            console.log(
                "Tidak dapat set lagu ke 0:",
                error
            );

        }


        /* -----------------------------------------
           CUBA PLAY
           ----------------------------------------- */

        const playPromise =
            audioPlayer.play();


        if (
            playPromise &&
            typeof playPromise.then === "function"
        ) {

            playPromise
                .then(() => {

                    musicStarted = true;

                    console.log(
                        "🎵 Muzik berjaya dimainkan."
                    );

                })
                .catch(error => {

                    /*
                     * Browser mungkin menyekat
                     * autoplay audio.
                     *
                     * Ini normal.
                     *
                     * Kita akan cuba semula apabila
                     * user melakukan interaksi.
                     */

                    console.log(
                        "Autoplay muzik disekat browser. Menunggu interaksi user.",
                        error
                    );

                });

        }

        else {

            /*
             * Sesetengah browser tidak
             * mengembalikan Promise.
             */

            if (!audioPlayer.paused) {

                musicStarted = true;

            }

        }

    }


    /* =====================================================
       MUSIC FALLBACK
       FIRST USER INTERACTION
       ===================================================== */

    function startMusicAfterInteraction() {

        if (musicStarted) {
            return;
        }

        startMusic();

    }


    /*
     * Jangan gunakan { once: true }.
     *
     * Jika browser masih belum membenarkan
     * audio pada interaksi pertama, kita masih
     * mahu mencuba pada interaksi seterusnya.
     */

    document.addEventListener(
        "pointerdown",
        startMusicAfterInteraction,
        {
            passive: true
        }
    );


    /* =====================================================
       START VIDEO
       ===================================================== */

    function startOpeningVideo() {

        if (openingVideo) {

            openingVideo.muted = true;
            openingVideo.playsInline = true;
            openingVideo.loop = false;


            /* -----------------------------------------
               VIDEO MULA DARI 0
               ----------------------------------------- */

            try {

                openingVideo.currentTime =
                    VIDEO_START;

            }

            catch (error) {

                console.log(
                    "Tidak dapat set video:",
                    error
                );

            }


            /* -----------------------------------------
               PLAY VIDEO
               ----------------------------------------- */

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
           CUBA AUTOPLAY MUSIC
           Jika disekat browser,
           pointerdown akan cuba semula.
           ----------------------------------------- */

        startMusic();


        /* -----------------------------------------
           SELEPAS 11 SAAT → OPENING
           ----------------------------------------- */

        setTimeout(
            showWeddingOpening,
            VIDEO_DURATION
        );

    }


    startOpeningVideo();


    /* =====================================================
       OPEN INVITATION
       ===================================================== */

    function openInvitation() {

        if (invitationOpened) {
            return;
        }

        invitationOpened = true;


        /* -----------------------------------------
           STOP VIDEO
           ----------------------------------------- */

        if (openingVideo) {

            try {

                openingVideo.pause();

            }

            catch (error) {

                console.log(
                    "Video gagal dihentikan:",
                    error
                );

            }

        }


        /* -----------------------------------------
           HILANGKAN VIDEO
           ----------------------------------------- */

        if (videoIntro) {

            videoIntro.classList.add("hide");

            videoIntro.style.display = "none";
            videoIntro.style.opacity = "0";
            videoIntro.style.visibility = "hidden";
            videoIntro.style.pointerEvents = "none";
            videoIntro.style.zIndex = "-1";

        }


        /* -----------------------------------------
           PAPARKAN CARD
           ----------------------------------------- */

        if (card) {

            card.style.display = "block";
            card.style.visibility = "visible";
            card.style.opacity = "1";
            card.style.pointerEvents = "auto";
            card.style.zIndex = "1";

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

        }


        /* -----------------------------------------
           HILANGKAN OPENING
           ----------------------------------------- */

        if (weddingOpening) {

            weddingOpening.classList.remove(
                "show"
            );

            weddingOpening.classList.add(
                "opening-hide"
            );

            weddingOpening.style.display = "none";
            weddingOpening.style.opacity = "0";
            weddingOpening.style.visibility = "hidden";
            weddingOpening.style.pointerEvents = "none";
            weddingOpening.style.zIndex = "-1";

        }


        /* -----------------------------------------
           DOUBLE DOOR
           ----------------------------------------- */

        if (doorScreen) {

            doorScreen.style.display = "flex";
            doorScreen.style.visibility = "visible";
            doorScreen.style.opacity = "1";
            doorScreen.style.pointerEvents = "none";
            doorScreen.style.zIndex = "10500";

        }


        /* -----------------------------------------
           MULAKAN ANIMASI PINTU
           ----------------------------------------- */

        setTimeout(() => {

            if (doorScreen) {

                doorScreen.classList.add(
                    "open"
                );

            }

        }, 100);


        /* -----------------------------------------
           SELEPAS PINTU SELESAI
           ----------------------------------------- */

        setTimeout(() => {

            if (doorScreen) {

                doorScreen.classList.remove(
                    "open"
                );

                doorScreen.style.display = "none";
                doorScreen.style.visibility = "hidden";
                doorScreen.style.opacity = "0";
                doorScreen.style.pointerEvents = "none";
                doorScreen.style.zIndex = "-1";

            }


            /* -------------------------------------
               PASTIKAN CARD AKTIF
               ------------------------------------- */

            if (card) {

                card.style.display = "block";
                card.style.visibility = "visible";
                card.style.opacity = "1";
                card.style.pointerEvents = "auto";

            }


            /* -------------------------------------
               AKTIFKAN MENU BAWAH
               HANYA SELEPAS PINTU SELESAI
               ------------------------------------- */

            enableBottomMenu();


            /* -------------------------------------
               REVEAL
               ------------------------------------- */

            reveal();


            /* -------------------------------------
               PETALS
               ------------------------------------- */

            startPetals();

        }, 2500);

    }


    /* =====================================================
       WAX SEAL BUTTON
       GUNA CLICK SAHAJA
       ===================================================== */

    if (waxSeal) {

        waxSeal.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                openInvitation();

            }
        );

    }


    /* =====================================================
       ENABLE BOTTOM MENU
       ===================================================== */

    function enableBottomMenu() {

        const footerMenu =
            document.querySelector(
                ".footer .menu"
            );


        if (footerMenu) {

            footerMenu.style.display = "flex";
            footerMenu.style.visibility = "visible";
            footerMenu.style.opacity = "1";
            footerMenu.style.pointerEvents = "auto";
            footerMenu.style.position = "fixed";
            footerMenu.style.zIndex = "12000";

        }


        document
            .querySelectorAll(
                ".footer .menu li"
            )
            .forEach(
                button => {

                    button.style.pointerEvents =
                        "auto";

                    button.style.cursor =
                        "pointer";

                    button.style.position =
                        "relative";

                    button.style.zIndex =
                        "12001";

                }
            );


        document
            .querySelectorAll(
                ".toggle-menu"
            )
            .forEach(
                menu => {

                    menu.style.pointerEvents =
                        "none";

                    menu.style.zIndex =
                        "13000";

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


        petal.style.left =
            Math.random() * 100 + "vw";

        petal.style.top =
            "-20px";


        const size =
            5 + Math.random() * 9;


        petal.style.width =
            size + "px";

        petal.style.height =
            size + "px";


        petal.style.opacity =
            0.3 + Math.random() * 0.5;


        const duration =
            5 + Math.random() * 4;


        petal.style.animationDuration =
            duration + "s";


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


        setTimeout(
            () => {

                petal.remove();

            },
            duration * 1000
        );

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
           PETALS AWAL
           ----------------------------------------- */

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            setTimeout(
                createPetal,
                i * 180
            );

        }


        /* -----------------------------------------
           PETALS BERTERUSAN
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


        setTimeout(
            () => {

                URL.revokeObjectURL(
                    url
                );

            },
            1000
        );

    }


    /* =====================================================
       GOOGLE MAPS
       ===================================================== */

    function openGoogleMaps() {

        const latitude =
            2.3807618;

        const longitude =
            103.7116231;


        const url =
            "https://www.google.com/maps/dir/?api=1" +
            "&destination=" +
            latitude +
            "," +
            longitude +
            "&travelmode=driving";


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
            whatsappPhone.startsWith("0")
        ) {

            whatsappPhone =
                "60" +
                whatsappPhone.substring(1);

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
       REVEAL
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

                menu.style.pointerEvents =
                    "none";

            }
        );

    }


    function openMenu(menuId) {

        const menu =
            document.getElementById(
                menuId
            );


        if (!menu) {

            console.warn(
                "Menu tidak dijumpai:",
                menuId
            );

            return;

        }


        closeAllMenus();


        menu.style.zIndex =
            "13000";

        menu.style.pointerEvents =
            "auto";

        menu.style.visibility =
            "visible";

        menu.classList.add(
            "open"
        );

    }


    /* =====================================================
       BOTTOM MENU BUTTONS
       GUNA CLICK SAHAJA
       ===================================================== */

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

                console.warn(
                    "Button tidak dijumpai:",
                    buttonId
                );

                return;

            }


            const handleMenuClick =
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

                        closeAllMenus();

                    }

                    else {

                        openMenu(
                            menuId
                        );

                    }

                };


            button.addEventListener(
                "click",
                handleMenuClick
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
                    ".footer .menu"
                )
            ) {

                return;

            }


            if (
                event.target.closest(
                    ".toggle-menu"
                )
            ) {

                return;

            }


            closeAllMenus();

        }
    );


    /* =====================================================
       MENU STOP PROPAGATION
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
       CLOSE BUTTON
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

                            menu.style.pointerEvents =
                                "none";

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
                                method: "POST",
                                body: formData
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
       SUCCESS
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


        successMenu.style.zIndex =
            "13000";

        successMenu.style.pointerEvents =
            "auto";

        successMenu.style.visibility =
            "visible";

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
                        method: "POST",

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


    /* =====================================================
       RSVP BUTTON — HADIR
       ===================================================== */

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


    /* =====================================================
       RSVP BUTTON — TIDAK HADIR
       ===================================================== */

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
       MUSIC BUTTON
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

                const icon =
                    musicButton.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "bx-music"
                    );

                    icon.classList.add(
                        "bx-volume-full"
                    );

                }

            }
        );


        audioPlayer.addEventListener(
            "pause",
            () => {

                const icon =
                    musicButton.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "bx-volume-full"
                    );

                    icon.classList.add(
                        "bx-music"
                    );

                }

            }
        );

    }


    /* =====================================================
       GLOBAL FUNCTIONS
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
