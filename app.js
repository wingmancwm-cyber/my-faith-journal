// ==============================
// 恩典手帳：基本導覽
// ==============================

const pageNames = ["home", "records", "bible", "library", "settings"];

function showPage(name) {
  if (!pageNames.includes(name)) return;

  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === `page-${name}`);
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.page === name);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.go));
});

const todayDate = document.getElementById("todayDate");

if (todayDate) {
  todayDate.textContent = new Intl.DateTimeFormat("zh-Hant", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date());
}

const installHint = document.getElementById("installHint");

if (installHint) {
  installHint.addEventListener("click", () => {
    alert("在 iPhone 的 Safari 開啟此網站，按下「分享」圖示，再選擇「加入主畫面」，即可把恩典手帳放在主畫面。");
  });
}


// ==============================
// 恩典手帳：66 卷聖經資料
// ==============================

const bibleBooks = [
  // 舊約
  { id: "gen", name: "創世記", testament: "OT", chapters: 50 },
  { id: "exo", name: "出埃及記", testament: "OT", chapters: 40 },
  { id: "lev", name: "利未記", testament: "OT", chapters: 27 },
  { id: "num", name: "民數記", testament: "OT", chapters: 36 },
  { id: "deu", name: "申命記", testament: "OT", chapters: 34 },
  { id: "jos", name: "約書亞記", testament: "OT", chapters: 24 },
  { id: "jdg", name: "士師記", testament: "OT", chapters: 21 },
  { id: "rut", name: "路得記", testament: "OT", chapters: 4 },
  { id: "1sa", name: "撒母耳記上", testament: "OT", chapters: 31 },
  { id: "2sa", name: "撒母耳記下", testament: "OT", chapters: 24 },
  { id: "1ki", name: "列王紀上", testament: "OT", chapters: 22 },
  { id: "2ki", name: "列王紀下", testament: "OT", chapters: 25 },
  { id: "1ch", name: "歷代志上", testament: "OT", chapters: 29 },
  { id: "2ch", name: "歷代志下", testament: "OT", chapters: 36 },
  { id: "ezr", name: "以斯拉記", testament: "OT", chapters: 10 },
  { id: "neh", name: "尼希米記", testament: "OT", chapters: 13 },
  { id: "est", name: "以斯帖記", testament: "OT", chapters: 10 },
  { id: "job", name: "約伯記", testament: "OT", chapters: 42 },
  { id: "psa", name: "詩篇", testament: "OT", chapters: 150 },
  { id: "pro", name: "箴言", testament: "OT", chapters: 31 },
  { id: "ecc", name: "傳道書", testament: "OT", chapters: 12 },
  { id: "sng", name: "雅歌", testament: "OT", chapters: 8 },
  { id: "isa", name: "以賽亞書", testament: "OT", chapters: 66 },
  { id: "jer", name: "耶利米書", testament: "OT", chapters: 52 },
  { id: "lam", name: "耶利米哀歌", testament: "OT", chapters: 5 },
  { id: "ezk", name: "以西結書", testament: "OT", chapters: 48 },
  { id: "dan", name: "但以理書", testament: "OT", chapters: 12 },
  { id: "hos", name: "何西阿書", testament: "OT", chapters: 14 },
  { id: "jol", name: "約珥書", testament: "OT", chapters: 3 },
  { id: "amo", name: "阿摩司書", testament: "OT", chapters: 9 },
  { id: "oba", name: "俄巴底亞書", testament: "OT", chapters: 1 },
  { id: "jon", name: "約拿書", testament: "OT", chapters: 4 },
  { id: "mic", name: "彌迦書", testament: "OT", chapters: 7 },
  { id: "nam", name: "那鴻書", testament: "OT", chapters: 3 },
  { id: "hab", name: "哈巴谷書", testament: "OT", chapters: 3 },
  { id: "zep", name: "西番雅書", testament: "OT", chapters: 3 },
  { id: "hag", name: "哈該書", testament: "OT", chapters: 2 },
  { id: "zec", name: "撒迦利亞書", testament: "OT", chapters: 14 },
  { id: "mal", name: "瑪拉基書", testament: "OT", chapters: 4 },

  // 新約
  { id: "mat", name: "馬太福音", testament: "NT", chapters: 28 },
  { id: "mrk", name: "馬可福音", testament: "NT", chapters: 16 },
  { id: "luk", name: "路加福音", testament: "NT", chapters: 24 },
  { id: "jhn", name: "約翰福音", testament: "NT", chapters: 21 },
  { id: "act", name: "使徒行傳", testament: "NT", chapters: 28 },
  { id: "rom", name: "羅馬書", testament: "NT", chapters: 16 },
  { id: "1co", name: "哥林多前書", testament: "NT", chapters: 16 },
  { id: "2co", name: "哥林多後書", testament: "NT", chapters: 13 },
  { id: "gal", name: "加拉太書", testament: "NT", chapters: 6 },
  { id: "eph", name: "以弗所書", testament: "NT", chapters: 6 },
  { id: "php", name: "腓立比書", testament: "NT", chapters: 4 },
  { id: "col", name: "歌羅西書", testament: "NT", chapters: 4 },
  { id: "1th", name: "帖撒羅尼迦前書", testament: "NT", chapters: 5 },
  { id: "2th", name: "帖撒羅尼迦後書", testament: "NT", chapters: 3 },
  { id: "1ti", name: "提摩太前書", testament: "NT", chapters: 6 },
  { id: "2ti", name: "提摩太後書", testament: "NT", chapters: 4 },
  { id: "tit", name: "提多書", testament: "NT", chapters: 3 },
  { id: "phm", name: "腓利門書", testament: "NT", chapters: 1 },
  { id: "heb", name: "希伯來書", testament: "NT", chapters: 13 },
  { id: "jas", name: "雅各書", testament: "NT", chapters: 5 },
  { id: "1pe", name: "彼得前書", testament: "NT", chapters: 5 },
  { id: "2pe", name: "彼得後書", testament: "NT", chapters: 3 },
  { id: "1jn", name: "約翰一書", testament: "NT", chapters: 5 },
  { id: "2jn", name: "約翰二書", testament: "NT", chapters: 1 },
  { id: "3jn", name: "約翰三書", testament: "NT", chapters: 1 },
  { id: "jud", name: "猶大書", testament: "NT", chapters: 1 },
  { id: "rev", name: "啟示錄", testament: "NT", chapters: 22 }
];


