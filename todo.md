# Todo

Prioriterad att-gora-lista baserad pa teknisk review den 2026-05-03.

## P0 - Blockerande for riktig e-handel

- [ ] Ersatt mock-checkout med riktig order- och betalningsimplementation.
  - [ ] Valj betalprovider och implementera serverflode for Klarna/kort/Swish eller ta bort betalningscopy tills det finns.
  - [ ] Skapa server-side orderhantering med order-ID, orderrader, totalsumma, kunduppgifter och betalstatus.
  - [ ] Validera pris, frakt, produktstatus och kvantitet pa servern innan betalning.
  - [ ] Hantera betalningsresultat, fel, avbruten betalning och webhook/callback fran betalprovider.
  - [ ] Visa riktig orderbekraftelse for sparad order, inte bara lokal `completed` state.
  - [ ] Ta bort eller markera all "Saker betalning via Klarna"-copy som mock tills integrationen finns.

- [ ] Bygg en riktig datakalla for produkter, priser och lager.
  - [ ] Beslut om produktdata ska ligga i CMS, databas, headless commerce eller statisk katalog.
  - [ ] Flytta affarskritiska priser fran client-trusted state till servervald data.
  - [ ] Lagg till lagerstatus eller saljbarhetsflagga per produkt.
  - [ ] Definiera hur produktuppdateringar ska publiceras och cache/revalidate-hanteras.

- [ ] Harda varukorgsflodet for produktion.
  - [ ] Persist endast produkt-ID och kvantitet i klienten, inte pris som sanning.
  - [ ] Rekonstruera varukorgen mot aktuell serverdata fore checkout.
  - [ ] Hantera produkter som tagits bort, bytt pris eller blivit osaljbara.
  - [ ] Lagg till maxkvantitet och rimliga gransen for antal produkter.

## P1 - Hog prioritet

- [ ] Atgarda produktbilder.
  - [ ] Skapa `public/products`.
  - [ ] Lagg in faktiska bilder for alla 38 `imageUrl`-referenser.
  - [ ] Verifiera att varje `/products/*.jpg` returnerar 200.
  - [ ] Byt `ProductImage` fran SVG-placeholder till riktiga produktbilder dar det ar relevant.
  - [ ] Lagg till alt-texter och dimensioner for produktbilder.
  - [ ] Verifiera OG/Twitter-bilder for produktsidor.

- [ ] Ratta interaktiv HTML i produktkort.
  - [ ] Ta bort `button` inuti `Link` i `ProductCard`.
  - [ ] Gor add-to-cart-knappen till separat sibling med korrekt klickyta.
  - [ ] Sakerstall att kortets produktlank och add-to-cart fungerar med mus, touch och tangentbord.

- [ ] Synka katalogfilter med URL.
  - [ ] Uppdatera query params nar filter andras.
  - [ ] Las URL-parametrar reaktivt nar anvandaren navigerar mellan olika filterlankar.
  - [ ] Definiera hur flera kategorier/hudtyper/marken ska serialiseras i URL.
  - [ ] Behall sortering i URL om den ska vara delbar.
  - [ ] Testa direktlankar som `/produkter?skinType=rosacea` och `/produkter?brand=Gilda%20Liljeblad`.

- [ ] Forbattra dialog/drawer-a11y.
  - [ ] Ge varukorgsdraweern korrekt `role="dialog"` eller motsvarande semantik.
  - [ ] Lagg till `aria-modal`, rubrikassociation och focus trap.
  - [ ] Stang drawer/filter med Escape.
  - [ ] Aterstall fokus till knappen som oppnade drawer/filter.
  - [ ] Hindra body scroll och aterstall den robust aven vid unmount.
  - [ ] Gor samma for mobilmeny och mobilfilter.

## P2 - Kvalitet, robusthet och teknisk skuld

- [ ] Infor linting.
  - [ ] Installera och konfigurera ESLint for Next/React/TypeScript.
  - [ ] Lagg till `npm run lint`.
  - [ ] Aktivera relevanta a11y-regler, inklusive jsx-a11y.
  - [ ] Kor lint i CI eller lokal pre-merge-rutin.

