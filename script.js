let selectedTemplate = "minimal";
let imageURL = "";

/* ================= TEMPLATE SELECT ================= */
function setTemplate(t, el) {
  selectedTemplate = t;

  document.querySelectorAll(".template")
    .forEach(e => e.classList.remove("active"));

  el.classList.add("active");

  updatePreview();
}

/* ================= IMAGE UPLOAD ================= */
document.getElementById("image").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    imageURL = URL.createObjectURL(file);
    updatePreview();
  }
});

/* ================= LIVE INPUT ================= */
document.querySelectorAll("input, textarea").forEach(el => {
  el.addEventListener("input", updatePreview);
});

/* ================= MAIN UPDATE ================= */
function updatePreview() {
  const d = {
    name: name.value || "Your Name",
    bio: bio.value || "Your bio goes here...",
    education: education.value || "Your education",
    experience: experience.value || "Your experience",
    skills: skills.value ? skills.value.split(",").map(s => s.trim()) : ["Skill"],
    projects: projects.value ? projects.value.split(",").map(p => p.trim()) : ["Project"],
    github: github.value || "#",
    linkedin: linkedin.value || "#",
    image: imageURL
  };

  const templates = {
    minimal: minimalTemplate,
    dark: darkTemplate,
    creative: creativeTemplate,
    professional: professionalTemplate,
    sidebar: sidebarTemplate
  };

  document.getElementById("preview").innerHTML =
    templates[selectedTemplate](d);
}

/* ================= INITIAL LOAD ================= */
updatePreview();

/* ================================================= */
/* ================= TEMPLATES ====================== */
/* ================================================= */

/* ===== MINIMAL ===== */
function minimalTemplate(d) {
  return `
    <div style="text-align:center">

      ${d.image ? `<img src="${d.image}" style="width:120px;border-radius:50%">` : ""}

      <h1>${d.name}</h1>
      <p style="color:gray">${d.bio}</p>

      <hr>

      <h3>🎓 Education</h3>
      <p>${d.education}</p>

      <h3>💼 Experience</h3>
      <p>${d.experience}</p>

      <h3>🛠 Skills</h3>
      <p>${d.skills.join(" • ")}</p>

      <h3>📂 Projects</h3>
      ${d.projects.map(p => `<p>• ${p}</p>`).join("")}

      <h3>🔗 Links</h3>
      <a href="${d.github}" target="_blank">GitHub</a> |
      <a href="${d.linkedin}" target="_blank">LinkedIn</a>

    </div>
  `;
}

/* ===== DARK ===== */
function darkTemplate(d) {
  return `
    <div style="background:#0f172a;color:white;padding:30px;border-radius:12px">

      ${d.image ? `<img src="${d.image}" style="width:100px;border-radius:50%">` : ""}

      <h1 style="color:#3b82f6">${d.name}</h1>
      <p>${d.bio}</p>

      <h3>Skills</h3>
      ${d.skills.map(s => `<span style="background:#1e293b;padding:5px 10px;margin:5px;border-radius:6px;display:inline-block">${s}</span>`).join("")}

      <h3>Projects</h3>
      ${d.projects.map(p => `<p>➡ ${p}</p>`).join("")}

    </div>
  `;
}

/* ===== CREATIVE ===== */
function creativeTemplate(d) {
  return `
    <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);color:white;padding:40px;border-radius:20px;text-align:center">

      ${d.image ? `<img src="${d.image}" style="width:120px;border-radius:50%">` : ""}

      <h1 style="font-size:2.5rem">${d.name}</h1>
      <p>${d.bio}</p>

      <h3>✨ Skills</h3>
      <p>${d.skills.join(" ✦ ")}</p>

      <h3>🚀 Projects</h3>
      <p>${d.projects.join(" ✦ ")}</p>

    </div>
  `;
}

/* ===== PROFESSIONAL ===== */
function professionalTemplate(d) {
  return `
    <div style="background:#f8fafc;color:#111;padding:30px;border-radius:12px">

      <h1>${d.name}</h1>
      <p>${d.bio}</p>

      <div style="display:flex;gap:40px;flex-wrap:wrap">

        <div>
          <h3>Education</h3>
          <p>${d.education}</p>

          <h3>Experience</h3>
          <p>${d.experience}</p>
        </div>

        <div>
          <h3>Skills</h3>
          <ul>${d.skills.map(s => `<li>${s}</li>`).join("")}</ul>

          <h3>Projects</h3>
          <ul>${d.projects.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>

      </div>

    </div>
  `;
}

/* ===== SIDEBAR ===== */
function sidebarTemplate(d) {
  return `
    <div style="display:flex;border-radius:12px;overflow:hidden">

      <div style="width:30%;background:#1e293b;color:white;padding:20px">
        <h2>${d.name}</h2>
        <p>${d.bio}</p>

        <h3>Skills</h3>
        <p>${d.skills.join(", ")}</p>
      </div>

      <div style="padding:20px">
        <h3>Projects</h3>
        ${d.projects.map(p => `<p>• ${p}</p>`).join("")}

        <h3>Education</h3>
        <p>${d.education}</p>

        <h3>Experience</h3>
        <p>${d.experience}</p>
      </div>

    </div>
  `;
}