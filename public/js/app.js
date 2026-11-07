import { mountStudio } from "./car3d.js?v=wire2";
import { ensurePartPhotos, openPartViewer, closePartViewer } from "./partModels.js?v=model8";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const state = {
  system: "front-suspension",
  view: "hero",
  query: "",
  part: null,
  history: [],
  editing: null,
  catalogSys: "all",
  catalogQ: "",
  project: null,
  workbookMsg: "",
};
let workshop = { log: [], parts: {}, systems: {}, vehicle: {} };
let studio = null;

const VIEW_FOR = {
  "front-suspension": "front",
  "front-dampers": "front",
  steering: "front",
  wheels: "hero",
  "rear-suspension": "rear",
  driveline: "rear",
  engine: "engine",
  cooling: "engine",
  fluids: "engine",
  electrical: "hero",
  body: "hero",
  chassis: "side",
  brakes: "side",
};

async function init() {
  await loadWorkshop();
  renderRail();
  renderStage();
  renderPanel(state.system);
  $("#q").addEventListener("input", onSearch);
  $("#q").addEventListener("focus", onSearch);
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search") && !e.target.closest(".search-hits")) {
      $("#hits").classList.remove("on");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      $("#ask").focus();
    }
    if (e.key === "Escape") closeLight();
  });
  $("#lightbox").addEventListener("click", closeLight);
  $("#askForm").addEventListener("submit", (e) => {
    e.preventDefault();
    sendAsk();
  });
  $("#chatlog").addEventListener("click", (e) => {
    const p = e.target.closest("[data-pill]");
    if (p) {
      $("#ask").value = p.dataset.pill;
      sendAsk();
    }
  });
  $(".phone-nav")?.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.open === "workbook") {
      openWorkbook();
      return;
    }
    if (!b.dataset.phone) return;
    if (state.view === "workbook" && b.dataset.phone === "stage") {
      state.view = "hero";
      renderStage();
    }
    showPhone(b.dataset.phone);
  });
  $("#picker")?.addEventListener("click", onPicker);
  syncPhoneLabel();
}

const PICK_VIEWS = [
  ["hero", "Sketch"],
  ["side", "Side"],
  ["front", "Front"],
  ["rear", "Rear"],
  ["engine", "Bay"],
  ["diagram", "Diagram"],
  ["guide", "Book"],
  ["catalog", "Catalog"],
  ["workbook", "Workbook"],
];

function renderPicker() {
  const box = $("#picker");
  if (!box) return;
  const sketch = ["hero", "side", "front", "rear", "engine"].includes(state.view);
  const diagram = state.view === "diagram" && state.system;
  const sys = ZO.systems.find((s) => s.id === state.system);
  const views = PICK_VIEWS.map(
    ([id, label]) =>
      `<button type="button" data-view="${id}" class="${state.view === id ? "on" : ""}">${label}</button>`
  ).join("");
  let body = "";
  if (sketch) {
    body = `
      <div class="picker-head">
        <button type="button" data-step="-1" aria-label="Previous system">‹</button>
        <div><span>Navigator</span><b>${esc(sys ? sys.name : "Systems")}</b></div>
        <button type="button" data-step="1" aria-label="Next system">›</button>
      </div>
      <div class="picker-list">
        ${ZO.systems
          .map(
            (s) =>
              `<button type="button" class="picker-item ${s.id === state.system ? "on" : ""}" data-sys="${s.id}"><b>${esc(s.name)}</b><small>${esc(s.short || s.statusLabel || "")}</small></button>`
          )
          .join("")}
      </div>`;
  } else if (diagram) {
    const parts = ZO.parts.filter((p) => p.system === state.system);
    body = `
      <div class="picker-head">
        <button type="button" data-step="-1" aria-label="Previous system">‹</button>
        <div><span>Navigator</span><b>${esc(sys ? sys.name : "Parts")}</b></div>
        <button type="button" data-step="1" aria-label="Next system">›</button>
      </div>
      <div class="picker-list">
        ${parts
          .map(
            (p) =>
              `<button type="button" class="picker-item ${p.id === state.part ? "on" : ""}" data-part="${p.id}"><b>${esc(p.name)}</b><small>${esc(p.pn || "")}</small></button>`
          )
          .join("")}
      </div>`;
  }
  box.innerHTML = `<div class="picker-views">${views}</div>${body}`;
  const on = box.querySelector(".picker-item.on");
  if (on && getComputedStyle(box).display !== "none") on.scrollIntoView({ block: "nearest" });
}

function stepSystem(dir) {
  const ids = ZO.systems.map((s) => s.id);
  let i = ids.indexOf(state.system);
  if (i < 0) i = 0;
  const next = ids[(i + dir + ids.length) % ids.length];
  if (state.view === "diagram") select(next, { view: "diagram" });
  else {
    state.system = next;
    state.part = null;
    renderRail();
    renderPanel(next);
    renderStage();
    if (studio) studio.setHighlight(next);
  }
}

function onPicker(e) {
  const view = e.target.closest("[data-view]");
  if (view) {
    const v = view.dataset.view;
    if (v === "guide") openGuide();
    else if (v === "catalog") openCatalog();
    else if (v === "workbook") openWorkbook();
    else setView(v);
    return;
  }
  const step = e.target.closest("[data-step]");
  if (step) {
    stepSystem(Number(step.dataset.step));
    return;
  }
  const sys = e.target.closest("[data-sys]");
  if (sys) {
    select(sys.dataset.sys, { view: "diagram" });
    return;
  }
  const part = e.target.closest("[data-part]");
  if (!part) return;
  const p = ZO.parts.find((x) => x.id === part.dataset.part);
  if (!p) return;
  select(p.system, { part: p.id, view: "diagram" });
  showPhone("dock");
}

function stagePhoneLabel() {
  if (state.view === "catalog") return "Catalog";
  if (state.view === "project") return "Project";
  if (state.view === "guide") return "Book";
  if (state.view === "diagram") return "Diagram";
  return "Car";
}

function syncPhoneLabel() {
  const b = document.querySelector('.phone-nav button[data-phone="stage"]');
  if (b) b.textContent = stagePhoneLabel();
}

