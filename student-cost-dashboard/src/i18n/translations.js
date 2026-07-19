/**
 * Bilingual resources for the student cost-of-living dashboard.
 *
 * Rules:
 * - Every user-facing string must be defined in this file.
 * - French and English must expose the same structure.
 * - Numeric and currency formatting belongs in formatters.js.
 * - Raw expense data belongs in costData.js.
 */

export const supportedLanguages = Object.freeze(["fr", "en"]);

export const defaultLanguage = "fr";

/**
 * Recursively freezes a translation resource to prevent accidental mutations.
 *
 * @param {unknown} value
 * @returns {unknown}
 */
function deepFreeze(value) {
  if (
    value !== null &&
    (typeof value === "object" || typeof value === "function") &&
    !Object.isFrozen(value)
  ) {
    for (const child of Object.values(value)) {
      deepFreeze(child);
    }

    Object.freeze(value);
  }

  return value;
}

export const translations = deepFreeze({
  fr: {
    language: {
      code: "fr",
      locale: "fr-CA",
      name: "Français",
      switchLabel: "English",
      switchAriaLabel: "Afficher l’interface en anglais"
    },

    document: {
      title: "Coût de la vie étudiante | Tableau de bord",
      description:
        "Tableau de bord bilingue présentant des données synthétiques sur le coût de la vie étudiante au Canada."
    },

    navigation: {
      skipToMain: "Aller au contenu principal",
      backToPortfolio: "Retour au portfolio",
      backToPortfolioAriaLabel:
        "Retourner au portfolio de Mohamed Boudabbous"
    },

    header: {
      eyebrow: "Budget étudiant · Canada",
      title: "Coût de la vie étudiante",
      subtitle:
        "Explorez l’évolution d’un budget étudiant fictif et comparez les principales catégories de dépenses au cours de l’année."
    },

    dataNotice: {
      title: "Données synthétiques",
      description:
        "Ce tableau de bord utilise des données synthétiques créées à des fins éducatives. Elles ne représentent pas les dépenses réelles d’une personne."
    },

    summary: {
      sectionLabel: "Vue d’ensemble",
      sectionTitle: "Le budget annuel en un coup d’œil",

      annualTotal: {
        label: "Dépense annuelle totale",
        description: "Somme de toutes les dépenses sur 12 mois"
      },

      monthlyAverage: {
        label: "Dépense mensuelle moyenne",
        description: "Moyenne des dépenses mensuelles"
      },

      highestCategory: {
        label: "Catégorie la plus coûteuse",
        description: "Catégorie ayant le total annuel le plus élevé"
      },

      highestMonth: {
        label: "Mois le plus coûteux",
        description: "Mois ayant le total de dépenses le plus élevé"
      }
    },

    categories: {
      housing: "Logement",
      food: "Alimentation",
      transportation: "Transport",
      education: "Études",
      utilities: "Factures et services",
      leisure: "Loisirs"
    },

    months: {
      long: [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre"
      ],

      short: [
        "janv.",
        "févr.",
        "mars",
        "avr.",
        "mai",
        "juin",
        "juill.",
        "août",
        "sept.",
        "oct.",
        "nov.",
        "déc."
      ]
    },

    charts: {
      sectionLabel: "Analyse interactive",
      sectionTitle: "Explorez les dépenses mensuelles",

      trend: {
        title: "Évolution mensuelle par catégorie",
        description:
          "Sélectionnez une catégorie pour observer l’évolution de cette dépense de janvier à décembre.",
        selectLabel: "Catégorie de dépense",
        xAxisTitle: "Mois",
        yAxisTitle: "Montant mensuel (CAD)",
        datasetLabel: "Dépenses mensuelles",
        emptyMessage: "Aucune donnée n’est disponible pour cette catégorie.",
        ariaLabel: (category) =>
          `Graphique linéaire montrant l’évolution mensuelle de la catégorie « ${category} » en 2026.`
      },

      comparison: {
        title: "Comparaison des dépenses mensuelles",
        description:
          "Sélectionnez un mois pour comparer les six catégories de dépenses.",
        selectLabel: "Mois",
        xAxisTitle: "Catégorie",
        yAxisTitle: "Montant (CAD)",
        datasetLabel: (month) => `Dépenses en ${month}`,
        highestValueLabel: "Dépense la plus élevée",
        emptyMessage: "Aucune donnée n’est disponible pour ce mois.",
        ariaLabel: (month) =>
          `Graphique à barres comparant les catégories de dépenses pour le mois de ${month} 2026.`
      }
    },

    insights: {
      sectionLabel: "Observation principale",

      trendIncrease: ({
        category,
        startMonth,
        endMonth,
        startValue,
        endValue
      }) =>
        `La catégorie « ${category} » augmente de ${startValue} en ${startMonth} à ${endValue} en ${endMonth}.`,

      trendDecrease: ({
        category,
        startMonth,
        endMonth,
        startValue,
        endValue
      }) =>
        `La catégorie « ${category} » diminue de ${startValue} en ${startMonth} à ${endValue} en ${endMonth}.`,

      trendStable: ({ category, startMonth, endMonth, value }) =>
        `La catégorie « ${category} » reste stable à ${value} entre ${startMonth} et ${endMonth}.`,

      trendPeak: ({ category, month, value }) =>
        `La valeur maximale de la catégorie « ${category} » est observée en ${month}, avec ${value}.`,

      comparisonHighest: ({ month, category, value }) =>
        `En ${month}, la catégorie « ${category} » est la plus élevée avec ${value}.`
    },

    dataTable: {
      showData: "Afficher les données du graphique",
      hideData: "Masquer les données du graphique",

      trendCaption: (category) =>
        `Dépenses mensuelles pour la catégorie « ${category} »`,

      comparisonCaption: (month) =>
        `Comparaison des catégories de dépenses en ${month}`,

      monthHeader: "Mois",
      categoryHeader: "Catégorie",
      amountHeader: "Montant",
      currencyHeader: "Devise"
    },

    common: {
      year: "2026",
      currencyCode: "CAD",
      currencyName: "dollar canadien",
      unavailable: "Indisponible",
      loading: "Chargement…"
    },

    accessibility: {
      languageChanged: "L’interface est maintenant affichée en français.",
      chartUpdated: "Le graphique a été mis à jour.",
      opensNewWindow: "S’ouvre dans une nouvelle fenêtre."
    },

    footer: {
      course: "SEG3525 — Conception et analyse d’interfaces usagers",
      syntheticNotice:
        "Prototype éducatif utilisant exclusivement des données synthétiques.",
      portfolioLabel: "Portfolio de Mohamed Boudabbous",
      copyright: "© 2026 Mohamed Boudabbous"
    }
  },

  en: {
    language: {
      code: "en",
      locale: "en-CA",
      name: "English",
      switchLabel: "Français",
      switchAriaLabel: "Afficher l’interface en français"
    },

    document: {
      title: "Student Cost of Living | Dashboard",
      description:
        "Bilingual dashboard presenting synthetic data about the cost of student living in Canada."
    },

    navigation: {
      skipToMain: "Skip to main content",
      backToPortfolio: "Back to portfolio",
      backToPortfolioAriaLabel:
        "Return to Mohamed Boudabbous’s portfolio"
    },

    header: {
      eyebrow: "Student budget · Canada",
      title: "Student Cost of Living",
      subtitle:
        "Explore changes in a fictional student budget and compare the main expense categories throughout the year."
    },

    dataNotice: {
      title: "Synthetic data",
      description:
        "This dashboard uses synthetic data created for educational purposes. It does not represent a real person’s expenses."
    },

    summary: {
      sectionLabel: "Overview",
      sectionTitle: "The annual budget at a glance",

      annualTotal: {
        label: "Total annual expenses",
        description: "Sum of all expenses over 12 months"
      },

      monthlyAverage: {
        label: "Average monthly expenses",
        description: "Average of the monthly expense totals"
      },

      highestCategory: {
        label: "Highest expense category",
        description: "Category with the highest annual total"
      },

      highestMonth: {
        label: "Most expensive month",
        description: "Month with the highest total expenses"
      }
    },

    categories: {
      housing: "Housing",
      food: "Food",
      transportation: "Transportation",
      education: "Education",
      utilities: "Utilities and services",
      leisure: "Leisure"
    },

    months: {
      long: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],

      short: [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec."
      ]
    },

    charts: {
      sectionLabel: "Interactive analysis",
      sectionTitle: "Explore monthly expenses",

      trend: {
        title: "Monthly trend by category",
        description:
          "Select a category to examine how that expense changes from January to December.",
        selectLabel: "Expense category",
        xAxisTitle: "Month",
        yAxisTitle: "Monthly amount (CAD)",
        datasetLabel: "Monthly expenses",
        emptyMessage: "No data is available for this category.",
        ariaLabel: (category) =>
          `Line chart showing the monthly trend for the “${category}” category in 2026.`
      },

      comparison: {
        title: "Monthly expense comparison",
        description:
          "Select a month to compare the six expense categories.",
        selectLabel: "Month",
        xAxisTitle: "Category",
        yAxisTitle: "Amount (CAD)",
        datasetLabel: (month) => `Expenses in ${month}`,
        highestValueLabel: "Highest expense",
        emptyMessage: "No data is available for this month.",
        ariaLabel: (month) =>
          `Bar chart comparing expense categories for ${month} 2026.`
      }
    },

    insights: {
      sectionLabel: "Key observation",

      trendIncrease: ({
        category,
        startMonth,
        endMonth,
        startValue,
        endValue
      }) =>
        `The “${category}” category increases from ${startValue} in ${startMonth} to ${endValue} in ${endMonth}.`,

      trendDecrease: ({
        category,
        startMonth,
        endMonth,
        startValue,
        endValue
      }) =>
        `The “${category}” category decreases from ${startValue} in ${startMonth} to ${endValue} in ${endMonth}.`,

      trendStable: ({ category, startMonth, endMonth, value }) =>
        `The “${category}” category remains stable at ${value} between ${startMonth} and ${endMonth}.`,

      trendPeak: ({ category, month, value }) =>
        `The highest value for the “${category}” category occurs in ${month}, at ${value}.`,

      comparisonHighest: ({ month, category, value }) =>
        `In ${month}, “${category}” is the highest expense category at ${value}.`
    },

    dataTable: {
      showData: "Show chart data",
      hideData: "Hide chart data",

      trendCaption: (category) =>
        `Monthly expenses for the “${category}” category`,

      comparisonCaption: (month) =>
        `Expense category comparison for ${month}`,

      monthHeader: "Month",
      categoryHeader: "Category",
      amountHeader: "Amount",
      currencyHeader: "Currency"
    },

    common: {
      year: "2026",
      currencyCode: "CAD",
      currencyName: "Canadian dollar",
      unavailable: "Unavailable",
      loading: "Loading…"
    },

    accessibility: {
      languageChanged: "The interface is now displayed in English.",
      chartUpdated: "The chart has been updated.",
      opensNewWindow: "Opens in a new window."
    },

    footer: {
      course: "SEG3525 — User Interface Design and Analysis",
      syntheticNotice:
        "Educational prototype using exclusively synthetic data.",
      portfolioLabel: "Mohamed Boudabbous’s portfolio",
      copyright: "© 2026 Mohamed Boudabbous"
    }
  }
});

/**
 * Returns the requested language resources.
 *
 * Unsupported language codes safely fall back to French.
 *
 * @param {string} language
 * @returns {typeof translations.fr}
 */
export function getTranslations(language) {
  return translations[language] ?? translations[defaultLanguage];
}