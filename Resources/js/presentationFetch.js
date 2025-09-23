// Resources/js/presentationFetch.js
$(document).ready(() => {
  const url = ADMIN_BASE_URL + "/get-presentations";
  const data = JSON.stringify({ accesskey: "9494" });
  const params = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: data,
  };

  $("#loading").show();

  fetch(url, params)
    .then((res) => res.json())
    .then((payload) => {
      if (!payload || payload.error || !Array.isArray(payload.data)) {
        throw new Error("Unexpected response");
      }
      const items = sortByDateDesc(payload.data);
      init(items);
      buildYearFilter(items);
      $("#loading").fadeOut(200);
    })
    .catch((err) => {
      console.error("ERROR in Presentations :", err);
      $("#cardconjs").html(
        `<div style="padding:16px;color:#b00020;">Failed to load presentations.</div>`
      );
      $("#loading").fadeOut(200);
    });

  // Sort helper (desc by ISO-like date string when possible)
  function sortByDateDesc(list) {
    return [...list].sort((a, b) => {
      const da = Date.parse(a.date || "");
      const db = Date.parse(b.date || "");
      if (!isNaN(db) && !isNaN(da)) return db - da;
      // fallback: compare strings
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
  }

  // Initial render + attach live filters
  function init(items) {
    renderCards(items);

    // Search filter
    $("#searchInput").on("input", () => applyFilters(items));
    // Year filter
    $("#yearSelect").on("change", () => applyFilters(items));
  }

  function applyFilters(allItems) {
    const q = ($("#searchInput").val() || "").toLowerCase().trim();
    const yr = $("#yearSelect").val();

    let filtered = allItems;

    if (q) {
      filtered = filtered.filter((it) =>
        String(it.description || "")
          .toLowerCase()
          .includes(q)
      );
    }

    if (yr && yr !== "all") {
      filtered = filtered.filter((it) => {
        const d = new Date(it.date || "");
        return !isNaN(d) && d.getFullYear().toString() === yr;
      });
    }

    renderCards(filtered);
  }

  function renderCards(items) {
    let count = 1;
    let main = "";

    for (const prop of items) {
      const date = formatDate(prop.date);
      // Don't escape description as it contains HTML
      const description = prop.description || "";
      // Clean title and venue for display
      const title = escapeHTML(prop.title || "Presentation");
      const venue = escapeHTML(prop.venue || "");

      const card = `
        <div class="card-publication">
          <div class="number">${count++}</div>
          <div class="card-details-section">
            <div class="card-title">
              <h3>${title}</h3>
            </div>
            <div class="card-details">
              ${description}
              <br/>
              <p class="date"><strong style="color: #ffcc00;">Date:</strong> ${date}</p>
              ${
                venue
                  ? `<p class="venue"><strong style="color: #ffcc00;">Venue:</strong> ${venue}</p>`
                  : ""
              }
            </div>
          </div>
        </div>
      `;
      main += card;
    }

    if (!main) {
      main = `<div style="padding:16px;">No presentations found.</div>`;
    }

    document.getElementById("cardconjs").innerHTML = main;
  }

  function buildYearFilter(items) {
    const years = new Set();
    for (const it of items) {
      const d = new Date(it.date || "");
      if (!isNaN(d)) years.add(d.getFullYear().toString());
    }
    const sorted = Array.from(years).sort((a, b) => b.localeCompare(a));

    const opts = [`<option value="all">All years</option>`]
      .concat(sorted.map((y) => `<option value="${y}">${y}</option>`))
      .join("");

    $("#yearSelect").html(opts);
  }

  function formatDate(raw) {
    if (!raw) return "—";
    const d = new Date(raw);
    if (isNaN(d)) return raw; // show as-is if not ISO
    // e.g., 2025-09-20 → 20 Sep 2025
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
});