function showPhone(which) {
  const ws = document.querySelector(".workspace");
  if (!ws) return;
  ws.dataset.phone = which;
  $$(".phone-nav button").forEach((b) => {
    if (b.dataset.open === "workbook") {
      b.classList.toggle("on", state.view === "workbook" && which === "stage");
    } else {
      b.classList.toggle("on", b.dataset.phone === which && !(state.view === "workbook" && which === "stage"));
    }
  });
  syncPhoneLabel();
  requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
}

function renderRail() {
  const book = $("#bookbtn");
  if (book) book.classList.toggle("on", state.view === "guide");
  const cat = $("#catbtn");
  if (cat) cat.classList.toggle("on", state.view === "catalog");
  const work = $("#workbtn");
  if (work) work.classList.toggle("on", state.view === "workbook");
  const jobs = $("#projlist");
  if (jobs && window.ZO_PROJECTS) {
    jobs.innerHTML = ZO_PROJECTS.map((job) => {
      const count = projectDoneCount(job.id);
      const on = state.view === "project" && state.project === job.id ? "on" : "";
      return `
        <button type="button" class="proj-btn ${on}" data-project="${job.id}">
          <i class="dot watch"></i>
          <span><b>${esc(job.title)}</b><small>${job.status === "open" ? "Open" : esc(job.status)} · ${count.n} of ${count.total} tried</small></span>
        </button>`;
    }).join("");
    jobs.onclick = (e) => {
      const b = e.target.closest("[data-project]");
      if (b) openProject(b.dataset.project);
    };
  }
  const box = $("#syslist");
  box.innerHTML = ZO.systems
    .map(
      (s) => `
    <button class="sys ${s.id === state.system ? "on" : ""}" data-id="${s.id}">
      <i class="dot ${s.status}"></i>
      <span>${s.name}<br><small>${s.short}</small></span>
      <small>${s.statusLabel}</small>
    </button>`
    )
    .join("");
  box.onclick = (e) => {
    const b = e.target.closest(".sys");
    if (!b) return;
    select(b.dataset.id, { toggle: true });
  };
}

function clearSelection() {
  state.system = null;
  state.part = null;
  state.editing = null;
  state.view = "hero";
  renderRail();
  renderStage();
  renderPanel(null);
  if (studio) studio.setHighlight(null);
}

function clearPart() {
  const id = state.part;
  state.part = null;
  state.editing = null;
  highlightBranch($("#svghost"), null);
  if (!id) return;
  const branch = document.querySelector(`#panel details.part-branch[data-part="${CSS.escape(id)}"]`);
  if (branch) branch.open = false;
}

function select(id, opts = {}) {
  if (opts.toggle && id === state.system && !opts.part && state.view === "diagram") {
    clearSelection();
    return;
  }
  state.system = id;
  state.part = opts.part || null;
  if (opts.view) state.view = opts.view;
  else state.view = "diagram";
  renderRail();
  renderStage();
  renderPanel(id);
  showPhone("stage");
  if (opts.evidence) setTimeout(() => openLight(opts.evidence), 400);
  if (studio) studio.setHighlight(id);
}

function bindStudio() {
  studio.onPick((id) => select(id, { view: "diagram" }));
  studio.onHover((info) => {
    const tag = $("#tag");
    if (!info) {
      tag.classList.remove("on");
      return;
    }
    tag.textContent = info.label;
    tag.classList.add("on");
    tag.style.left = `${info.x}px`;
    tag.style.top = `${info.y}px`;
  });
}

window.closeModel = () => hideModel();

function hideModel() {
  closePartViewer();
  const box = $("#modelview");
  if (box) box.hidden = true;
}

function showModel(kind) {
  const box = $("#modelview");
  const canvas = $("#modelcanvas");
  if (!box || !canvas) return;
  box.hidden = false;
  requestAnimationFrame(() => openPartViewer(canvas, kind));
}

function renderJobStrip() {
  const strip = $("#jobstrip");
  if (!strip) return;
  if (state.view === "project" || !window.ZO_PROJECTS) {
    strip.innerHTML = "";
    return;
  }
  strip.innerHTML = ZO_PROJECTS.filter((job) => job.status === "open")
    .map((job) => {
      const count = projectDoneCount(job.id);
      return `<button type="button" class="jobchip" data-project="${job.id}"><span>Project</span> ${esc(job.title)} <small>${count.n} of ${count.total} tried</small></button>`;
    })
    .join("");
  strip.onclick = (e) => {
    const b = e.target.closest("[data-project]");
    if (b) openProject(b.dataset.project);
  };
}

