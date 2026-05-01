export type Song = { id: string; title: string; videoPath: string };

export const SONGS: Song[] = [
  { id: "en-cualquier-lugar",  title: "En Cualquier Lugar",  videoPath: "/videos/en-cualquier-lugar.mp4" },
  { id: "tras-la-tormenta",    title: "Tras la Tormenta",    videoPath: "/videos/tras-la-tormenta.mp4" },
  { id: "nocturna",            title: "Nocturna",             videoPath: "/videos/nocturna.mp4" },
  { id: "crisantemos",         title: "Crisantemos",          videoPath: "/videos/crisantemos.mp4" },
  { id: "pais-en-llamas",      title: "País en Llamas",       videoPath: "/videos/pais-en-llamas.mp4" },
  { id: "oscuro-affaire",      title: "Oscuro Affaire",       videoPath: "/videos/oscuro-affaire.mp4" },
  { id: "estrella-bipolar",    title: "Estrella Bipolar",     videoPath: "/videos/estrella-bipolar.mp4" },
  { id: "demonio-azul",        title: "Demonio Azul",         videoPath: "/videos/demonio-azul.mp4" },
  { id: "la-isla",             title: "La Isla",              videoPath: "/videos/la-isla.mp4" },
  { id: "ventolin",            title: "Ventolin",             videoPath: "/videos/ventolin.mp4" },
  { id: "salvador",            title: "Salvador",             videoPath: "/videos/salvador.mp4" },
  { id: "merecido",            title: "Merecido",             videoPath: "/videos/merecido.mp4" },
  { id: "aguas-rojas",         title: "Aguas Rojas",          videoPath: "/videos/aguas-rojas.mp4" },
  { id: "dd",                  title: "DD",                   videoPath: "/videos/dd.mp4" },
];

export const INITIAL_SONG_INDEX = 0;
