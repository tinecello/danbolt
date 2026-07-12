// ============================================================
// BLOGGPOSTER — legg til nye poster her!
// ============================================================
// For å legge til en ny post:
// 1. Kopier et eksisterende post-objekt
// 2. Endre id, slug, tittel, ingress, innhold, kategori, dato
// 3. Bilder legges i public/ mappen
// ============================================================

export interface Bloggpost {
  id: string
  slug: string
  tittel: string
  seoTittel: string
  ingress: string
  innhold: string
  kategori: string
  dato: string
  bilde: string
  featured?: boolean
  lestetid: number
}

export const bloggposts: Bloggpost[] = [
  {
    id: '1',
    slug: 'etterklangstid-kirke',
    tittel: 'Derfor må du forstå rommet før du kjøper lydanlegg',
    seoTittel: 'Akustikk før nytt lydanlegg | Thorbjørn Danbolt',
    ingress: 'Et lydanlegg løser sjelden et rom-problem. Lær hvorfor akustikken må kartlegges før du investerer — og hvordan du unngår å betale for feil løsning.',
    innhold: `
<p>De fleste ringer meg for å høre hvilket lydanlegg de bør kjøpe. Nesten alltid er det feil første spørsmål.</p>
<p>Når lyden er dårlig i et lokale — en kirke, en gymsal, et møterom, en aula — er den vanlige reaksjonen å tenke at anlegget er for svakt eller for gammelt. Løsningen virker opplagt: kjøp et kraftigere anlegg. Men mer lyd i et rom som ikke er forstått, gir som regel bare ett resultat: mer dårlig lyd.</p>
<h2>Rommet er den første komponenten i anlegget</h2>
<p>Det er nyttig å tenke på rommet selv som den første og viktigste komponenten i lydsystemet. Før en eneste høyttaler er valgt, har rommet allerede bestemt en stor del av resultatet. To identiske anlegg i to ulike rom kan gi vidt forskjellig opplevelse — det ene krystallklart, det andre umulig å følge med på.</p>
<p>Derfor begynner enhver seriøs vurdering med å kartlegge hva rommet faktisk gjør med lyden. Hvor lang er etterklangstiden? Hvor kommer de forstyrrende refleksjonene fra? Er det bakgrunnsstøy fra ventilasjon som spiser opp talen? Dette er ikke akademiske detaljer — det er forskjellen mellom en investering som virker og en som skuffer.</p>
<h2>Tre spørsmål før du investerer</h2>
<p>Uansett hvilket lokale du har ansvar for, er det tre spørsmål som bør besvares før noe kjøpes:</p>
<ul>
<li><strong>Hva gjør rommet med lyden i dag?</strong> En måling forteller om problemet er etterklang, refleksjoner, bakgrunnsstøy — eller en kombinasjon.</li>
<li><strong>Hva skal rommet brukes til?</strong> Tale, sang, musikk, hybridmøter og konserter stiller ulike krav. Et rom som skal gjøre alt, må planlegges for kompromisset.</li>
<li><strong>Hvor mye av problemet kan løses uten et nytt anlegg?</strong> Ofte kan akustisk tilrettelegging eller justering av det eksisterende anlegget gjøre mesteparten av jobben — til en brøkdel av prisen.</li>
</ul>
<h2>Hva det koster å hoppe over dette steget</h2>
<p>Regnestykket er ubehagelig, men vanlig: et lokale investerer flere hundre tusen i nytt utstyr, opplevelsen blir marginalt bedre, og to år senere står det samme problemet der. Pengene er brukt på symptomet, ikke årsaken. Et forarbeid som kartlegger rommet koster en liten andel av anleggsprisen — og er det billigste steget du kan ta for å sikre at resten av budsjettet brukes riktig.</p>
<p>Det handler ikke om å kjøpe mest mulig, men om å kjøpe riktig. Noen ganger er svaret et nytt anlegg. Andre ganger er det akustiske tiltak, en ommøblering av høyttalerne, eller ganske enkelt en riktig innstilling. Poenget er at du ikke kan vite det før rommet er forstått.</p>
<h2>Kort oppsummert</h2>
<p>Et lydanlegg er ikke en løsning i seg selv — det er et verktøy som virker eller ikke virker avhengig av rommet det står i. Forstå rommet først, så vet du hva du faktisk trenger å kjøpe. Det er hele forskjellen mellom å gjette og å vite.</p>
<p><strong>Vurderer dere lyden i et lokale?</strong> Jeg gjør en uavhengig kartlegging av rommet før dere bruker en krone på utstyr — og gir dere et ærlig råd om hva som faktisk må til. <a href="/#kontakt">Ta kontakt for en uforpliktende prat.</a></p>
    `,
    kategori: 'Akustikk',
    dato: '2026-06-15',
    bilde: '/blogg-kirke.jpg',
    featured: true,
    lestetid: 6,
  },
  {
    id: '2',
    slug: 'absorpsjon-vs-diffusjon',
    tittel: 'Hva er egentlig god akustikk? Etterklang, taletydelighet og romklang forklart enkelt',
    seoTittel: 'Etterklang og taletydelighet forklart | Danbolt',
    ingress: 'Hva betyr etterklang, taletydelighet og romklang — og hvorfor merker du det som «dårlig lyd»? En enkel forklaring uten fagsjargong.',
    innhold: `
<p>«Det er dårlig akustikk her.» Alle vet hva det føles som. Færre vet hva det faktisk betyr — og det er verdt å forstå, for det avgjør hvilken løsning som virker.</p>
<p>Du kjenner det med en gang du kommer inn i et rom med dårlig akustikk. Stemmer blir grøtete, du må anstrenge deg for å høre hva som sies, og etter en time er du sliten uten helt å vite hvorfor. Men «dårlig akustikk» er ikke én ting — det er som regel tre fenomener som spiller sammen. Forstår du dem, forstår du også hvorfor problemet ikke alltid løses med et sterkere anlegg.</p>
<h2>Etterklang: hvor lenge lyden henger igjen</h2>
<p>Etterklang er den viktigste enkeltfaktoren. Når noen slutter å snakke, forsvinner ikke lyden umiddelbart — den fortsetter å sprette mellom vegger, tak og gulv i en kort stund. Tiden det tar før lyden er praktisk talt borte, kaller vi etterklangstid, ofte målt som «RT60»: tiden det tar for lyden å falle 60 desibel etter at kilden er stoppet.</p>
<p>I et klasserom bør etterklangstiden være rundt et halvt sekund. I en steinkirke kan den være fire til seks sekunder eller mer. Lang etterklang er nydelig for orgelmusikk og korsang — men ødeleggende for tale, fordi hvert ord fortsatt henger i lufta når det neste kommer. Det er derfor en prekestol i en flott, gammel kirke kan være så vanskelig å følge med på: rommet er bygget for klang, ikke for tydelig tale.</p>
<h2>Taletydelighet: hvor mye du faktisk oppfatter</h2>
<p>Taletydelighet er det som virkelig teller for brukerne — hvor stor andel av det som sies, en lytter faktisk oppfatter riktig. Fagfolk måler dette med en indeks kalt STI (Speech Transmission Index), en skala fra 0 til 1 der høyere er bedre. Men du trenger ikke tallet for å kjenne igjen problemet: lav taletydelighet er følelsen av å høre at noen snakker, uten å få med deg ordene.</p>
<p>Poenget er at taletydelighet og volum ikke er det samme. Du kan skru lyden høyt opp og fortsatt forstå lite, fordi etterklang og refleksjoner smører ordene ut over hverandre. God taletydelighet handler om å levere talen ren til øret — ikke bare høyt.</p>
<h2>Romklang og refleksjoner: lyden som kommer for sent</h2>
<p>Det tredje fenomenet er de enkeltrefleksjonene som kommer tilbake fra harde flater — en glassvegg, et flatt tak, en steinmur bak i salen. Kommer en refleksjon kort tid etter den direkte lyden, oppleves den som ekko eller «rot». I store rom kan slike refleksjoner være like sterke som lyden fra høyttaleren, og de trekker taletydeligheten ned selv om etterklangen ellers er akseptabel.</p>
<h2>Hvorfor dette avgjør løsningen</h2>
<p>Når du vet at problemet kan ligge i tre ulike ting, blir det tydelig hvorfor «kjøp et bedre anlegg» så ofte bommer. Er problemet lang etterklang, hjelper det å tilføre lydabsorpsjon i rommet. Er problemet enkeltrefleksjoner, handler det om å plassere høyttalere og absorbenter riktig. Er problemet at anlegget dekker rommet dårlig, er det anlegget som må endres. Ofte er det en kombinasjon — og da må tiltakene treffe riktig faktor for å virke.</p>
<p>Det er nettopp derfor en måling er verdt så mye: den skiller de tre fra hverandre og forteller hva som faktisk drar opplevelsen ned i akkurat ditt rom. Uten den gjetter man, og gjetting er dyrt.</p>
<h2>Kort oppsummert</h2>
<p>God akustikk er ikke «høy nok lyd» — det er kort nok etterklang, høy nok taletydelighet og kontroll på refleksjonene, tilpasset det rommet skal brukes til. Kjenner du disse tre begrepene, forstår du hvorfor to rom med samme anlegg kan låte så forskjellig.</p>
<p><strong>Lurer dere på hva som gjør lyden vanskelig i akkurat deres lokale?</strong> En måling gir svaret — og et konkret grunnlag for hva som bør gjøres. <a href="/#kontakt">Ta kontakt for en uavhengig vurdering.</a></p>
    `,
    kategori: 'Akustikk',
    dato: '2026-06-01',
    bilde: '/blogg-akustikk.jpg',
    lestetid: 7,
  },
  {
    id: '3',
    slug: 'taletydelighet-sti',
    tittel: 'Uavhengig rådgiver eller leverandør? Hvorfor det avgjør sluttresultatet',
    seoTittel: 'Uavhengig lydrådgiver eller leverandør? | Danbolt',
    ingress: 'Rådet du får når du kjøper lydanlegg avhenger av hvem som gir det. Slik skiller uavhengig rådgivning seg fra en leverandørs anbefaling — og hvorfor det betyr noe for lommeboka.',
    innhold: `
<p>Når du spør en som selger lydanlegg om hva du trenger, får du et ærlig svar — men det er formet av hva vedkommende har på lager. Det er ikke uredelighet. Det er innebygd i rollen.</p>
<p>De fleste som skal utbedre lyden i et lokale, starter med å kontakte en leverandør. Det er naturlig: leverandøren kan produktene, kommer gjerne på befaring, og gir et tilbud. Problemet er ikke at leverandører er uærlige — de aller fleste er dyktige og velmenende. Problemet er at en leverandør tjener penger på å selge et produkt, og derfor uunngåelig ser rommet ditt gjennom brillene til det sortimentet de fører.</p>
<h2>Samme rom, ulike svar</h2>
<p>Still det samme spørsmålet — «hva trenger vi her?» — til tre ulike leverandører, og du får ofte tre ulike svar, hver farget av hva de selger. Den ene foreslår mange små høyttalere, den andre et digitalt lydutjevningsanlegg, den tredje akustiske plater. Alle kan ha rett i at nettopp deres løsning hjelper. Men ingen av dem er nøytralt posisjonert til å si: «Egentlig trenger dere ikke et nytt anlegg — det eksisterende må bare stilles inn riktig.» Det svaret gir dårlig butikk.</p>
<p>En uavhengig rådgiver har ingen boks å selge. Min eneste jobb er å finne ut hva rommet og brukerne faktisk trenger, og så beskrive det — enten svaret er nytt utstyr, akustiske tiltak, en justering, eller en kombinasjon. Jeg tjener det samme uansett hva konklusjonen blir, og det er hele poenget: rådet er ikke bundet til et produkt.</p>
<h2>Hva uavhengigheten er verdt i praksis</h2>
<p>Verdien viser seg tydeligst i tre situasjoner:</p>
<ul>
<li><strong>Når du skal ut på anbud.</strong> Med en uavhengig kravspesifikasjon konkurrerer leverandørene på samme, presist definerte oppgave — i stedet for å levere tilbud på ulike løsninger som er umulige å sammenligne. Du kjøper riktig, og du kjøper ikke mer enn du trenger.</li>
<li><strong>Når du er usikker på om du overkjøper.</strong> En uavhengig vurdering forteller deg om det dyre forslaget faktisk er nødvendig, eller om et enklere grep løser problemet.</li>
<li><strong>Når installasjonen er ferdig.</strong> En uavhengig kontrollmåling verifiserer at du fikk det du betalte for — at anlegget faktisk leverer den taletydeligheten som ble lovet.</li>
</ul>
<h2>Rådgiver og leverandør er ikke motstandere</h2>
<p>Dette er ikke et argument mot leverandører — de skal fortsatt levere og installere anlegget. Poenget er rekkefølgen og rollefordelingen. En uavhengig kartlegging og kravspesifikasjon først gir leverandøren et tydelig mål å levere på, og gir deg trygghet for at valget er styrt av rommet ditt og ikke av et lager. Ofte blir også leverandørens jobb enklere og tilbudet mer presist, fordi oppgaven er klart definert fra start.</p>
<h2>Kort oppsummert</h2>
<p>Rådet du får henger sammen med hvordan den som gir det tjener pengene sine. En leverandør anbefaler i god tro det de fører; en uavhengig rådgiver anbefaler det rommet trenger. Skal du investere i lyd, er det verdt å skille de to rollene — og starte med det uavhengige rådet.</p>
<p><strong>Står dere foran en investering i lyd?</strong> Jeg gir dere et uhildet råd om hva rommet faktisk trenger — før dere binder dere til en løsning. <a href="/#kontakt">Ta kontakt for en uforpliktende samtale.</a></p>
    `,
    kategori: 'Akustikk',
    dato: '2026-05-20',
    bilde: '/blogg-teknikk.jpg',
    lestetid: 6,
  },
  {
    id: '4',
    slug: 'ns8175-etterklangskrav',
    tittel: 'NS 8175 og etterklangskravene: hva et skolebygg faktisk må oppfylle',
    seoTittel: 'NS 8175: krav til etterklang i skolebygg | Danbolt',
    ingress: 'Hva krever NS 8175 av etterklang i klasserom og gymsal – og hva betyr klasse C i praksis? En klar forklaring av lydkravene i skolebygg, og hvorfor de må måles.',
    innhold: `
<p>«Vi må jo følge kravene.» Men hvilke krav – og hva betyr egentlig et tall som 0,6 sekund for et rom fullt av elever?</p>
<p>Når et skolebygg oppføres eller pusses opp, dukker kravene til lydforhold opp. Referansen er nesten alltid den samme: NS 8175. De fleste som har ansvar for et bygg har hørt navnet uten helt å vite hva standarden faktisk krever. Og det er verdt å forstå, for det er forskjellen på et rom elevene faktisk hører i, og et som så vidt passerer på papiret.</p>
<h2>Hva NS 8175 er – og hvorfor den gjelder deg</h2>
<p>NS 8175 er den norske standarden som setter grenseverdier for lydforhold i bygninger, delt inn i lydklasser fra A til D – der A er best og C er minimum. Det som gjør den bindende: byggteknisk forskrift (TEK17) peker på klasse C som nivået som tilfredsstiller byggereglene. For et skolebygg betyr derfor «oppfyller klasse C» det samme som «oppfyller lovkravet». Det er ikke en anbefaling du kan vifte bort – det er gulvet.</p>
<h2>Kravet i klartekst</h2>
<p>For et vanlig klasserom krever klasse C at etterklangstiden er 0,6 sekund eller kortere – altså rundt et halvt sekund. Konkret betyr det at når læreren slutter å snakke, skal lyden være praktisk talt borte i løpet av et halvt sekund, så ordene ikke overlapper det neste som sies. For større undervisningsrom og auditorier gjelder en romhøyde-formel (maks etterklang omtrent 0,16 × takhøyden). Og så er det et krav folk glemmer: bakgrunnsstøy fra tekniske installasjoner – typisk ventilasjon – har sin egen grense, i størrelsesorden 30 dB. Et stille rom der viften drukner talen stryker like fullt som et rom med for lang etterklang.</p>
<h2>Klasse C er minstekravet – ikke målet</h2>
<p>Her ligger den viktigste nyansen. Klasse C er gulvet, ikke målet. Stigen A-B-C-D finnes nettopp fordi noen rom trenger bedre enn minimum. For rom der tydelig tale er avgjørende – og for støyende bruk som en barnehage eller et aktivt klasserom – er det ofte verdt å sikte mot klasse B. Å treffe minstekravet og å skape et rom som faktisk er godt å lære i, er ikke alltid det samme.</p>
<h2>Gymsalen er en annen liga</h2>
<p>En gymsal uten akustiske tiltak har gjerne to til fire ganger så lang etterklang som et klasserom. Stort volum, harde og lettvaskbare flater og høy takhøyde drar alle samme vei. Romhøyde-formelen alene forteller at jobben er større der. Derfor må en gymsal som brukes til avslutninger og konserter få akustikken på plass før et anlegg i det hele tatt dimensjoneres – aldri motsatt.</p>
<h2>Du kan ikke høre deg til om et rom er innenfor</h2>
<p>Du kan ikke høre om et rom ligger på 0,6 sekund. Det må måles. En måling dokumenterer, i tall, hvor rommet står mot kravet – per oktavbånd, med bakgrunnsstøy. Det gjør «vi tror det er greit» om til «her står vi, og dette skal til for å lukke gapet». Det er dokumentasjon, ikke synsing. Og fordi NS 8175 formelt er et prosjekteringskrav, dokumenterer en måling av et eksisterende rom om det ville tilfredsstilt klasse C – fullt nyttig, og den ærlige måten å ramme det inn på.</p>
<h2>Kort oppsummert</h2>
<p>NS 8175 gir deg en objektiv målestokk: klasse C er det lovpålagte gulvet, gode rom sikter høyere, og bare en måling forteller hvor et rom faktisk står. For en skole er det forskjellen på å anta at rommene er gode nok, og å vite det.</p>
<p><strong>Lurer dere på om klasserommene eller gymsalen oppfyller NS 8175?</strong> Jeg måler etterklang og bakgrunnsstøy og dokumenterer hvor dere står mot kravet – et klart grunnlag for hva som eventuelt må gjøres. <a href="/#kontakt">Ta kontakt for en uforpliktende prat.</a></p>
    `,
    kategori: 'Skole',
    dato: '2026-07-08',
    bilde: '/blogg-skole.jpg',
    lestetid: 7,
  },
]

export const kategorier = ['Alle', 'Akustikk', 'Skole', 'Kirke', 'Kulturhus', 'Teknikk', 'Tips']

// Hjelpefunksjon: formater dato
export function formatDato(dato: string): string {
  return new Date(dato).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