function renderStage() {
  if (state.view !== "catalog") hideModel();
  if (state.view === "diagram" && !state.system) state.view = "hero";
  const sys = ZO.systems.find((s) => s.id === state.system);
  const job = state.view === "project" ? ZO_PROJECTS.find((p) => p.id === state.project) : null;
  $("#stageTitle").textContent = job
    ? job.title
    : state.view === "catalog"
      ? "Parts catalog"
      : state.view === "workbook"
        ? "Workbook"
        : ZO.vehicle.name;
  $("#stageSub").textContent = job
    ? job.summary
    : state.view === "catalog"
      ? "Click a photo to spin that part. Prices under it are the invoice figures."
      : state.view === "workbook"
        ? "Every note and field change, newest first."
        : state.view === "diagram" && sys
          ? `${sys.name} — click a piece on the sketch`
          : ZO.vehicle.identity;
  renderJobStrip();
  $$(".views button").forEach((b) => b.classList.toggle("on", b.dataset.view === state.view));
  syncPhoneLabel();
  document.querySelector(".dock")?.classList.toggle("diagram-open", state.view === "diagram");
  const hint = $(".hint");
  if (hint) {
    hint.textContent =
      state.view === "catalog"
        ? "Click a photo to turn the model · prices are what the tickets say"
        : state.view === "workbook"
          ? "Notes saved here go into the repo when a GitHub token is stored on this phone"
          : state.view === "project"
          ? "Check a step when you have tried it · Sketch takes you back to the car"
          : state.view === "diagram"
            ? "Use the numbered list. The drawing is the sheet, not the menu."
            : "Drag gently to turn · click a part to open its diagram";
  }
  renderPicker();
  const host = $("#svghost");
  if (state.view === "workbook") {
    if (studio) {
      studio.dispose();
      studio = null;
    }
    $("#tag")?.classList.remove("on");
    host.classList.remove("is-3d", "is-diagram", "is-catalog", "is-project");
    host.classList.add("is-workbook");
    host.innerHTML = renderWorkbook();
    bindWorkbook(host);
    return;
  }
  host.classList.remove("is-workbook");
  if (state.view === "project") {
    if (studio) {
      studio.dispose();
      studio = null;
    }
    $("#tag")?.classList.remove("on");
    host.classList.remove("is-3d", "is-diagram", "is-catalog");
    host.classList.add("is-project");
    host.innerHTML = renderProject(state.project);
    bindProject(host);
    return;
  }
  host.classList.remove("is-project");
  if (state.view === "catalog") {
    if (studio) {
      studio.dispose();
      studio = null;
    }
    $("#tag")?.classList.remove("on");
    host.classList.remove("is-3d", "is-diagram");
    host.classList.add("is-catalog");
    host.innerHTML = renderCatalog();
    bindCatalog(host);
    return;
  }
  host.classList.remove("is-catalog");
  if (state.view === "guide") {
    if (studio) {
      studio.dispose();
      studio = null;
    }
    host.classList.remove("is-3d", "is-diagram");
    host.innerHTML = renderGuide();
    host.querySelectorAll(".chapter").forEach((el) => {
      el.addEventListener("click", () => {
        const ch = ZO.guide.chapters.find((c) => c.id === el.dataset.id);
        if (!ch) return;
        select(ch.system, { view: "diagram" });
        if (ch.evidence?.[0]) setTimeout(() => openLight(ch.evidence[0]), 300);
      });
    });
    return;
  }
  if (state.view === "diagram") {
    if (studio) {
      studio.dispose();
      studio = null;
    }
    $("#tag")?.classList.remove("on");
    host.classList.remove("is-3d");
    host.classList.add("is-diagram");
    host.innerHTML = renderDiagram(state.system);
    bindDiagram(host);
    return;
  }
  host.classList.remove("is-diagram");
  host.classList.add("is-3d");
  const viewChanged = host.dataset.cam !== state.view;
  if (!studio) {
    host.innerHTML = "";
    studio = mountStudio(host);
    bindStudio();
    studio.setView(state.view);
  } else if (viewChanged) {
    studio.setView(state.view);
  }
  host.dataset.cam = state.view;
  studio.setHighlight(state.system);
}

window.setView = (v) => {
  if (v === "diagram" && !state.system) return;
  if (v === state.view) return;
  state.view = v;
  renderRail();
  renderStage();
  showPhone("stage");
};

function openWorkbook() {
  state.view = "workbook";
  state.project = null;
  renderRail();
  renderStage();
  showPhone("stage");
}
window.openWorkbook = openWorkbook;

window.openCatalog = () => {
  if (state.view === "catalog") {
    clearSelection();
    return;
  }
  state.view = "catalog";
  state.part = null;
  renderRail();
  renderStage();
  renderHomePanel();
  showPhone("stage");
  if (!window.PART_PHOTOS) {
    ensurePartPhotos().then(() => {
      if (state.view !== "catalog") return;
      const host = $("#svghost");
      host.innerHTML = renderCatalog();
      bindCatalog(host);
    });
  }
};

window.openProject = (id, force) => {
  if (!force && state.view === "project" && state.project === id) {
    state.view = "hero";
    renderRail();
    renderStage();
    renderPanel(state.system);
    showPhone("stage");
    return;
  }
  const job = (window.ZO_PROJECTS || []).find((p) => p.id === id);
  if (!job) return;
  state.project = id;
  state.view = "project";
  state.system = job.system;
  state.part = null;
  state.editing = null;
  renderRail();
  renderStage();
  renderPanel(job.system);
  showPhone("stage");
};

function renderProject(id) {
  const job = ZO_PROJECTS.find((p) => p.id === id);
  if (!job) return "";
  const prog = projectProgress(id);
  const parts = job.parts.map((pid) => ZO.parts.find((p) => p.id === pid)).filter(Boolean);
  return `
    <article class="project">
      <div class="badge watch">Open · ${esc(ZO.systems.find((s) => s.id === job.system)?.name || "Project")}</div>
      <h2>Why a sit does this</h2>
      <ol class="why-list">
        ${job.why
          .map(
            (w, i) =>
              `<li class="why-item"><b>${i + 1}. ${esc(w.title)}</b><p>${esc(w.body)}</p></li>`
          )
          .join("")}
      </ol>
      <h2>Try this, in order</h2>
      <ol class="step-list">
        ${job.steps
          .map(
            (s, i) => `
          <li class="step-item ${prog.checks[s.id] ? "done" : ""}">
            <input type="checkbox" data-step="${s.id}" ${prog.checks[s.id] ? "checked" : ""} />
            <div><b>${i + 1}. ${esc(s.title)}</b><p>${esc(s.body)}</p></div>
          </li>`
          )
          .join("")}
      </ol>
      <h2>Parts on the paperwork</h2>
      <div class="proj-parts">
        ${parts
          .map(
            (p) =>
              `<button type="button" class="proj-part" data-jump="${p.id}">${esc(p.name)}<small>${esc(p.pn)}</small></button>`
          )
          .join("")}
      </div>
      <h2>Sheets</h2>
      <div class="ev-row">${job.evidence.map(evCard).join("")}</div>
      <h2>Bench note</h2>
      <textarea id="projnote" class="proj-note" placeholder="Which wheels were locked, what the fluid looked like…">${esc(prog.note)}</textarea>
    </article>`;
}

function bindProject(host) {
  host.querySelectorAll("[data-step]").forEach((el) => {
    el.addEventListener("change", () => {
      saveProjectCheck(state.project, el.dataset.step, el.checked);
      el.closest(".step-item")?.classList.toggle("done", el.checked);
      renderRail();
      renderJobStrip();
    });
  });
  host.querySelectorAll("[data-jump]").forEach((el) => {
    el.addEventListener("click", () => {
      const part = ZO.parts.find((p) => p.id === el.dataset.jump);
      if (!part) return;
      select(part.system, { part: part.id, view: "diagram" });
    });
  });
  host.querySelectorAll("[data-ev]").forEach((el) => {
    el.addEventListener("click", () => openLight(el.dataset.ev));
  });
  const note = host.querySelector("#projnote");
  if (note) {
    note.addEventListener("input", () => saveProjectNote(state.project, note.value));
  }
}

