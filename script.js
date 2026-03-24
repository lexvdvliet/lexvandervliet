const saveContactBtn = document.getElementById("saveContactBtn");
const shareProfileBtn = document.getElementById("shareProfileBtn");
const downloadVcf = document.getElementById("downloadVcf");

const vcfContent = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:Lex van der Vliet",
  "N:van der Vliet;Lex;;;",
  "ORG:ClearViewData",
  "TITLE:CTO",
  "TEL;TYPE=CELL:+31628961350",
  "EMAIL;TYPE=INTERNET:info@clearviewdata.nl",
  "URL:https://www.clearviewdata.nl/",
  "URL;TYPE=LinkedIn:https://www.linkedin.com/in/lex-van-der-vliet/",
  "NOTE:Data consultancy, AI-oplossingen en datagedreven continue verbetering.",
  "END:VCARD"
].join("\n");

const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
const blobUrl = URL.createObjectURL(blob);
downloadVcf.href = blobUrl;

saveContactBtn?.addEventListener("click", async () => {
  downloadVcf.click();
});

shareProfileBtn?.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Lex van der Vliet | ClearViewData",
        text: "Digitaal visitekaartje van Lex van der Vliet",
        url: window.location.href
      });
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    }
  }

  navigator.clipboard?.writeText(window.location.href);
});

window.addEventListener("beforeunload", () => {
  URL.revokeObjectURL(blobUrl);
});
