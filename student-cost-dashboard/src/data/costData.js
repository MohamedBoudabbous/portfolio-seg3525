/**
 * Synthetic student cost-of-living dataset for the SEG3525 dashboard.
 *
 * Scenario:
 * A fictional full-time student living independently in Canada during 2026.
 *
 * Important:
 * - All amounts represent monthly expenses in Canadian dollars.
 * - The values are synthetic and do not represent a real person.
 * - The values are not official Canadian statistics.
 * - Translated labels must remain in translations.js, not in this file.
 */

/**
 * @typedef {
 *   "housing" |
 *   "food" |
 *   "transportation" |
 *   "education" |
 *   "utilities" |
 *   "leisure"
 * } ExpenseCategoryKey
 */

/**
 * @typedef {Object} MonthlyExpense
 * @property {string} id - Stable ISO-like identifier in YYYY-MM format.
 * @property {number} month - Month number from 1 to 12.
 * @property {number} housing - Rent and housing-related expenses.
 * @property {number} food - Groceries and other food expenses.
 * @property {number} transportation - Public transit and local travel.
 * @property {number} education - Tuition-related costs, books and supplies.
 * @property {number} utilities - Electricity, heating, internet and phone.
 * @property {number} leisure - Entertainment and discretionary activities.
 */

/**
 * Ordered list used by calculations, charts, controls and tables.
 *
 * The order is intentionally stable so that every visualization displays
 * categories consistently.
 *
 * @type {ReadonlyArray<ExpenseCategoryKey>}
 */
export const categoryKeys = Object.freeze([
  "housing",
  "food",
  "transportation",
  "education",
  "utilities",
  "leisure"
]);

/**
 * Language-independent information describing the dataset.
 *
 * User-facing explanations and translations must be obtained from
 * translations.js.
 */
export const dataMetadata = Object.freeze({
  datasetId: "student-cost-of-living-ca-2026-synthetic",
  datasetVersion: "1.0.0",
  synthetic: true,
  disclosureRequired: true,
  sourceType: "synthetic",
  year: 2026,
  currency: "CAD",
  countryCode: "CA",
  location: "Canada",
  granularity: "monthly",
  startPeriod: "2026-01",
  endPeriod: "2026-12",
  monthCount: 12,
  observationCount: 12,
  profile: "fictional-full-time-student-living-independently",
  valueMeaning: "nominal-monthly-expenses",
  purpose: "SEG3525 educational prototype"
});

/**
 * Raw monthly observations.
 *
 * Derived information such as monthly totals, annual totals, averages and
 * maximum values must be calculated in statistics.js. Those values are not
 * duplicated here because duplicated totals could become inconsistent with
 * the individual categories.
 *
 * @type {ReadonlyArray<Readonly<MonthlyExpense>>}
 */
export const monthlyExpenses = Object.freeze([
  Object.freeze({
    id: "2026-01",
    month: 1,
    housing: 1520,
    food: 460,
    transportation: 128,
    education: 680,
    utilities: 175,
    leisure: 105
  }),

  Object.freeze({
    id: "2026-02",
    month: 2,
    housing: 1520,
    food: 445,
    transportation: 128,
    education: 160,
    utilities: 165,
    leisure: 120
  }),

  Object.freeze({
    id: "2026-03",
    month: 3,
    housing: 1520,
    food: 455,
    transportation: 128,
    education: 95,
    utilities: 155,
    leisure: 110
  }),

  Object.freeze({
    id: "2026-04",
    month: 4,
    housing: 1520,
    food: 470,
    transportation: 128,
    education: 85,
    utilities: 145,
    leisure: 100
  }),

  Object.freeze({
    id: "2026-05",
    month: 5,
    housing: 1520,
    food: 485,
    transportation: 95,
    education: 520,
    utilities: 135,
    leisure: 145
  }),

  Object.freeze({
    id: "2026-06",
    month: 6,
    housing: 1520,
    food: 495,
    transportation: 95,
    education: 90,
    utilities: 125,
    leisure: 190
  }),

  Object.freeze({
    id: "2026-07",
    month: 7,
    housing: 1520,
    food: 510,
    transportation: 95,
    education: 70,
    utilities: 130,
    leisure: 210
  }),

  Object.freeze({
    id: "2026-08",
    month: 8,
    housing: 1520,
    food: 500,
    transportation: 95,
    education: 120,
    utilities: 135,
    leisure: 185
  }),

  Object.freeze({
    id: "2026-09",
    month: 9,
    housing: 1580,
    food: 480,
    transportation: 128,
    education: 740,
    utilities: 145,
    leisure: 115
  }),

  Object.freeze({
    id: "2026-10",
    month: 10,
    housing: 1580,
    food: 475,
    transportation: 128,
    education: 180,
    utilities: 155,
    leisure: 125
  }),

  Object.freeze({
    id: "2026-11",
    month: 11,
    housing: 1580,
    food: 490,
    transportation: 128,
    education: 110,
    utilities: 165,
    leisure: 110
  }),

  Object.freeze({
    id: "2026-12",
    month: 12,
    housing: 1580,
    food: 535,
    transportation: 128,
    education: 90,
    utilities: 180,
    leisure: 220
  })
]);