function catalogParts() {
  const q = state.catalogQ.trim().toLowerCase();
  return ZO.parts.filter((p) => {
    if (state.catalogSys !== "all" && p.system !== state.catalogSys) return false;
    if (!q) return true;
    const places = (window.catalogPlaces(p.id) || [])
      .map((r) => `${r.where} ${r.item} ${r.price} ${r.order}`)
      .join(" ");
    return `${p.name} ${p.pn} ${p.brand} ${p.system} ${places}`.toLowerCase().includes(q);
  });
}

function renderCatalog() {
  const chips = [{ id: "all", name: "All" }, ...ZO.systems]
    .map(
      (s) =>
        `<button type="button" class="cat-chip ${state.catalogSys === s.id ? "on" : ""}" data-sys="${s.id}">${esc(s.name)}</button>`
    )
    .join("");
  const parts = catalogParts();
  const cards = parts
    .map((p) => {
      const sys = ZO.systems.find((s) => s.id === p.system);
      const places = window.catalogPlaces(p.id) || [];
      const ev = (p.evidence || [])[0];
      return `
      <article class="cat-card ${state.part === p.id ? "on" : ""}" data-id="${p.id}">
        ${window.catalogSketch(p.id)}
        <div class="cat-body">
          <div class="kicker">${esc(sys ? sys.name : p.system)} · qty ${esc(p.qty || "—")}</div>
          <h3>${esc(p.name)}</h3>
          <div class="pn">${esc(p.pn)}</div>
          <ul class="places">
            ${places
              .map(
                (r) => `<li>
                  <b>${esc(r.where)}</b>
                  <span>${esc([r.when, r.order].filter(Boolean).join(" · "))}</span>
                  <em>${esc(r.price)}</em>
                  ${r.item ? `<small>${esc(r.item)}</small>` : ""}
                  ${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.link || "Open listing")}</a>` : ""}
                </li>`
              )
              .join("")}
          </ul>
          <div class="cat-actions">
            ${ev ? `<button type="button" class="ghost" data-ev="${ev}">Sheet ${esc(ev)}</button>` : ""}
            <button type="button" class="ghost" data-jump="${p.id}">On the car</button>
          </div>
        </div>
      </article>`;
    })
    .join("");
  return `
    <div class="catalog">
      <div class="cat-tools">
        <input id="catq" type="search" placeholder="Filter by part, vendor, or price…" value="${esc(state.catalogQ)}" />
        <div class="cat-chips">${chips}</div>
      </div>
      <p class="cat-count">${parts.length} parts · prices are the invoice figures, not today's shelf price</p>
      <div class="cat-grid">${cards || "<p class='lede'>Nothing matches.</p>"}</div>
    </div>`;
}

function refreshCatalogList(host) {
  const next = document.createElement("div");
  next.innerHTML = renderCatalog();
  host.querySelector(".cat-grid").replaceWith(next.querySelector(".cat-grid"));
  host.querySelector(".cat-count").replaceWith(next.querySelector(".cat-count"));
  bindCatalogCards(host);
}

function bindCatalog(host) {
  const q = host.querySelector("#catq");
  if (q) {
    q.addEventListener("input", () => {
      const pos = q.selectionStart;
      state.catalogQ = q.value;
      refreshCatalogList(host);
      const again = host.querySelector("#catq");
      again.focus();
      again.setSelectionRange(pos, pos);
    });
  }
  host.querySelectorAll(".cat-chip").forEach((b) => {
    b.addEventListener("click", () => {
      state.catalogSys = b.dataset.sys;
      host.innerHTML = renderCatalog();
      bindCatalog(host);
    });
  });
  bindCatalogCards(host);
}

function bindCatalogCards(host) {
  host.querySelectorAll(".cat-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-ev]") || e.target.closest("[data-jump]")) return;
      const id = card.dataset.id;
      const p = ZO.parts.find((x) => x.id === id);
      if (!p) return;
      if (state.part === id) {
        state.part = null;
        card.classList.remove("on");
        renderPanel(state.system);
        return;
      }
      state.system = p.system;
      state.part = id;
      host.querySelectorAll(".cat-card").forEach((c) => c.classList.toggle("on", c.dataset.id === id));
      renderRail();
      renderPanel(p.system);
      showPhone("dock");
    });
  });
  host.querySelectorAll("[data-ev]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      openLight(el.dataset.ev);
    });
  });
  host.querySelectorAll("[data-jump]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = ZO.parts.find((x) => x.id === el.dataset.jump);
      if (!p) return;
      select(p.system, { part: p.id, view: "diagram" });
    });
  });
  host.querySelectorAll("[data-model]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      showModel(el.dataset.model);
    });
  });
}

window.openGuide = () => {
  if (state.view === "guide") {
    clearSelection();
    return;
  }
  state.view = "guide";
  renderRail();
  renderStage();
  showPhone("stage");
  const first = ZO.guide.chapters[0];
  if (first) renderPanel(first.system);
};

function renderHomePanel() {
  const v = ZO.vehicle;
  $("#panel").innerHTML = `
    <div class="tree">
      <div class="badge documented">${esc(v.subtitle)}</div>
      <h2 class="sys-title">${esc(v.name)}</h2>
      <p class="lede">${esc(v.identity)}</p>
      <table class="kv">${v.vitals.map((g) => `<tr><th>${esc(g.k)}</th><td>${esc(g.v)}</td></tr>`).join("")}</table>
      <p class="lede">${state.view === "catalog" ? "Click a card for the full spec. Prices on the cards are the invoice amounts." : "Click a system on the left or on the sketch to open its parts."}</p>
    </div>
  `;
}

function renderPanel(id) {
  if (!id) {
    renderHomePanel();
    return;
  }
  const sys = ZO.systems.find((s) => s.id === id);
  const parts = ZO.parts.filter((p) => p.system === id);
  const ch = (ZO.guide.chapters || []).find((c) => c.system === id);
  $("#panel").innerHTML = `
    <div class="tree" id="partTree">
      <div class="badge ${sys.status}">${esc(sys.statusLabel)}</div>
      <h2 class="sys-title">${esc(sys.name)}</h2>
      <p class="lede">${esc(sys.summary)}</p>
      ${sys.geometry ? geometryBranch(sys) : ""}
      ${ch ? `<details><summary>Build book · ch. ${ch.n} ${esc(ch.title)}</summary><p class="lede">${esc(ch.body)}</p></details>` : ""}
      ${parts.map((p) => partBranch(p)).join("") || "<p class='lede'>No line-item parts tagged to this system yet.</p>"}
      ${workshopBranch(id)}
      <h3>Source sheets</h3>
      <div class="ev-row">${uniqueEvidence(parts).map(evCard).join("")}</div>
    </div>
  `;
  bindPanel();
  if (state.part) openPartInPanel(state.part);
}

function bindPanel() {
  const panel = $("#panel");
  panel.querySelectorAll("[data-ev]").forEach((el) => {
    el.addEventListener("click", () => openLight(el.dataset.ev));
  });
  panel.querySelectorAll("[data-edit]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.edit;
      state.editing = state.editing === id ? null : id;
      state.part = id;
      renderPanel(state.system);
      highlightBranch($("#svghost"), id);
    });
  });
  panel.querySelectorAll("details.part-branch").forEach((el) => {
    el.addEventListener("toggle", () => {
      if (!el.open) {
        if (state.part === el.dataset.part) {
          state.part = null;
          state.editing = null;
          highlightBranch($("#svghost"), null);
        }
        return;
      }
      state.part = el.dataset.part;
      panel.querySelectorAll("details.part-branch").forEach((other) => {
        if (other !== el) other.open = false;
      });
      highlightBranch($("#svghost"), el.dataset.part);
    });
  });
  bindNoteForms(panel);
}

function openPartInPanel(id) {
  const branch = document.querySelector(`#panel details.part-branch[data-part="${CSS.escape(id)}"]`);
  if (!branch) return;
  branch.open = true;
  branch.classList.add("flash");
  branch.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function bindNoteForms(root) {
  root.querySelectorAll("form.edit-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveNote(form);
    });
  });
}

