// All personal info defined ONCE here. No duplication.

const PROFILE = {
  // ═══════════════════════════════════════
  // BASE VALUES (only place to edit)
  // ═══════════════════════════════════════
  _name: "AmirHossein Mirjamali",
  _firstName: "AmirHossein",
  _role: "Backend Developer",
  _framework: "Django",

  // ═══════════════════════════════════════
  // CORE PROFILE
  // ═══════════════════════════════════════
  get name() { return this._name; },
  get firstName() { return this._firstName; },
  get role() { return this._role; },
  get mainFramework() { return this._framework; },
  get initials() { return this._firstName.split('').slice(0, 2).join('').toUpperCase(); },
  get terminalUser() { return this._firstName.toLowerCase(); },

  domain: "mirjamal.ir",
  location: "Yazd, Iran",
  get locationShort() { return this.location.replace(', Iran', ', IR'); },

  badge:"Backend Developer & API Architect",
  experience: "1+",
  experienceLabel: "Year Experience",
  coreFocus : "Backend Developer",
  mainFrameworkLabel: "Main Framework",
  basedInLabel: "Based In",

  email: "thea9n@gmail.com",
  github: "https://github.com/amirhosin100",
  githubShort: "github.com/amirhosin100",
  linkedin: "https://www.linkedin.com/in/amirhossein404/",
  linkedinShort: "linkedin.com/in/amirhossein404/",

  get copyright() { return `© 2026 ${this._name}. Crafted with passion & code.`; },
  get description() {
    return `I am <h1 class="text-accent-light font-semibold inline">${this._name}</h1>, a backend developer. I work with ${this._framework} and focus primarily on designing and building robust REST API services.`;
  },
  get profileJson() {
    return {
      name: this._name,
      location: this.location,
      role: this._role,
      experience: "1+ year",
      core_focus: this.coreFocus,
      python: ["OOP", "Asyncio", "Django"],
    };
  }
};
