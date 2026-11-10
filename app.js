// ==============================
// 恩典手帳：基本導覽
// ==============================

const pageNames = ["home", "devotion", "records", "bible", "library", "settings"];

function showPage(name) {
  if (!pageNames.includes(name)) return;

  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === `page-${name}`);
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    const activePage = name === "devotion" ? "home" : name;

    button.classList.toggle(
      "active",
      button.dataset.page === activePage
    );
  });

  if (name === "devotion") {
    showDevotionCalendar();
  }

  if (name === "records" && databaseReady) {
  renderRecordsCategory(selectedRecordCategory);
}

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
const DB_VERSION = 5;

const BIBLE_STORE_NAME = "bibleProgress";
const DEVOTION_STORE_NAME = "devotionRecords";
const NOTES_STORE_NAME = "notes";

let db = null;
let bibleProgress = {};
let selectedDevotionDate = null;
let calendarYear = new Date().getFullYear();
let calendarMonth = new Date().getMonth();
let selectedTestament = "OT";
let selectedBookId = "gen";
let databaseReady = false;
let selectedRecordCategory = "devotion";

function openBibleDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("這個瀏覽器不支援本機資料儲存。"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
  const database = event.target.result;

  if (!database.objectStoreNames.contains(BIBLE_STORE_NAME)) {
    database.createObjectStore(BIBLE_STORE_NAME, {
      keyPath: "id"
    });
  }

  if (!database.objectStoreNames.contains(DEVOTION_STORE_NAME)) {
    database.createObjectStore(DEVOTION_STORE_NAME, {
      keyPath: "date"
    });
  }
        if (!database.objectStoreNames.contains(NOTES_STORE_NAME)) {
    database.createObjectStore(NOTES_STORE_NAME, {
      keyPath: "id"
    });
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
    const transaction = db.transaction(BIBLE_STORE_NAME, "readonly");
    const store = transaction.objectStore(BIBLE_STORE_NAME);
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
    const transaction = db.transaction(BIBLE_STORE_NAME, "readwrite");
    const store = transaction.objectStore(BIBLE_STORE_NAME);

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
// 每日靈修：資料庫操作
// ==============================

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDevotionRecord(date) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      DEVOTION_STORE_NAME,
      "readonly"
    );

    const store = transaction.objectStore(DEVOTION_STORE_NAME);
    const request = store.get(date);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      reject(request.error || new Error("讀取靈修紀錄失敗。"));
    };
  });
}

function getAllDevotionRecords() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      DEVOTION_STORE_NAME,
      "readonly"
    );

    const store = transaction.objectStore(DEVOTION_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const records = request.result || [];

      records.sort((a, b) => b.date.localeCompare(a.date));

      resolve(records);
    };

    request.onerror = () => {
      reject(request.error || new Error("讀取靈修紀錄列表失敗。"));
    };
  });
}

function saveDevotionRecord(date, scripture, note) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      DEVOTION_STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(DEVOTION_STORE_NAME);

    store.put({
      date,
      scripture,
      note
    });

    transaction.oncomplete = () => resolve();

    transaction.onerror = () => {
      reject(transaction.error || new Error("儲存靈修紀錄失敗。"));
    };

    transaction.onabort = () => {
      reject(transaction.error || new Error("儲存靈修紀錄中斷。"));
    };
  });
}

function deleteDevotionRecord(date) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      DEVOTION_STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(DEVOTION_STORE_NAME);

    store.delete(date);

    transaction.oncomplete = () => resolve();

    transaction.onerror = () => {
      reject(transaction.error || new Error("刪除靈修紀錄失敗。"));
    };
  });
}

// ==============================
// 筆記資料：讀取、儲存及刪除
// ==============================

// 讀取所有筆記
function getAllNotes() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      NOTES_STORE_NAME,
      "readonly"
    );

    const store = transaction.objectStore(NOTES_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const notes = request.result || [];

      notes.sort((a, b) => {
        return (b.date || "").localeCompare(a.date || "");
      });

      resolve(notes);
    };

    request.onerror = () => {
      reject(request.error || new Error("讀取筆記失敗。"));
    };
  });
}

