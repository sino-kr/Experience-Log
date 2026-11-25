const tabs = Array.from(document.querySelectorAll(".tab-bar [role='tab']"));
const categoryData = {
  class: {
    label: "수업 과제",
    title: "수업에서 몰입했던 과제를 떠올려보세요",
    questions: ["어떤 수업 과제나 발표였나요?", "내가 맡은 역할과 어려웠던 점은 무엇인가요?", "어떤 지식이나 기술을 활용했나요?"]
  },
  club: {
    label: "동아리",
    title: "동아리에서 책임지고 성장한 순간을 떠올려보세요",
    questions: ["동아리에서 맡은 활동이나 역할은 무엇인가요?", "팀원과 협업하며 해결한 어려움은 무엇인가요?", "이 경험을 통해 얻은 역량은 무엇인가요?"]
  },
  contest: {
    label: "대회·공모전",
    title: "새로운 도전을 시작했던 경험을 떠올려보세요",
    questions: ["어떤 대회나 공모전에 참여했나요?", "준비 과정에서 어려웠던 점은 무엇인가요?", "결과와 관계없이 얻은 배움은 무엇인가요?"]
  },
  work: {
    label: "알바·인턴",
    title: "일터에서 배운 경험을 떠올려보세요",
    questions: ["어떤 업무를 담당했나요?", "기존 방식과 달리 해결했던 일이 있었나요?", "이 경험에서 발견한 강점은 무엇인가요?"]
  },
  volunteer: {
    label: "봉사",
    title: "누군가를 돕고 변화를 만든 경험을 떠올려보세요",
    questions: ["어떤 봉사 활동에 참여했나요?", "현장에서 마주한 어려움은 무엇인가요?", "나와 상대방에게 어떤 변화가 있었나요?"]
  },
  hobby: {
    label: "취미·자기계발",
    title: "꾸준히 몰입한 자기계발 경험을 떠올려보세요",
    questions: ["어떤 취미나 공부를 시작하게 되었나요?", "꾸준히 하기 위해 어떤 방법을 사용했나요?", "성장 과정에서 발견한 흥미와 역량은 무엇인가요?"]
  },
  award: {
    label: "수상·자격증",
    title: "성취를 인정받았던 경험을 떠올려보세요",
    questions: ["어떤 수상이나 자격을 얻었나요?", "준비 과정에서 어떤 노력을 했나요?", "이 성취가 내 목표와 어떻게 연결되나요?"]
  }
};

const templateData = {
  star: [
    { label: "상황", placeholder: "어떤 배경에서 경험이 시작됐나요?" },
    { label: "과제", placeholder: "나에게 주어진 목표나 과제는 무엇이었나요?" },
    { label: "행동", placeholder: "목표를 위해 내가 직접 한 행동은 무엇인가요?" },
    { label: "결과", placeholder: "어떤 성과와 배움을 얻었나요?" }
  ],
  kpt: [
    { label: "Keep", placeholder: "계속 유지하고 싶은 행동이나 좋은 점은 무엇인가요?" },
    { label: "Problem", placeholder: "어려웠거나 개선이 필요한 점은 무엇인가요?" },
    { label: "Try", placeholder: "다음에 시도할 구체적인 행동은 무엇인가요?" }
  ],
  free: [
    { label: "경험 이야기", placeholder: "당시 상황과 인상 깊었던 순간을 자유롭게 적어보세요." },
    { label: "배운 점", placeholder: "이 경험을 통해 알게 된 점이나 앞으로의 다짐은 무엇인가요?" }
  ]
};

const recordStorageKey = "experience-log-records";
const templateButtons = Array.from(document.querySelectorAll(".template-item"));
const templateDrafts = Object.fromEntries(Object.keys(templateData).map(key => [key, []]));
let selectedTemplate = "star";
let records = loadRecords();

const categoryTabs = Array.from(document.querySelectorAll(".extract-tab"));
const experiences = Object.fromEntries(
  Object.keys(categoryData).map(category => [category, [""]])
);
let selectedCategory = "class";

function activateTab(tab, moveFocus = false) {
  tabs.forEach(item => {
    const isActive = item === tab;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;

    const panel = document.getElementById(item.getAttribute("aria-controls"));
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });

  if (tab.id === "list-tab") renderRecords();
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", event => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
});