// ==============================
// IndexedDB：只儲存在目前裝置
// ==============================

const DB_NAME = "MyFaithJournal";
const DB_VERSION = 1;
const STORE_NAME = "bibleProgress";

let db = null;
let bibleProgress = {};
let selectedTestament = "OT";
let selectedBookId = "gen";
let databaseReady = false;

function openBibleDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("這個瀏覽器不支援本機資料儲存。"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const database = event.target.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(request.error || new Error("無法開啟本機資料庫。"));
    };
  });
}

function loadBibleProgress() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get("chapters");

    request.onsuccess = () => {
      bibleProgress = request.result?.value || {};
      resolve();
    };

    request.onerror = () => {
      reject(request.error || new Error("讀取讀經紀錄失敗。"));
    };
  });
}

function saveBibleProgress() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    store.put({
      id: "chapters",
      value: bibleProgress
    });

    transaction.oncomplete = () => resolve();

    transaction.onerror = () => {
      reject(transaction.error || new Error("儲存讀經紀錄失敗。"));
    };

    transaction.onabort = () => {
      reject(transaction.error || new Error("儲存讀經紀錄中斷。"));
    };
  });
}


// ==============================
// 讀經頁面：建立操作介面
// ==============================

const biblePage = document.getElementById("page-bible");

