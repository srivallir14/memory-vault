// ========================================
// THE MEMORY VAULT
// ========================================

const SECRET_PASSWORD = "10011404";


// ========================================
// GET ELEMENTS
// ========================================

const opening = document.getElementById("opening");
const vault = document.getElementById("vault");
const welcome = document.getElementById("welcome");
const archive = document.getElementById("archive");

const beginBtn = document.getElementById("beginBtn");
const unlockBtn = document.getElementById("unlockBtn");
const enterArchive = document.getElementById("enterArchive");

const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error");


// ========================================
// BEGIN JOURNEY
// ========================================

if (beginBtn) {

    beginBtn.addEventListener("click", () => {

        opening.style.opacity = "0";
        opening.style.transform = "scale(1.04)";

        setTimeout(() => {

            opening.classList.add("hidden");

            vault.classList.remove("hidden");

            vault.style.opacity = "1";
            vault.style.transform = "scale(1)";

        }, 900);

    });

}


// ========================================
// PASSWORD UNLOCK
// ========================================

function unlockVault() {

    if (!passwordInput) return;

    const enteredPassword =
        passwordInput.value.trim();

    if (enteredPassword === SECRET_PASSWORD) {

        errorMessage.textContent = "";

        vault.style.opacity = "0";
        vault.style.transform = "scale(1.04)";

        setTimeout(() => {

            vault.classList.add("hidden");

            welcome.classList.remove("hidden");

            welcome.style.opacity = "1";
            welcome.style.transform = "scale(1)";

        }, 900);

    }

    else {

        errorMessage.textContent =
            "Not quite... try again.";

        passwordInput.value = "";

        passwordInput.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 400
            }
        );

    }

}


// Unlock button
if (unlockBtn) {

    unlockBtn.addEventListener(
        "click",
        unlockVault
    );

}


// Press Enter
if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                unlockVault();

            }

        }
    );

}


// ========================================
// ENTER ARCHIVE
// ========================================
// ========================================
// ENTER ARCHIVE / OPEN STORY
// ========================================

if (enterArchive) {

    enterArchive.addEventListener("click", function () {

        if (!welcome || !archive) {
            return;
        }

        console.log("OPEN STORY clicked");

        welcome.style.opacity = "0";
        welcome.style.transform = "scale(1.04)";

        setTimeout(function () {

            welcome.classList.add("hidden");

            archive.classList.remove("hidden");

            archive.style.opacity = "1";
            archive.style.transform = "scale(1)";
            archive.style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            // Whisper appears AFTER archive opens
            setTimeout(function () {
                showVaultWhisper();
            }, 500);

        }, 900);

    });

}

// ========================================
// OPEN ARCHIVE SECTIONS
// ========================================

function openSection(sectionName) {

    console.log("Opening section:", sectionName);

    const section = document.getElementById(sectionName);

    if (!section) {

        console.error(
            "Section not found:",
            sectionName
        );

        return;
    }


    // ========================================
    // MARK ARCHIVE AS OPEN
    // ========================================

    if (archive) {

        archive.classList.add("section-open");

    }


    // ========================================
    // SHOW ONLY THE SELECTED SECTION
    // ========================================

    section.classList.remove("hidden");

    section.style.display = "block";
    section.style.opacity = "1";
    section.style.transform = "translateY(0)";


    // ========================================
    // SCROLL TO CHAPTER
    // ========================================

    setTimeout(function () {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);


    // ========================================
    // SHOW MEMORY WHISPER
    // ========================================

    setTimeout(function () {

        if (
            typeof window.showVaultWhisper ===
            "function"
        ) {

            window.showVaultWhisper();

        }

    }, 700);

}

// ========================================
// CLOSE ARCHIVE SECTIONS
// ========================================

function closeSection(sectionName) {

    const section =
        document.getElementById(sectionName);

    if (!section) return;

    section.classList.add("hidden");

    if (archive) {

        archive.classList.remove("section-open");
        archive.classList.remove("hidden");

        archive.style.opacity = "1";
        archive.style.transform = "translateY(0)";

    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


// ========================================================
// CARD 05 — VOICE MESSAGES
// ========================================================

const voiceButtons =
    document.querySelectorAll(".voice-play");

voiceButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const audioId =
            button.getAttribute("data-audio");

        const audio =
            document.getElementById(audioId);

        if (!audio) return;


        // Pause every other message
        document
            .querySelectorAll(".voice-play")
            .forEach(function (otherButton) {

                const otherId =
                    otherButton.getAttribute("data-audio");

                const otherAudio =
                    document.getElementById(otherId);

                if (otherAudio && otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    otherButton.textContent =
                        "▶ PLAY MESSAGE";
                }

            });


        // Play / pause selected message
        if (audio.paused) {

            audio.play();

            button.textContent =
                "❚❚ PAUSE MESSAGE";

        } else {

            audio.pause();

            button.textContent =
                "▶ PLAY MESSAGE";

        }


        // Reset button after finishing
        audio.onended = function () {

            button.textContent =
                "▶ PLAY MESSAGE";

        };

    });

});

// ========================================
// OPEN WHEN ENVELOPES
// ========================================

function toggleEnvelope(card) {

    if (card) {
        card.classList.toggle("opened");
    }

}


// ========================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ========================================

window.openSection = openSection;
window.closeSection = closeSection;
window.toggleEnvelope = toggleEnvelope;


// ========================================
// DIRECT BACK TO ARCHIVE
// ========================================

