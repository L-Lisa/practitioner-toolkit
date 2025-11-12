import React, { useState, useMemo } from 'react';
import ExerciseCard from './components/ExerciseCard';
import ExerciseDetail from './components/ExerciseDetail';
import DesktopInstallBanner from './components/DesktopInstallBanner';
import BrandLink from './components/BrandLink';
import PWAInstallModal from './components/PWAInstallModal';
import DownloadIcon from './components/DownloadIcon';
import { usePWAInstall } from './hooks/usePWAInstall';

/**
 * Main App Component
 * Mindfulnessguiden Verktygslåda - PWA for workplace facilitators
 * 8 RESEARCH-VALIDATED exercises across 4 competencies
 * 
 * ALL EXERCISES VALIDATED WITH PEER-REVIEWED RESEARCH
 * Following RESEARCH_PROTOCOL.md standards
 */

const exercises = [
  // ============================================
  // COMPETENCY 1: PSYCHOLOGICAL SAFETY (2 exercises)
  // ============================================
  {
    id: 1,
    title: "Stillhetsmeditation",
    competency: "Psykologisk trygghet",
    duration: "10-15 min",
    oneLiner: "Utveckla förmågan att bara vara närvarande. Skapar grund för icke-reaktiv närvaro i grupper.",
    slug: "being-still",
    category: "psychological-safety",
    instructions: `Börja med att grunda in och skapa närvaron.

Hitta en bekväm upprät ställning och stäng ögonen om det känns bra. Du kan även sänka blicken och låta ögonen slappna av.

Börja med att bara märka din andning. In och ut genom näsan. Inget behöver vara perfekt - bara märka att du andas.

Ge dig själv tillstånd att inte göra någonting just nu. Det är okej att bara vara här, stilla.

När du märker andningen, kan du också lägga märke till vad som händer i kroppen. Kanske spänningar, kanske lugn, kanske ingenting särskilt. Bara märka.

Det är vanligt att känna obehag när vi bara är här och inte gör något. Det är okej. Det är också okej om det känns bra.

Du kanske märker att tankarna vill springa iväg - till framtiden, till att-göra-listor, till planering. Det är normalt.

Eller kanske vill tankarna gå tillbaka - till det som hände tidigare.

Kanske kommer det också positiva tankar - minnen, idéer, känslor av glädje eller tacksamhet. De är också välkomna. Bara märka dem.

Varje gång du märker att tankarna har sprungit iväg - oavsett om de är positiva eller negativa - kan du bara erkänna det. "Jag märker att tankarna har sprungit iväg." Och sedan, mjukt, vägleda uppmärksamheten tillbaka till andningen.

Det här handlar inte om att tänka på andningen. Det handlar om att vara närvarande med den.

Inte tänka på kroppen. Bara vara närvarande med den.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "När medarbetare och ledare kan modellera 'att vara närvarande utan att fixa' skapar de utrymme för andra att dela utan rädsla för omedelbar problemlösning eller bedömning. Detta utvecklar den icke-reaktiva närvaron som är grunden för psykologisk trygghet.",
    whenToUse: [
      "Före svåra diskussioner för att skapa 'safe space'",
      "Inleder samtal om 'prestationskultur' vs 'vara-läge'",
      "När teamet behöver skifta från doing till being",
      "För att modellera icke-reaktiv närvaro"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "10-veckors arbetsplatsanpassat MBSR förbättrade direkt psykologisk trygghet mellan kollegor.",
      findings: [
        "Psykologisk trygghet förbättrades mellan kollegor på samma anställningsnivå",
        "Meta-awareness möjliggör mer skickliga svar och större förståelse för andra"
      ],
      limitations: "Effekter starkast på peer-nivå, ingen påverkan mellan ledning och anställda",
      source: "Bonde et al. (2023) Frontiers in Psychology https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1112907/full"
    }
  },
  {
    id: 2,
    title: "Att lägga märke till bedömningar",
    competency: "Psykologisk trygghet",
    duration: "10 min",
    oneLiner: "Observera bedömningar utan att agera. Skapar icke-dömande utrymme med plats för att välja respons istället för en automatisk reaktion.",
    slug: "noticing-judgments",
    category: "psychological-safety",
    instructions: `Börja med att grunda in och skapa närvaron.

Sitt bekvämt och ta några andetag.

Börja märka dina tankar när de kommer. Inte analysera dem - bara märka dem.

Lägg särskilt märke till bedömande tankar. De kan låta så här:
"Denna person är lat"
"Jag är inte bra på detta"
"Detta är fel"

Men också positiva bedömningar:
"Detta är perfekt"
"Jag är bra på detta"
"Allt är rätt"

När en bedömande tanke kommer - oavsett om den är positiv eller negativ - märk den. Säg tyst: "Jag märker en bedömning."

Du behöver inte tro på den. Du behöver inte agera på den. Du behöver inte kritisera dig själv för att ha den. Bara märka den.

Var i kroppen känner du denna bedömning? I magen? I bröstet? I axlarna?

Vilken känsla följer med? Rädsla? Osäkerhet? Glädje? Trygghet? Kanske något annat?

När du bara observerar utan att trassla in dig i en bedömning kan du bland se vad som ligger under den. Kanske rädsla för att göra fel, en reaktion på något annat en person har gjort. Kanske osäkerhet. Kanske en tidigare erfarenhet. Kanske också hopp eller förväntan. - Bara lägg märke till detta djup och låt det vara där.

Låt bedömningen vara där. Den kommer, den stannar en stund, den går. Precis som ett moln på himlen.

Din uppgift är bara att observera med nyfikenhet. Inte med kritik.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "När medarbetare kan lägga märke till sina egna bedömningar utan att agera på dem, modellerar de den icke-dömande medvetenheten som gör att andra känner sig trygga att vara autentiska.",
    whenToUse: [
      "Innan möten där olika åsikter förväntas",
      "När man lyssnar på feedback",
      "Vid konfliktförebyggande situationer",
      "Hantering av svåra kollegor"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "Ledarens mindfulness i kommunikation förbättrar direkt medarbetares psykologiska trygghet.",
      findings: [
        "Ledare som är uppmärksamma, lugna och icke-dömande skapar vårdande arbetsmiljö (regression = 0.419, p < 0.01)",
        "Mindfulness i kommunikation ökar både empati och mellanmänsklig tillit"
      ],
      limitations: "Studien fokuserar på LEDAR-mindfulness, inte medarbetar-träning",
      source: "Du & Xie (2025) Frontiers in Psychology https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1540820/full"
    }
  },

  // ============================================
  // COMPETENCY 4: CONFLICT PREVENTION (2 exercises)
  // ============================================
  {
    id: 3,
    title: "STOP-övningen",
    competency: "Konfliktförebyggande",
    duration: "1-2 min",
    oneLiner: "Pausa mellan trigger och reaktion. 5 sekunder som kan förhindra en konflikt.",
    slug: "stop-practice",
    category: "conflict-prevention",
    instructions: `S - STOPPA
När du känner frustration, irritation eller ilska:
• Sluta vad du håller på med
• Låt bli att prata
• Låt bli att agera
• Bara... stoppa

T - TA ETT ANDETAG
Ett djupt, långsamt andetag
• In genom näsan
• Ut genom munnen  
• Känn hur luften rör sig
• Detta ger dig 5 sekunder
• 5 sekunder som kan förhindra en konflikt

O - OBSERVERA
Vad händer i din kropp?
• Spänd mage?
• Hjärtat slår snabbare?
• Varma kinder?
• Knutna nävar?

Vad känner du?
• Arg? Rädd? Förväntansfull?
• Glad? Maktlös?

Vilka tankar kommer upp?
• "Det här är fel"
• "Jag är för trött för detta"
• "Hur kan de tänka så?"

Bara observera - döm inte.

P - PROCEDURA MEDVETET
Nu har du ett val:
• Kan du svara istället för att reagera?
• Kan du fråga istället för att anta?
• Kan du lyssna istället för att försvara?

Om du fortfarande känner dig för triggad:
"Jag behöver en minut. Jag återkommer."

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "Skapar den avgörande pausen mellan trigger och reaktion. De flesta konflikter eskalerar på grund av reaktiva svar snarare än själva problemen. Detta utvecklar emotionell reglering.",
    whenToUse: [
      "Kritisk email som triggar ilska",
      "Kollega som avbryter i möte",
      "Chef som nedvärderar ditt arbete",
      "Konflikt mellan teammedlemmar du faciliterar"
    ],
    research: {
      level: "⭐⭐",
      summary: "STOP-tekniken är etablerad inom Dialektisk Beteendeterapi (DBT) och validerad i klinisk praktik.",
      findings: [
        "Skapar paus som ger emotionell reglering",
        "Minskar impulsiva reaktioner genom att bryta automatiska beteendemönster",
        "Mindfulness-interventioner reducerar reaktiv aggression via neural reglering"
      ],
      source: "Linehan (1993) DBT framework + peer-reviewed studies https://frontiersin.org/articles/10.3389/fnbeh.2021.689373/full"
    }
  },
  {
    id: 4,
    title: "Andningsövningar för irritation",
    competency: "Konfliktförebyggande",
    duration: "2-3 min",
    oneLiner: "Använd andningen som ankare. Meta-analys av 154 studier visar robust effekt.",
    slug: "breathing-irritation",
    category: "conflict-prevention",
    instructions: `Börja med att grunda in och skapa närvaron.

När någon irriterar dig på jobbet:

Innan du säger något. Innan du reagerar. Stoppa.

Vänd uppmärksamheten till din andning.

Känn luften komma in. Känn den gå ut. Ett andetag. Två. Tre.

Vad händer inom mig just nu, lägg märke till vädret inombords, känslostormar, moln av tankar, vindar, temperaturer på känslor och allmänt tillstånd.

Ge andra personer din uppmärksamhet varför gör de som de gör?

Inte för att hitta ursäkter för dem. Men för att förstå.

Kanske är de stressade. Eller rädda. Eller osäkra. Eller överväldigade. Eller sårade från något annat.

Kanske är de också glada, entusiastiska, eller bara har en annan stil än du. Det handlar förmodligen inte om dig.

Fortsätt andas.

Irritationen kan finnas där. Det är okej. Du behöver inte låta den styra dig.

Du kan känna irritationen och ändå välja hur du svarar. Om andra är reaktiva kan du nu vara den person som bryter kedjan.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "Irritation är det tidiga varningssignalen innan konflikt. Meta-analys av 154 studier (10,189 deltagare) visar att andningsövningar minskar ilska med robust effektstorlek (g = −0.63).",
    whenToUse: [
      "Daglig praktik vid irriterande situationer",
      "I öppna kontorslandskap",
      "Vid långa möten med pratiga kollegor",
      "Vid micromanagement-situationer"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "Meta-analys av 154 studier visar andningsövningar kraftfullt minskar ilska och aggression.",
      findings: [
        "Arousal-minskande aktiviteter (andning, meditation) minskar ilska (g = −0.63)",
        "Långsam andning reducerar negativ affekt inklusive ilska",
        "5 minuters andning minskar psykologisk stress i arbetsplatskontext"
      ],
      source: "Kjærvik & Bushman (2024) Clinical Psychology Review https://www.sciencedirect.com/science/article/pii/S0272735824000357"
    }
  },

  // ============================================
  // COMPETENCY 7: EMOTIONAL INTELLIGENCE (2 exercises)
  // ============================================
  {
    id: 5,
    title: "Kroppsskanning för emotionell medvetenhet",
    competency: "Emotionell intelligens",
    duration: "5-8 min",
    oneLiner: "Scanna kroppen för att förstå känslor. Kroppsmedvetenhet är porten till emotionell medvetenhet.",
    slug: "body-scan-emotional",
    category: "emotional-intelligence",
    instructions: `Börja med att grunda in och skapa närvaron.

Sitt bekvämt med ryggen upprätt.

Börja scanna kroppen från toppen ner. Inte för att ändra något - bara för att märka vad som är där.

HUVUD OCH ANSIKTE:
Märk ditt ansikte. Rynkad panna? Spänd käke? Ett leende? Eller kanske mjukt, öppet, avslappnat? Bara märka, inte analysera.

HALS OCH AXLAR:
Märk din hals och axlar. Känns de spända? Tunga? Eller kanske lätta, öppna? Bara märka.

BRÖST OCH HJÄRTA:
Märk din bröstkorg. Känns det bultande? Tungt? Öppet? Stängt? Eller kanske ljust, rymligt? Bara märka.

MAGE OCH BUK:
Märk din mage. Känns det knutigt? Lätt? Tungt? Eller kanske mjukt, avslappnat? Bara märka.

HÄNDER:
Märk dina händer. Känns de knutna? Kalla? Pirriga? Eller kanske öppna, varma, avslappnade? Bara märka.

NAMNGE KÄNSLAN:
Baserat på vad du märkt i kroppen - vilken känsla är här? Har den ett namn, en färg eller kanske en form. Ibland känner man en tung svart klump, en stor gul sol det finns många sätt att lägga märke till vad man upplever.

Om du hittar en specifik känsla: Säg tyst: "Jag märker rädsla" eller "Jag märker glädje" eller "Jag märker lugn" - vad det nu är.

Inte "Jag ÄR rädd" - utan "Rädsla är närvarande". Den skillnaden skapar utrymme.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "Kroppsmedvetenhet är porten till emotionell medvetenhet. 85% av arbetsplatsframgång tillskrivs mjuka färdigheter inklusive emotionell intelligens.",
    whenToUse: [
      "Före svåra samtal - förstå vad DU känner först",
      "Efter konflikt - bearbeta emotioner medvetet",
      "Daglig check-in - förstå arbetsmässigt tillstånd",
      "För facilitatorer - läs din egen emotionella närhet"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "8 veckors daglig kroppsskanning förbättrar signifikant interoceptiv precision och känslighet.",
      findings: [
        "20-min daglig kroppsskanning i 8 veckor visade signifikanta förbättringar i interoceptiv medvetenhet",
        "Interoceptiv träning hjälper emotionsreglering genom att omdirigera uppmärksamhet till kroppen"
      ],
      limitations: "Kroppsskanning ensam har små effekter - bäst i omfattande program",
      source: "Fischer et al. (2017) Frontiers in Human Neuroscience https://pubmed.ncbi.nlm.nih.gov/28955213/"
    }
  },
  {
    id: 6,
    title: "Känslomärkning",
    competency: "Emotionell intelligens",
    duration: "2 min",
    oneLiner: "Namnge känslor flera gånger dagligen. Minskar amygdala-aktivitet omedelbart.",
    slug: "emotion-labeling",
    category: "emotional-intelligence",
    instructions: `Börja med att grunda in och skapa närvaron.

Flera gånger per dag, stanna och fråga: "Vad känner jag just nu?"

NAMNGE KÄNSLAN:
Glad, arg, ledsen, rädd, lugn, uttråkad, - eller något annat.

Säg tyst: "Jag märker irritation" eller "Jag märker glädje" eller "Jag märker lugn" eller vad det nu är.

Inte "Jag ÄR irriterad" - utan "Jag märker irritation".

Skillnaden? "Jag märker irritation" är en observation. "Jag är irriterad" blir en identitet.

Känslor kommer och går - både de svåra och de enkla. Du är inte känslan - du märker den.

NÄR SKA DU GÖRA DETTA?
Före möten. Efter svåra samtal. När du märker att energin skiftar. När kroppen signalerar något. När något känns bra också - märk det.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "Känslomärkning minskar amygdala-aktivitet och ökar pre-frontal kontroll. När vi är stressade är vi mer reaktiva, detta är ett sätt att bryta den cirkeln.",
    whenToUse: [
      "Multipla gånger dagligen (2 min varje)",
      "När du märker kroppsliga förändringar",
      "Före viktiga möten eller samtal",
      "Efter utmanande interaktioner"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "UCLA fMRI-studie: Känslomärkning minskar omedelbart amygdala-aktivitet och skapar neural väg för emotionsreglering.",
      findings: [
        "Känslomärkning producerar samma effekter som explicit emotionsreglering men UTAN avsiktligt regleringsförsök",
        "Omedelbara neurala effekter demonstrerade via fMRI"
      ],
      source: "Lieberman et al. (2007) Psychological Science - UCLA https://pubmed.ncbi.nlm.nih.gov/17576282/"
    }
  },

  // ============================================
  // COMPETENCY 8: ADAPTABILITY & RESILIENCE (2 exercises)
  // ============================================
  {
    id: 7,
    title: "Reflektion om förgänglighet",
    competency: "Anpassningsförmåga & motståndskraft",
    duration: "5-10 min",
    oneLiner: "Observera ständig förändring. Bygger mental flexibilitet och acceptans.",
    slug: "impermanence-reflection",
    category: "adaptability-resilience",
    instructions: `Börja med att grunda in och skapa närvaron.

Sitt bekvämt och börja märka din andning.

ANDNINGENS FÖRÄNDRING:
Varje andetag är annorlunda. Vissa är djupa, andra grunda. Vissa långsamma, andra snabbare. Andningen förändras hela tiden. Det är normalt.

TANKARS FÖRÄNDRING:
Märk dina tankar. En tanke kommer, stannar en stund, försvinner. En ny kommer. Tankar är i ständig rörelse - precis som moln på himlen.

KÄNSLORS FÖRÄNDRING:
En känsla kommer. Kanske irritation. Den känns intensiv. Sedan mjuknar den. Kanske kommer lugn. Sedan kanske något annat - irritation, tacksamhet, hopp. Inga känslor är permanenta.

ARBETSSITUATIONERS FÖRÄNDRING:
Detta projekt som känns överväldigande? Det kommer att förändras.

Den svåra kollegan? Situationen kommer att förändras.

Detta projekt som går bra? Det kommer också att förändras.

Din roll? Den kommer att utvecklas.

Allt förändras. Det är inte negativt - det är bara så det är.

När du förstår att allt förändras:
Svårigheter blir mer hanterbara - de kommer att förändras.
Glädje blir mer värdefull - njut av den medan den finns.
Stress blir mer uthärdlig - även denna kommer att förändras.

Inget är permanent. Det är inte hemskt - det är verkligheten och med mer acceptans kan detta bli en befriande insikt.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "Förgänglighet är kärnan i buddhistisk psykologisk flexibilitet. World Economic Forum (2025): Anpassningsförmåga är topp 3-färdighet när 39% av nuvarande färdigheter förändras senast 2030.",
    whenToUse: [
      "Vid organisatoriska förändringar",
      "Under omstruktureringar",
      "När man förlorar en roll eller projekt",
      "Vid osäkerhet om framtiden"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "Förgänglighet är en av Tre Dharma Förseglingar i buddhismen, integrerad i Acceptance and Commitment Therapy (ACT).",
      findings: [
        "Buddhistiska utövare identifierar förgänglighet som kärnkoncept som förstärker västerländsk mindfulness",
        "Förståelse av förgänglighet bidrar till psykologisk resiliens"
      ],
      source: "Fung (2015) Transcultural Psychiatry + Frontiers (2025) https://journals.sagepub.com/doi/full/10.1177/1363461514537544"
    }
  },
  {
    id: 8,
    title: "Att bygga motståndskraft genom svårigheter",
    competency: "Anpassningsförmåga & motståndskraft",
    duration: "10 min",
    oneLiner: "Acceptans-träning för motståndskraft. Baserad på 'Monitor and Acceptance Theory' - forskningsvaliderad metod för att bygga resiliens.",
    slug: "building-resilience",
    category: "adaptability-resilience",
    instructions: `Börja med att grunda in och skapa närvaron.

INTRODUKTION (30 sekunder)

Idag tränar vi acceptans - den forskningsvaliderade mekanismen för motståndskraft.

Acceptans betyder INTE att gilla eller vilja ha svårigheter.

Det betyder förmågan att VARA MED dem utan att kontrolleras av dem.

Forskning visar: Detta är träningsbart. Och det bygger resiliens.

Välj något med 3-5/10 svårighet. Vi bygger kapacitet, inte bearbetar trauma.

FAS 1: IDENTIFIERA SVÅRIGHETEN (1 minut)

Tänk på en arbetssituation från det senaste som fortfarande känns lite svår.

En konflikt. Ett misslyckande. En pinsamhet. En frustration.

Skala 3-5/10. Tillräckligt för att träna. Inte överväldigande.

När du har den - nicka lätt för dig själv.

FAS 2: AKTIVERA MINNET (1.5 minuter)

Återkalla situationen.

Inte genom att TÄNKA om den. Genom att VARA där igen.

Vem var där? Vad hände? Vad sa de? Hur reagerade du?

⏸️ Låt minnet bli levande.

Inte som en film du tittar på. Som en upplevelse du är I.

FAS 3: ACCEPTANS-TRÄNING DEL 1 - VÄLKOMNA IN (4 minuter)

Nu börjar den träning som forskningen visar bygger resiliens.

LÅT känslorna från situationen komma fram.

Var i kroppen känner du det? Hjärtat? Magen? Halsen? Bröstet? Axlarna?

Hur starkt är det - 1 till 10?

Namnge det. Det skapar nödvändig distans.

⏸️ Nu kommer det forskningen kallar "avoidance impulse" - undvikningsimpulsen.

Den kommer säga:

* "Öppna ögonen"

* "Tänk på något annat"

* "Detta är för obehagligt"

* "Fixa det i ditt huvud"

* "Sluta övningen"

Varje gång den kommer - observera den bara.

"Ah, där är impulsen att fly."

Och nu - det viktiga steget:

Istället för att fly - VÄLKOMNA IN känslan.

Detta känns kontraintuitivt. Vi är tränade att FLY svårigheter.

Men forskningen visar: Det är i MÖTET med svårigheten som resiliens byggs.

Välkomna in.

Inte för att du vill ha den. Inte för att du gillar den. Men för att du TRÄNAR förmågan att hålla den.

⏸️ Andas IN känslan.

Som att öppna en dörr och säga: "Kom in. Du får vara här."

Andas UT mjukhet mot dig själv.

Upprepa tyst för dig själv:

"Jag kan hålla detta." ⏸️ "Jag kan vara med denna känsla." ⏸️ "Jag tränar min kapacitet just nu." ⏸️

Fortsätt VÄLKOMNA IN.

Även när det är obehagligt. SPECIELLT när det är obehagligt.

Det är där resiliens byggs.

I mötet. I acceptansen. I "Ja, du får vara här."

FAS 4: ACCEPTANS-TRÄNING DEL 2 - SLÄPP TAGET (2 minuter)

Efter att ha välkomnat in känslan i 3-4 minuter...

Nu - lägg märke till känslan igen.

Hur stark är den NU - 1 till 10?

Fortfarande 5? Kanske 4? Kanske 6? Kanske något helt annat?

⏸️ Det spelar ingen roll vilket.

Poängen är: DEN HAR FÖRÄNDRATS.

Och du gjorde INGENTING för att ändra den.

Du försökte inte tänka positivt. Du försökte inte fixa situationen. Du försökte inte göra känslan till något annat.

Du bara... välkomnade in. Höll.

Och den förändrades ändå.

Detta är andra delen av acceptans: SLÄPPA TAGET.

När vi välkomnar in utan att gripa tag, utan att hålla fast, utan att kräva att det ska vara annorlunda...

Då får känslor också GÖMMA. Förändras. Släppa.

⏸️ Detta är vad forskningen visar:

Acceptans underlättar både "engagemang" (välkomna in) och "disengagemang" (släppa taget).

Båda delarna är KRITISKA för resiliens.

Du har just bevisat för dig själv:

"Jag kan MÖTA svårigheter." "Jag kan HÅLLA obehag." "Jag kan VARA MED intensiva känslor."

Och du kontrollerades INTE av dem. De förstörde dig INTE. Du har KAPACITETEN.

Det är motståndskraft.

FAS 5: INTEGRATION (1.5 minuter)

Släpp situationen helt nu.

Kom tillbaka till rummet.

Stolens tryck under dig. Ljuden omkring dig. Luften mot huden.

⏸️ Öppna ögonen mjukt när du är redo.

Reflektera tyst:

Vad märkte du om din förmåga att hålla svårigheter?

Hur förändrades känslan - om den gjorde det?

Vad lärde du dig om acceptans vs. undvikande?

Påminnelse:

Känslorna är kanske inte helt borta. Det är helt normalt.

Målet var INTE att bli av med dem.

Målet var att BYGGA KAPACITETEN att möta dem.

Du gjorde det.

Det bygger, lager på lager, med varje övning.

Detta är resiliens-träning.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "Två stora RCT-studier visar: Acceptans-träning är den kritiska mekanismen för resiliens. Mindfulness utan acceptans ger INTE resiliens-effekter. Acceptans betyder INTE att gilla svårigheter. Det betyder att kunna VARA MED dem utan att kontrolleras av dem. Detta är den träningsbara färdigheten som skapar motståndskraft.",
    whenToUse: [
      "Veckovis kapacitetsbyggande - regelbunden övning med 3-5/10 svårigheter",
      "Efter utmanande situationer - bearbeta medvetet istället för att undvika",
      "Mental förberedelse före svåra samtal - träna kapaciteten innan behov uppstår",
      "För facilitatorer och ledare - bygger förmågan att hålla andra människors svårigheter"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "Monitor and Acceptance Theory (MAT) - Lindsay & Creswell (2018, 2019). Två dismantlings-RCT:er testade: Grupp A: Medvetenhet + Acceptans-träning, Grupp B: Endast Medvetenhet (utan acceptans), Grupp C: Kontrollgrupp. RESULTAT: Medvetenhet + Acceptans: Stora minskningar i daglig stress (d=0.72). Endast Medvetenhet: Ingen minskning i stress från motståndet. Biologisk validering: Minskad kortisol- och blodtrycksreaktivitet (endast grupp A).",
      findings: [
        "KRITISK MEKANISM: 'Acceptans transformerar hur ögonblickliga upplevelser observeras och bearbetas, vilket underlättar både engagemang (välkomna in) och efterföljande disengagemang (släppa taget) med emotionella stimuli.'",
        "Medvetenhet + Acceptans: Stora minskningar i daglig stress (d=0.72)",
        "Endast Medvetenhet: Ingen minskning i stress från motståndet",
        "Biologisk validering: Minskad kortisol- och blodtrycksreaktivitet (endast grupp A)"
      ],
      limitations: "Kräver strukturerad träning - acceptans är en träningsbar färdighet",
      source: "Lindsay & Creswell (2019) Current Opinion in Psychology, 28, 120-125. Lindsay et al. (2018) Psychoneuroendocrinology, 87, 63-73"
    }
  },
  {
    id: 9,
    title: "Att hantera stress med kroppsskanning",
    competency: "Anpassningsförmåga & motståndskraft",
    duration: "10-15 min",
    oneLiner: "En klassisk mindfulnessövning som tränar uppmärksamhet och närvaro genom att systematiskt gå igenom kroppen. Hjälper dig att återvända till nuet, minska spänningar och lugna nervsystemet.",
    slug: "body-scan-stress",
    category: "adaptability-resilience",
    instructions: `Börja med att grunda in och skapa närvaron.

STEG 1: GRUNDA DIG (2 minuter)

Ta ett ögonblick för att känna kroppen vila.

Känn stolen eller underlaget under dig. Känn andningen.

Låt kroppen få landa där den är.

STEG 2: KROPPEN FRÅN TOPP TILL TÅ (7 minuter)

För nu uppmärksamheten till huvudet.

Lägg märke till pannan, käken, halsen.

Om du känner spänning – observera den, försök inte ändra något.

Låt sedan uppmärksamheten långsamt röra sig nedåt – till axlar, armar, händer.

Känn varje del av kroppen, som om du lyste med en ficklampa av medvetenhet.

Vidare till bröstet, magen, ryggen...

Känn andetaget som rör sig där.

Fortsätt till benen, vaderna, fötterna. Känn tyngden mot underlaget.

STEG 3: HELHET (3 minuter)

Känn nu hela kroppen som en enhet.

Allt andas, allt lever.

Notera hur kroppen känns just nu – tung, lätt, varm, stilla.

Ta ett ögonblick för att känna kroppen vila.

STEG 4: ANDAS MED KROPPEN (2 minuter)

Andas in – känn hur kroppen fylls.

Andas ut – låt kroppen mjukna.

Låt varje utandning bli en inbjudan till stillhet.

Om tankarna vandrar, bara återvänd till andningen.

STEG 5: ÅTERVÄND (1 minut)

För uppmärksamheten tillbaka till rummet.

Känn stolen, golvet, ljuden runt dig.

När du är redo – öppna ögonen mjukt.

Notera hur det känns just nu.

Avsluta med några djupa andetag och bjud in till en kort personlig reflection på hur man känner sig efter övningen.`,
    whyUse: "Kroppsskanning är en av de mest studerade mindfulnessövningarna och används i både sjukvård och arbetsliv. Forskning visar att den kan minska både psykisk och fysisk stress. Den hjälper kroppen att aktivera det parasympatiska nervsystemet – kroppens naturliga 'lugn och ro'-respons.",
    whenToUse: [
      "Efter en stressig arbetsdag – för att återställa balans",
      "Före viktiga möten eller prestationer – för att grunda sig",
      "Vid sömnsvårigheter eller oro – för att stilla tankarna",
      "Som del i daglig mindfulnessrutin – för att stärka motståndskraft och lugn"
    ],
    research: {
      level: "⭐⭐⭐",
      summary: "Kabat-Zinn et al. (1982) – Originalstudien på patienter vid University of Massachusetts Medical Center visade signifikanta minskningar i stress, ångest och kroppslig spänning efter 8 veckors MBSR-träning med daglig kroppsskanning. Ditto et al. (2006) – RCT med 60 deltagare visade att 15 minuters kroppsskanning tre gånger i veckan under fyra veckor gav större minskning av psykologisk stress och kortisolnivåer än progressiv muskelavslappning.",
      findings: [
        "Signifikant minskning av stressnivåer (p < .01) och ångest (p < .05)",
        "Minskade kortisolnivåer och lägre puls efter 4 veckor",
        "Ökad kroppslig medvetenhet och upplevd avslappning"
      ],
      source: "Kabat-Zinn, J. et al. (1982). An outpatient program in Behavioral Medicine for chronic pain patients based on the practice of mindfulness meditation: Theoretical considerations and preliminary results. General Hospital Psychiatry, 4(1), 33–47. + Ditto, B., Eclache, M., & Goldman, N. (2006). Short-term autonomic and cardiovascular effects of mindfulness body scan meditation. Annals of Behavioral Medicine, 32(3), 227–234."
    }
  }
];