- [ ] Infor testning.
  - [ ] Lagg till unit/component-test for `store.ts`.
  - [ ] Testa add/remove/update quantity och clear cart.
  - [ ] Testa katalogfilter och sortering.
  - [ ] Testa checkout-flodets stegning om mocken finns kvar temporart.
  - [ ] Lagg till Playwright eller liknande for huvudfloden: katalog -> produkt -> varukorg -> checkout.
  - [ ] Lagg till a11y-smoke-test for viktiga sidor/drawers.

- [ ] Harda JSON-LD.
  - [ ] Escape:a `<` i JSON-LD enligt Next-dokumentationens monster.
  - [ ] Gor produktens `image` absolut och verifiera att filen finns.
  - [ ] Ta bort eller backa upp `aggregateRating` med riktig recensionsdata.
  - [ ] Lagg till `review` endast om faktiska recensioner finns.
  - [ ] Validera strukturerad data med Googles Rich Results-test.

- [ ] Rensa mockade recensioner och claims.
  - [ ] Ersatt startsidans `2 400+ recensioner` med verklig siffra eller ta bort den.
  - [ ] Ersatt produktsidans `4.9 (128 recensioner)` med riktig data eller ta bort den.
  - [ ] Kontrollera medicinska/kosmetiska claims i produkttexter.
  - [ ] Verifiera award-claims och arstall med kallor.

- [ ] Ratta footer och icke-fungerande UI.
  - [ ] Byt alla `href="#"` till riktiga routes eller ta bort lankarna.
  - [ ] Implementera nyhetsbrevsformularet eller markera det som ej aktivt.
  - [ ] Lagg till sidor for kontakt, frakt/retur, FAQ, hudtypsguide, orderstatus, integritet, cookies och villkor om lankarna ska vara kvar.
  - [ ] Koppla sok- och kontoikoner i headern till riktig funktion eller ta bort dem temporart.

- [ ] Dokumentera projektet.
  - [ ] Uppdatera README fran create-next-app-standardtext till faktisk projektbeskrivning.
  - [ ] Dokumentera hur man kor dev, build, lint, test och eventuell deploy.
  - [ ] Dokumentera produktdatans agarskap och uppdateringsflode.
  - [ ] Dokumentera vilka delar som ar mock/prototyp.

## P3 - SEO, metadata och produktion

- [ ] Skapa metadatafiler.
  - [ ] Lagg till sitemap.
  - [ ] Lagg till robots.
  - [ ] Lagg till Open Graph-standardbild.
  - [ ] Lagg till canonical-strategi for filter-URL:er.

- [ ] Granska caching och statisk generering.
  - [ ] Bekrafta om produktsidor ska vara fullstatisk SSG eller revalideras.
  - [ ] Overvag `dynamicParams = false` om endast kanda slugs ska servas.
  - [ ] Definiera ISR/revalidate-strategi om produktdata blir dynamisk.

- [ ] Folj upp dependency audit.
  - [ ] Bevaka Next-version som atgardar transitive PostCSS-audit.
  - [ ] Undvik `npm audit fix --force` eftersom den foreslar breaking/downgrade.
  - [ ] Kor `npm audit --omit=dev` igen efter Next-uppdatering.

- [ ] Se over bundling och beroenden.
  - [ ] Kontrollera om `framer-motion` anvands; ta bort om oanvand.
  - [ ] Undersok `@emnapi/runtime` som listas som extraneous i `npm ls`.
  - [ ] Kor ren install och verifiera lockfile.

## Verifiering innan release

- [ ] `npx tsc --noEmit --incremental false` passerar.
- [ ] `npm run build` passerar.
- [ ] `npm run lint` passerar nar scriptet finns.
- [ ] Testsvit passerar nar testsetup finns.
- [ ] Alla huvudroutes returnerar 200: `/`, `/produkter`, produktsidor, `/varukorg`, `/checkout`.
- [ ] Alla produktbild-URL:er returnerar 200.
- [ ] Katalogfilter fungerar vid direktlank, klientnavigation och refresh.
- [ ] Varukorg och checkout fungerar efter page refresh.
- [ ] Tangentbordsnavigation fungerar for header, filter, cart drawer och checkout.
- [ ] Mobilvy kontrollerad for startsida, katalog, produkt, varukorg och checkout.
- [ ] Ingen produktionscopy lovar betalning, recensioner, frakt eller returer som inte stods av faktisk funktion eller policy.
