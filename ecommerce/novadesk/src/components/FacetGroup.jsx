function getSelectedValues(filters, facetId) {
  const value = filters?.[facetId];

  return Array.isArray(value) ? value : [];
}

function getOptionCount(products, facetId, option) {
  if (!Array.isArray(products)) {
    return 0;
  }

  return products.filter((product) => product[facetId] === option).length;
}

export function FacetGroup({ facet, filters = {}, setFilters, products = [] }) {
  if (!facet || !facet.id) {
    return null;
  }

  const selectedValues = getSelectedValues(filters, facet.id);
  const rangeValue = filters[facet.id] ?? facet.max;
  const toggleValue = Boolean(filters[facet.id]);

  function toggleCheckbox(option) {
    if (typeof setFilters !== "function") {
      return;
    }

    setFilters((currentFilters) => {
      const currentValues = getSelectedValues(currentFilters, facet.id);
      const isSelected = currentValues.includes(option);

      const nextValues = isSelected
        ? currentValues.filter((value) => value !== option)
        : [...currentValues, option];

      return {
        ...currentFilters,
        [facet.id]: nextValues,
      };
    });
  }

  function changeRange(event) {
    if (typeof setFilters !== "function") {
      return;
    }

    const value = Number(event.target.value);

    setFilters((currentFilters) => ({
      ...currentFilters,
      [facet.id]: value,
    }));
  }

  function changeToggle(event) {
    if (typeof setFilters !== "function") {
      return;
    }

    setFilters((currentFilters) => ({
      ...currentFilters,
      [facet.id]: event.target.checked,
    }));
  }

  return (
    <section className="facet-group" aria-labelledby={`facet-${facet.id}`}>
      <div className="facet-group-heading">
        <h3 id={`facet-${facet.id}`}>{facet.label}</h3>

        {facet.description && (
          <p className="facet-description">{facet.description}</p>
        )}
      </div>

      {facet.type === "checkbox" && (
        <div className="facet-options">
          {facet.options.map((option) => {
            const isChecked = selectedValues.includes(option);
            const optionCount = getOptionCount(products, facet.id, option);
            const inputId = `${facet.id}-${option
              .toLowerCase()
              .replaceAll(" ", "-")}`;

            return (
              <label
                className={isChecked ? "facet-option selected" : "facet-option"}
                htmlFor={inputId}
                key={option}
              >
                <span className="facet-option-main">
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCheckbox(option)}
                  />

                  <span>{option}</span>
                </span>

                <span className="facet-option-count" aria-label={`${optionCount} products`}>
                  {optionCount}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {facet.type === "range" && (
        <div className="facet-range">
          <div className="range-value-row">
            <span>Up to</span>

            <strong>
              {facet.unit}
              {rangeValue}
            </strong>
          </div>

          <input
            type="range"
            min={facet.min}
            max={facet.max}
            step={facet.step}
            value={rangeValue}
            onChange={changeRange}
            aria-label={facet.label}
          />

          <div className="range-limits" aria-hidden="true">
            <span>
              {facet.unit}
              {facet.min}
            </span>

            <span>
              {facet.unit}
              {facet.max}
            </span>
          </div>
        </div>
      )}

      {facet.type === "toggle" && (
        <label className={toggleValue ? "facet-toggle active" : "facet-toggle"}>
          <span>
            <strong>{facet.text}</strong>

            {facet.description && <small>{facet.description}</small>}
          </span>

          <input
            type="checkbox"
            checked={toggleValue}
            onChange={changeToggle}
          />

          <span className="toggle-track" aria-hidden="true">
            <span className="toggle-thumb" />
          </span>
        </label>
      )}
    </section>
  );
}