function renderDiagram(systemId) {
  const sys = ZO.systems.find((s) => s.id === systemId);
  const parts = ZO.parts.filter((p) => p.system === systemId);
  const key = parts
    .map(
      (p, i) => `
      <button type="button" class="key-btn ${p.id === state.part ? "on" : ""}" data-part="${p.id}">
        <span>${String(i + 1).padStart(2, "0")}</span>
        <b>${esc(p.name)}</b>
        <small>${esc(p.pn || "")}</small>
      </button>`
    )
    .join("");
  return `
    <div class="diagram">
      <div class="diagram-sheet">
        <aside class="diagram-key" aria-label="Parts on this sheet">
          <div class="diagram-kicker">${esc(sys.name)}</div>
          ${key || `<p class="lede">No parts filed on this sheet.</p>`}
          <button type="button" class="ghost back-sketch" data-back>Back to the car</button>
        </aside>
        <div class="diagram-viz">
          ${window.sketchSVG(sys.id, state.part)}
        </div>
      </div>
    </div>`;
}

function geometryBranch(sys) {
  return `<details>
    <summary>Geometry from the 1442 sheets</summary>
    <table class="kv">${sys.geometry.map((g) => `<tr><th>${esc(g.k)}</th><td>${esc(g.v)}</td></tr>`).join("")}</table>
  </details>`;
}

function workshopBranch(systemId) {
  const notes = systemLog(systemId);
  const items = notes.length
    ? `<ul class="note-log">${notes
        .slice(-8)
        .reverse()
        .map((n) => `<li><time>${esc(fmtWhen(n.at))}</time> ${esc(n.text || "Field update")}</li>`)
        .join("")}</ul>`
    : `<p class="lede">Nothing on this system yet.</p>`;
  return `<details class="log-branch" open>
    <summary>Workshop log${notes.length ? ` · ${notes.length}` : ""}</summary>
    ${items}
    <form class="edit-form" data-part="">
      <label>Add a note
        <textarea name="text" rows="2" required placeholder="Replaced the tires. Old P205/75R14, now …"></textarea>
      </label>
      ${workbookStatusLine()}
      <button type="submit">Save to workbook</button>
    </form>
  </details>`;
}

function partBranch(p) {
  const open = state.part === p.id ? "open" : "";
  const spec = (p.spec || [])
    .map((s) => `<li><span>${esc(s.k)}</span> ${linkify(s.v)}</li>`)
    .join("");
  const log = partLog(p.id);
  const ev = (p.evidence || [])
    .map((id) => evCard(id))
    .join("");
  const editing = state.editing === p.id;
  return `
    <details class="part-branch ${p.status}" data-part="${p.id}" ${open}>
      <summary>
        <i class="dot ${p.status}"></i>
        ${esc(p.name)}
        <small>${esc(p.pn)}</small>
      </summary>
      <div class="branch-body">
        <div class="pn">${esc(p.brand)} · ${esc(p.pn)} · ${esc(p.role || "")}</div>
        ${p.notes ? `<p>${linkify(p.notes)}</p>` : ""}
        ${p.replaceWith ? `<p><b>Replace with:</b> ${esc(p.replaceWith)}</p>` : ""}
        ${spec ? `<details open><summary>Spec</summary><ul class="spec-tree">${spec}</ul></details>` : ""}
        ${
          log.length
            ? `<details open><summary>Workshop notes</summary><ul class="note-log">${log
                .slice(-8)
                .reverse()
                .map((n) => `<li><time>${esc(fmtWhen(n.at))}</time> ${linkify(n.text || "Updated")}</li>`)
                .join("")}</ul></details>`
            : ""
        }
        ${ev ? `<details><summary>Source sheets</summary><div class="ev-row">${ev}</div></details>` : ""}
        <button type="button" class="ghost" data-edit="${p.id}">${editing ? "Close" : "Update"}</button>
        ${editing ? editForm(p) : ""}
      </div>
    </details>`;
}

function highlightBranch(host, id) {
  host.querySelectorAll(".hot").forEach((n) => n.classList.toggle("on", n.dataset.part === id));
  host.querySelectorAll(".key-btn").forEach((n) => n.classList.toggle("on", n.dataset.part === id));
}

function bindDiagram(host) {
  host.querySelector("[data-back]")?.addEventListener("click", () => setView("hero"));
  host.querySelectorAll(".hot[data-part], .key-btn[data-part]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = el.dataset.part;
      const jump = el.dataset.goto;
      if (jump && jump !== state.system) {
        select(jump, { part: id, view: "diagram" });
        return;
      }
      if (state.part === id) {
        clearPart();
        return;
      }
      state.part = id;
      highlightBranch(host, id);
      openPartInPanel(id);
    });
  });
}

