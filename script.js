const categoryData = {
  class: { label: "수업 과제", title: "수업에서 몰입했던 과제를 떠올려보세요", questions: ["어떤 수업 과제나 발표였나요?", "내가 맡은 역할과 맡기 어려웠던 점은?", "어떤 지식이나 기술을 실제로 활용했나요?"], color: "#4b82c3", light: "#edf4fc", text: "#315d91" },
  club: { label: "동아리", title: "동아리에서 책임지고 성장한 순간을 떠올려보세요", questions: ["동아리에서 맡은 활동이나 역할은 무엇인가요?", "팀원과 협업하며 해결한 어려움은?", "이 경험을 통해 얻은 역량은 무엇인가요?"], color: "#d6a62a", light: "#fff4cf", text: "#947019" },
  contest: { label: "대회·공모전", title: "새로운 도전을 시작했던 경험을 떠올려보세요", questions: ["어떤 대회나 공모전에 참여했나요?", "시작 전 막막했던 점과 준비 과정은?", "결과와 관계없이 얻은 배움은 무엇인가요?"], color: "#dc7d42", light: "#fff0e5", text: "#a85b2e" },
  work: { label: "알바·인턴", title: "일터에서 배운 경험을 떠올려보세요", questions: ["어떤 업무를 담당했나요?", "기존 방식과 달리 해결했던 일이 있었나요?", "이 경험에서 발견한 강점은 무엇인가요?"], color: "#7567bd", light: "#f0edfb", text: "#51468d" },
  volunteer: { label: "봉사", title: "누군가를 돕고 변화를 만든 경험을 떠올려보세요", questions: ["어떤 봉사 활동에 참여했나요?", "현장에서 마주한 어려움은 무엇인가요?", "나와 상대방에게 어떤 변화가 있었나요?"], color: "#cf6f91", light: "#fceaf1", text: "#9d4d68" },
  hobby: { label: "취미·자기계발", title: "꾸준히 몰입한 자기계발 경험을 떠올려보세요", questions: ["어떤 취미나 공부를 시작하게 되었나요?", "꾸준히 하기 위해 어떤 방법을 사용했나요?", "성장 과정에서 발견한 흥미와 역량은 무엇인가요?"], color: "#36a19a", light: "#e8f7f5", text: "#287b76" },
  award: { label: "수상·자격증", title: "성취를 인정받았던 경험을 떠올려보세요", questions: ["어떤 수상이나 자격을 얻었나요?", "준비 과정에서 어떤 노력을 했나요?", "이 성취가 내 목표와 어떻게 연결되나요?"], color: "#cf6259", light: "#fdeceb", text: "#98463f" }
};

const templateFields = {
  star: [["상황", "어떤 배경에서 경험이 시작됐나요?"], ["과제", "나에게 주어진 목표나 과제는 무엇인가요?"], ["행동", "목표를 위해 내가 직접 한 행동은 무엇인가요?"], ["결과", "어떤 성과와 배움을 얻었나요?"]],
  kpt: [["Keep", "계속 유지하고 싶은 행동이나 좋은 점은?"], ["Problem", "어려웠거나 개선이 필요한 점은?"], ["Try", "다음에 시도할 구체적인 행동은?"]],
  free: [["경험 이야기", "당시 상황과 인상 깊었던 순간을 자유롭게 작성하세요"], ["배운 점", "이 경험을 통해 알게 된 점이나 앞으로의 다짐은?"]]
};

const recordTitleExamples = {
  class: "수업 발표에서 맡은 기획 및 분석 역할",
  club: "동아리 홍보팀 운영과 모집 성과",
  contest: "교내 공모전 기획안 제작과 발표",
  work: "카페 아르바이트에서 고객 응대 개선",
  volunteer: "지역아동센터 학습 멘토링 봉사",
  hobby: "매주 기록하며 완성한 영어 학습 계획",
  award: "정보처리기능사 자격증 준비 경험"
};