// 讀取單篇筆記
function getNote(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      NOTES_STORE_NAME,
      "readonly"
    );

    const store = transaction.objectStore(NOTES_STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      reject(request.error || new Error("讀取筆記失敗。"));
    };
  });
}

// 新增或修改筆記
function saveNote(note) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      NOTES_STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(NOTES_STORE_NAME);

    store.put(note);

    transaction.oncomplete = () => resolve();

    transaction.onerror = () => {
      reject(transaction.error || new Error("儲存筆記失敗。"));
    };

    transaction.onabort = () => {
      reject(transaction.error || new Error("儲存筆記中斷。"));
    };
  });
}

// 刪除筆記
function deleteNote(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      NOTES_STORE_NAME,
      "readwrite"
    );

    const store = transaction.objectStore(NOTES_STORE_NAME);

    store.delete(id);

    transaction.oncomplete = () => resolve();

    transaction.onerror = () => {
      reject(transaction.error || new Error("刪除筆記失敗。"));
    };
  });
}

    // ==============================
// 每日靈修：月曆介面
// ==============================

async function showDevotionCalendar() {
  const calendarView = document.getElementById("devotion-calendar-view");
  const editorView = document.getElementById("devotion-editor-view");

  if (!calendarView || !editorView) return;

  calendarView.hidden = false;
  editorView.hidden = true;

  await renderDevotionCalendar();
}

