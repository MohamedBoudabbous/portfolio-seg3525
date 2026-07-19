import { useState } from "react";

/**
 * Représentation tabulaire accessible des données d’un graphique.
 *
 * Le composant utilise nativement <details> et <summary>,
 * ce qui fournit le comportement clavier attendu sans ARIA
 * personnalisée supplémentaire.
 *
 * @param {object} props
 * @param {string} props.caption
 * @param {Array<object>} props.columns
 * @param {Array<object>} props.rows
 * @param {string} props.showLabel
 * @param {string} props.hideLabel
 */
function AccessibleDataTable({
  caption,
  columns,
  rows,
  showLabel,
  hideLabel
}) {
  const [
    isExpanded,
    setIsExpanded
  ] = useState(false);

  function handleToggle(event) {
    setIsExpanded(
      event.currentTarget.open
    );
  }

  return (
    <details
      className="data-table"
      onToggle={handleToggle}
    >
      <summary className="data-table__toggle">
        <span>
          {isExpanded
            ? hideLabel
            : showLabel}
        </span>

        <svg
          className="data-table__toggle-icon"
          data-expanded={isExpanded}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m7 10 5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>

      <div className="data-table__region">
        <div className="data-table__scroll">
          <table className="data-table__table">
            <caption>
              {caption}
            </caption>

            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    data-align={
                      column.align ?? "start"
                    }
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) =>
                    column.rowHeader ? (
                      <th
                        key={column.key}
                        scope="row"
                        data-align={
                          column.align ??
                          "start"
                        }
                      >
                        {row[column.key]}
                      </th>
                    ) : (
                      <td
                        key={column.key}
                        data-align={
                          column.align ??
                          "start"
                        }
                      >
                        {row[column.key]}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}

export default AccessibleDataTable;