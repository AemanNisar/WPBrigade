// search functionality
export function initSiteSearch() {
  const input = document.getElementById("site-search");

  if (!input) return;

  const HIGHLIGHT_CLASS = "site-search__highlight";
  const HIGHLIGHT_WRAP_CLASS = "site-search__highlight-wrap";

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function clearHighlights() {
    document.querySelectorAll(`mark.${HIGHLIGHT_CLASS}`).forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize(); // merge text nodes
    });

    document
      .querySelectorAll(`span.${HIGHLIGHT_WRAP_CLASS}`)
      .forEach((span) => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize(); // merge text nodes
      });
  }

  function highlight(query) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (
            !node.parentElement ||
            ["SCRIPT", "STYLE"].includes(node.parentElement.tagName)
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    const nodes = [];
    let node;

    while ((node = walker.nextNode())) {
      nodes.push(node);
    }

    const regex = new RegExp(escapeRegExp(query), "gi");

    nodes.forEach((node) => {
      regex.lastIndex = 0;
      if (regex.test(node.nodeValue)) {
        regex.lastIndex = 0;
        const span = document.createElement("span");
        span.className = HIGHLIGHT_WRAP_CLASS;
        span.innerHTML = node.nodeValue.replace(
          regex,
          (match) => `<mark class="${HIGHLIGHT_CLASS}">${match}</mark>`,
        );
        node.parentNode.replaceChild(span, node);
      }
    });
  }

  input.addEventListener("input", () => {
    const query = input.value.trim();

    clearHighlights();

    if (!query) return;

    highlight(query);
  });

  //scroll to first result
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const first = document.querySelector(`mark.${HIGHLIGHT_CLASS}`);
      if (first) {
        first.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        alert("No results found");
      }
    }
  });
}
