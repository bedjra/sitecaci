// contactscript.js — comportement propre à la page Contact

const CONTACT_CONFIG = {
  whatsappNumber: "22890975339", // format international, sans "+"
  whatsappMessage: "Bonjour CACI-TOGO, je souhaite avoir plus d'informations.",
  address: "Adidogomé, 500 m de la maison des Jeunes d'Amadahomé, Lomé, Togo"
};

document.addEventListener("DOMContentLoaded", () => {

  // Lien WhatsApp généré dynamiquement
  const whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(CONTACT_CONFIG.whatsappMessage);
    whatsappBtn.href = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodedMsg}`;
    whatsappBtn.target = "_blank";
    whatsappBtn.rel = "noopener noreferrer";
  }

  // Lien Google Maps généré dynamiquement pour l'itinéraire
  const itineraireBtn = document.getElementById("itineraireBtn");
  if (itineraireBtn) {
    const encodedAddress = encodeURIComponent(CONTACT_CONFIG.address);
    itineraireBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    itineraireBtn.target = "_blank";
    itineraireBtn.rel = "noopener noreferrer";
  }

  // Bouton WhatsApp de la section CTA finale
  const ctaWhatsappBtn = document.getElementById("ctaWhatsappBtn");
  if (ctaWhatsappBtn) {
    const encodedMsg = encodeURIComponent(CONTACT_CONFIG.whatsappMessage);
    ctaWhatsappBtn.href = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodedMsg}`;
    ctaWhatsappBtn.target = "_blank";
    ctaWhatsappBtn.rel = "noopener noreferrer";
  }

  // Bouton Itinéraire de la section CTA finale
  const ctaItineraireBtn = document.getElementById("ctaItineraireBtn");
  if (ctaItineraireBtn) {
    const encodedAddress = encodeURIComponent(CONTACT_CONFIG.address);
    ctaItineraireBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    ctaItineraireBtn.target = "_blank";
    ctaItineraireBtn.rel = "noopener noreferrer";
  }

});