const App = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', '1-3min', '5-10min', '10+min'
  const [pwaInstallModalOpen, setPwaInstallModalOpen] = useState(false);
  const { showInstallButton } = usePWAInstall();

  // Parse duration string to minutes for accurate filtering
  const parseDuration = (durationStr) => {
    if (!durationStr) return null;
    // Match patterns like "10-15 min", "5 min", "1-2 min"
    const match = durationStr.match(/(\d+)(?:\s*-\s*(\d+))?\s*min/i);
    if (!match) return null;
    const min = parseInt(match[1], 10);
    const max = match[2] ? parseInt(match[2], 10) : min;
    return { min, max, avg: (min + max) / 2 };
  };

  // Filter exercises by duration with memoization
  const filteredExercises = useMemo(() => {
    if (filter === 'all') return exercises;
    
    return exercises.filter(ex => {
      const duration = parseDuration(ex.duration);
      if (!duration) return true; // Include if can't parse (fallback)
      
      switch (filter) {
        case '1-3min':
          return duration.avg >= 1 && duration.avg <= 3;
        case '5-10min':
          return duration.avg >= 5 && duration.avg <= 10;
        case '10+min':
          return duration.avg >= 10;
        default:
          return true;
      }
    });
  }, [filter]);


  if (selectedExercise) {
    return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
  }

  return (
    <div className="app">
      <DesktopInstallBanner />
      <header className="app-header" role="banner">
        <div className="header-top">
          <div className="header-left">
            <h1>Mindfulnessguiden<br/>Verktygslåda</h1>
          </div>
          <div className="header-right">
            <BrandLink variant="header" />
            {showInstallButton && (
              <button 
                className="install-app-button"
                onClick={() => setPwaInstallModalOpen(true)}
                aria-label="Ladda ned app"
              >
                <DownloadIcon />
                <span>Ladda ned app</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <nav className="filter-bar" role="navigation" aria-label="Filtrera övningar">
        <div className="filter-group">
          <label htmlFor="duration-filter" className="filter-label">Tid:</label>
          <select
            id="duration-filter"
            className="duration-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filtrera efter varaktighet"
          >
            <option value="all">Alla</option>
            <option value="1-3min">1-3 min</option>
            <option value="5-10min">5-10 min</option>
            <option value="10+min">10+ min</option>
          </select>
        </div>
      </nav>

      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Hoppa till huvudinnehåll
      </a>

      {/* Exercise List */}
      <main id="main-content" className="exercise-list" role="main" aria-label="Övningslista">
        <h3>{filteredExercises.length} ÖVNINGAR</h3>
        
        {filteredExercises.length > 0 ? (
          filteredExercises.map(exercise => (
            <article key={exercise.id}>
              <button
                className="exercise-card-button"
                onClick={() => setSelectedExercise(exercise)}
                aria-label={`Öppna ${exercise.title}, ${exercise.duration}, ${exercise.competency}`}
              >
                <ExerciseCard exercise={exercise} />
              </button>
            </article>
          ))
        ) : (
          <p className="no-results">Inga övningar i denna kategori</p>
        )}
      </main>

      {/* PWA Install Modal */}
      <PWAInstallModal
        isOpen={pwaInstallModalOpen}
        onClose={() => setPwaInstallModalOpen(false)}
      />
    </div>
  );
};

export default App;
