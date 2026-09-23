# Selected Roadmap design implementation

Built the user-selected original-brand option 3 in the existing Next.js App Router project.

## Preview

Run `npm run build` and `npm run start -- --port 3000`, then open http://localhost:3000. For development use `npm run dev`. No new environment variables or packages are required.

## Main files

- `src/components/sections/roadmap-sections.tsx`: reusable homepage/value/testimonial/FAQ sections.
- `src/components/site/roadmap-pages.tsx`: homepage, Roadmap, About, Client Stories, Start and Contact compositions.
- `src/data/roadmap.ts`: typed benefits, FAQs and verified public contact destinations.
- `src/app/roadmap.css`: original blue brand tokens and responsive styles; loaded after the existing stylesheet so retained content routes inherit the refreshed palette.
- `src/components/layout`: shared original-brand header/footer.

The existing catch-all routes, CMS schemas and article catalog remain. The new page compositions are local typed content, not a claim that the unfinished CMS migration is complete.

Assets: original logo and diamond montage sourced in `../original-brand/README.md`; original coaching photograph retained. `public/images/roadmap-report-concept.png` is generated concept artwork, not an approved final deliverable specification. Source design and QA screenshots are retained here. See root `design-qa.md` for checks and launch gaps.