function renderExperienceInputs() {
  const list = document.getElementById("experienceInputList");
  list.replaceChildren();

  experiences[selectedCategory].forEach((value, index) => {
    const item = document.createElement("div");
    item.className = "experience-input";

    const label = document.createElement("label");
    label.className = "experience-input-label";
    label.htmlFor = `experience-${index + 1}`;
    label.textContent = `경험 ${index + 1}`;

    const textarea = document.createElement("textarea");
    textarea.id = label.htmlFor;
    textarea.maxLength = 180;
    textarea.rows = 3;
    textarea.placeholder = categoryData[selectedCategory].questions[0];
    textarea.value = value;
    textarea.addEventListener("input", () => {
      experiences[selectedCategory][index] = textarea.value;
      updateExperienceCount();
    });

    const removeButton = document.createElement("button");
    removeButton.className = "remove-experience-button";
    removeButton.type = "button";
    removeButton.textContent = "삭제";
    removeButton.setAttribute("aria-label", `경험 ${index + 1} 삭제`);
    removeButton.addEventListener("click", () => {
      experiences[selectedCategory].splice(index, 1);
      if (experiences[selectedCategory].length === 0) experiences[selectedCategory].push("");
      renderExperienceInputs();
      updateExperienceCount();
    });

    item.append(label, textarea, removeButton);
    list.append(item);
  });
}

function updateExperienceCount() {
  const filledCount = Object.values(experiences)
    .flat()
    .filter(value => value.trim().length > 0).length;
  const jobMatchButton = document.getElementById("jobMatchButton");
  const isReady = filledCount >= 3;

  document.getElementById("experienceCount").textContent =
    `입력한 경험 ${filledCount}개 (직무 매칭은 3개 이상)`;
  jobMatchButton.disabled = !isReady;
  jobMatchButton.title = isReady ? "" : "경험을 3개 이상 입력해주세요";
}

function selectCategory(tab, moveFocus = false) {
  selectedCategory = tab.dataset.category;
  categoryTabs.forEach(item => {
    const isActive = item === tab;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  const data = categoryData[selectedCategory];
  const panel = document.getElementById("category-panel");
  panel.setAttribute("aria-labelledby", tab.id);
  document.getElementById("guideTag").textContent = data.label;
  document.getElementById("guideTitle").textContent = data.title;

  const questionList = document.getElementById("questionList");
  questionList.replaceChildren();
  data.questions.forEach(question => {
    const item = document.createElement("li");
    item.textContent = question;
    questionList.append(item);
  });

  renderExperienceInputs();
  updateExperienceCount();
  if (moveFocus) tab.focus();
}

categoryTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCategory(tab));
  tab.addEventListener("keydown", event => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % categoryTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + categoryTabs.length) % categoryTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = categoryTabs.length - 1;
    else return;

    event.preventDefault();
    selectCategory(categoryTabs[nextIndex], true);
  });
});

document.getElementById("addExperienceButton").addEventListener("click", () => {
  experiences[selectedCategory].push("");
  renderExperienceInputs();
  updateExperienceCount();
  document.querySelector("#experienceInputList .experience-input:last-child textarea").focus();
});

document.getElementById("jobMatchButton").addEventListener("click", () => {
  if (!document.getElementById("jobMatchButton").disabled) {
    document.getElementById("matchStatus").textContent =
      "직무 매칭 기능은 다음 단계에서 연결됩니다.";
  }
});

function isStoredRecord(record) {
  return record !== null
    && typeof record === "object"
    && (typeof record.id === "number" || typeof record.id === "string")
    && Object.hasOwn(categoryData, record.category)
    && typeof record.date === "string"
    && typeof record.title === "string"
    && typeof record.summary === "string"
    && Object.hasOwn(templateData, record.template)
    && Array.isArray(record.fields)
    && record.fields.every(field =>
      field !== null
      && typeof field === "object"
      && typeof field.label === "string"
      && typeof field.value === "string"
    );
}

function loadRecords() {
  const savedRecords = localStorage.getItem(recordStorageKey);
  if (savedRecords === null) return [];

  const parsedRecords = JSON.parse(savedRecords);
  if (!Array.isArray(parsedRecords) || !parsedRecords.every(isStoredRecord)) {
    throw new TypeError("저장된 경험 기록 데이터 형식이 올바르지 않습니다.");
  }
  return parsedRecords;
}

function localDateString() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function renderTemplateFields() {
  const container = document.getElementById("dynamicFields");
  container.replaceChildren();

  templateData[selectedTemplate].forEach((field, index) => {
    const label = document.createElement("label");
    label.className = "template-field";
    label.htmlFor = `template-field-${index}`;
    label.textContent = field.label;

    const textarea = document.createElement("textarea");
    textarea.id = label.htmlFor;
    textarea.name = `field-${index}`;
    textarea.rows = 3;
    textarea.placeholder = field.placeholder;
    textarea.value = templateDrafts[selectedTemplate][index] || "";
    textarea.addEventListener("input", () => {
      templateDrafts[selectedTemplate][index] = textarea.value;
    });

    label.append(textarea);
    container.append(label);
  });
}

