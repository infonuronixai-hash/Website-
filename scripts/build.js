const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const { companyContent } = require('../src/company-content');

const ROOT = path.join(__dirname, '..');
const VIEWS_DIR = path.join(ROOT, 'views');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(ROOT, 'dist');

const PARTIALS_DIR = path.join(VIEWS_DIR, 'partials');
for (const file of fs.readdirSync(PARTIALS_DIR)) {
  if (!file.endsWith('.hbs')) continue;
  const name = file.slice(0, -'.hbs'.length);
  hbs.handlebars.registerPartial(name, fs.readFileSync(path.join(PARTIALS_DIR, file), 'utf8'));
}

hbs.registerHelper('eq', (a, b) => a === b);
hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('initial', (value) =>
  typeof value === 'string' ? value.charAt(0).toUpperCase() : '',
);

const pages = [
  { view: 'home', out: 'index.html', locals: { title: 'Home', active: 'home', ...companyContent } },
  { view: 'about', out: 'about.html', locals: { title: 'About Us', active: 'about' } },
  { view: 'team', out: 'team.html', locals: { title: 'Our Team', active: 'team' } },
  { view: 'vision-mission', out: 'vision-mission.html', locals: { title: 'Vision & Mission', active: 'vision-mission' } },
  { view: 'solutions', out: 'solutions.html', locals: { title: 'Technology & Product Focus', active: 'solutions' } },
  { view: 'solutions-education', out: 'solutions/education.html', locals: { title: 'AI-Powered Education & STEM', active: 'solutions' } },
  { view: 'solutions-agriculture', out: 'solutions/agriculture.html', locals: { title: 'AI for Agriculture', active: 'solutions' } },
  { view: 'solutions-xr', out: 'solutions/xr.html', locals: { title: 'Extended Reality Solutions', active: 'solutions' } },
  { view: 'solutions-enterprise', out: 'solutions/enterprise.html', locals: { title: 'Enterprise Software Products', active: 'solutions' } },
  { view: 'contact', out: 'contact.html', locals: { title: 'Contact Us', active: 'contact' } },
];

function render(viewName, locals) {
  const templatePath = path.join(VIEWS_DIR, `${viewName}.hbs`);
  const template = hbs.handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
  return template(locals);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const page of pages) {
  const html = render(page.view, page.locals);
  const outPath = path.join(OUT_DIR, page.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`built ${page.out}`);
}

copyDir(PUBLIC_DIR, path.join(OUT_DIR, 'public'));
console.log('copied public/ assets');
