// fetch states from backend
export function initCountryState() {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

  if (!countrySelect || !stateSelect) return; // safety

  countrySelect.addEventListener("change", async (e) => {
    // console.log("Country changed");
    const country = e.target.value;
    stateSelect.disabled = true;
    stateSelect.innerHTML = "<option>Loading...</option>";

    try {
      const res = await fetch(`/states?country=${country}`);

      if (!res.ok) throw new Error("Request failed");

      const result = await res.json();

      stateSelect.innerHTML =
        "<option disabled selected>Select your state</option>";

      if (result.success && result.data.length > 0) {
        result.data.forEach((state) => {
          stateSelect.add(new Option(state, state.toLowerCase()));
        });
      } else {
        stateSelect.innerHTML = "<option>No states found</option>";
      }
    } catch (err) {
      console.error("Frontend error:", err);
      stateSelect.innerHTML = "<option>Error loading</option>";
    } finally {
      stateSelect.disabled = false;
    }
  });

  // If a country is preselected , load its states.
  if (countrySelect.value) {
    countrySelect.dispatchEvent(new Event("change"));
  }
}