async function renderDevotionCalendar() {
  const container = document.getElementById("devotion-calendar");

  if (!container) return;

  if (!databaseReady) {
    container.innerHTML = `
      <p class="calendar-hint">
        本機資料庫尚未準備好，請重新載入 App。
      </p>
    `;
    return;
  }

  let records = [];

  try {
    records = await getAllDevotionRecords();
  } catch (error) {
    console.error("每日靈修月曆讀取失敗：", error);

    container.innerHTML = `
      <div class="devotion-calendar-card">
        <h2>月曆暫時無法載入</h2>
        <p>錯誤類型：${escapeDevotionText(error.name || "未知錯誤")}</p>
        <p>${escapeDevotionText(error.message || "沒有錯誤描述")}</p>
      </div>
    `;
    return;
  }
  const recordedDates = new Set(records.map(record => record.date));

  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const monthTitle = `${calendarYear}年${calendarMonth + 1}月`;

  let dayCells = "";

  for (let i = 0; i < firstDay; i++) {
    dayCells += `<span class="calendar-empty"></span>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = [
      calendarYear,
      String(calendarMonth + 1).padStart(2, "0"),
      String(day).padStart(2, "0")
    ].join("-");

    const hasRecord = recordedDates.has(date);

    dayCells += `
      <button
        type="button"
        class="calendar-day${hasRecord ? " has-record" : ""}"
        data-devotion-date="${date}"
        aria-label="${calendarYear}年${calendarMonth + 1}月${day}日${hasRecord ? "，已有靈修紀錄" : ""}"
      >
        <span>${day}</span>
        ${hasRecord ? '<small>✓</small>' : ""}
      </button>
    `;
  }

  container.innerHTML = `
    <div class="devotion-calendar-card">
      <div class="calendar-heading">
        <button type="button" id="previousMonth" aria-label="上一個月">‹</button>
        <h2>${monthTitle}</h2>
        <button type="button" id="nextMonth" aria-label="下一個月">›</button>
      </div>

      <div class="calendar-weekdays">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
      </div>

      <div class="calendar-days">
        ${dayCells}
      </div>

      <p class="calendar-legend">
        <span class="calendar-legend-mark">✓</span>
        已完成靈修紀錄
      </p>
    </div>

    <p class="calendar-hint">
      選擇日期，記下當天閱讀的經文與領受。
    </p>
  `;

  document.getElementById("previousMonth").addEventListener("click", () => {
    calendarMonth--;

    if (calendarMonth < 0) {
      calendarMonth = 11;
      calendarYear--;
    }

    renderDevotionCalendar();
  });

  document.getElementById("nextMonth").addEventListener("click", () => {
    calendarMonth++;

    if (calendarMonth > 11) {
      calendarMonth = 0;
      calendarYear++;
    }

    renderDevotionCalendar();
  });

  container.querySelectorAll("[data-devotion-date]").forEach(button => {
    button.addEventListener("click", () => {
      openDevotionEditor(button.dataset.devotionDate);
    });
  });
}
    // ==============================
// 每日靈修：編輯及儲存
// ==============================

async function openDevotionEditor(date) {
  if (!databaseReady) {
    alert("本機資料庫尚未準備好，請稍後再試。");
    return;
  }

  selectedDevotionDate = date;

  const calendarView = document.getElementById("devotion-calendar-view");
  const editorView = document.getElementById("devotion-editor-view");
  const editor = document.getElementById("devotion-editor");

  if (!calendarView || !editorView || !editor) return;

  const record = await getDevotionRecord(date);

  const dateParts = date.split("-").map(Number);
  const displayDate = new Intl.DateTimeFormat("zh-Hant", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(dateParts[0], dateParts[1] - 1, dateParts[2]));

  editor.innerHTML = `
    <div class="devotion-editor-card">
      <button type="button" id="backToCalendar" class="editor-back">
        ← 返回月曆
      </button>

      <p class="eyebrow">MY DAILY DEVOTION</p>
      <h2>${displayDate}</h2>
      <p class="editor-intro">安靜片刻，記下今天與上帝相遇的點滴。</p>

      <label for="devotionScripture">今日經文</label>
      <input
        id="devotionScripture"
        type="text"
        placeholder="例如：詩篇 23:1-6"
        maxlength="300"
      >

      <label for="devotionNote">靈修筆記</label>
      <textarea
        id="devotionNote"
        rows="10"
        placeholder="今天閱讀經文後，有甚麼領受、提醒或反思？"
      ></textarea>

      <p id="devotionSaveStatus" class="devotion-save-status" role="status"></p>

      <button type="button" id="saveDevotion" class="primary-button">
        儲存靈修紀錄
      </button>

      <button
        type="button"
        id="deleteDevotion"
        class="delete-button"
        ${record ? "" : "hidden"}
      >
        刪除此日紀錄
      </button>
    </div>
  `;

  document.getElementById("devotionScripture").value =
    record?.scripture || "";

  document.getElementById("devotionNote").value =
    record?.note || "";

  calendarView.hidden = true;
  editorView.hidden = false;

  document.getElementById("backToCalendar").addEventListener("click", () => {
    showDevotionCalendar();
  });

  document.getElementById("saveDevotion").addEventListener("click", async () => {
    const scripture = document.getElementById("devotionScripture").value.trim();
    const note = document.getElementById("devotionNote").value.trim();
    const status = document.getElementById("devotionSaveStatus");
    const saveButton = document.getElementById("saveDevotion");

    if (!scripture && !note) {
      status.textContent = "請先填寫經文或靈修筆記。";
      status.classList.add("has-error");
      return;
    }

    saveButton.disabled = true;
    status.textContent = "正在儲存……";
    status.classList.remove("has-error");

    try {
      await saveDevotionRecord(selectedDevotionDate, scripture, note);

      status.textContent = "已成功儲存靈修紀錄。";

      await renderDevotionRecords();
      await showDevotionCalendar();

    } catch (error) {
      status.textContent = "儲存失敗，請再試一次。";
      status.classList.add("has-error");
      saveButton.disabled = false;
      console.error(error);
    }
  });

  document.getElementById("deleteDevotion").addEventListener("click", async () => {
    if (!record) return;

    const confirmed = confirm("確定要刪除這一天的靈修紀錄嗎？此操作不能復原。");

    if (!confirmed) return;

    try {
      await deleteDevotionRecord(selectedDevotionDate);
      await renderDevotionRecords();
      await showDevotionCalendar();
    } catch (error) {
      alert("刪除失敗，請再試一次。");
      console.error(error);
    }
  });
}
    // ==============================
// 紀錄頁面：每日靈修列表
// ==============================

async function renderDevotionRecords() {
  const container = document.getElementById("devotion-record-list");
  if (!container || !databaseReady) return;

  try {
    const records = await getAllDevotionRecords();

    if (records.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-illustration">✎</div>
          <h2>你的第一篇靈修紀錄，等候你寫下</h2>
          <p>在每日靈修月曆選擇日期，記下經文與領受。</p>
          <button type="button" class="text-arrow" id="startFirstDevotion">
            開始靈修記錄 <span>→</span>
          </button>
        </div>
      `;

      document.getElementById("startFirstDevotion").addEventListener("click", () => {
        showPage("devotion");
      });

      return;
    }
    // 顯示講道紀錄列表
async function renderSermonRecords() {
  const container = document.getElementById("devotion-record-list");
  if (!container) return;

  const notes = await getAllNotes();
  const sermonRecords = notes.filter(note => note.category === "sermon");

  container.innerHTML = `
    <div class="devotion-list-heading">
      <div>
        <h3>講道紀錄</h3>
        <p>整理每一次聽道的領受與反思</p>
      </div>
      <button class="primary-button" id="addSermonButton">＋ 新增講道</button>
    </div>

    ${
      sermonRecords.length === 0
        ? `
          <div class="empty-state">
            <div class="empty-state-icon">✎</div>
            <h3>尚未有講道紀錄</h3>
            <p>把每一次聽道的重點和領受記錄下來。</p>
          </div>
        `
        : sermonRecords.map(note => `
          <button class="devotion-record-item sermon-record-item"
                  data-sermon-id="${escapeDevotionText(note.id)}">
            <div class="devotion-record-date">
              ${escapeDevotionText(note.date || "")}
            </div>
            <h3>${escapeDevotionText(note.title || "未命名講道")}</h3>
            <p class="devotion-record-preview">
              講員：${escapeDevotionText(note.speaker || "未填寫")}
            </p>
            <p class="devotion-record-preview">
              ${escapeDevotionText(note.content || "")}
            </p>
          </button>
        `).join("")
    }
    // 開啟講道紀錄編輯畫面
async function openSermonEditor(id) {
  const container = document.getElementById("devotion-record-list");
  if (!container) return;

  const note = id ? await getNote(id) : null;

  const today = getLocalDateKey();

  container.innerHTML = `
    <div class="devotion-editor-card sermon-editor-card">
      <button class="editor-back" id="backToSermonList">
        ← 返回講道紀錄
      </button>

      <h3>${note ? "編輯講道紀錄" : "新增講道紀錄"}</h3>

      <label for="sermonTitle">講道標題</label>
      <input
        id="sermonTitle"
        type="text"
        placeholder="輸入講道標題"
        value="${escapeDevotionText(note?.title || "")}"
      >

      <label for="sermonDate">日期</label>
      <input
        id="sermonDate"
        type="date"
        value="${escapeDevotionText(note?.date || today)}"
      >

      <label for="sermonSpeaker">講員</label>
      <input
        id="sermonSpeaker"
        type="text"
        placeholder="輸入講員姓名"
        value="${escapeDevotionText(note?.speaker || "")}"
      >

      <label for="sermonContent">筆記內容</label>
      <textarea
        id="sermonContent"
        rows="8"
        placeholder="記下講道重點、經文及個人領受..."
      >${escapeDevotionText(note?.content || "")}</textarea>

      <button class="primary-button" id="saveSermonButton">
        儲存講道紀錄
      </button>

      ${
        note
          ? `<button class="delete-button" id="deleteSermonButton">刪除這筆紀錄</button>`
          : ""
      }
// 儲存講道紀錄
async function saveSermonRecord() {
  const title = document.getElementById("sermonTitle").value.trim();
  const date = document.getElementById("sermonDate").value;
  const speaker = document.getElementById("sermonSpeaker").value.trim();
  const content = document.getElementById("sermonContent").value.trim();
  const status = document.getElementById("sermonSaveStatus");

  if (!title || !date || !content) {
    status.textContent = "請填寫講道標題、日期及筆記內容。";
    return;
  }

  const editingId = document
    .getElementById("saveSermonButton")
    .dataset.editingId;

  const note = {
    id: editingId || (
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString()
    ),
    category: "sermon",
    title,
    date,
    speaker,
    content
  };

  try {
    await saveNote(note);
    renderSermonRecords();
  } catch (error) {
    status.textContent = "儲存失敗，請稍後再試。";
    console.error("儲存講道紀錄失敗：", error);
  }
}

// 刪除講道紀錄
async function deleteSermonRecord(id) {
  if (!confirm("確定要刪除這筆講道紀錄嗎？")) return;

  try {
    await deleteNote(id);
    renderSermonRecords();
  } catch (error) {
    alert("刪除失敗，請稍後再試。");
    console.error("刪除講道紀錄失敗：", error);
  }
}
      <p id="sermonSaveStatus" class="devotion-save-status"></p>
    </div>
  `;

  document.getElementById("backToSermonList")
    ?.addEventListener("click", renderSermonRecords);

if (id) {
  document.getElementById("saveSermonButton").dataset.editingId = id;
}
  document.getElementById("saveSermonButton")
    ?.addEventListener("click", saveSermonRecord);

  document.getElementById("deleteSermonButton")
    ?.addEventListener("click", () => deleteSermonRecord(id));
}
  `;

  document.getElementById("addSermonButton")
    ?.addEventListener("click", () => openSermonEditor(null));

  container.querySelectorAll("[data-sermon-id]").forEach(button => {
    button.addEventListener("click", () => {
      openSermonEditor(button.dataset.sermonId);
    });
  });
}

    container.innerHTML = `
      <div class="devotion-list-heading">
        <h2>我的靈修紀錄</h2>
        <span>${records.length} 篇紀錄</span>
      </div>

      <div class="devotion-records">
        ${records.map(record => {
          const parts = record.date.split("-").map(Number);

          const dateText = new Intl.DateTimeFormat("zh-Hant", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
          }).format(new Date(parts[0], parts[1] - 1, parts[2]));

          const preview = record.note
            ? record.note.slice(0, 90)
            : "尚未填寫筆記";

          return `
            <button
              type="button"
              class="devotion-record-item"
              data-record-date="${record.date}"
            >
              <span class="devotion-record-date">${dateText}</span>
              <strong>${escapeDevotionText(record.scripture || "未填寫經文")}</strong>
              <span class="devotion-record-preview">${escapeDevotionText(preview)}${record.note && record.note.length > 90 ? "…" : ""}</span>
              <span class="devotion-record-arrow">查看紀錄 →</span>
            </button>
          `;
        }).join("")}
      </div>
    `;

    container.querySelectorAll("[data-record-date]").forEach(button => {
      button.addEventListener("click", () => {
        showPage("devotion");
        openDevotionEditor(button.dataset.recordDate);
      });
    });

  } catch (error) {
    container.textContent = "暫時無法載入靈修紀錄，請稍後再試。";
    console.error(error);
  }
}