function renderGuide() {
  const g = ZO.guide;
  return `
    <div class="guide">
      <div class="guide-note"><b>${g.title}.</b> ${g.note}</div>
      ${g.chapters
        .map(
          (c) => `
        <button class="chapter" data-id="${c.id}">
          <div class="n">Chapter ${c.n}</div>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
          <div class="thumbs">${(c.evidence || [])
            .map((e) => `<img src="evidence/${e}.jpg" alt="${e}">`)
            .join("")}</div>
        </button>`
        )
        .join("")}
    </div>`;
}

function guideSnippet(systemId) {
  const ch = (ZO.guide.chapters || []).find((c) => c.system === systemId);
  if (!ch) return "";
  return `<h3>From the build book — ch. ${ch.n}</h3>
    <p class="lede">${ch.body}</p>
    <button class="ghost" type="button" onclick="openGuide()">Open full guide</button>`;
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linkify(s) {
  return esc(s).replace(/https?:\/\/[^\s<]+/g, (url) => {
    const clean = url.replace(/[),.;]+$/, "");
    const tail = url.slice(clean.length);
    return `<a href="${clean}" target="_blank" rel="noopener">${clean}</a>${tail}`;
  });
}

function fmtWhen(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function partLog(partId) {
  return (workshop.log || []).filter((n) => n.part === partId);
}

function systemLog(systemId) {
  return (workshop.log || []).filter((n) => n.system === systemId);
}

function workshopBlock(systemId) {
  const notes = systemLog(systemId);
  const items = notes
    .slice(-6)
    .reverse()
    .map(
      (n) =>
        `<li><time>${esc(fmtWhen(n.at))}</time> ${linkify(n.text || "Field update")}${
          n.part ? ` <span class="pn">${esc(n.part)}</span>` : ""
        }</li>`
    )
    .join("");
  return `
    <h3>Workshop log</h3>
    ${
      items
        ? `<ul class="note-log">${items}</ul>`
        : `<p class="lede">Nothing logged on this system yet. Open a part and hit Update to record a swap, measurement, or note.</p>`
    }`;
}

function partCard(p) {
  const spec = (p.spec || []).map((s) => `<tr><th>${esc(s.k)}</th><td>${linkify(s.v)}</td></tr>`).join("");
  const log = partLog(p.id);
  const logHtml = log.length
    ? `<ul class="note-log">${log
        .slice(-8)
        .reverse()
        .map((n) => `<li><time>${esc(fmtWhen(n.at))}</time> ${linkify(n.text || "Updated fields")}</li>`)
        .join("")}</ul>`
    : "";
  const open = state.editing === p.id;
  return `
    <article class="part ${p.status}" id="part-${p.id}">
      <div class="part-head">
        <div class="badge ${p.status}">${esc(p.confidence)}</div>
        <button type="button" class="ghost" data-edit="${p.id}">${open ? "Close" : "Update"}</button>
      </div>
      <h4>${esc(p.name)}</h4>
      <div class="pn">${esc(p.brand)}  ·  ${esc(p.pn)}</div>
      ${spec ? `<table class="kv">${spec}</table>` : ""}
      ${p.notes ? `<p>${linkify(p.notes)}</p>` : ""}
      ${p.replaceWith ? `<p><b>Replace with:</b> ${esc(p.replaceWith)}</p>` : ""}
      ${logHtml}
      ${open ? editForm(p) : ""}
    </article>`;
}

function editForm(p) {
  const specFields = (p.spec || [])
    .map(
      (s) => `
      <label>${esc(s.k)}
        <input name="spec:${esc(s.k)}" value="${esc(s.v)}" />
      </label>`
    )
    .join("");
  const tireHint =
    p.id === "tires"
      ? `<p class="hint-inline">Current size writes through to the car vitals. As-built size on the geometry sheet stays put.</p>`
      : p.system === "fluids"
        ? `<p class="hint-inline">Current fill writes through to the car vitals. Paperwork stays “not on file” until you log a bottle.</p>`
        : "";
  return `
    <form class="edit-form" data-part="${esc(p.id)}">
      <label>What changed
        <textarea name="text" rows="3" required placeholder="Replaced the tires. Old P205/75R14, now …"></textarea>
      </label>
      <label>PN / size
        <input name="pn" value="${esc(p.pn)}" />
      </label>
      ${specFields}
      ${tireHint}
      ${workbookStatusLine()}
      <button type="submit">Save to workbook</button>
    </form>`;
}

const GH_REPO = "ebocc09/ZoProjectsAuto";
const GH_FILE = "public/workbook.json";
const TOKEN_KEY = "zo-github-token";
const LOCAL_KEY = "zo-workbook";

function emptyWorkbook() {
  return { updatedAt: null, vehicle: {}, systems: {}, parts: {}, log: [] };
}

function parseWorkbook(raw) {
  const data = raw && typeof raw === "object" ? raw : emptyWorkbook();
  data.vehicle = data.vehicle || {};
  data.systems = data.systems || {};
  data.parts = data.parts || {};
  data.log = Array.isArray(data.log) ? data.log : [];
  return data;
}

function workbookTime(ws) {
  const stamp = Date.parse(ws && ws.updatedAt) || 0;
  const last = ws && ws.log && ws.log.length ? Date.parse(ws.log[ws.log.length - 1].at) || 0 : 0;
  return Math.max(stamp, last);
}

function readLocalWorkbook() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "null");
  } catch {
    return null;
  }
}

function rememberWorkbook() {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(workshop));
  } catch {
    /* private mode */
  }
}

function workbookStatusLine() {
  return state.workbookMsg ? `<p class="hint-inline">${esc(state.workbookMsg)}</p>` : "";
}

async function loadWorkshop() {
  const found = [];
  try {
    const res = await fetch("workbook.json?t=" + Date.now(), { cache: "no-store" });
    if (res.ok) found.push(parseWorkbook(await res.json()));
  } catch {
    /* static file missing */
  }
  try {
    const res = await fetch("/api/workshop", { cache: "no-store" });
    if (res.ok) found.push(parseWorkbook(await res.json()));
  } catch {
    /* GitHub Pages has no shop server */
  }
  const local = readLocalWorkbook();
  if (local) found.push(parseWorkbook(local));
  found.sort((a, b) => workbookTime(b) - workbookTime(a));
  workshop = found[0] || emptyWorkbook();
  applyWorkshop(workshop);
}

