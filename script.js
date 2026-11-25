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

selectCategory(categoryTabs[0]);