function backToArchive() {

    const story =
        document.getElementById("storySection");

    if (story) {
        story.classList.add("hidden");
    }

    if (archive) {

        archive.classList.remove("hidden");

        archive.style.opacity = "1";
        archive.style.transform = "translateY(0)";

    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

window.backToArchive = backToArchive;

// ========================================================
// CARD 02 — MEDIA VIEWER
// CLEAN FINAL VERSION
// ========================================================

function openPhoto(src) {

    const viewer = document.getElementById("mediaViewer");
    const photo = document.getElementById("fullPhoto");
    const reel = document.getElementById("fullReel");

    if (!viewer || !photo) {
        console.error("Photo viewer elements not found.");
        return;
    }

    /* Stop video */
    if (reel) {
        reel.pause();
        reel.removeAttribute("src");
        reel.load();
        reel.style.display = "none";
    }

    /* Reset photo */
    photo.style.display = "none";
    photo.src = "";

    /* Set photo */
    photo.src = src;

    photo.onload = function () {

        photo.style.display = "block";

    };

    photo.onerror = function () {

        console.error("Could not load photo:", src);

        photo.style.display = "none";

    };

    /* Open viewer */
    viewer.classList.remove("hidden");

    viewer.style.display = "flex";

    document.body.style.overflow = "hidden";
}


function openReel(videoPath) {

    const viewer = document.getElementById("mediaViewer");
    const photo = document.getElementById("fullPhoto");
    const reel = document.getElementById("fullReel");
    const source = document.getElementById("fullReelSource");

    if (!viewer || !reel || !source) {
        console.error("Reel viewer elements missing.");
        return;
    }

    console.log("Opening video:", videoPath);

    // Hide photo
    if (photo) {
        photo.src = "";
        photo.style.display = "none";
    }

    // Completely reset video
    reel.pause();
    reel.removeAttribute("src");
    source.removeAttribute("src");

    // Set new video source
    source.src = videoPath;

    // Important video settings
    reel.controls = true;
    reel.playsInline = true;
    reel.autoplay = false;
    reel.muted = false;

    // Make viewer visible
    viewer.classList.remove("hidden");
    viewer.style.display = "flex";

    // Make video visible
    reel.style.display = "block";
    reel.style.visibility = "visible";
    reel.style.opacity = "1";

    document.body.style.overflow = "hidden";

    // Reload the source
    reel.load();

    // Wait until browser has actual video data
    reel.onloadeddata = function () {

        console.log("VIDEO FRAME LOADED");

        reel.style.display = "block";

        // Try playing
        reel.play().catch(function (error) {

            console.log(
                "Autoplay blocked:",
                error
            );

        });

    };

    reel.onerror = function () {

        console.error(
            "VIDEO ERROR:",
            reel.error
        );

    };

}


// ========================================================
// CLOSE MEDIA VIEWER
// ========================================================

function closeMediaViewer(event) {

    const viewer = document.getElementById("mediaViewer");
    const photo = document.getElementById("fullPhoto");
    const reel = document.getElementById("fullReel");

    if (!viewer) return;

    /*
       Close only when:
       - clicking the dark background
       - clicking X
    */

    if (event) {

        const clickedClose =
            event.target.classList.contains(
                "media-viewer-close"
            );

        const clickedBackground =
            event.target === viewer;

        if (!clickedClose && !clickedBackground) {

            return;

        }

    }

    /* Hide viewer */
    viewer.classList.add("hidden");

    viewer.style.display = "none";

    /* Stop photo */
    if (photo) {

        photo.onload = null;
        photo.onerror = null;

        photo.src = "";

        photo.style.display = "none";

    }

    /* Stop video */
    if (reel) {

        reel.pause();

        reel.onloadeddata = null;
        reel.onerror = null;

        reel.removeAttribute("src");

        reel.load();

        reel.style.display = "none";

    }

    document.body.style.overflow = "";

}


// ========================================================
// ESC KEY
// ========================================================

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;

    const viewer =
        document.getElementById("mediaViewer");

    if (
        viewer &&
        !viewer.classList.contains("hidden")
    ) {

        closeMediaViewer();

    }

});


// ========================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ========================================================

window.openPhoto = openPhoto;
window.openReel = openReel;
window.closeMediaViewer = closeMediaViewer;
// ========================================================
// RETURN FROM QUESTIONNAIRE DIRECTLY TO ARCHIVE
// ========================================================

window.addEventListener("load", function () {

    const shouldReturn =
        sessionStorage.getItem("returnToArchive");

    if (shouldReturn !== "true") {
        return;
    }

    // Remove flag so normal opening works next time
    sessionStorage.removeItem("returnToArchive");


    const opening =
        document.getElementById("opening");

    const vault =
        document.getElementById("vault");

    const welcome =
        document.getElementById("welcome");

    const archive =
        document.getElementById("archive");


    // Hide opening screen
    if (opening) {
        opening.classList.add("hidden");
        opening.style.display = "none";
    }


    // Hide password screen
    if (vault) {
        vault.classList.add("hidden");
        vault.style.display = "none";
    }


    // Hide welcome screen
    if (welcome) {
        welcome.classList.add("hidden");
        welcome.style.display = "none";
    }


    // Show archive cards
    if (archive) {

        archive.classList.remove("hidden");

        archive.style.display = "block";
        archive.style.opacity = "1";
        archive.style.visibility = "visible";
        archive.style.transform = "none";

        archive.classList.remove("section-open");


        // Go to the top where the cards begin
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }

});