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

const SITE_URL = 'https://vaibhavatech.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/public/images/tech-ecosystem.png`;

const pages = [
  {
    view: 'home',
    out: 'index.html',
    url: '/',
    locals: {
      title: 'Home',
      active: 'home',
      description: 'Vaibhava Tech engineers AI, XR, Web, Cloud, Robotics, STEM and Data products for Agriculture, Education, Industry and Defence.',
      ...companyContent,
    },
  },
  {
    view: 'about',
    out: 'about.html',
    url: '/about',
    locals: {
      title: 'About Us',
      active: 'about',
      description: 'Vaibhava Tech is a technology and innovation startup engineering niche AI, XR, Web and Enterprise products for real-world impact across Agriculture, Education and Industry.',
      ogImage: `${SITE_URL}/public/images/enterprise-hologram.jpg`,
    },
  },
  {
    view: 'team',
    out: 'team.html',
    url: '/team',
    locals: {
      title: 'Our Team',
      active: 'team',
      description: "Meet the multidisciplinary team behind Vaibhava Tech's AI, XR, Robotics and Enterprise Software products.",
      ogImage: `${SITE_URL}/public/images/team-ai-innovation.jpg`,
    },
  },
  {
    view: 'vision-mission',
    out: 'vision-mission.html',
    url: '/vision-mission',
    locals: {
      title: 'Vision & Mission',
      active: 'vision-mission',
      description: "Vaibhava Tech's vision and mission: engineering the future through convergent AI, XR, Web, Cloud, Robotics, STEM and Data technology for Agriculture, Education, Industry and Defence.",
    },
  },
  {
    view: 'solutions',
    out: 'solutions.html',
    url: '/solutions',
    locals: {
      title: 'Technology & Product Focus',
      active: 'solutions',
      description: "Explore Vaibhava Tech's technology and product focus across AI, Extended Reality, Web & Cloud, Enterprise Software, Agriculture Tech and Robotics & STEM.",
    },
  },
  {
    view: 'solutions-education',
    out: 'solutions/education.html',
    url: '/solutions/education',
    locals: {
      title: 'AI-Powered Education & STEM',
      active: 'solutions',
      description: 'AI-powered, experiential education and STEM products from Vaibhava Tech, including robotics kits and immersive VR/AR learning.',
      ogImage: `${SITE_URL}/public/images/education-robotics.jpg`,
    },
  },
  {
    view: 'solutions-agriculture',
    out: 'solutions/agriculture.html',
    url: '/solutions/agriculture',
    locals: {
      title: 'AI for Agriculture',
      active: 'solutions',
      description: 'An integrated AI agriculture ecosystem from Vaibhava Tech for sustainable, data-driven farming with WebGL and VR simulation.',
      ogImage: `${SITE_URL}/public/images/agriculture-vr.jpg`,
    },
  },
  {
    view: 'solutions-xr',
    out: 'solutions/xr.html',
    url: '/solutions/xr',
    locals: {
      title: 'Extended Reality Solutions',
      active: 'solutions',
      description: 'VR, AR & MR extended reality solutions from Vaibhava Tech for immersive, experiential training and education.',
      ogImage: `${SITE_URL}/public/images/xr-vr-woman.png`,
    },
  },
  {
    view: 'solutions-enterprise',
    out: 'solutions/enterprise.html',
    url: '/solutions/enterprise',
    locals: {
      title: 'Enterprise Software Products',
      active: 'solutions',
      description: 'Configurable ERP & CRM enterprise software products from Vaibhava Tech to streamline business operations across industries.',
      ogImage: `${SITE_URL}/public/images/enterprise-hologram.jpg`,
    },
  },
  {
    view: 'contact',
    out: 'contact.html',
    url: '/contact',
    locals: {
      title: 'Contact Us',
      active: 'contact',
      description: 'Get in touch with Vaibhava Tech for AI, XR, Web, Cloud, Robotics, STEM and Enterprise Software enquiries.',
    },
  },
];

for (const page of pages) {
  page.locals.canonical = `${SITE_URL}${page.url}`;
  if (!page.locals.ogImage) page.locals.ogImage = DEFAULT_OG_IMAGE;
}

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

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap, 'utf8');
console.log('built sitemap.xml');

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots, 'utf8');
console.log('built robots.txt');
