const LINKS = [
  { title: "花咲しおん\n치지직", caption: "LIVE / STREAM", icon: "chzzk", url: "https://chzzk.naver.com/64baf88d96b2b7b8504e58446f86e1c6" },
  { title: "HanasakiSion\n아트머그", caption: "COMMISSION / ART SERVICES", icon: "artmug", url: "https://artmug.kr/index.php?channel=view&uid=45989" },
  { title: "외주 녹음\n커미션", caption: "RECORDING / COMMISSION", icon: "artmug", url: "https://artmug.kr/index.php?channel=view&uid=50227" },
  { title: "HanasakiSion\n트위터", caption: "X / TWITTER", icon: "twitter", url: "https://x.com/hanasakision" },
  { title: "HanasakiSion\nYouTube", caption: "VIDEO / CHANNEL", icon: "youtube", url: "https://www.youtube.com/channel/UCy-t0ff_XWtwnyno05uniyQ" },
];
const linksRoot = document.querySelector("#links");
const toast = document.querySelector("#toast");
const liveStatus = document.querySelector("#liveStatus");
const CHZZK_CHANNEL_ID = "64baf88d96b2b7b8504e58446f86e1c6";
function showToast(message) { toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300); }
LINKS.forEach(({ title, caption, icon, url }, index) => {
  const link = document.createElement("a");
  link.className = "link-card";
  link.href = url;
  const mark = icon === "youtube" ? '<img class="brand-logo youtube-logo-image" src="./youtube-logo.svg" alt="" />' : icon === "chzzk" ? '<img class="brand-logo chzzk-logo-image" src="./chzzk-logo.svg" alt="" />' : icon === "artmug" ? '<img class="brand-logo artmug-logo-image" src="./artmug-logo.png" alt="" />' : "𝕏";
  link.innerHTML = `<div class="link-head"><span class="link-number">0${index + 1}</span><span class="brand-icon ${icon}" aria-hidden="true">${mark}</span></div><span class="link-title">${title.replace("\n", "<br />")}</span><span class="link-caption"><span>${caption}</span><b>↗</b></span>`;
  if (url !== "#") { link.target = "_blank"; link.rel = "noreferrer"; } else { link.addEventListener("click", (event) => { event.preventDefault(); showToast("링크를 준비 중이에요 ✳"); }); }
  linksRoot.appendChild(link);
});
document.querySelector("#shareButton").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(window.location.href); showToast("페이지 링크를 복사했어요"); }
  catch { showToast("브라우저 메뉴에서 링크를 공유해 주세요"); }
});

let lastPetalAt = 0;
window.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const now = performance.now();
  if (now - lastPetalAt < 55) return;
  lastPetalAt = now;

  const petal = document.createElement("span");
  petal.className = "cursor-petal";
  petal.textContent = Math.random() > 0.35 ? "✿" : "✧";
  petal.style.left = `${event.clientX + (Math.random() * 18 - 9)}px`;
  petal.style.top = `${event.clientY + (Math.random() * 18 - 9)}px`;
  petal.style.setProperty("--petal-size", `${9 + Math.random() * 9}px`);
  petal.style.setProperty("--petal-drift", `${Math.random() * 70 - 35}px`);
  petal.style.setProperty("--petal-spin", `${Math.random() * 240 - 120}deg`);
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