function appendNote(body) {
  const text = String(body.text || "").trim();
  const patch = body.patch || {};
  if (!text && !Object.keys(patch).length) throw new Error("Write what changed.");
  const now = new Date().toISOString();
  workshop = parseWorkbook(workshop);
  workshop.log.push({
    id: "n" + Date.now().toString(36),
    at: now,
    system: body.system || null,
    part: body.part || null,
    text,
    patch,
  });
  workshop.updatedAt = now;
  if (body.part) {
    const slot = workshop.parts[body.part] || {};
    if (text) {
      const notes = Array.isArray(slot.notes) ? slot.notes : slot.notes ? [slot.notes] : [];
      notes.push(text);
      slot.notes = notes;
    }
    ["pn", "name", "status"].forEach((key) => {
      if (patch[key]) slot[key] = patch[key];
    });
    if (patch.spec && typeof patch.spec === "object") slot.spec = Object.assign({}, slot.spec || {}, patch.spec);
    workshop.parts[body.part] = slot;
  }
  if (patch.vital && patch.vital.k && patch.vital.v) {
    workshop.vehicle.vitals = workshop.vehicle.vitals || {};
    workshop.vehicle.vitals[patch.vital.k] = patch.vital.v;
  }
  if (body.system && text) {
    const slot = workshop.systems[body.system] || {};
    const notes = Array.isArray(slot.notes) ? slot.notes : slot.notes ? [slot.notes] : [];
    notes.push(text);
    slot.notes = notes.slice(-12);
    workshop.systems[body.system] = slot;
  }
}

function utf8ToB64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

