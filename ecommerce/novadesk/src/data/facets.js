export const facets = [
  {
    id: "category",
    label: "Category",
    type: "checkbox",
    options: ["Laptop setup", "Desk lighting", "Organization", "Writing", "Audio", "Bags"]
  },
  {
    id: "useCase",
    label: "Study goal",
    type: "checkbox",
    options: ["Study focus", "Remote classes", "Dorm room", "Commuting", "Minimal setup"]
  },
  {
    id: "color",
    label: "Color",
    type: "checkbox",
    options: ["Black", "White", "Blue", "Green", "Silver", "Natural"]
  },
  {
    id: "material",
    label: "Material",
    type: "checkbox",
    options: ["Aluminum", "Recycled plastic", "Cotton", "Paper", "Wood", "Fabric"]
  },
  {
    id: "price",
    label: "Maximum price",
    type: "range",
    min: 0,
    max: 200,
    step: 10
  },
  {
    id: "eco",
    label: "Eco option",
    type: "radio",
    options: ["All", "Eco-friendly only"]
  }
];

export const initialFilters = {
  category: [],
  useCase: [],
  color: [],
  material: [],
  price: 200,
  eco: "All"
};