function escapeDevotionText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
    
// ==============================
// 紀錄頁面：五大分類切換
// ==============================

function renderRecordsCategory(category) {
  selectedRecordCategory = category;

  const tabs = document.querySelectorAll("[data-record-category]");

  tabs.forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.recordCategory === category
    );
  });

  const container = document.getElementById("devotion-record-list");
  if (!container) return;

  // 靈修：顯示原有靈修紀錄
  if (category === "devotion") {
    renderDevotionRecords();
    return;
  }
  // 講道：顯示講道紀錄
  if (category === "sermon") {
    renderSermonRecords();
    return;
  }
  
  // 讀經：連接現有讀經功能
  if (category === "bible") {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-illustration">📖</div>
        <h2>聖經閱讀進度</h2>
        <p>你的 66 卷聖經閱讀進度已獨立儲存。</p>
        <button type="button" class="text-arrow" id="openBiblePage">
          前往讀經頁面 <span>→</span>
        </button>
      </div>
    `;

    document.getElementById("openBiblePage").addEventListener("click", () => {
      showPage("bible");
    });

    return;
  }

  const messages = {
    sermon: {
      icon: "✎",
      title: "記下每一次聽道的領受",
      description: "在這裡整理講道標題、日期、講員及筆記。"
    },
    reading: {
      icon: "📚",
      title: "收藏你的屬靈閱讀紀錄",
      description: "記錄書名、作者、閱讀狀態及閱讀筆記。"
    },
    other: {
      icon: "✧",
      title: "留下一些其他筆記",
      description: "記下生活中的信仰反思、想法及其他內容。"
    }
  };

  const item = messages[category];
  if (!item) return;

  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-illustration">${item.icon}</div>
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <p>下一階段將加入新增及管理紀錄功能。</p>
    </div>
  `;
}

// 分類按鈕操作
document.querySelectorAll("[data-record-category]").forEach(button => {
  button.addEventListener("click", () => {
    renderRecordsCategory(button.dataset.recordCategory);
  });
});



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