const seedRecords = [
  { id: 1, category: "class", date: "2026-11-14", title: "오픈소스 웹 프로젝트 팀장 경험", summary: "팀 역할을 나누고 Git 협업 규칙을 정해 프로젝트를 완성했습니다.", fields: ["학과 오픈소스 수업 팀 프로젝트", "기한 내 완성 가능한 역할 분담", "매주 진척도 공유와 코드 리뷰 진행", "팀 발표와 배포까지 완료"], template: "star", tags: ["팀워크", "Git", "기획"] },
  { id: 2, category: "contest", date: "2026-11-17", title: "교내 디자인 공모전 참가", summary: "처음으로 사용자 화면을 기획하고 실제 시안을 만들었습니다.", fields: ["교내 주최 공모전 참가", "평가 기준과 부족한 디자인 역량", "프로토타입 제작과 피드백 반영", "기대하지 않은 장려상 수상"], template: "star", tags: ["UI/UX", "도전"] },
  { id: 3, category: "volunteer", date: "2026-11-20", title: "발표 리허설에서 피드백 받은 경험", summary: "청중 관점을 반영해 발표 구조와 전달 방식을 개선했습니다.", fields: ["청중이 이해하기 쉬운 발표 구조", "장황한 설명과 부족한 근거", "시나리오를 짧게 나누고 재연습", "핵심 메시지가 전달되는 발표 완성"], template: "kpt", tags: ["커뮤니케이션", "성장"] }
];

let records = JSON.parse(localStorage.getItem("growpath-records") || "null") || seedRecords;
let selectedCategory = "class";
let extractedExperiences = {};
let selectedRecords = new Set();
let selectedTemplate = "star";
let viewDate = new Date();
let editingId = null;
let fullCalendarInstance = null;
let calHeatmapInstance = null;

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-button").forEach(button => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
  document.getElementById(`${tabName}-panel`).classList.add("active");
  if (tabName === "extract") {
    updateGuide();
  }
  if (tabName === "calendar") renderCalendar();
  if (tabName === "list") renderRecords();
}

document.querySelectorAll(".tab-button").forEach(button => button.addEventListener("click", () => switchTab(button.dataset.tab)));

document.querySelectorAll(".extract-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".extract-tab").forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    selectedCategory = tab.dataset.category;
    updateGuide();
  });
});

function updateGuide() {
  const data = categoryData[selectedCategory];
  document.getElementById("guideTag").textContent = data.label;
  document.getElementById("guideTitle").textContent = data.title;
  const guideTag = document.getElementById("guideTag");
  guideTag.style.background = data.light;
  guideTag.style.color = data.text;
  const extractWorkspace = document.querySelector(".extract-workspace");
  if (extractWorkspace) extractWorkspace.style.borderLeftColor = data.color;
  document.querySelectorAll(".extract-tab").forEach(tab => {
    const tabData = categoryData[tab.dataset.category];
    tab.classList.toggle("active", tab.dataset.category === selectedCategory);
    if (tab.dataset.category === selectedCategory) {
      tab.style.setProperty("--category-color", tabData.color);
      tab.style.background = tabData.light;
      tab.style.borderColor = tabData.color;
      tab.style.color = tabData.text;
    } else {
      tab.style.removeProperty("--category-color");
      tab.style.background = "";
      tab.style.borderColor = "";
      tab.style.color = "";
    }
  });
  const saved = extractedExperiences[selectedCategory] || [""];
  document.getElementById("questionList").innerHTML = data.questions.map((question, index) =>
    `<div class="question-item"><span>${index + 1}</span>${escapeHtml(question)}</div>`
  ).join("");
  document.getElementById("experienceInputList").innerHTML = "";
  saved.forEach((value, index) => addExperienceInput(index + 1, value));
  updateExperienceCount();
  if (window.lucide) lucide.createIcons();
}

