/* ============================================================
   THE THINGS WE LEFT BEHIND — archives.js
   Mission Archives: interactive backstory slideshows for every
   piece of discoverable hardware. Data + renderer (mode 'slides').
   Historical facts come from TL.D.ARCHIVE / TL.D.BEYOND;
   character dialogue is fiction, presented as the machine's
   personality — never as a historical recording.
   ============================================================ */
'use strict';
(function (TL) {

  /* ================= ARCHIVE DATA ================= */
  TL.D.ARCHIVES = {
    /* 01 — MARS PATHFINDER / SOJOURNER (spec Character 01) */
    pathfinder: {
      name: 'MARS PATHFINDER & SOJOURNER',
      dates: '1996 – 1997',
      persona: 'CURIOUS · CHEERFUL · PROUD PIONEER',
      accent: '#d8b25a',
      closing: 'Some of the biggest journeys begin with the smallest steps.',
      slides: [
        { t: 'A JOURNEY TO ANOTHER WORLD', art: 'pathfinder:0',
          n: 'In 1996, NASA launched Mars Pathfinder. Its destination was Mars, a world humanity had spent decades trying to understand.',
          d: 'SOJOURNER: "Quite a journey for something so small, isn\'t it?"' },
        { t: 'THE LANDING', art: 'pathfinder:1',
          n: 'In 1997, Pathfinder reached Mars. Protected by airbags, the lander bounced across the Martian surface before coming to rest.',
          d: 'SOJOURNER: "I hear the landing was a little bumpy."',
          hs: [{ x: 0.3, y: 0.72, w: 0.4, h: 0.24, label: 'AIRBAG LANDING SYSTEM', text: 'The lander was wrapped in inflated airbags and dropped onto Mars — no engines, no legs. It bounced about fifteen times, then stopped and opened like a flower.' }] },
        { t: 'THE LITTLE ROVER', art: 'pathfinder:2',
          n: 'From Pathfinder came Sojourner, a small robotic rover built to investigate nearby rocks and soil.',
          d: 'SOJOURNER: "I wasn\'t very big. But I had a whole planet to explore."' },
        { t: 'THE FIRST STEPS', art: 'pathfinder:3',
          n: 'Sojourner examined Martian rocks and soil, helping scientists learn more about the planet\'s surface.',
          hs: [
            { x: 0.24, y: 0.72, w: 0.18, h: 0.24, label: 'APXS SPECTROMETER', text: 'The alpha-proton X-ray spectrometer "tasted" what rocks were made of — including ones named Barnacle Bill and Yogi.' },
            { x: 0.58, y: 0.5, w: 0.22, h: 0.34, label: 'THE ROCKS', text: 'Fifteen rocks analysed. Some showed signatures shaped by water — the clue that kept the rover hunting.' }
          ] },
        { t: 'A SMALL BEGINNING', art: 'pathfinder:4',
          n: 'Pathfinder and Sojourner helped demonstrate a new way of exploring Mars: sending mobile robots to investigate the surface directly.',
          d: 'SOJOURNER: "Not bad for a little rover, huh?"' }
      ]
    },

    /* 02 — SPIRIT (spec Character 02) */
    spirit: {
      name: 'SPIRIT — MER-A',
      dates: '2003 – 2010',
      persona: 'STUBBORN · DETERMINED · QUIETLY PROUD',
      accent: '#c07840',
      closing: 'Progress isn\'t always measured by how far you travel.',
      slides: [
        { t: 'ARRIVING AT MARS', art: 'spirit:0',
          n: 'Spirit arrived on Mars in January 2004, beginning an exploration of Gusev Crater.',
          d: 'SPIRIT: "The terrain looked easier from orbit."' },
        { t: 'A PLANET OF CLUES', art: 'spirit:1',
          n: 'Spirit was sent to study Martian rocks and soil, searching for clues about the planet\'s past.',
          d: 'SPIRIT: "Rocks are excellent storytellers. You just have to know what to look for."' },
        { t: 'EVIDENCE OF WATER', art: 'spirit:2',
          n: 'Spirit found geological evidence that water had affected rocks on Mars in the past.',
          d: 'SPIRIT: "This place wasn\'t always the dry landscape you see today."',
          hs: [{ x: 0.44, y: 0.28, w: 0.36, h: 0.56, label: 'THE SAMPLE', text: 'Silica and carbonate traces, shaped by hot water — evidence of an ancient, habitable environment hiding further than anyone first looked.' }] },
        { t: 'THE DIFFICULT TERRAIN', art: 'spirit:3',
          n: 'Later in its mission, Spirit became stuck in soft Martian soil and could no longer continue driving.',
          d: 'SPIRIT: "I suppose even the best explorers get stuck sometimes."' },
        { t: 'WHAT REMAINS', art: 'spirit:4',
          n: 'Spirit\'s mobility mission ended, but the discoveries it made remained part of humanity\'s understanding of Mars.' }
      ]
    },

    /* 03 — OPPORTUNITY (spec Character 03) */
    opportunity: {
      name: 'OPPORTUNITY — MER-B',
      dates: '2003 – 2018',
      persona: 'OPTIMISTIC · FRIENDLY · ADVENTUROUS',
      accent: '#d88a50',
      closing: 'An unexpected amount of time can create an extraordinary amount of discovery.',
      slides: [
        { t: 'ANOTHER EXPLORER', art: 'opportunity:0',
          n: 'Opportunity arrived on Mars in January 2004, joining its twin rover Spirit in exploring the planet.',
          d: 'OPPORTUNITY: "Well, hello there! Lovely place, isn\'t it?"' },
        { t: 'EXPLORING MERIDIANI PLANUM', art: 'opportunity:1',
          n: 'Opportunity explored Meridiani Planum, examining rocks and geological formations.',
          d: 'OPPORTUNITY: "There\'s always something interesting around the next rock."' },
        { t: 'CLUES FROM ANCIENT WATER', art: 'opportunity:2',
          n: 'Opportunity discovered evidence that liquid water had once affected the Martian environment.',
          hs: [{ x: 0.46, y: 0.24, w: 0.34, h: 0.58, label: 'THE DISCOVERY', text: 'Hematite "blueberries" and sulphate salts — proof that long-lived salty water once covered this plain.' }] },
        { t: 'MUCH LONGER THAN EXPECTED', art: 'opportunity:3',
          n: 'Opportunity was originally designed for a mission lasting around 90 Martian days. It continued operating for nearly 15 years.',
          d: 'OPPORTUNITY: "Ninety days? I think I got a little carried away."' },
        { t: 'THE FINAL SIGNAL', art: 'opportunity:4',
          n: 'Opportunity\'s mission ended in 2018 after a planet-wide dust storm prevented it from restoring sufficient power.',
          d: 'OPPORTUNITY: "I had a wonderful view while it lasted."' }
      ]
    },

    /* 04 — VIKING 1 (spec Character 04) */
    viking1: {
      name: 'VIKING 1',
      dates: '1975 – 1982',
      persona: 'FORMAL · COMPOSED · SCIENTIFIC',
      accent: '#9fd8c8',
      closing: 'Science advances not only through answers, but through better questions.',
      slides: [
        { t: 'THE FIRST ARRIVAL', art: 'viking1:0',
          n: 'In July 1976, Viking 1 became the first US spacecraft to successfully land on Mars.',
          d: 'VIKING 1: "A historic arrival, if I may say so."' },
        { t: 'A NEW VIEW OF MARS', art: 'viking1:1',
          n: 'Viking 1 sent back images of its surroundings, giving humanity a close-up view of the Martian surface.',
          d: 'VIKING 1: "For the first time, we could examine this place from the ground."' },
        { t: 'EXPERIMENTS ON ANOTHER PLANET', art: 'viking1:2',
          n: 'Viking carried instruments designed to study Martian soil and investigate whether signs of life might be present.',
          hs: [{ x: 0.56, y: 0.62, w: 0.14, h: 0.26, label: 'SAMPLER ARM', text: 'A trenching scoop dug into the soil and delivered samples inside the lander, where three biology experiments waited.' }] },
        { t: 'AN UNANSWERED QUESTION', art: 'viking1:3',
          n: 'The life-detection experiments produced interesting results, but did not establish definitive evidence of life on Mars.',
          d: 'VIKING 1: "Not every experiment produces a simple answer."' }
      ]
    },

    /* 05 — VIKING 2 (spec Character 05) */
    viking2: {
      name: 'VIKING 2',
      dates: '1975 – 1980',
      persona: 'PATIENT · OBSERVANT · QUIETLY WRY',
      accent: '#a8d8e0',
      closing: 'Sometimes understanding a world means looking at it from more than one place.',
      slides: [
        { t: 'A SECOND LANDING', art: 'viking2:0',
          n: 'Viking 2 followed Viking 1, landing at Utopia Planitia in September 1976.',
          d: 'VIKING 2: "A different landing site. A different perspective."',
          scan: [
            { label: 'LANDING SITE', text: 'UTOPIA PLANITIA · 47.97° N, 225.29° E — northern lowlands' },
            { label: 'TOUCHDOWN', text: 'SEP 3 1976 · RETRO-BRAKE + LANDER LEGS · 224 m/s DESCENT' },
            { label: 'SURFACE PRESSURE', text: '6.9 mbar · 0.7% OF EARTH SEA LEVEL' },
            { label: 'SURFACE TEMP', text: '−66 °C AT TOUCHDOWN · RANGE −173 to +20 °C OVER A SOL' }
          ] },
        { t: 'OBSERVING THE ENVIRONMENT', art: 'viking2:1',
          n: 'Viking 2 studied its surroundings using instruments designed to investigate the Martian surface and atmosphere.',
          scan: [
            { label: 'SOIL SAMPLE 1', text: 'FINE Aeolian DUST · SiO₂, Fe₂O₃ RICH · NO ORGANICS DETECTED' },
            { label: 'SOIL SAMPLE 2', text: 'REACTIVE CHEMISTRY · O₂ RELEASE ON WETTING (PEROXIDES)' },
            { label: 'BIOLOGY PKG', text: 'LR / PR / GEX — NO POSITIVE LIFE SIGNATURE, TWO SITES AGREE' },
            { label: 'SAMPLE ARM', text: '3.5 m BOOM · TRENCH DEPTH 8–10 cm · FROST OBSERVED IN WINTER' }
          ] },
        { t: 'WEATHER AND SEASONS', art: 'viking2:2',
          n: 'Long-term observations helped scientists study Martian weather and environmental conditions.',
          d: 'VIKING 2: "Even a quiet landscape changes with time."',
          scan: [
            { label: 'WIND', text: 'MEAN 7.7 m/s · GUSTS TO 30 m/s · SSE PREVAILING' },
            { label: 'SEASONS', text: '4 MARTIAN YEARS LOGGED · WATER FROST EACH NORTHERN WINTER' },
            { label: 'DUST OPTICAL DEPTH', text: '1.1 CLEAR SOLS · >5 DURING 1977 GLOBAL DUST STORMS' },
            { label: 'ATMOSPHERE', text: '95% CO₂ · 2.7% N₂ · 1.6% Ar · TRACE O₂' }
          ] },
        { t: 'TWO LANDERS, A BROADER PICTURE', art: 'viking2:3',
          n: 'Together, the Viking missions provided scientists with observations from two different locations on Mars.',
          scan: [
            { label: 'TRANSMISSION', text: 'LAST CONTACT APR 11 1980 · BATTERY FAULT · ORBITER RELAY ENDED' },
            { label: 'LOG DURATION', text: '1,281 SOLS ON SURFACE · SITE STILL MONITORED FROM ORBIT' },
            { label: 'LEGACY', text: 'THE ONLY GROUND-TRUTH WEATHER RECORD OF UTOPIA FOR 40 YEARS' }
          ] }
      ]
    },

    /* 06 — DAWN (spec Character 06) */
    dawn: {
      name: 'DAWN',
      dates: '2007 – 2018',
      persona: 'PATIENT · REFLECTIVE · QUIETLY AMBITIOUS',
      accent: '#8ab8f0',
      closing: 'Sometimes the greatest journeys are the ones that teach us to keep going.',
      slides: [
        { t: 'LEAVING EARTH', art: 'dawn:0',
          n: 'Dawn launched in 2007 on a journey into the asteroid belt.' },
        { t: 'VESTA', art: 'dawn:1',
          n: 'Dawn reached Vesta in 2011 and studied the large asteroid-like body from orbit.',
          d: 'DAWN: "My first destination. A world full of geological history."' },
        { t: 'THE LONG JOURNEY', art: 'dawn:2',
          n: 'After studying Vesta, Dawn continued its journey towards Ceres using ion propulsion.',
          hs: [{ x: 0.66, y: 0.56, w: 0.26, h: 0.34, label: 'ION PROPULSION', text: 'Xenon ions, accelerated by electricity, made a faint blue thrust — gentle as a sheet of paper on your hand, but it never stopped pushing.' }] },
        { t: 'CERES', art: 'dawn:3',
          n: 'Dawn reached Ceres in 2015, becoming the first spacecraft to orbit a dwarf planet.',
          d: 'DAWN: "A second destination. Another world to understand."' },
        { t: 'A JOURNEY OF TWO WORLDS', art: 'dawn:4',
          n: 'Dawn became the first mission to orbit two extraterrestrial destinations beyond Earth.' }
      ]
    },

    /* 07 — NEAR SHOEMAKER (spec Character 07) */
    near: {
      name: 'NEAR SHOEMAKER',
      dates: '1996 – 2001',
      persona: 'ADVENTUROUS · WITTY · RESOURCEFUL',
      accent: '#c8b090',
      closing: 'Sometimes an unexpected ending can become one more achievement.',
      slides: [
        { t: 'TOWARDS EROS', art: 'near:0',
          n: 'NEAR Shoemaker launched in 1996 to study the near-Earth asteroid Eros.' },
        { t: 'AN ASTEROID UP CLOSE', art: 'near:1',
          n: 'In 2000, NEAR Shoemaker became the first spacecraft to orbit an asteroid.',
          d: 'NEAR: "Quite a peculiar place, isn\'t it?"' },
        { t: 'MAPPING A SMALL WORLD', art: 'near:2',
          n: 'From orbit, NEAR Shoemaker studied Eros and gathered information about its surface and composition.' },
        { t: 'AN UNEXPECTED LANDING', art: 'near:3',
          n: 'In February 2001, the spacecraft descended onto Eros. It survived the landing and continued returning data.',
          d: 'NEAR: "Well, that wasn\'t exactly in the original plan."' },
        { t: 'ONE LAST DISCOVERY', art: 'near:4',
          n: 'Even after its landing, NEAR Shoemaker continued to provide valuable observations before communication ended.' }
      ]
    },

    /* 08 — PIONEER 10 (spec Character 08) */
    p10: {
      name: 'PIONEER 10',
      dates: '1972 – 2003',
      persona: 'BOLD · CONFIDENT · NOSTALGIC',
      accent: '#e0c090',
      closing: 'Even a small message can carry the hopes of an entire world.',
      slides: [
        { t: 'THE FIRST DEPARTURE', art: 'p10:0',
          n: 'In 1972, Pioneer 10 began its journey towards the outer solar system.' },
        { t: 'CROSSING THE ASTEROID BELT', art: 'p10:1',
          n: 'Pioneer 10 became the first spacecraft to traverse the asteroid belt.' },
        { t: 'JUPITER', art: 'p10:2',
          n: 'In 1973, Pioneer 10 became the first spacecraft to fly past Jupiter.',
          d: 'PIONEER 10: "The first close encounter. What a sight."' },
        { t: 'A MESSAGE FROM EARTH', art: 'p10:3',
          n: 'Pioneer 10 carried a plaque intended to communicate basic information about humanity and Earth to anyone who might encounter it.',
          hs: [
            { x: 0.4, y: 0.24, w: 0.16, h: 0.4, label: 'THE FIGURES', text: 'A man and a woman, drawn to scale against a schematic of the spacecraft behind them — so anyone finding it could judge our size.' },
            { x: 0.24, y: 0.28, w: 0.2, h: 0.36, label: 'THE PULSAR MAP', text: 'Lines radiating from a point in space, each keyed to a pulsar\'s period: a map that points home, and a date in binary.' },
            { x: 0.38, y: 0.62, w: 0.22, h: 0.2, label: 'THE SILENCE', text: 'No language. Just hydrogen, geometry and light — the only alphabet the universe shares with everyone.' }
          ] },
        { t: 'INTO THE DISTANCE', art: 'p10:4',
          n: 'Pioneer 10 continued outward beyond the planets. Its final signal was received in 2003.',
          d: 'PIONEER 10: "We wanted to say hello."' }
      ]
    },

    /* 09 — PIONEER 11 (spec Character 09) */
    p11: {
      name: 'PIONEER 11',
      dates: '1973 – 1995',
      persona: 'RESERVED · ANALYTICAL · QUIETLY COMPETITIVE',
      accent: '#b8d0c0',
      closing: 'Being the next explorer can be just as important as being the first.',
      slides: [
        { t: 'FOLLOWING A PATH', art: 'p11:0',
          n: 'Pioneer 11 launched in 1973, following its predecessor into the outer solar system.',
          d: 'PIONEER 11: "A path had been opened. There was more to discover."' },
        { t: 'JUPITER AGAIN', art: 'p11:1',
          n: 'Pioneer 11 flew past Jupiter, gathering additional observations of the giant planet.' },
        { t: 'THE FIRST VISIT TO SATURN', art: 'p11:2',
          n: 'In 1979, Pioneer 11 became the first spacecraft to fly past Saturn.',
          d: 'PIONEER 11: "A rather remarkable view, even by my standards."' },
        { t: 'THE WAY FORWARD', art: 'p11:3',
          n: 'Pioneer 11\'s observations helped prepare the way for later exploration of the outer planets.' }
      ]
    },

    /* 10 — INGENUITY (spec Character 10) */
    ingenuity: {
      name: 'INGENUITY',
      dates: '2021 – 2024',
      persona: 'ENERGETIC · PLAYFUL · SLIGHTLY BOASTFUL',
      accent: '#f0a050',
      closing: 'Some of the most important achievements begin as experiments.',
      slides: [
        { t: 'A DIFFERENT KIND OF EXPLORER', art: 'ingenuity:0',
          n: 'Ingenuity travelled to Mars with the Perseverance rover as a small experimental helicopter.',
          d: 'INGENUITY: "I wasn\'t built to drive. I had a different idea."' },
        { t: 'THE FIRST FLIGHT', art: 'ingenuity:1',
          n: 'On April 19, 2021, Ingenuity completed the first powered, controlled flight on another planet.',
          d: 'INGENUITY: "And up we went!"' },
        { t: 'BEYOND THE ORIGINAL PLAN', art: 'ingenuity:2',
          n: 'Originally designed for five flights, Ingenuity eventually completed 72.',
          d: 'INGENUITY: "Five flights were planned. Seventy-two completed. Not bad!"' },
        { t: 'FLYING ON MARS', art: 'ingenuity:3',
          n: 'Mars has a very thin atmosphere, so Ingenuity needed rapidly spinning rotors to generate enough lift.',
          hs: [{ x: 0.6, y: 0.14, w: 0.32, h: 0.38, label: 'THE CHALLENGE', text: 'Mars air is about 1% as dense as Earth\'s. Ingenuity\'s carbon-fibre blades spun at 2,400 rpm to lift its 1.8 kg off the ground.' }] },
        { t: 'THE FINAL FLIGHT', art: 'ingenuity:4',
          n: 'Ingenuity\'s final flight took place in January 2024. Damage to its rotor blades meant it could not fly again.',
          d: 'INGENUITY: "I suppose seventy-two flights is quite a lot for a little helicopter."' }
      ]
    },

    /* 11 — KEPLER (spec Character 11) */
    kepler: {
      name: 'KEPLER SPACE TELESCOPE',
      dates: '2009 – 2018',
      persona: 'GENTLE · DREAMY · FASCINATED BY DISTANT WORLDS',
      accent: '#a0c8f0',
      closing: 'Sometimes a tiny change in light can reveal an entire world.',
      slides: [
        { t: 'LOOKING INTO THE STARS', art: 'kepler:0',
          n: 'In 2009, NASA launched the Kepler Space Telescope to search for planets orbiting distant stars.',
          d: 'KEPLER: "There was so much out there. I just had to look."' },
        { t: 'WATCHING STARLIGHT', art: 'kepler:1',
          n: 'Kepler observed the brightness of stars over time, searching for tiny changes in their light.' },
        { t: 'FINDING DISTANT WORLDS', art: 'kepler:2',
          n: 'When a planet passes in front of its star, it can cause a small dip in the star\'s brightness. Kepler used this transit method to identify possible planets.',
          hs: [{ x: 0.52, y: 0.5, w: 0.4, h: 0.32, label: 'THE LIGHT CURVE', text: 'Each regular dip is a planet crossing its star. Time the repeats and you can size the world and measure its year — from light alone.' }] },
        { t: 'A NEW WAY FORWARD', art: 'kepler:3',
          n: 'After problems with its reaction wheels affected its original pointing ability, Kepler continued observing through the K2 mission.',
          d: 'KEPLER: "A different approach. The same curiosity."' },
        { t: 'THE LAST OBSERVATIONS', art: 'kepler:4',
          n: 'Kepler\'s mission ended in 2018 after it ran out of fuel. Its observations helped reveal thousands of confirmed exoplanets.',
          d: 'KEPLER: "The universe was never as empty as it looked."' }
      ]
    },

    /* ==== DATA-DERIVED ARCHIVES ==== */

    /* 12 — PHOENIX (facts from TL.D.ARCHIVE) */
    phoenix: {
      name: 'PHOENIX',
      dates: '2007 – 2008',
      persona: 'QUIETLY TRIUMPHANT · CURIOUS · GENTLE',
      accent: '#bfe8f0',
      closing: 'It rose from spare parts of two failed missions, and became the first to touch water on another world.',
      slides: [
        { t: 'A POLAR ARRIVAL', art: 'phoenix:0',
          n: 'In May 2008, Phoenix landed in Vastitas Borealis, the northern plains of Mars, on a mission to dig into the polar soil.' },
        { t: 'TOUCHING THE ICE', art: 'phoenix:1',
          n: 'Phoenix confirmed water ice just centimetres below the soil, and found perchlorates — soil chemistry surprisingly Earth-like. The first mission to touch Martian water.',
          hs: [{ x: 0.64, y: 0.74, w: 0.16, h: 0.2, label: 'THE TRENCH', text: 'Bright white material dug up by the arm slowly faded over the following days — it was ice, turning to vapour in the thin air.' }] },
        { t: 'THE LONG DARK', art: 'phoenix:2',
          n: 'As Martian winter came, ice and darkness drained its solar power. The last signal was received on November 2, 2008.' },
        { t: 'WHAT IT LEFT BEHIND', art: 'phoenix:3',
          n: 'The soil record Phoenix returned reshaped ideas about where habitable chemistry can survive on Mars.' }
      ]
    },

    /* 13 — INSIGHT (facts from TL.D.ARCHIVE) */
    insight: {
      name: 'INSIGHT',
      dates: '2018 – 2022',
      persona: 'CALM · ATTENTIVE · SOFT-SPOKEN',
      accent: '#f0c060',
      closing: 'It laid its ear on the ground and listened for four Earth years.',
      slides: [
        { t: 'A QUIET ARRIVAL', art: 'insight:0',
          n: 'InSight landed in Elysium Planitia in November 2018, built to study the interior of Mars — quakes, heat, and wobble.' },
        { t: 'LISTENING TO THE PLANET', art: 'insight:1',
          n: 'Its seismometer sat directly on the ground, listening for the faint tremors of a planet we had never heard before.' },
        { t: 'WHAT THE GROUND SAID', art: 'insight:2',
          n: 'Over 1,300 marsquakes were detected, including a magnitude-5 — enough to measure the crust, mantle and liquid core, and to reveal a thinner crust than expected.' },
        { t: 'A DIMMING VOICE', art: 'insight:3',
          n: 'Dust slowly covered its solar panels. When the power ran out in December 2022, InSight fell silent.' }
      ]
    },

    /* 14 — PERSEVERANCE (facts from TL.D.ARCHIVE) */
    perseverance: {
      name: 'PERSEVERANCE',
      dates: '2021 – PRESENT',
      persona: 'FOCUSED · DILIGENT · STEADFAST',
      accent: '#c0e0a0',
      closing: 'Not left behind — still out there, drilling, breathing, waiting for the day its tubes come home.',
      slides: [
        { t: 'DOWN IN JEZERO', art: 'perseverance:0',
          n: 'Perseverance landed in Jezero Crater in February 2021 — the site of a 3.5-billion-year-old lakebed with an ancient river delta.' },
        { t: 'COLLECTING THE PAST', art: 'perseverance:1',
          n: 'It has sealed more than 25 sample tubes from the delta and found organic molecules in "Wildcat Ridge". Its MOXIE experiment even made oxygen from Martian CO2.' },
        { t: 'A COMPANION IN THE SKY', art: 'perseverance:2',
          n: 'Perseverance deployed the small helicopter Ingenuity, then watched it fly.' },
        { t: 'STILL EXPLORING', art: 'perseverance:3',
          n: 'Perseverance remains active — caching samples for a future return to Earth, one careful drill at a time.' }
      ]
    },

    /* 15 — CURIOSITY (facts from TL.D.ARCHIVE) */
    curiosity: {
      name: 'CURIOSITY — MSL',
      dates: '2011 – PRESENT',
      persona: 'CHEERFUL · MUSICAL · EVER-CURIOUS',
      accent: '#f0d080',
      closing: 'It landed on sky-crane tethers and has been singing itself Happy Birthday ever since.',
      slides: [
        { t: 'SEVEN MINUTES OF SKY CRANE', art: 'curiosity:0',
          n: 'Curiosity landed in Gale Crater in August 2012, lowered on sky-crane tethers to begin reading Mount Sharp — 5 km of layered rock like a history book.' },
        { t: 'READING THE ROCKS', art: 'curiosity:1',
          n: 'Its laser has fired at more than 3,000 rock targets, reading their chemistry from 7 metres away.' },
        { t: 'AN ANCIENT LAKE', art: 'curiosity:2',
          n: 'Curiosity proved Gale Crater once held a long-lived lake of fresh water, and found organic molecules and seasonal methane.' },
        { t: 'STILL CLIMBING', art: 'curiosity:3',
          n: 'Years past its plan, Curiosity keeps climbing the slopes of Mount Sharp, logging every layer.' }
      ]
    },

    /* 16 — MARINER 4 · THE RELAY (facts from TL.D.ARCHIVE) */
    relay: {
      name: 'MARINER 4 (ECHO)',
      dates: '1964 – 1965',
      persona: 'FAINT · ANCIENT · STILL LISTENING',
      accent: '#b0a8d8',
      closing: 'Humanity\'s first hello from Mars arrived as 21 frames of static and wonder.',
      slides: [
        { t: 'THE FIRST HELLO', art: 'relay:0',
          n: 'Mariner 4 launched in November 1964. In July 1965 it performed the first successful flyby of Mars — the first close-up photographs of another planet.' },
        { t: 'TWENTY-ONE FRAMES', art: 'relay:1',
          n: 'It returned 21 grainy frames: craters, no canals, no cities — an air-thin, moonlike Mars.' },
        { t: 'REWRITING THE BOOKS', art: 'relay:2',
          n: 'Its readings put the atmosphere at 5-10 millibars. Every book about the red planet was rewritten overnight.' },
        { t: 'STILL DRIFTING', art: 'relay:3',
          n: 'Mariner 4 is now drifting in solar orbit — the archived signal that led every later explorer here.' }
      ]
    }
  };

  /* ================= CHARACTER -> ARCHIVE MAP ================= */
  TL.D.ARCHIVE_OF = {
    pathfinder: 'pathfinder', sojourner: 'pathfinder', spirit: 'spirit', opportunity: 'opportunity',
    viking1: 'viking1', viking2: 'viking2', phoenix: 'phoenix', insight: 'insight',
    ingenuity: 'ingenuity', perseverance: 'perseverance', curiosity: 'curiosity', relay: 'relay'
  };

    /* ================= SLIDESHOW RENDERER =================
     Two-Column Telemetry Card:
       - unified full-width header bar (category/title left, dates + X right)
       - 50/50 body split with a vertical divider
       - left column: clean visual stage (no labels, no watermarks)
       - right column: FRAME indicator -> section header -> NARRATION LOG
         -> persona tag row -> anchored footer (PREV | dots | NEXT)
     All slide photos are preloaded when the archive opens ("RETRIEVING"
     gate) and slide changes are double-buffered crossfades — the opaque
     backing panel never lets the live world bleed through. */
  var SL = TL.Slides = {
    id: null, slide: 0, ret: 'play', t: 0, trans: 0, info: null,
    snap: null, hasSnap: false,          /* double-buffer snapshot */
    warm: { total: 0, got: 0 },          /* preload gate */
    scanOn: false
  };

  /* layout constants (TL 960x540) */
  var HDR_H = 60;                                        /* unified header bar */
  var XRECT = { x: 900, y: 14, w: 36, h: 32 };           /* close button */
  var V = { x: 36, y: 100, w: 400, h: 300 };             /* visual stage (left) */
  var CHIP = { y: 416, h: 28 };                          /* SCAN chip */
  var RC = { x: 508, w: 424 };                           /* right column */
  var FTR = { y: 478, h: 30 };                           /* anchored footer */
  var SPLIT_X = 486;                                     /* vertical divider */

  function inRect(m, x, y, w, h) { return m.x >= x && m.x <= x + w && m.y >= y && m.y <= y + h; }
  function pad2(n2) { return (n2 < 10 ? '0' : '') + n2; }

  SL.a = function () { return TL.D.ARCHIVES[SL.id]; };

  SL.open = function (id, ret) {
    if (!TL.D.ARCHIVES[id]) return;
    SL.id = id;
    var a = TL.D.ARCHIVES[id], n = a.slides.length;
    SL.slide = TL.clamp(TL.S.archPos[id] || 0, 0, n - 1);
    SL.ret = ret || 'play';
    SL.info = null;
    SL.scanOn = false;
    SL.hasSnap = false;
    SL.trans = 0.4;
    SL.t = 0;
    /* preload every slide photo up front: no gaps, no placeholders */
    SL.warm = { total: n, got: 0 };
    var list = [];
    for (var i = 0; i < n; i++) list.push({ key: 'sl:' + id + ':' + i, base: 'assets/archives/' + id + '/', file: 'frame' + (i + 1) });
    var warm = SL.warm;
    TL.Images.warm(list, function () { warm.got = warm.total; }, function (c) { warm.got = c; });
    TL.audio.static(0.3, 0.05);
    TL.audio.ui();
    if (TL.G.setMode) TL.G.setMode('slides'); else TL.G.mode = 'slides';
  };

  SL.change = function (dir) {
    var n = SL.a().slides.length;
    var s2 = TL.clamp(SL.slide + dir, 0, n - 1);
    if (s2 === SL.slide || SL.warm.got < SL.warm.total) return;
    /* double-buffer: snapshot the current stage so the crossfade has a
       fully rendered "old" frame underneath — never an empty gap */
    if (!SL.snap) { SL.snap = document.createElement('canvas'); SL.snap.width = V.w; SL.snap.height = V.h; }
    SL.snap.getContext('2d').drawImage(TL.canvas, V.x, V.y, V.w, V.h, 0, 0, V.w, V.h);
    SL.hasSnap = true;
    SL.slide = s2;
    SL.info = null;
    SL.scanOn = false;
    SL.trans = 0.35;
    TL.S.archPos[SL.id] = s2;
    TL.save();
    TL.audio.static(0.18, 0.045);
    TL.audio.blip(700, 0.04, 0.06);
  };

  SL.close = function () {
    if (!SL.id) return;
    TL.S.archPos[SL.id] = SL.slide;
    TL.save();
    var r = SL.ret;
    SL.id = null;
    TL.audio.uiBack();
    var m2 = r === 'archive' ? 'archive' : 'play';
    if (TL.G.setMode) TL.G.setMode(m2); else TL.G.mode = m2;
  };

  SL.update = function (dt) {
    if (!SL.id) return;
    SL.t += dt;
    if (SL.trans > 0) SL.trans = Math.max(0, SL.trans - dt);   /* crossfade decay */
    var a = SL.a(), n = a.slides.length, last = SL.slide >= n - 1;
    var s2 = a.slides[SL.slide];
    /* tools */
    if (TL.hit('s') && s2.scan) { SL.scanOn = !SL.scanOn; TL.audio.ui(); }
    /* keyboard / touch buttons */
    if (SL.slide > 0 && (TL.hit('arrowleft') || TL.jumpHit())) { SL.change(-1); return; }
    if (TL.hit('arrowright') || TL.actHit()) {
      if (last) SL.close(); else SL.change(1);
      return;
    }
    if (TL.hit('escape')) { SL.close(); return; }
    /* mouse / touch taps */
    var m = TL.mouse;
    if (m.clicked) {
      if (inRect(m, XRECT.x, XRECT.y, XRECT.w, XRECT.h)) { SL.close(); return; }
      if (inRect(m, RC.x, FTR.y, 108, FTR.h)) {                                    /* prev */
        if (SL.slide > 0) { SL.change(-1); return; }
        TL.audio.deny(); return;
      }
      if (inRect(m, RC.x + RC.w - 108, FTR.y, 108, FTR.h)) {                       /* next / return */
        if (last) SL.close(); else SL.change(1);
        return;
      }
      if (s2.scan && inRect(m, V.x, CHIP.y, 120, CHIP.h)) { SL.scanOn = !SL.scanOn; TL.audio.ui(); return; }
      /* hotspots */
      if (s2.hs) {
        for (var i = 0; i < s2.hs.length; i++) {
          var h = s2.hs[i];
          if (m.x > V.x + h.x * V.w && m.x < V.x + (h.x + h.w) * V.w &&
              m.y > V.y + h.y * V.h && m.y < V.y + (h.y + h.h) * V.h) {
            SL.info = (SL.info === h) ? null : h;
            TL.audio.ui();
            return;
          }
        }
      }
      if (SL.info) { SL.info = null; TL.audio.ui(); return; }   /* tap anywhere dismisses */
    }
  };

  /* Keep the complete archival photo visible. Fill its spare margins with
     a dim, softened version of itself instead of plain black bars. */
  function drawArchivePhoto(ctx, img, x, y, w, h) {
    var bg = img._archiveBackdrop;
    if (!bg || bg.width !== w || bg.height !== h) {
      bg = document.createElement('canvas');
      bg.width = w; bg.height = h;
      var bc = bg.getContext('2d');
      bc.filter = 'blur(14px) brightness(0.5)';
      TL.Images.drawCover(bc, img, -20, -20, w + 40, h + 40);
      bc.filter = 'none';
      bc.fillStyle = 'rgba(4,8,14,0.28)';
      bc.fillRect(0, 0, w, h);
      img._archiveBackdrop = bg;
    }
    ctx.drawImage(bg, x, y, w, h);
    TL.Images.drawContain(ctx, img, x, y, w, h);
  }

  /* draw the slide's visual (photo if imported, drawn art otherwise). */
  function drawSlideVisual(ctx, img, w, h) {
    if (img) {
      TL.rect(ctx, 0, 0, w, h, '#04080e');
      drawArchivePhoto(ctx, img, 0, 0, w, h);
      var gph = ctx.createLinearGradient(0, 0, 0, h);
      gph.addColorStop(0, 'rgba(4,10,16,0.35)'); gph.addColorStop(0.45, 'rgba(4,10,16,0)');
      gph.addColorStop(1, 'rgba(4,10,16,0.45)');
      ctx.fillStyle = gph; ctx.fillRect(0, 0, w, h);
      TL.ArchiveArt.scan(ctx, w, h);
    } else {
      TL.ArchiveArt.paint(SL.id, SL.slide, ctx, w, h, SL.t);
    }
  }

  SL.draw = function (ctx) {
    if (!SL.id) return;
    TL.BIG_TEXT = true;   /* the archive is a book page: keep its text readable */
    var a = SL.a(), s2 = a.slides[SL.slide], n = a.slides.length, last = SL.slide >= n - 1;
    var ac = a.accent;

    /* ---- persistent opaque backing: the world is fully sealed off ---- */
    ctx.fillStyle = '#0b0a08'; ctx.fillRect(0, 0, TL.W, TL.H);
    var cg = ctx.createLinearGradient(0, 0, 0, TL.H);
    cg.addColorStop(0, '#1c1610'); cg.addColorStop(0.55, '#15100c'); cg.addColorStop(1, '#0d0a08');
    ctx.fillStyle = cg; ctx.fillRect(0, 0, TL.W, TL.H);

    /* ---- unified full-width header bar ---- */
    ctx.fillStyle = 'rgba(12,16,20,0.9)'; ctx.fillRect(0, 0, TL.W, HDR_H);
    ctx.fillStyle = 'rgba(126,240,200,0.28)'; ctx.fillRect(0, HDR_H - 1, TL.W, 1);
    TL.text(ctx, 'MISSION ARCHIVE', 24, 10, 6, '#59c8f0');
    var headerSize = 14;
    while (TL.wrap(ctx, a.name, 700, headerSize).length > 1) headerSize--;
    TL.text(ctx, a.name, 24, 24, headerSize, ac);
    TL.text(ctx, a.dates, 888, 24, 9, '#8a9aa8', 'right');
    TL.panel(ctx, XRECT.x, XRECT.y, XRECT.w, XRECT.h, { bg: 'rgba(40,20,14,0.92)', corner: '#f0a050' });
    TL.text(ctx, 'X', XRECT.x + 18, XRECT.y + 10, 10, '#f0a050', 'center');

    /* ---- 50/50 body split with vertical divider ---- */
    ctx.fillStyle = 'rgba(126,240,200,0.16)'; ctx.fillRect(SPLIT_X, HDR_H + 12, 1, TL.H - 24 - HDR_H);

    /* ============ LEFT — CLEAN VISUAL STAGE ============ */
    TL.panel(ctx, V.x - 6, V.y - 6, V.w + 12, V.h + 12, { bg: 'rgba(6,16,28,0.96)', border: 'rgba(90,140,170,0.45)', corner: ac });
    ctx.save();
    ctx.beginPath(); ctx.rect(V.x, V.y, V.w, V.h); ctx.clip();
    ctx.translate(V.x, V.y);
    TL.rect(ctx, 0, 0, V.w, V.h, '#04080e');
    var warmDone = SL.warm.got >= SL.warm.total;
    var img = TL.Images ? TL.Images.slide(SL.id, SL.slide) : null;
    var cross = SL.trans > 0;

    if (cross && SL.hasSnap) {
      /* double-buffered crossfade: old frame beneath, new frame dissolving in */
      ctx.drawImage(SL.snap, 0, 0, V.w, V.h);
      ctx.save();
      ctx.globalAlpha = 1 - SL.trans / 0.35;
      drawSlideVisual(ctx, img, V.w, V.h);
      ctx.restore();
    } else if (warmDone) {
      drawSlideVisual(ctx, img, V.w, V.h);
    }

    /* SCAN [S] telemetry overlay: instrument data layered over the imagery */
    if (SL.scanOn && s2.scan) {
      var sy0 = 8, sh = s2.scan.length * 26 + 16, sx = V.w - 172, sw = 164;
      ctx.fillStyle = 'rgba(4,14,20,0.82)';
      ctx.fillRect(sx, sy0, sw, sh);
      ctx.strokeStyle = 'rgba(126,240,200,0.4)'; ctx.lineWidth = 1;
      ctx.strokeRect(sx + 0.5, sy0 + 0.5, sw - 1, sh - 1);
      for (var si = 0; si < s2.scan.length; si++) {
        var row = s2.scan[si];
        TL.text(ctx, row.label, sx + 10, sy0 + 12 + si * 26, 6, '#59c8f0');
        var rl = TL.wrap(ctx, row.text, sw - 20, 6);
        for (var ri = 0; ri < rl.length && ri < 2; ri++) {
          TL.text(ctx, rl[ri], sx + 10, sy0 + 24 + si * 26 + ri * 9, 6, '#aef0dd');
        }
      }
    }
    /* hotspot markers (the only allowed overlay on the artwork) */
    if (s2.hs) {
      for (var hi = 0; hi < s2.hs.length; hi++) {
        var h2 = s2.hs[hi];
        var hx = h2.x * V.w + h2.w * V.w / 2, hy = h2.y * V.h + h2.h * V.h / 2;
        var pulse = 0.6 + 0.4 * Math.sin(SL.t * 4 + hi * 2);
        ctx.strokeStyle = SL.info === h2 ? '#7ef0c8' : 'rgba(126,240,200,' + (0.4 + pulse * 0.5) + ')';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(h2.x * V.w, h2.y * V.h, h2.w * V.w, h2.h * V.h);
        ctx.fillStyle = SL.info === h2 ? '#7ef0c8' : 'rgba(126,240,200,' + (0.55 + pulse * 0.35) + ')';
        ctx.beginPath();
        ctx.moveTo(hx, hy - 5 - pulse * 2); ctx.lineTo(hx + 5 + pulse * 2, hy);
        ctx.lineTo(hx, hy + 5 + pulse * 2); ctx.lineTo(hx - 5 - pulse * 2, hy);
        ctx.closePath(); ctx.fill();
      }
      ctx.lineWidth = 1;
    }
    /* retrieving gate: shown until preloading completes (brief) */
    if (!warmDone || (cross && !img && !SL.hasSnap)) {
      ctx.fillStyle = 'rgba(6,14,24,0.85)'; ctx.fillRect(0, 0, V.w, V.h);
      TL.text(ctx, 'RETRIEVING ARCHIVED MEMORY', V.w / 2, V.h / 2 - 10, 8, '#7ef0c8', 'center');
      var pct = SL.warm.total ? SL.warm.got / SL.warm.total : 0;
      ctx.fillStyle = 'rgba(6,14,24,0.8)'; ctx.fillRect(V.w / 2 - 110, V.h / 2 + 10, 220, 10);
      ctx.fillStyle = '#7ef0c8'; ctx.fillRect(V.w / 2 - 108, V.h / 2 + 12, 216 * pct, 6);
    } else if (cross) {
      /* subtle retrieval shimmer during the crossfade */
      var tp = SL.trans / 0.35;
      ctx.fillStyle = 'rgba(6,14,24,' + (tp * 0.25) + ')';
      ctx.fillRect(0, 0, V.w, V.h);
    }
    ctx.restore();

    /* SCAN [S] chip — floats under the stage; no lens (removed) */
    if (s2.scan) {
      var scanHot = inRect(TL.mouse, V.x, CHIP.y, 120, CHIP.h);
      TL.panel(ctx, V.x, CHIP.y, 120, CHIP.h, { bg: SL.scanOn ? 'rgba(20,60,56,0.95)' : 'rgba(8,22,28,0.92)', corner: scanHot || SL.scanOn ? '#7ef0c8' : '#3a7a6a' });
      TL.text(ctx, SL.scanOn ? 'SCAN ON [S]' : 'SCAN [S]', V.x + 60, CHIP.y + 10, 7, SL.scanOn ? '#aef0dd' : '#7ab8a8', 'center');
    }

    /* ============ RIGHT — INFORMATION & CONTROLS ============ */
    /* frame indicator */
    TL.text(ctx, 'FRAME ' + pad2(SL.slide + 1) + ' OF ' + pad2(n), RC.x, 82, 7, '#6a8a9a');
    /* bold section header */
    var tl2 = TL.wrap(ctx, s2.t, RC.w, 13);
    for (var t2 = 0; t2 < tl2.length; t2++) TL.text(ctx, tl2[t2], RC.x, 98 + t2 * 17, 13, ac);
    var ty = 98 + tl2.length * 17 + 8;
    ctx.fillStyle = 'rgba(216,178,90,0.3)'; ctx.fillRect(RC.x, ty, RC.w, 1);
    ty += 14;

    /* NARRATION LOG (or point inspection while a hotspot is open) */
    if (SL.info) {
      TL.text(ctx, 'POINT INSPECTION', RC.x, ty, 7, '#7ef0c8');
      TL.text(ctx, SL.info.label + ' — CLICK TO DISMISS', RC.x, ty + 14, 6, '#6ad8b0');
      var il = TL.wrap(ctx, SL.info.text, RC.w, 9);
      for (var i3 = 0; i3 < il.length; i3++) TL.text(ctx, il[i3], RC.x, ty + 30 + i3 * 15, 9, '#c8f0e0');
      ty += 30 + il.length * 15 + 8;
    } else {
      TL.text(ctx, 'NARRATION LOG', RC.x, ty, 7, '#59c8f0');
      var nl = TL.wrap(ctx, s2.n, RC.w, 9);
      for (i3 = 0; i3 < nl.length; i3++) TL.text(ctx, nl[i3], RC.x, ty + 16 + i3 * 15, 9, '#c8d8dc');
      ty += 16 + nl.length * 15 + 8;
      if (s2.hs) { TL.text(ctx, '\u25C8 CLICK MARKED POINTS TO INSPECT', RC.x, ty, 6, '#6ad8b0'); ty += 14; }
      /* recovered audio line */
      if (s2.d) {
        var dl2 = TL.wrap(ctx, s2.d, RC.w, 8);
        for (var d3 = 0; d3 < dl2.length; d3++) TL.text(ctx, dl2[d3], RC.x, ty + d3 * 13, 8, ac);
        ty += dl2.length * 13 + 6;
      }
    }
    /* closing thought (last slide) */
    if (last) {
      var cll = TL.wrap(ctx, '"' + a.closing + '"', RC.w, 8);
      for (var c2 = 0; c2 < cll.length; c2++) TL.text(ctx, cll[c2], RC.x, ty + c2 * 13, 8, ac);
    }

    /* inline persona tag row, anchored above the footer */
    var tags = a.persona.split('·');
    TL.text(ctx, 'PERSONALITY:', RC.x, 454, 6, '#6a8a9a');
    var txx = RC.x + 84;
    for (var g3 = 0; g3 < tags.length; g3++) {
      var tag = tags[g3].trim();
      if (!tag) continue;
      TL.text(ctx, tag, txx, 454, 6, '#9fd8c8');
      txx += tag.length * 6 + 12;
      if (g3 < tags.length - 1) { TL.text(ctx, '\u2022', txx - 9, 454, 6, 'rgba(159,216,200,0.5)'); }
    }

    /* anchored footer inside the right column, aligned with text margins */
    var prevOn = SL.slide > 0;
    TL.panel(ctx, RC.x, FTR.y, 108, FTR.h, { bg: 'rgba(10,20,26,0.92)', corner: prevOn ? ac : '#3a3230' });
    TL.text(ctx, '\u25C4 PREV', RC.x + 54, FTR.y + 10, 8, prevOn ? ac : '#5a4a44', 'center');
    /* progress dots */
    var dotR = 3, dotGap = 14, dotsW = n * dotGap, dx0 = RC.x + RC.w / 2 - dotsW / 2 + dotGap / 2;
    for (var di = 0; di < n; di++) {
      ctx.beginPath();
      ctx.arc(dx0 + di * dotGap, FTR.y + FTR.h / 2, di === SL.slide ? dotR + 1 : dotR, 0, Math.PI * 2);
      ctx.fillStyle = di === SL.slide ? ac : 'rgba(90,110,120,0.4)';
      ctx.fill();
    }
    var retLabel = last ? (SL.ret === 'archive' ? 'BACK TO ARCHIVE' : 'RETURN') : 'NEXT \u25BA';
    TL.panel(ctx, RC.x + RC.w - 108, FTR.y, 108, FTR.h, { bg: last ? 'rgba(20,44,34,0.92)' : 'rgba(10,20,26,0.92)', corner: ac });
    TL.text(ctx, retLabel, RC.x + RC.w - 54, FTR.y + 10, 8, ac, 'center');

    /* screen scanlines + gentle static */
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#04101a';
    for (var sy2 = 0; sy2 < TL.H; sy2 += 3) ctx.fillRect(0, sy2, TL.W, 1);
    ctx.restore();
    TL.staticOverlay(ctx, 0.04);
    TL.crt(ctx, SL.t);
    TL.BIG_TEXT = false;
  };

})(window.TL);