function createBibleInterface() {
  if (!biblePage || document.getElementById("bible-interactive")) return;

  const panel = document.createElement("section");
  panel.id = "bible-interactive";
  panel.className = "bible-interactive";

  panel.innerHTML = `
    <div class="bible-picker">
      <div class="section-heading">
        <h2>選擇書卷</h2>
        <span class="soft-tag">66 BOOKS</span>
      </div>

      <div class="bible-testament-tabs">
        <button type="button" data-testament="OT" class="selected">舊約 39 卷</button>
        <button type="button" data-testament="NT">新約 27 卷</button>
      </div>

      <label class="bible-select-label" for="bibleBookSelect">聖經書卷</label>
      <select id="bibleBookSelect" class="bible-book-select"></select>

      <div class="bible-book-summary">
        <div>
          <strong id="bibleSelectedBookName">創世記</strong>
          <small id="bibleSelectedBookProgress">已讀 0 / 50 章</small>
        </div>
        <span id="bibleSelectedBookPercent">0%</span>
      </div>

      <div class="progress-track bible-book-track">
        <span id="bibleSelectedBookBar" style="width:0%"></span>
      </div>
    </div>

        <div class="bible-book-progress-section">
      <div class="section-heading">
        <h2>書卷閱讀進度</h2>
        <span class="soft-tag">BOOK PROGRESS</span>
      </div>
      <div id="bibleBookProgressList"></div>
    </div>
    <div class="chapter-section">
      <div class="section-heading">
        <h2>選擇已讀章數</h2>
        <span class="soft-tag">CHAPTERS</span>
      </div>

      <p class="bible-instruction">點選章數即可標示為已讀，再點一次便可取消。</p>

      <div id="bibleChapterGrid" class="bible-chapter-grid"></div>

      <div class="bible-legend">
        <span><i class="legend-dot unread"></i> 未讀</span>
        <span><i class="legend-dot read"></i> 已讀</span>
      </div>
    </div>

    <p id="bibleStorageStatus" class="bible-storage-status" role="status">
      正在載入本機讀經紀錄……
    </p>
  `;

  biblePage.appendChild(panel);

  panel.querySelectorAll("[data-testament]").forEach(button => {
    button.addEventListener("click", () => {
      selectedTestament = button.dataset.testament;

      panel.querySelectorAll("[data-testament]").forEach(tab => {
        tab.classList.toggle("selected", tab === button);
      });

      populateBookSelect();
      renderChapterGrid();
    });
  });

  document.getElementById("bibleBookSelect").addEventListener("change", event => {
    selectedBookId = event.target.value;
    renderChapterGrid();
  });  document.getElementById("bibleBookProgressList").addEventListener("click", event => {
    const button = event.target.closest("[data-book-id]");
    if (!button) return;

    const book = bibleBooks.find(item => item.id === button.dataset.bookId);
    if (!book) return;

    selectedBookId = book.id;
    selectedTestament = book.testament;

    panel.querySelectorAll("[data-testament]").forEach(tab => {
      tab.classList.toggle("selected", tab.dataset.testament === selectedTestament);
    });

    populateBookSelect();
    renderBookProgressList();
    renderChapterGrid();

    document.querySelector(".chapter-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function populateBookSelect() {
  const select = document.getElementById("bibleBookSelect");
  if (!select) return;

  const books = bibleBooks.filter(book => book.testament === selectedTestament);

  select.innerHTML = "";

  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.id;
    option.textContent = book.name;
    select.appendChild(option);
  });

  if (!books.some(book => book.id === selectedBookId)) {
    selectedBookId = books[0].id;
  }

  select.value = selectedBookId;
}

function getBookReadCount(book) {
  return Array.isArray(bibleProgress[book.id])
    ? bibleProgress[book.id].length
    : 0;
}
function renderBookProgressList() {
  const container = document.getElementById("bibleBookProgressList");
  if (!container) return;

  // 保留使用者已展開或收起的狀態
  const oldStates = {};
  container.querySelectorAll("details[data-testament]").forEach(group => {
    oldStates[group.dataset.testament] = group.open;
  });

  const testaments = [
    { id: "OT", name: "舊約", total: 929, defaultOpen: true },
    { id: "NT", name: "新約", total: 260, defaultOpen: false }
  ];

  container.innerHTML = testaments.map(testament => {
    const books = bibleBooks.filter(book => book.testament === testament.id);

    const readTotal = books.reduce(
      (sum, book) => sum + getBookReadCount(book),
      0
    );

    const percent = Math.round((readTotal / testament.total) * 100);

    const isOpen = oldStates[testament.id] !== undefined
      ? oldStates[testament.id]
      : testament.defaultOpen;

    const rows = books.map(book => {
      const read = getBookReadCount(book);
      const bookPercent = Math.round((read / book.chapters) * 100);
      const completed = read === book.chapters;

      return `
        <button
          type="button"
          class="bible-book-progress-item${selectedBookId === book.id ? " is-selected" : ""}"
          data-book-id="${book.id}"
          aria-label="選擇${book.name}，已讀${read}章，共${book.chapters}章"
        >
          <span class="bible-book-progress-info">
            <span class="bible-book-progress-name">
              ${book.name}
              ${completed ? '<span class="book-completed">✓</span>' : ""}
            </span>
            <span class="bible-book-progress-count">${read} / ${book.chapters} 章</span>
          </span>
          <span class="bible-book-progress-bar">
            <span style="width:${bookPercent}%"></span>
          </span>
          <span class="bible-book-progress-percent">${bookPercent}%</span>
        </button>
      `;
    }).join("");

    return `
      <details class="bible-book-group"
        data-testament="${testament.id}"
        ${isOpen ? "open" : ""}
      >
        <summary>
          <span class="bible-group-title">
            ${testament.name}
            <small>${books.length} 卷書</small>
          </span>
          <span class="bible-group-total">
            ${readTotal} / ${testament.total} 章
            <small>${percent}%</small>
          </span>
        </summary>
        <div class="bible-book-progress-list">
          ${rows}
        </div>
      </details>
    `;
  }).join("");
}
function renderChapterGrid() {
  const book = bibleBooks.find(item => item.id === selectedBookId);
  if (!book) return;

  const grid = document.getElementById("bibleChapterGrid");
  const name = document.getElementById("bibleSelectedBookName");
  const progressText = document.getElementById("bibleSelectedBookProgress");
  const percentText = document.getElementById("bibleSelectedBookPercent");
  const progressBar = document.getElementById("bibleSelectedBookBar");

  if (!grid) return;

  const readChapters = bibleProgress[book.id] || [];
  const readCount = readChapters.length;
  const percent = Math.round((readCount / book.chapters) * 100);

  name.textContent = book.name;
  progressText.textContent = `已讀 ${readCount} / ${book.chapters} 章`;
  percentText.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;

  grid.innerHTML = "";

  for (let chapter = 1; chapter <= book.chapters; chapter++) {
    const button = document.createElement("button");
    const isRead = readChapters.includes(chapter);

    button.type = "button";
    button.className = `chapter-button${isRead ? " is-read" : ""}`;
    button.textContent = chapter;
    button.setAttribute("aria-pressed", String(isRead));
    button.setAttribute("aria-label", `${book.name} 第 ${chapter} 章${isRead ? "，已讀" : "，未讀"}`);
    button.disabled = !databaseReady;

    button.addEventListener("click", () => {
      toggleChapter(book, chapter);
    });

    grid.appendChild(button);
  }
}


// ==============================
// 勾選章節及即時更新進度
// ==============================

async function toggleChapter(book, chapter) {
  if (!databaseReady) return;

  const current = Array.isArray(bibleProgress[book.id])
    ? [...bibleProgress[book.id]]
    : [];

  const alreadyRead = current.includes(chapter);

  if (alreadyRead) {
    bibleProgress[book.id] = current.filter(number => number !== chapter);
  } else {
    bibleProgress[book.id] = [...current, chapter].sort((a, b) => a - b);
  }

  try {
    await saveBibleProgress();
    updateAllBibleProgress();
    renderChapterGrid();
  } catch (error) {
    // 儲存失敗時還原畫面資料，避免顯示未成功儲存的進度
    if (alreadyRead) {
      bibleProgress[book.id] = current;
    } else {
      bibleProgress[book.id] = current;
    }

    renderChapterGrid();

    const status = document.getElementById("bibleStorageStatus");
    status.textContent = "儲存失敗，這次的變更未能保存。請檢查瀏覽器儲存權限。";
    status.classList.add("has-error");

    console.error(error);
  }
}

function getTestamentReadCount(testament) {
  return bibleBooks
    .filter(book => book.testament === testament)
    .reduce((total, book) => total + getBookReadCount(book), 0);
}

function updateAllBibleProgress() {
  const oldRead = getTestamentReadCount("OT");
  const newRead = getTestamentReadCount("NT");
  const totalRead = oldRead + newRead;

  const oldTotal = 929;
  const newTotal = 260;
  const allTotal = 1189;

  const allPercent = Math.round((totalRead / allTotal) * 100);

  // 首頁進度
  const homeHeading = document.querySelector(".progress-card .progress-top h3");
  const homePercent = document.querySelector(".progress-card .progress-number");
  const homeBar = document.querySelector(".progress-card .progress-track span");
  const homeFoot = document.querySelectorAll(".progress-card .progress-foot span");

  if (homeHeading) {
    homeHeading.textContent = `已讀 ${totalRead.toLocaleString("zh-Hant")} / 1,189 章`;
  }

  if (homePercent) homePercent.textContent = `${allPercent}%`;
  if (homeBar) homeBar.style.width = `${allPercent}%`;

  if (homeFoot.length >= 2) {
    homeFoot[0].textContent = `舊約 ${oldRead} / ${oldTotal}`;
    homeFoot[1].textContent = `新約 ${newRead} / ${newTotal}`;
  }

  // 讀經頁面總進度
  const bibleTotal = document.querySelector(".bible-total strong");
  const totalPercent = document.querySelector(".bible-total .total-percent");
  const bibleBar = biblePage?.querySelector(":scope > .progress-track span");
  const testamentCards = document.querySelectorAll(".testament-card strong");

  if (bibleTotal) {
    bibleTotal.innerHTML = `${totalRead.toLocaleString("zh-Hant")} <small>/ 1,189 章</small>`;
  }

  if (totalPercent) totalPercent.textContent = `${allPercent}%`;
  if (bibleBar) bibleBar.style.width = `${allPercent}%`;

  if (testamentCards.length >= 2) {
    testamentCards[0].textContent = `${oldRead} / ${oldTotal}`;
    testamentCards[1].textContent = `${newRead} / ${newTotal}`;
  }

    renderBookProgressList();
  renderChapterGrid();
}


// ==============================
// 啟動讀經模組
// ==============================

async function initialiseBible() {
  createBibleInterface();
  populateBookSelect();

  try {
    await openBibleDatabase();
    await loadBibleProgress();

    databaseReady = true;

    const status = document.getElementById("bibleStorageStatus");
    status.textContent = "讀經紀錄已儲存在此裝置。";
    status.classList.remove("has-error");

    updateAllBibleProgress();
    renderChapterGrid();
  } catch (error) {
    databaseReady = false;

    const status = document.getElementById("bibleStorageStatus");
    status.textContent = "無法啟用本機儲存，因此暫時不能勾選章節。請使用 iPhone Safari 或主畫面 App 再試。";
    status.classList.add("has-error");

    renderChapterGrid();
    console.error(error);
  }
}

initialiseBible();


// ==============================
// Service Worker：離線支援
// ==============================

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.error("Service Worker 註冊失敗：", error);
    });
  });
}
