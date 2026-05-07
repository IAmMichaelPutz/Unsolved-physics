const fs = require('fs');
['src/app/about/page.tsx', 'src/app/jobs/page.tsx', 'src/app/impressum/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ SidebarNav \} from .*?;/, 'import { SidebarLogo, SidebarLinks } from "@/components/SidebarNav";');
  content = content.replace(
    /        <div className="p-8 pb-4">\s*<SidebarNav \/>\s*<\/div>/,
    `        <div className="p-8 pb-4">
          <SidebarLogo />
        </div>
        <div className="p-8 pt-4 mt-auto">
          <SidebarLinks />
        </div>`
  );
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Updated sidebars in all pages.');