function addExperienceInput(number, value = "") {
  const inputIndex = number - 1;
  const data = categoryData[selectedCategory];
  const wrapper = document.createElement("div");
  wrapper.className = "experience-input";
  const deleteButton = number === 1
    ? ""
    : `<button type="button" class="experience-delete-button" aria-label="경험 ${number} 삭제"><i data-lucide="trash-2"></i></button>`;
  wrapper.innerHTML = `<div class="experience-input-header"><span>${number}</span><strong>경험 ${number}</strong>${deleteButton}</div><textarea class="experience-answer" data-index="${inputIndex}" maxlength="180" placeholder="${escapeHtml(data.questions[0])}"></textarea>`;
  document.getElementById("experienceInputList").appendChild(wrapper);
  const textarea = wrapper.querySelector("textarea");
  textarea.value = value;
  textarea.addEventListener("input", () => updateExperienceCount());
  const deleteButtonElement = wrapper.querySelector(".experience-delete-button");
  if (deleteButtonElement) {
    deleteButtonElement.addEventListener("click", () => deleteExperienceInput(inputIndex));
  }
}

document.getElementById("addExperienceButton").addEventListener("click", () => {
  const currentCount = document.querySelectorAll(".experience-answer").length;
  const saved = extractedExperiences[selectedCategory] || [""];
  saved.push("");
  extractedExperiences[selectedCategory] = saved;
  addExperienceInput(currentCount + 1);
  updateExperienceCount();
  if (window.lucide) lucide.createIcons();
});

function deleteExperienceInput(index) {
  const values = Array.from(document.querySelectorAll(".experience-answer")).map(textarea => textarea.value);
  values.splice(index, 1);
  if (values.length === 0) values.push("");
  extractedExperiences[selectedCategory] = values;
  document.getElementById("experienceInputList").innerHTML = "";
  values.forEach((value, valueIndex) => addExperienceInput(valueIndex + 1, value));
  updateExperienceCount();
  if (window.lucide) lucide.createIcons();
  showToast("경험 입력을 삭제했어요");
}

function updateExperienceCount() {
  const answers = Array.from(document.querySelectorAll(".experience-answer"));
  extractedExperiences[selectedCategory] = answers.map(answer => answer.value);
  const filledCount = Object.values(extractedExperiences)
    .flat()
    .filter(answer => typeof answer === "string" && answer.trim()).length;
  document.getElementById("experienceCount").textContent = `${filledCount} / 3 경험 입력`;
  const jobMatchButton = document.getElementById("jobMatchButton");
  jobMatchButton.disabled = filledCount < 3;
  jobMatchButton.title = jobMatchButton.disabled ? "세 가지 경험을 모두 입력해주세요" : "직무 매칭 기능은 별도 파트입니다";
}

function startWriting() {
  switchTab("write");
  document.getElementById("recordCategory").value = selectedCategory;
  updateTitlePlaceholder(selectedCategory);
  renderTemplateFields();
  setTimeout(() => document.getElementById("recordTitle").focus(), 50);
}

function updateTitlePlaceholder(category) {
  document.getElementById("recordTitle").placeholder = `예) ${recordTitleExamples[category]}`;
}

document.getElementById("recordCategory").addEventListener("change", event => {
  updateTitlePlaceholder(event.target.value);
});

document.getElementById("startRecord").addEventListener("click", startWriting);
document.getElementById("jobMatchButton").addEventListener("click", () => {
  if (!document.getElementById("jobMatchButton").disabled) showToast("직무 매칭 화면으로 연결할 준비가 되었어요");
});
document.getElementById("quickAddButton").addEventListener("click", () => {
  selectedTemplate = "star";
  document.querySelectorAll(".template-item").forEach(item => item.classList.toggle("active", item.dataset.template === "star"));
  startWriting();
});

document.querySelectorAll(".template-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".template-item").forEach(template => template.classList.remove("active"));
    item.classList.add("active");
    selectedTemplate = item.dataset.template;
    renderTemplateFields();
  });
});

function renderTemplateFields() {
  const fields = templateFields[selectedTemplate];
  document.getElementById("dynamicFields").innerHTML = fields.map(([label, placeholder], index) =>
    `<label>${escapeHtml(label)}<textarea name="field${index}" placeholder="${escapeHtml(placeholder)}"></textarea></label>`
  ).join("");
  if (!document.getElementById("recordDate").value) {
    document.getElementById("recordDate").value = new Date().toISOString().slice(0, 10);
  }
}