function b64ToUtf8(b64) {
  const bin = atob(String(b64).replace(/\s/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function mergeRemote(remote) {
  remote = parseWorkbook(remote);
  const ids = new Set(workshop.log.map((n) => n.id));
  remote.log.forEach((n) => {
    if (n && n.id && !ids.has(n.id)) workshop.log.push(n);
  });
  workshop.log.sort((a, b) => String(a.at).localeCompare(String(b.at)));
  Object.keys(remote.parts).forEach((id) => {
    if (!workshop.parts[id]) workshop.parts[id] = remote.parts[id];
  });
}

async function pushWorkbookToGit(token) {
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE}`;
  const got = await fetch(url + "?ref=main", { headers, cache: "no-store" });
  let sha;
  if (got.ok) {
    const meta = await got.json();
    sha = meta.sha;
    try {
      mergeRemote(JSON.parse(b64ToUtf8(meta.content || "")));
    } catch {
      /* keep the copy we already have */
    }
  } else if (got.status !== 404) {
    const err = await got.json().catch(() => ({}));
    throw new Error(err.message || "GitHub " + got.status);
  }
  const put = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "Update the workbook.",
      content: utf8ToB64(JSON.stringify(workshop, null, 2) + "\n"),
      branch: "main",
      sha,
    }),
  });
  if (!put.ok) {
    const err = await put.json().catch(() => ({}));
    throw new Error(err.message || "GitHub " + put.status);
  }
  rememberWorkbook();
}

function applyWorkshop(ws) {
  const parts = ws.parts || {};
  ZO.parts.forEach((p) => {
    const patch = parts[p.id];
    if (!patch) return;
    if (patch.pn) p.pn = patch.pn;
    if (patch.name) p.name = patch.name;
    if (patch.status) p.status = patch.status;
    if (patch.spec && p.spec) {
      p.spec.forEach((row) => {
        if (patch.spec[row.k]) row.v = patch.spec[row.k];
      });
    }
  });
  const vitals = (ws.vehicle || {}).vitals || {};
  (ZO.vehicle.vitals || []).forEach((row) => {
    if (vitals[row.k]) row.v = vitals[row.k];
  });
  const tire = vitals.Tires;
  if (tire) {
    ZO.vehicle.tags = (ZO.vehicle.tags || []).map((t) => (t.startsWith("P") && t.includes("R") ? tire : t));
    const wheels = ZO.systems.find((s) => s.id === "wheels");
    if (wheels) {
      wheels.short = `${tire}, S10 4.75 adapters`;
    }
  }
}

async function saveNote(form) {
  const fd = new FormData(form);
  const partId = form.dataset.part || state.editing || null;
  const part = ZO.parts.find((p) => p.id === partId);
  const spec = {};
  for (const [k, v] of fd.entries()) {
    if (k.startsWith("spec:")) spec[k.slice(5)] = String(v).trim();
  }
  const pn = String(fd.get("pn") || "").trim();
  const patch = {};
  if (Object.keys(spec).length) patch.spec = spec;
  if (pn) patch.pn = pn;
  if (partId === "tires" && pn) patch.vital = { k: "Tires", v: pn };
    else if (spec["Current size"]) patch.vital = { k: "Tires", v: spec["Current size"] };
    else if (spec["Current fill"] && part) {
      const fluidVital = {
        "fluid-engine": "Engine oil",
        "fluid-gearbox": "Gearbox",
        "fluid-coolant": "Coolant",
        "fluid-brake": "Brake fluid",
        "fluid-clutch": "Clutch fluid",
      };
      if (fluidVital[partId]) patch.vital = { k: fluidVital[partId], v: spec["Current fill"] };
    }
  const text = String(fd.get("text") || "").trim();
  const payload = { system: state.system, part: partId || null, text, patch };
  let wrote = false;
  try {
    const res = await fetch("/api/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      workshop = parseWorkbook(await res.json());
      wrote = true;
    }
  } catch {
    /* Pages has no shop server — write the note here, then into git */
  }
  if (!wrote) {
    try {
      appendNote(payload);
    } catch (err) {
      state.workbookMsg = err.message || "Write what changed.";
      renderPanel(state.system);
      return;
    }
  }
  rememberWorkbook();
  applyWorkshop(workshop);
  const token = localStorage.getItem(TOKEN_KEY) || "";
  if (token) {
    try {
      await pushWorkbookToGit(token);
      state.workbookMsg = "Written into the repo. The site updates when Pages finishes.";
    } catch (err) {
      state.workbookMsg = "Saved on this phone. GitHub said: " + (err.message || "could not write the file");
    }
  } else if (wrote) {
    state.workbookMsg = "Saved on this computer. Open Workbook and add a GitHub token to publish it.";
  } else {
    state.workbookMsg = "Saved on this phone. Open Workbook and add a GitHub token to write it into the repo.";
  }
  state.editing = null;
  if (part) state.part = part.id;
  renderRail();
  renderStage();
  renderPanel(state.system);
}

function patchLine(note) {
  const patch = note.patch || {};
  const bits = [];
  if (patch.pn) bits.push("PN " + patch.pn);
  if (patch.name) bits.push(patch.name);
  if (patch.status) bits.push(patch.status);
  if (patch.spec) bits.push(Object.entries(patch.spec).map(([k, v]) => k + ": " + v).join(" · "));
  if (patch.vital) bits.push(patch.vital.k + " → " + patch.vital.v);
  return bits.join(" · ");
}

function renderWorkbook() {
  const notes = (workshop.log || []).slice().reverse();
  const hasToken = !!localStorage.getItem(TOKEN_KEY);
  const rows = notes.length
    ? notes
        .map((n) => {
          const part = ZO.parts.find((p) => p.id === n.part);
          const sys = ZO.systems.find((s) => s.id === n.system);
          const who = [sys ? sys.name : "", part ? part.name : n.part || ""].filter(Boolean).join(" · ");
          const extra = patchLine(n);
          return `<article class="wb-row">
            <time>${esc(fmtWhen(n.at))}</time>
            ${who ? `<b>${esc(who)}</b>` : ""}
            <p>${linkify(n.text || "Field update")}</p>
            ${extra ? `<small>${esc(extra)}</small>` : ""}
          </article>`;
        })
        .join("")
    : `<p class="lede">No notes yet. Save one from a part and it shows up here.</p>`;
  return `<div class="workbook">
    <h2>Git</h2>
    <p class="lede">${
      hasToken
        ? "A token is saved in this browser. The next note commits public/workbook.json on main. The token never goes into the repo."
        : "Paste a GitHub token with contents access to ZoProjectsAuto. It stays in this browser. Without it, notes stay on this phone."
    }</p>
    ${state.workbookMsg ? `<p class="hint-inline">${esc(state.workbookMsg)}</p>` : ""}
    <form class="token-form" id="tokenform">
      <label>GitHub token
        <input name="token" type="password" autocomplete="off" placeholder="${hasToken ? "Saved — paste a new one to replace it" : "github_pat_… or classic repo token"}" />
      </label>
      <button type="submit">Save token</button>
      ${hasToken ? `<button type="button" id="cleartoken">Clear</button>` : ""}
    </form>
    <h2>Changes · ${notes.length}</h2>
    ${rows}
  </div>`;
}

function bindWorkbook(host) {
  host.querySelector("#tokenform")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = String(new FormData(e.target).get("token") || "").trim();
    if (!value) return;
    localStorage.setItem(TOKEN_KEY, value);
    state.workbookMsg = "Token saved in this browser. The next note writes the workbook into the repo.";
    renderStage();
  });
  host.querySelector("#cleartoken")?.addEventListener("click", () => {
    localStorage.removeItem(TOKEN_KEY);
    state.workbookMsg = "Token cleared from this browser.";
    renderStage();
  });
}

function uniqueEvidence(parts) {
  const ids = [];
  parts.forEach((p) => (p.evidence || []).forEach((e) => ids.includes(e) || ids.push(e)));
  if (!ids.length && state.system === "electrical") ids.push("IMG_5759");
  if (!ids.length && state.system === "chassis") ids.push("IMG_5892");
  return ids.slice(0, 8);
}

function evCard(id) {
  const cap = ZO.evidenceIndex[id] || id;
  return `<button class="ev" data-ev="${id}"><img src="evidence/${id}.jpg" alt="${cap}"><figcaption>${id} · ${cap}</figcaption></button>`;
}

function openLight(id) {
  if (!id) return;
  $("#lightbox").classList.add("on");
  $("#lightbox img").src = `evidence/${id}.jpg`;
  $("#lightbox .cap").textContent = `${id} — ${ZO.evidenceIndex[id] || ""}`;
}
function closeLight() {
  $("#lightbox").classList.remove("on");
}

function onSearch() {
  const q = $("#q").value.trim().toLowerCase();
  const box = $("#hits");
  if (!q) {
    box.classList.remove("on");
    return;
  }
  const hits = [];
  ZO.parts.forEach((p) => {
    const blob = `${p.name} ${p.pn} ${p.brand} ${p.notes} ${p.role}`.toLowerCase();
    if (blob.includes(q)) hits.push({ t: p.name, s: `${p.pn} · ${p.brand}`, id: p.system });
  });
  ZO.systems.forEach((s) => {
    if (`${s.name} ${s.summary}`.toLowerCase().includes(q)) hits.push({ t: s.name, s: s.short, id: s.id });
  });
  box.classList.toggle("on", hits.length > 0);
  box.innerHTML = hits
    .slice(0, 12)
    .map((h) => `<button class="hit" data-id="${h.id}"><b>${h.t}</b><span>${h.s}</span></button>`)
    .join("");
  box.querySelectorAll(".hit").forEach((b) =>
    b.addEventListener("click", () => {
      box.classList.remove("on");
      select(b.dataset.id);
    })
  );
}

function addMsg(role, text, pills = []) {
  const log = $("#chatlog");
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.innerHTML = `<p>${text.replace(/\n/g, "<br>")}</p>${
    pills.length
      ? `<div class="pills">${pills.map((p) => `<button type="button" data-pill="${p}">${p}</button>`).join("")}</div>`
      : ""
  }`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function sendAsk() {
  const input = $("#ask");
  const message = input.value.trim();
  if (!message) return;
  input.value = "";
  addMsg("you", message);
  state.history.push({ role: "user", text: message });
  $("#askBtn").disabled = true;
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        current: state.system,
        history: state.history.slice(-8),
      }),
    });
    const data = await res.json();
    addMsg("shop", data.reply, data.pills || []);
    state.history.push({ role: "shop", text: data.reply, topic: data.topic });
    if (data.project) {
      openProject(data.project, true);
    } else if (data.goto?.system) {
      select(data.goto.system, {
        view: "diagram",
        part: data.goto.part,
      });
    }
  } catch (err) {
    addMsg("shop", "This copy has no shop line. The catalog, book, and projects on the page are the record.");
  }
  $("#askBtn").disabled = false;
  input.focus();
}

init();
