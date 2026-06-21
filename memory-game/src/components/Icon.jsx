const ICONS = {
  brain: (
    <path d="M9.5 4.2C8 4.2 6.8 5.4 6.8 6.9v.4H6.4A2.4 2.4 0 0 0 4 9.7c0 .7.3 1.4.8 1.8A2.8 2.8 0 0 0 4 13.5c0 1.5 1.2 2.7 2.7 2.7h.4v.3c0 1.4 1.1 2.5 2.5 2.5 1.3 0 2.4-1 2.5-2.2V6.7a2.5 2.5 0 0 0-2.6-2.5Zm5 0c1.5 0 2.7 1.2 2.7 2.7v.4h.4A2.4 2.4 0 0 1 20 9.7c0 .7-.3 1.4-.8 1.8.5.5.8 1.2.8 2 0 1.5-1.2 2.7-2.7 2.7h-.4v.3c0 1.4-1.1 2.5-2.5 2.5-1.3 0-2.4-1-2.5-2.2V6.7a2.5 2.5 0 0 1 2.6-2.5Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </>
  ),
  cards: (
    <>
      <rect x="5" y="4" width="10" height="14" rx="2" />
      <path d="M9 6h6a2 2 0 0 1 2 2v10" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="5" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="14.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="14.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  score: (
    <path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.2 6.8 19l1-5.8-4.2-4.1 5.8-.8L12 3Z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4 21 20H3L12 4Z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  trophy: (
    <>
      <path d="M8 4h8v4.5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5.5A2.5 2.5 0 0 0 8 10" />
      <path d="M16 6h2.5A2.5 2.5 0 0 1 16 10" />
      <path d="M12 12.5V17" />
      <path d="M8.5 20h7" />
      <path d="M10 17h4" />
    </>
  ),
  restart: (
    <>
      <path d="M6.5 9A6 6 0 1 1 6 14" />
      <path d="M6.5 5v4h4" />
    </>
  ),
  back: (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  play: <path d="M8 5.5v13l10-6.5L8 5.5Z" />,
  sequence: (
    <>
      <path d="M7 6h.01" />
      <path d="M7 12h.01" />
      <path d="M7 18h.01" />
      <path d="M11 6h6" />
      <path d="M11 12h6" />
      <path d="M11 18h6" />
    </>
  ),
  focus: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C12 4 6 8.5 6 15a5 5 0 0 0 5 5c6.5 0 9-8 9-16Z" />
      <path d="M6 20c2.5-6 7-9.5 14-16" />
    </>
  ),
  space: (
    <path d="M12 2.5 14.4 9l6.6.5-5.1 4.2 1.6 6.4L12 16.6 6.5 20.1l1.6-6.4L3 9.5 9.6 9 12 2.5Z" />
  ),
  food: (
    <>
      <path d="M7 3v8" />
      <path d="M5 3v4" />
      <path d="M9 3v4" />
      <path d="M7 11v10" />
      <path d="M16 3v18" />
      <path d="M14 3h4v8h-4z" />
    </>
  ),
  animal: (
    <>
      <circle cx="8" cy="9" r="2" />
      <circle cx="16" cy="9" r="2" />
      <circle cx="12" cy="14" r="5" />
      <path d="M10 14h.01" />
      <path d="M14 14h.01" />
      <path d="M12 15.5v1" />
    </>
  ),

  "animal-paw": (
    <>
      <circle cx="7.5" cy="8" r="1.6" />
      <circle cx="12" cy="6.8" r="1.8" />
      <circle cx="16.5" cy="8" r="1.6" />
      <path d="M8 15.5c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5c0 2-1.6 3.2-4 3.2s-4-1.2-4-3.2Z" />
    </>
  ),
  "animal-claw": (
    <>
      <path d="M7 20c1.5-6 1.8-10.5 1-16" />
      <path d="M12 20c1.5-6 1.8-10.5 1-16" />
      <path d="M17 20c1.5-6 1.8-10.5 1-16" />
    </>
  ),
  "animal-wing": (
    <>
      <path d="M4 15c2.5-7 8.5-11 16-10-1 7.5-5.5 12.5-13 14-2-1-3-2.4-3-4Z" />
      <path d="M7 16c3-2 6-5 10-10" />
      <path d="M8 13h6" />
      <path d="M10 10h5" />
    </>
  ),
  "animal-fish": (
    <>
      <path d="M4 12c3.5-4 8.5-4 13 0-4.5 4-9.5 4-13 0Z" />
      <path d="M17 12l4-3v6l-4-3Z" />
      <path d="M9 11h.01" />
    </>
  ),
  "animal-tail": (
    <>
      <path d="M5 15c5 2 11 1 13-4 1.2-3-1-5-3.5-4-2 .8-2.3 3.4-.8 4.8" />
      <path d="M5 15c2 3 6 4 9 3" />
    </>
  ),
  "animal-antler": (
    <>
      <path d="M10 21V10" />
      <path d="M14 21V10" />
      <path d="M10 10 6 5" />
      <path d="M10 12 5 12" />
      <path d="M14 10l4-5" />
      <path d="M14 12h5" />
    </>
  ),
  "animal-feather": (
    <>
      <path d="M6 20c7-2 12-8 13-16C11 5 6 11 6 20Z" />
      <path d="M6 20 18 5" />
      <path d="M10 15H6.5" />
      <path d="M13 11H9.5" />
    </>
  ),
  "animal-shell": (
    <>
      <path d="M4 14a8 8 0 0 1 16 0v4H4v-4Z" />
      <path d="M8 18v-5" />
      <path d="M12 18V9" />
      <path d="M16 18v-5" />
    </>
  ),
  "animal-bug": (
    <>
      <ellipse cx="12" cy="13" rx="4" ry="6" />
      <path d="M12 7V4" />
      <path d="M8 10 5 8" />
      <path d="M16 10l3-2" />
      <path d="M8 14H4" />
      <path d="M16 14h4" />
      <path d="M9 18l-3 2" />
      <path d="M15 18l3 2" />
    </>
  ),
  "animal-horn": (
    <>
      <path d="M6 18C7 9 12 4 20 4c-2 7-7 12-14 14Z" />
      <path d="M8.5 15.5 17 7" />
      <path d="M11 18c-1 2-3.5 2.5-5 0" />
    </>
  ),
  "animal-beak": (
    <>
      <path d="M5 12h14L9 6v12L5 12Z" />
      <path d="M9 12h10" />
    </>
  ),
  "animal-fin": (
    <>
      <path d="M5 18 12 5l7 13H5Z" />
      <path d="M12 5v13" />
      <path d="M8.5 14h7" />
      <path d="M10 10h4" />
    </>
  ),
  "animal-ear": (
    <>
      <path d="M8 20c-2-7 0-14 5-17 4 5 4 12 0 17" />
      <path d="M11 18c-1-5 0-9 2-12" />
    </>
  ),
  "animal-hoof": (
    <>
      <path d="M8 4v9c0 4 2 7 4 7s4-3 4-7V4" />
      <path d="M12 13v7" />
      <path d="M8 13h8" />
    </>
  ),
  "animal-scale": (
    <>
      <path d="M4 18c2-7 6-11 8-11s6 4 8 11H4Z" />
      <path d="M8 18c1-4 3-7 4-7s3 3 4 7" />
    </>
  ),
  "animal-web": (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
      <path d="M7 7l10 10" />
      <path d="M17 7 7 17" />
      <circle cx="12" cy="12" r="6" />
    </>
  ),
  "animal-stripe": (
    <>
      <path d="M5 5h14" />
      <path d="M4 10h16" />
      <path d="M5 15h14" />
      <path d="M7 20h10" />
    </>
  ),
  "animal-spot": (
    <>
      <circle cx="8" cy="8" r="2" />
      <circle cx="15" cy="7" r="1.5" />
      <circle cx="16" cy="15" r="2.2" />
      <circle cx="8.5" cy="16" r="1.6" />
    </>
  ),

  "space-orbit": (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
    </>
  ),
  "space-planet": (
    <>
      <circle cx="12" cy="12" r="6" />
      <path d="M3 14c5 2 12 1 18-4" />
    </>
  ),
  "space-star": (
    <path d="m12 3 2.3 6 6.2.4-4.8 4 1.5 6.1L12 16.2l-5.2 3.3 1.5-6.1-4.8-4 6.2-.4L12 3Z" />
  ),
  "space-comet": (
    <>
      <circle cx="16" cy="8" r="3.2" />
      <path d="M13.7 10.3 5 19" />
      <path d="M11.8 8.5 3.5 13.5" />
      <path d="M16.5 11.2 11.5 20.5" />
    </>
  ),
  "space-moon": <path d="M18 18.5A8 8 0 0 1 11.5 4a7 7 0 1 0 6.5 14.5Z" />,
  "space-sun": (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M4.2 4.2l2.1 2.1" />
      <path d="M17.7 17.7l2.1 2.1" />
      <path d="M19.8 4.2l-2.1 2.1" />
      <path d="M6.3 17.7l-2.1 2.1" />
    </>
  ),
  "space-rocket": (
    <>
      <path d="M12 3c4 2 6 6 5 12l-5 5-5-5C6 9 8 5 12 3Z" />
      <circle cx="12" cy="9" r="2" />
      <path d="M9 17l-3 3" />
      <path d="M15 17l3 3" />
    </>
  ),
  "space-satellite": (
    <>
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M7 7 4 4" />
      <path d="M17 17l3 3" />
      <path d="M5 12H2" />
      <path d="M22 12h-3" />
    </>
  ),
  "space-galaxy": (
    <>
      <path d="M4 12c3-5 13-5 16 0-3 5-13 5-16 0Z" />
      <circle cx="12" cy="12" r="2" />
      <path d="M8 9c4 2 5 4 8 6" />
    </>
  ),
  "space-eclipse": (
    <>
      <circle cx="10" cy="12" r="6" />
      <path d="M14 6a6 6 0 0 1 0 12 6 6 0 0 0 0-12Z" />
    </>
  ),
  "space-meteor": (
    <>
      <path d="M4 5l6 6" />
      <path d="M7 3l5 5" />
      <path d="M3 9l5 5" />
      <path d="M13 9l5 2 2 5-4 4-5-2-2-5 4-4Z" />
      <path d="M15 13h.01" />
      <path d="M16 17h.01" />
    </>
  ),
  "space-telescope": (
    <>
      <path d="M4 14l10-5 2 4-10 5-2-4Z" />
      <path d="M14 9l3-2 2 4-3 2" />
      <path d="M10 16l2 5" />
      <path d="M8 21h8" />
    </>
  ),
  "space-asteroid": (
    <>
      <path d="M7 6 14 4l5 5-2 8-8 3-5-6 3-8Z" />
      <path d="M10 9h.01" />
      <path d="M14 13h.01" />
      <path d="M9 15h.01" />
    </>
  ),
  "space-radar": (
    <>
      <path d="M6 18h12" />
      <path d="M12 18v-6" />
      <path d="M8 12a4 4 0 0 1 8 0" />
      <path d="M5 12a7 7 0 0 1 14 0" />
      <path d="M2 12a10 10 0 0 1 20 0" />
    </>
  ),
  "space-constellation": (
    <>
      <circle cx="6" cy="8" r="1.2" />
      <circle cx="12" cy="5" r="1.2" />
      <circle cx="18" cy="10" r="1.2" />
      <circle cx="15" cy="18" r="1.2" />
      <circle cx="7" cy="16" r="1.2" />
      <path d="M7 7.5 11 5.5 18 10 15 18 7 16 6 8" />
    </>
  ),
  "space-blackhole": (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <path d="M5 12c2.5-4 11.5-4 14 0" />
      <path d="M19 12c-2.5 4-11.5 4-14 0" />
      <path d="M8.5 12a3.5 3.5 0 0 1 7 0c0 2-1.6 3.5-3.5 3.5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  "space-capsule": (
    <>
      <path d="M8 4h8v10a4 4 0 0 1-8 0V4Z" />
      <path d="M8 8h8" />
      <path d="M10 18l-2 3" />
      <path d="M14 18l2 3" />
    </>
  ),
  "space-spark": (
    <>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),

  "food-apple": (
    <>
      <path d="M12 7c2-3 5-2 6 1 2 6-2 12-6 10-4 2-8-4-6-10 1-3 4-4 6-1Z" />
      <path d="M12 7c0-2 1-3 3-4" />
    </>
  ),
  "food-citrus": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16" />
      <path d="M4 12h16" />
      <path d="M6.5 6.5 17.5 17.5" />
      <path d="M17.5 6.5 6.5 17.5" />
    </>
  ),
  "food-bread": (
    <>
      <path d="M5 11c0-4 3-7 7-7s7 3 7 7v8H5v-8Z" />
      <path d="M8 14h8" />
    </>
  ),
  "food-cup": (
    <>
      <path d="M6 7h10v8a5 5 0 0 1-10 0V7Z" />
      <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M5 21h12" />
    </>
  ),
  "food-bowl": (
    <>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M7 20h10" />
      <path d="M8 7c0-2 2-2 2-4" />
      <path d="M14 7c0-2 2-2 2-4" />
    </>
  ),
  "food-slice": (
    <>
      <path d="M5 20 19 4v16H5Z" />
      <path d="M12 13h.01" />
      <path d="M16 17h.01" />
      <path d="M16 9h.01" />
    </>
  ),
  "food-leaf": (
    <>
      <path d="M20 5C12 5 7 9 6 18c8 0 13-5 14-13Z" />
      <path d="M6 18 18 6" />
    </>
  ),
  "food-fork": (
    <>
      <path d="M7 3v18" />
      <path d="M4 3v6" />
      <path d="M7 3v6" />
      <path d="M10 3v6" />
      <path d="M4 9h6" />
    </>
  ),
  "food-spoon": (
    <>
      <ellipse cx="12" cy="7" rx="3" ry="4" />
      <path d="M12 11v10" />
    </>
  ),
  "food-cake": (
    <>
      <path d="M5 11h14v9H5v-9Z" />
      <path d="M5 15h14" />
      <path d="M8 11V7" />
      <path d="M12 11V7" />
      <path d="M16 11V7" />
    </>
  ),
  "food-drop": (
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
  ),
  "food-grain": (
    <>
      <path d="M12 21V3" />
      <path d="M12 7c-3 0-5-2-5-4 3 0 5 2 5 4Z" />
      <path d="M12 11c3 0 5-2 5-4-3 0-5 2-5 4Z" />
      <path d="M12 15c-3 0-5-2-5-4 3 0 5 2 5 4Z" />
      <path d="M12 19c3 0 5-2 5-4-3 0-5 2-5 4Z" />
    </>
  ),
  "food-berry": (
    <>
      <circle cx="9" cy="10" r="3" />
      <circle cx="15" cy="10" r="3" />
      <circle cx="12" cy="15" r="3.5" />
      <path d="M12 6V3" />
    </>
  ),
  "food-steam": (
    <>
      <path d="M6 18h12" />
      <path d="M8 14h8" />
      <path d="M8 10c0-2 2-2 2-4" />
      <path d="M14 10c0-2 2-2 2-4" />
    </>
  ),
  "food-plate": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  "food-bottle": (
    <>
      <path d="M10 3h4v5l2 3v9H8v-9l2-3V3Z" />
      <path d="M10 8h4" />
      <path d="M8 14h8" />
    </>
  ),
  "food-cookie": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 9h.01" />
      <path d="M14 8h.01" />
      <path d="M16 14h.01" />
      <path d="M10 16h.01" />
    </>
  ),
  "food-cone": (
    <>
      <path d="M8 9a4 4 0 0 1 8 0" />
      <path d="M7 10h10l-5 11-5-11Z" />
      <path d="M10 14h4" />
    </>
  ),

  "nature-tree": (
    <>
      <path d="M12 21v-7" />
      <path d="M7 14a5 5 0 0 1 5-10 5 5 0 0 1 5 10H7Z" />
    </>
  ),
  "nature-leaf": (
    <>
      <path d="M20 4C12 4 6 8.5 6 15a5 5 0 0 0 5 5c6.5 0 9-8 9-16Z" />
      <path d="M6 20c2.5-6 7-9.5 14-16" />
    </>
  ),
  "nature-flower": (
    <>
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
    </>
  ),
  "nature-mountain": (
    <>
      <path d="M3 19 9 8l4 7 3-5 5 9H3Z" />
      <path d="M9 8l2 4" />
    </>
  ),
  "nature-wave": (
    <path d="M3 14c3-4 6 4 9 0s6 4 9 0" />
  ),
  "nature-rain": (
    <>
      <path d="M7 8a6 6 0 0 1 11 2 4 4 0 0 1-1 8H7a5 5 0 0 1 0-10Z" />
      <path d="M8 20v1" />
      <path d="M12 19v2" />
      <path d="M16 20v1" />
    </>
  ),
  "nature-snow": (
    <>
      <path d="M12 3v18" />
      <path d="M5 6l14 12" />
      <path d="M19 6 5 18" />
    </>
  ),
  "nature-fire": (
    <>
      <path d="M12 21c-4.2 0-7-3-7-7 0-4.2 3.4-6.2 5.2-10.5 1.2 2.7 3.3 4.2 4.8 6.2.3-1.6.1-3.2-.6-4.7 3.2 2.4 5.6 5.2 5.6 9 0 4-3 7-8 7Z" />
      <path d="M12 18c-1.8 0-3-1.3-3-3 0-1.7 1.4-2.7 2.2-4.5 1.4 1.5 3.8 3.1 3.8 4.8 0 1.5-1.2 2.7-3 2.7Z" />
    </>
  ),
  "nature-seed": (
    <>
      <path d="M12 20c-4-2-6-5-6-9 0-4 3-7 6-8 3 1 6 4 6 8 0 4-2 7-6 9Z" />
      <path d="M12 20V9" />
      <path d="M9.5 12.5h5" />
      <path d="M10 16h4" />
    </>
  ),
  "nature-cloud": (
    <path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9-2 4 4 0 1 1 1 10H7Z" />
  ),
  "nature-sun": (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
    </>
  ),
  "nature-moon": <path d="M18 18.5A8 8 0 0 1 11.5 4a7 7 0 1 0 6.5 14.5Z" />,
  "nature-branch": (
    <>
      <path d="M5 19c5-5 9-10 14-14" />
      <path d="M10 14c-3 0-5-2-5-5" />
      <path d="M14 10c3 0 5-2 5-5" />
    </>
  ),
  "nature-root": (
    <>
      <path d="M12 3v18" />
      <path d="M12 14 7 21" />
      <path d="M12 14l5 7" />
      <path d="M12 9 8 5" />
      <path d="M12 9l4-4" />
    </>
  ),
  "nature-stone": (
    <path d="M5 16 7 8l7-4 6 6-2 8-8 2-5-4Z" />
  ),
  "nature-wind": (
    <>
      <path d="M3 8h12a3 3 0 1 0-3-3" />
      <path d="M3 13h16a3 3 0 1 1-3 3" />
      <path d="M3 18h7" />
    </>
  ),
  "nature-drop": (
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
  ),
  "nature-sprout": (
    <>
      <path d="M12 21V12" />
      <path d="M12 12C8 12 5 9 5 5c4 0 7 3 7 7Z" />
      <path d="M12 12c4 0 7-3 7-7-4 0-7 3-7 7Z" />
      <path d="M12 16c-2.5 0-4 1.5-5 4" />
      <path d="M12 16c2.5 0 4 1.5 5 4" />
    </>
  )
};

export default function Icon({
  name,
  size = 20,
  decorative = true,
  label,
  className = ""
}) {
  const icon = ICONS[name] ?? ICONS.brain;

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      data-icon-name={name}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={!decorative ? label : undefined}
      role={!decorative ? "img" : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icon}
    </svg>
  );
}