function selectTemplate(button) {
  selectedTemplate = button.dataset.template;
  templateButtons.forEach(item => {
    const isActive = item === button;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
  renderTemplateFields();
}

function renderRecords(query = "") {
  const recordList = document.getElementById("recordList");
  const searchStatus = document.getElementById("searchStatus");
  const trimmedQuery = query.trim();

  if (typeof window.Fuse !== "function") {
    recordList.replaceChildren();
    searchStatus.textContent = "Fuse.js를 불러오지 못해 기록을 검색할 수 없습니다. 페이지를 새로고침해 주세요.";
    return;
  }

  searchStatus.textContent = "";
  const searchableRecords = records.map(record => ({
    ...record,
    categoryLabel: categoryData[record.category].label
  }));
  const fuse = new window.Fuse(searchableRecords, {
    keys: ["title", "summary", "categoryLabel", "fields.value"],
    threshold: 0.38,
    ignoreLocation: true
  });
  const matchedRecords = trimmedQuery
    ? fuse.search(trimmedQuery).map(result => result.item)
    : records;
  document.getElementById("recordCount").textContent =
    `${matchedRecords.length}개 기록${trimmedQuery ? " 검색됨" : ""}`;
  recordList.replaceChildren();

  if (matchedRecords.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = trimmedQuery
      ? "검색어와 일치하는 기록이 없습니다."
      : "아직 저장된 기록이 없습니다. 기록 작성 탭에서 첫 경험을 남겨보세요.";
    recordList.append(emptyMessage);
    return;
  }

  matchedRecords.forEach(record => {
    const card = document.createElement("article");
    card.className = "record-card";

    const header = document.createElement("div");
    header.className = "record-card-header";
    const title = document.createElement("h3");
    title.textContent = record.title;
    const date = document.createElement("time");
    date.dateTime = record.date;
    date.textContent = record.date;
    header.append(title, date);

    const metadata = document.createElement("p");
    metadata.className = "record-meta";
    metadata.textContent = `${categoryData[record.category].label} · ${record.template.toUpperCase()}`;

    const summary = document.createElement("p");
    summary.className = "record-summary";
    summary.textContent = record.summary || "요약이 작성되지 않았습니다.";

    const details = document.createElement("details");
    const detailsSummary = document.createElement("summary");
    detailsSummary.textContent = "기록 내용 보기";
    const fieldList = document.createElement("dl");
    record.fields.forEach(field => {
      const fieldLabel = document.createElement("dt");
      fieldLabel.textContent = field.label;
      const fieldValue = document.createElement("dd");
      fieldValue.textContent = field.value || "작성 내용 없음";
      fieldList.append(fieldLabel, fieldValue);
    });
    details.append(detailsSummary, fieldList);
    card.append(header, metadata, summary, details);
    recordList.append(card);
  });
}

templateButtons.forEach(button => {
  button.addEventListener("click", () => selectTemplate(button));
});

document.getElementById("recordForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const title = document.getElementById("recordTitle").value.trim();
  if (!title) {
    document.getElementById("saveStatus").textContent = "기록 제목을 입력해 주세요.";
    document.getElementById("recordTitle").focus();
    return;
  }

  const category = document.getElementById("recordCategory").value;
  const fields = templateData[selectedTemplate].map((field, index) => ({
    label: field.label,
    value: form.elements.namedItem(`field-${index}`).value.trim()
  }));
  const record = {
    id: Date.now(),
    category,
    date: document.getElementById("recordDate").value,
    title,
    summary: document.getElementById("recordSummary").value.trim(),
    template: selectedTemplate,
    fields
  };
  const updatedRecords = [record, ...records];
  localStorage.setItem(recordStorageKey, JSON.stringify(updatedRecords));
  records = updatedRecords;

  form.reset();
  document.getElementById("recordDate").value = localDateString();
  document.getElementById("saveStatus").textContent = "경험 기록을 저장했습니다.";
  templateDrafts[selectedTemplate] = [];
  renderTemplateFields();
  activateTab(tabs.find(tab => tab.id === "list-tab"));
});

document.getElementById("recordSearch").addEventListener("input", event => {
  renderRecords(event.currentTarget.value);
});

selectTemplate(templateButtons[0]);
document.getElementById("recordDate").value = localDateString();
selectCategory(categoryTabs[0]);
