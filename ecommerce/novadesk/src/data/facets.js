export const facets = [
  {
    id: "category",
    label: "Category",
    type: "checkbox",
    description: "Browse by product family.",
    options: [
      "Laptop setup",
      "Desk lighting",
      "Organization",
      "Writing",
      "Audio",
      "Bags"
    ]
  },
  {
    id: "studyGoal",
    label: "Study goal",
    type: "checkbox",
    description: "Filter by the user need behind the purchase.",
    options: [
      "Study focus",
      "Remote classes",
      "Dorm room",
      "Commuting",
      "Minimal setup"
    ]
  },
  {
    id: "color",
    label: "Color",
    type: "checkbox",
    description: "Choose the visual style that fits the workspace.",
    options: [
      "Black",
      "White",
      "Blue",
      "Green",
      "Silver",
      "Natural",
      "Gray"
    ]
  },
  {
    id: "material",
    label: "Material",
    type: "checkbox",
    description: "Compare products by material and finish.",
    options: [
      "Aluminum",
      "Recycled plastic",
      "Cotton",
      "Paper",
      "Wood",
      "Fabric"
    ]
  },
  {
    id: "maxPrice",
    label: "Maximum price",
    type: "range",
    description: "Limit results to products within the selected budget.",
    min: 0,
    max: 200,
    step: 10,
    unit: "$"
  },
  {
    id: "eco",
    label: "Eco option",
    type: "toggle",
    description: "Show only products marked as eco-friendly.",
    text: "Eco-friendly products only"
  }
];

export const initialFilters = {
  category: [],
  studyGoal: [],
  color: [],
  material: [],
  maxPrice: 200,
  eco: false
};