document.getElementById("saveDraft").addEventListener("click", () => {
  saveDraft();
  showToast("임시저장했어요");
});

function saveDraft() {
  const form = new FormData(document.getElementById("recordForm"));
  const draft = Object.fromEntries(form.entries());
  draft.template = selectedTemplate;
  localStorage.setItem("growpath-draft", JSON.stringify(draft));
  document.getElementById("saveStatus").innerHTML = '<i data-lucide="cloud"></i>방금 임시저장';
  if (window.lucide) lucide.createIcons();
}

document.getElementById("recordForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const title = form.get("title").trim();
  if (!title) {
    showToast("기록 제목을 입력해주세요");
    return;
  }
  const fields = [];
  for (const [key, value] of form.entries()) {
    if (key.startsWith("field")) fields.push(value.trim());
  }
  const record = {
    id: Date.now(),
    category: form.get("category"),
    date: form.get("date") || new Date().toISOString().slice(0, 10),
    title,
    summary: form.get("summary").trim(),
    fields,
    template: selectedTemplate,
    tags: [categoryData[form.get("category")].label]
  };
  if (editingId !== null) {
    record.id = editingId;
    records = records.map(item => item.id === editingId ? record : item);
    editingId = null;
  } else {
    records.unshift(record);
  }
  localStorage.setItem("growpath-records", JSON.stringify(records));
  localStorage.removeItem("growpath-draft");
  event.currentTarget.reset();
  document.getElementById("editorTitle").textContent = "새 경험 기록";
  renderTemplateFields();
  renderRecords();
  renderCalendar();
  switchTab("list");
  showToast("새 경험을 기록했어요");
});

function renderRecords(query = "") {
  const filter = document.getElementById("categoryFilter").value;
  let filtered = records.filter(record => filter === "all" || record.category === filter);
  if (query.trim() && window.Fuse) {
    filtered = new Fuse(filtered, { keys: ["title", "summary", "tags", "fields"], threshold: 0.38 }).search(query.trim()).map(result => result.item);
  } else if (query.trim()) {
    filtered = filtered.filter(record => JSON.stringify(record).toLowerCase().includes(query.trim().toLowerCase()));
  }
  const sortOrder = document.getElementById("recordSort").value;
  filtered = [...filtered].sort((a, b) => {
    const dateDiff = new Date(`${a.date}T12:00:00`) - new Date(`${b.date}T12:00:00`);
    return sortOrder === "oldest" ? dateDiff : -dateDiff;
  });
  document.getElementById("recordCount").textContent = records.length;
  const list = document.getElementById("recordList");
  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state"><i data-lucide="notebook-pen"></i><h3>아직 이 조건의 기록이 없어요</h3><p>새 경험을 기록하고 성장 목록을 채워보세요.</p><button class="primary-button" id="emptyAdd"><i data-lucide="plus"></i>첫 기록 작성</button></div>`;
    document.getElementById("emptyAdd").addEventListener("click", () => startWriting());
  } else {
    list.innerHTML = filtered.map(record => {
      const date = new Date(`${record.date}T12:00:00`);
      const category = categoryData[record.category];
      const dateStyle = category
        ? `style="background:${category.light};color:${category.text}"`
        : "";
      return `<article class="record-card${selectedRecords.has(record.id) ? " selected" : ""}">
        <input class="record-select" type="checkbox" aria-label="${escapeHtml(record.title)} 선택" data-select="${record.id}" ${selectedRecords.has(record.id) ? "checked" : ""}>
        <div class="record-date" ${dateStyle}><strong>${date.getDate()}</strong><small>${String(date.getMonth() + 1).padStart(2, "0")}월</small></div>
        <div class="record-info"><h3><button type="button" class="record-title-button" data-view="${record.id}" aria-label="${escapeHtml(record.title)} 내용 보기">${escapeHtml(record.title)}</button></h3><p>${escapeHtml(record.summary || record.fields.join(" · "))}</p><div class="record-tags">${(record.tags || [categoryData[record.category].label]).map(tag => `<span class="record-tag">${escapeHtml(tag)}</span>`).join("")}</div></div>
        <div class="record-actions"><button class="icon-button" aria-label="기록 편집" data-edit="${record.id}"><i data-lucide="pencil"></i></button><button class="icon-button" aria-label="기록 삭제" data-delete="${record.id}"><i data-lucide="trash-2"></i></button></div>
      </article>`;
    }).join("");
  }
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll("[data-select]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const id = Number(checkbox.dataset.select);
      if (checkbox.checked) selectedRecords.add(id);
      else selectedRecords.delete(id);
      checkbox.closest(".record-card").classList.toggle("selected", checkbox.checked);
      updateProjectGroupButton();
    });
  });
  document.querySelectorAll("[data-delete]").forEach(button => button.addEventListener("click", () => {
    const id = Number(button.dataset.delete);
    records = records.filter(record => record.id !== id);
    selectedRecords.delete(id);
    updateProjectGroupButton();
    localStorage.setItem("growpath-records", JSON.stringify(records));
    renderRecords(document.getElementById("recordSearch").value);
    renderCalendar();
    showToast("기록을 삭제했어요");
  }));
  document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => {
    openRecordView(Number(button.dataset.view));
  }));
  document.querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click", () => {
    const record = records.find(item => item.id === Number(button.dataset.edit));
    editingId = record.id;
    selectedTemplate = record.template || "star";
    switchTab("write");
    document.querySelectorAll(".template-item").forEach(item => item.classList.toggle("active", item.dataset.template === selectedTemplate));
    document.getElementById("recordCategory").value = record.category;
    updateTitlePlaceholder(record.category);
    document.getElementById("recordDate").value = record.date;
    document.getElementById("recordTitle").value = record.title;
    document.getElementById("recordSummary").value = record.summary;
    renderTemplateFields();
    templateFields[selectedTemplate].forEach((_, index) => {
      const textarea = document.querySelector(`[name="field${index}"]`);
      if (textarea) textarea.value = record.fields[index] || "";
    });
    document.getElementById("editorTitle").textContent = "기록 수정";
  }));
}

