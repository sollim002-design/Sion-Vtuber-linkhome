const LINK_GROUPS = [
  { title: "공식 채널", className: "official", links: [
    { title: "치지직", caption: "LIVE / STREAM", icon: "chzzk", url: "https://chzzk.naver.com/64baf88d96b2b7b8504e58446f86e1c6" },
    { title: "YouTube", caption: "UTAITE / CLIPS / VOD", icon: "youtube", url: "https://www.youtube.com/channel/UCy-t0ff_XWtwnyno05uniyQ" },
  ]},
  { title: "SNS", className: "social", links: [
    { title: "트위터", caption: "X / TWITTER", icon: "twitter", url: "https://x.com/hanasakision" },
    { title: "TikTok", caption: "SHORTS / TIKTOK", icon: "tiktok", url: "https://www.tiktok.com/@hanasakision" },
  ]},
  { title: "후원", className: "support", links: [
    { title: "투네이션", caption: "SEND A FLOWER", icon: "toonation", url: "https://toon.at/donate/hanasakision" },
  ]},
  { title: "CONTACT", className: "contact", links: [
    { title: "Business Contact", caption: "kiyolive26@gmail.com", icon: "mail", url: "mailto:kiyolive26@gmail.com" },
    { title: "Personal Contact", caption: "hanasakision0404@gmail.com", icon: "mail", url: "mailto:hanasakision0404@gmail.com" },
  ]},
];
const linksRoot = document.querySelector("#links");
const toast = document.querySelector("#toast");
const CHZZK_CHANNEL_ID = "64baf88d96b2b7b8504e58446f86e1c6";
function showToast(message) { toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300); }
let linkNumber = 0;
LINK_GROUPS.forEach(({ title: groupTitle, className, links }) => {
  const group = document.createElement("section");
  group.className = `link-panel ${className}`;
  const liveMarkup = className === "official" ? '<span class="live-dot is-checking" id="liveStatus"><i></i><span>checking</span></span>' : '<span class="panel-flower">✿</span>';
  group.innerHTML = `<div class="panel-heading"><span class="panel-label">${groupTitle}</span>${liveMarkup}</div><div class="panel-links"></div>`;
  const grid = group.querySelector(".panel-links");
  links.forEach(({ title, caption, icon, url }) => {
    linkNumber += 1;
    const link = document.createElement("a");
    link.className = "panel-link";
    link.href = url;
    const mark = icon === "youtube" ? '<img class="brand-logo youtube-logo-image" src="./youtube-logo.svg" alt="" />' : icon === "toonation" ? '<img class="brand-logo toon-logo-image" src="./toonation-logo.png" alt="" />' : icon === "chzzk" ? '<img class="brand-logo chzzk-logo-image" src="./chzzk-logo.svg" alt="" />' : icon === "tiktok" ? '<svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.589 6.686a4.793 4.793 0 0 1-3.77-3.79V2h-3.02v13.64a2.89 2.89 0 1 1-2.89-2.89c.3 0 .6.05.87.14v-3.08a5.93 5.93 0 1 0 5.04 5.83V8.72a7.82 7.82 0 0 0 4.77 1.61V7.3a4.8 4.8 0 0 1-1-.61Z" /></svg>' : icon === "mail" ? "✉" : '<svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>';
    link.innerHTML = `<span class="panel-link-top"><span class="panel-link-icon brand-icon ${icon}" aria-hidden="true">${mark}</span><span class="panel-link-title">${title.replace("\n", "<br />")}</span></span><span class="panel-link-bottom"><span class="panel-link-caption">${caption}</span><b class="panel-link-arrow">↗</b></span>`;
    if (!url.startsWith("mailto:")) { link.target = "_blank"; link.rel = "noreferrer"; }
    if (icon === "mail") {
      link.addEventListener("click", async (event) => {
        event.preventDefault();
        try { await navigator.clipboard.writeText(caption); showToast("메일 주소를 복사했어요"); }
        catch { showToast(caption); }
      });
    }
    grid.appendChild(link);
  });
  linksRoot.appendChild(group);
});
const liveStatus = document.querySelector("#liveStatus");
const lunarianAge = document.querySelector("#lunarianAge");
document.querySelector("#shareButton").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(window.location.href); showToast("페이지 링크를 복사했어요"); }
  catch { showToast("브라우저 메뉴에서 링크를 공유해 주세요"); }
});
document.querySelectorAll(".pending-link").forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); showToast(link.dataset.pending); }));

function updateLunarianAge() {
  const now = new Date();
  let age = (now.getFullYear() - 1998) * 12 + (now.getMonth() - 3) + 1;
  if (now.getDate() < 4) age -= 1;
  lunarianAge.textContent = String(Math.max(1, age));
}
updateLunarianAge();
setInterval(updateLunarianAge, 60_000);

let lastPetalAt = 0;
window.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const now = performance.now();
  if (now - lastPetalAt < 55) return;
  lastPetalAt = now;

  const petal = document.createElement("span");
  petal.className = "cursor-petal";
  petal.textContent = Math.random() > 0.25 ? "✿" : "✧";
  petal.style.left = `${event.clientX + (Math.random() * 18 - 9)}px`;
  petal.style.top = `${event.clientY + (Math.random() * 18 - 9)}px`;
  petal.style.setProperty("--petal-size", `${9 + Math.random() * 9}px`);
  petal.style.setProperty("--petal-drift", `${Math.random() * 70 - 35}px`);
  petal.style.setProperty("--petal-spin", `${Math.random() * 240 - 120}deg`);
  petal.style.setProperty("--petal-color", Math.random() > 0.5 ? "#d45b91" : "#b978b2");
  document.body.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove(), { once: true });
});

async function updateLiveStatus() {
  try {
    const response = await fetch(`https://api.chzzk.naver.com/polling/v2/channels/${CHZZK_CHANNEL_ID}/live-status`, { cache: "no-store" });
    if (!response.ok) throw new Error("status request failed");
    const result = await response.json();
    const content = result?.content;
    const isLive = content?.status === "OPEN" || content?.status === "STARTED" || content?.livePollingStatusJson?.includes('"isPublishing":true');
    liveStatus.classList.toggle("is-checking", false);
    liveStatus.classList.toggle("is-offline", !isLive);
    liveStatus.querySelector("span").textContent = isLive ? "online" : "offline";
  } catch {
    liveStatus.classList.remove("is-checking");
    liveStatus.classList.add("is-offline");
    liveStatus.querySelector("span").textContent = "offline";
  }
}

updateLiveStatus();
setInterval(updateLiveStatus, 60_000);
