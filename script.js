// ========================================
// THE MEMORY VAULT
// ========================================

const SECRET_PASSWORD = "brother21";


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

if (beginBtn && opening && vault) {

    beginBtn.addEventListener("click", function () {

        console.log("BEGIN THE JOURNEY clicked");

        opening.style.opacity = "0";
        opening.style.transform = "scale(1.04)";

        setTimeout(function () {

            opening.classList.add("hidden");

            vault.classList.remove("hidden");

            // Reset vault position
            vault.style.opacity = "1";
            vault.style.transform = "scale(1)";
            vault.style.display = "flex";

        }, 900);

    });

}

// ========================================
// PASSWORD UNLOCK
// ========================================

function unlockVault() {

    if (!passwordInput || !vault || !welcome) {
        return;
    }

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === SECRET_PASSWORD) {

        // Clear error
        if (errorMessage) {
            errorMessage.textContent = "";
        }

        // Fade out vault
        vault.style.opacity = "0";
        vault.style.transform = "scale(1.04)";

        setTimeout(function () {

            // Hide vault
            vault.classList.add("hidden");

            // Show welcome screen
            welcome.classList.remove("hidden");

            welcome.style.opacity = "1";
            welcome.style.transform = "scale(1)";

        }, 900);

    } else {

        // Wrong password
        if (errorMessage) {
            errorMessage.textContent = "Not quite... try again.";
        }

        passwordInput.value = "";

        // Shake input
        passwordInput.animate(
            [
                {
                    transform: "translateX(0)"
                },
                {
                    transform: "translateX(-8px)"
                },
                {
                    transform: "translateX(8px)"
                },
                {
                    transform: "translateX(-5px)"
                },
                {
                    transform: "translateX(0)"
                }
            ],
            {
                duration: 400
            }
        );

    }

}


// ========================================
// UNLOCK BUTTON
// ========================================

if (unlockBtn) {

    unlockBtn.addEventListener("click", function () {

        unlockVault();

    });

}


// ========================================
// PRESS ENTER FOR PASSWORD
// ========================================

if (passwordInput) {

    passwordInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            unlockVault();

        }

    });

}


// ========================================
// ENTER ARCHIVE
// ========================================

if (enterArchive) {

    enterArchive.addEventListener("click", function () {

        if (!welcome || !archive) {
            return;
        }

        // Fade out welcome
        welcome.style.opacity = "0";
        welcome.style.transform = "scale(1.04)";

        setTimeout(function () {

            // Hide welcome
            welcome.classList.add("hidden");

            // Show archive
            archive.classList.remove("hidden");

            archive.style.opacity = "1";
            archive.style.transform = "scale(1)";

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

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

        console.error("Section not found:", sectionName);

        return;

    }

    // Keep the archive visible because
    // the story sections are inside #archive
    if (archive) {

        archive.classList.add("section-open");

    }

    // Open the requested section
    section.classList.remove("hidden");

    section.style.display = "block";
    section.style.opacity = "1";
    section.style.transform = "translateY(0)";

    // Scroll to the opened section
    setTimeout(function () {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);

}


// ========================================
// CLOSE ARCHIVE SECTIONS
// ========================================

function closeSection(sectionName) {

    const section = document.getElementById(sectionName);

    if (!section) return;

    section.classList.add("hidden");

    section.style.display = "none";

    section.style.opacity = "0";

    section.style.transform = "translateY(20px)";

    if (archive) {

        archive.classList.remove("section-open");

    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}

// ========================================
// VOICE MESSAGE
// ========================================

const voiceBtn = document.getElementById("voiceBtn");
const voiceMessage = document.getElementById("voiceMessage");

if (voiceBtn && voiceMessage) {

    voiceBtn.addEventListener("click", function () {

        if (voiceMessage.paused) {

            voiceMessage.play();

            voiceBtn.innerHTML = "❚❚ PAUSE MESSAGE";

        } else {

            voiceMessage.pause();

            voiceBtn.innerHTML = "▶ PLAY MESSAGE";

        }

    });


    voiceMessage.addEventListener("ended", function () {

        voiceBtn.innerHTML = "▶ PLAY MESSAGE";

    });

}


// ========================================
// OPEN WHEN ENVELOPES
// ========================================

function toggleEnvelope(card) {

    if (card) {

        card.classList.toggle("opened");

    }

}


// ========================================
// BACK TO ARCHIVE
// ========================================

function backToArchive() {

    const sections =
        document.querySelectorAll(".extra-section");

    sections.forEach(function (section) {

        section.classList.add("hidden");

    });


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


// ========================================
// ANNAYA AGE
// ========================================

// Annaya's birthday:
// 10 January 2005

const annayaBirthday = new Date(2005, 0, 10);


function calculateAge(birthday) {

    const today = new Date();

    let age =
        today.getFullYear() -
        birthday.getFullYear();


    const currentMonth =
        today.getMonth();

    const birthMonth =
        birthday.getMonth();


    const currentDate =
        today.getDate();

    const birthDate =
        birthday.getDate();


    // Birthday has not happened yet this year
    if (
        currentMonth < birthMonth ||
        (
            currentMonth === birthMonth &&
            currentDate < birthDate
        )
    ) {

        age--;

    }


    return age;

}


// ========================================
// DISPLAY ANNAYA'S CURRENT AGE
// ========================================

const ageElement =
    document.getElementById("annayaAge");


if (ageElement) {

    ageElement.textContent =
        calculateAge(annayaBirthday);

}


// ========================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ========================================

window.openSection =
    openSection;

window.closeSection =
    closeSection;

window.toggleEnvelope =
    toggleEnvelope;

window.backToArchive =
    backToArchive;