document.getElementById("recordSearch").addEventListener("input", event => renderRecords(event.target.value));
document.getElementById("categoryFilter").addEventListener("change", () => renderRecords(document.getElementById("recordSearch").value));
document.getElementById("recordSort").addEventListener("change", () => renderRecords(document.getElementById("recordSearch").value));
document.getElementById("projectGroupButton").addEventListener("click", () => {
  if (selectedRecords.size > 0) showToast(`${selectedRecords.size}개 기록을 프로젝트로 묶을 준비가 되었어요`);
});

let recordViewTrigger = null;

function openRecordView(id) {
  const record = records.find(item => item.id === id);
  if (!record) return;
  recordViewTrigger = document.activeElement;
  const category = categoryData[record.category] || { label: "기타", light: "#edf3f8", text: "#53647a" };
  const date = new Date(`${record.date}T12:00:00`);
  const dateText = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  const fieldDefinitions = templateFields[record.template] || templateFields.star;
  const fields = fieldDefinitions.map(([label], index) => `
    <div class="record-view-field">
      <strong>${escapeHtml(label)}</strong>
      <p>${escapeHtml(record.fields[index] || "작성된 내용이 없습니다.")}</p>
    </div>
  `).join("");
  const tags = (record.tags || [category.label]).map(tag => `<span class="record-tag">${escapeHtml(tag)}</span>`).join("");

  document.getElementById("recordViewContent").innerHTML = `
    <div class="record-view-header">
      <span class="record-view-category" style="background:${category.light};color:${category.text}">${escapeHtml(category.label)}</span>
      <h2 id="recordViewTitle">${escapeHtml(record.title)}</h2>
      <span class="record-view-date">${escapeHtml(dateText)}</span>
    </div>
    ${record.summary ? `<p class="record-view-summary"><strong>한 줄 요약</strong><br>${escapeHtml(record.summary)}</p>` : ""}
    <div class="record-view-fields">${fields}</div>
    <div class="record-view-tags">${tags}</div>
  `;

  const modal = document.getElementById("recordViewModal");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".record-view-close").focus();
  if (window.lucide) lucide.createIcons();
}

function closeRecordView() {
  const modal = document.getElementById("recordViewModal");
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.removeProperty("overflow");
  if (recordViewTrigger && typeof recordViewTrigger.focus === "function") recordViewTrigger.focus();
  recordViewTrigger = null;
}

document.querySelectorAll("[data-close-record-view]").forEach(element => {
  element.addEventListener("click", closeRecordView);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeRecordView();
});

function updateProjectGroupButton() {
  const button = document.getElementById("projectGroupButton");
  button.disabled = selectedRecords.size === 0;
  document.getElementById("selectedRecordCount").textContent = selectedRecords.size;
}

function renderCalendar() {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  document.getElementById("calendarTitle").textContent = `${year}년 ${month + 1}월`;
  if (window.FullCalendar) {
    const calendarEvents = records.map(record => ({
      id: String(record.id),
      title: record.title,
      start: record.date,
      allDay: true,
      backgroundColor: categoryData[record.category]?.color || "#4b82c3",
      borderColor: categoryData[record.category]?.color || "#4b82c3",
      textColor: "#ffffff"
    }));
    if (!fullCalendarInstance) {
      fullCalendarInstance = new FullCalendar.Calendar(document.getElementById("fullCalendar"), {
        initialView: "dayGridMonth",
        initialDate: viewDate,
        locale: "ko",
        headerToolbar: false,
        height: "auto",
        dayMaxEvents: 2,
        events: calendarEvents,
        dateClick: info => {
          document.getElementById("recordDate").value = info.dateStr;
          startWriting();
        }
      });
      fullCalendarInstance.render();
    } else {
      fullCalendarInstance.gotoDate(viewDate);
      fullCalendarInstance.removeAllEvents();
      fullCalendarInstance.addEventSource(calendarEvents);
    }
  }
  const monthCount = records.filter(record => record.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length;
  document.getElementById("monthRecordCount").textContent = `이달의 기록 ${monthCount}개`;
  renderStreak();
}

function renderStreak() {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  const streakSource = records.map(record => ({ date: `${record.date}T12:00:00`, value: 1 }));
  document.getElementById("streakWeek").innerHTML = days.map((day, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - mondayOffset + index);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const done = records.some(record => record.date === dateKey);
    return `<div class="streak-day${done ? " done" : ""}">${day}<i><i data-lucide="${done ? "check" : "minus"}"></i></i></div>`;
  }).join("");
  initializeCalHeatmap(streakSource);
  const streakDates = new Set(records.map(record => record.date));
  let streak = 0;
  const cursor = new Date();
  while (streakDates.has(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`)) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  document.getElementById("streakCount").textContent = streak || 0;
}

async function initializeCalHeatmap(source) {
  try {
    if (!calHeatmapInstance && window.CalHeatmap) {
      calHeatmapInstance = new window.CalHeatmap();
    }
    if (!calHeatmapInstance) return;
    await calHeatmapInstance.paint({
      itemSelector: "#streakWeek",
      range: 1,
      domain: {
        type: "month",
        gutter: 0,
        label: { text: "", position: "top" }
      },
      subDomain: {
        type: "day",
        radius: 12,
        width: 24,
        height: 24,
        gutter: 5
      },
      date: { start: new Date(new Date().setDate(new Date().getDate() - 6)) },
      data: { source, x: "date", y: "value" },
      scale: { color: { type: "linear", domain: [0, 1], range: ["#edf2f6", "#2889d2"] } }
    });
  } catch (error) {
    if (window.lucide) lucide.createIcons();
  }
}

document.getElementById("prevMonth").addEventListener("click", () => { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1); renderCalendar(); });
document.getElementById("nextMonth").addEventListener("click", () => { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1); renderCalendar(); });

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

updateGuide();
renderTemplateFields();
renderRecords();
renderCalendar();
updateProjectGroupButton();
updateTitlePlaceholder(document.getElementById("recordCategory").value);
if (window.lucide) lucide.createIcons();
