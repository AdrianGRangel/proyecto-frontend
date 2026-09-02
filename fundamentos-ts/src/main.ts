import type { Gif } from './models/gif.interface.ts'
import './styles/style.css'

const MEDIA_URL = 'https://media.giphy.com/media';
const gifs: Gif[] = [
  {
    id:'cat-01',
    title: 'Gato programando',
    url: `${MEDIA_URL}/JIX9t2j0ZTN9S/giphy.gif`,
username: 'gifinder',
tags: ['gato', 'programación', 'computadora'],
rating: 'g',
},
{
id: 'celebration-01',
title: 'Celebración del equipo',
url: `${MEDIA_URL}/g9582DNuQppxC/giphy.gif`,
tags: ['equipo', 'éxito', 'celebración'],
rating: 'g',
},
{
id: 'coding-01',
title: 'Código en progreso',
url: `${MEDIA_URL}/13HgwGsXF0aiGY/giphy.gif`,
username: 'developer',
tags: ['código', 'desarrollo', 'teclado'],
rating: 'pg',
},
{
id: 'idea-01',
title: 'Nueva idea',
url: `${MEDIA_URL}/l0HlRnAWXxn0MhKLK/giphy.gif`,
tags: ['idea', 'creatividad', 'solución'],
rating: 'g',
},
];
gifs.forEach((gif) => {
console.log(`Gif ${gif.title}:`);
});

/*document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://www.typescriptlang.org" target="_blank">
          <img class="button-icon" src="${typescriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
` */

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
throw new Error('No se encontró el elemento #app.');
}
app.innerHTML = `
<main class="app-shell">
<header class="hero">
<p class="eyebrow">EC1 - Fundamentos de TypeScript</p>
<h1>GIFinder</h1>
<p>Explora una colección local de GIFs.</p>
</header>
<form id="search-form" class="search-form">
<label for="search-input">
Buscar por título, autor o etiqueta
</label>
<div class="search-row">
<input id="search-input" name="query"
type="search" placeholder="Ejemplo: gato"
autocomplete="off" />
<button type="submit">Buscar</button>
</div>
</form>
<p id="search-status" class="status"
aria-live="polite"></p>
<section id="gif-gallery" class="gallery"
aria-label="Resultados"></section>
</main>
`;

const form =
document.querySelector<HTMLFormElement>('#search-form');
const input =
document.querySelector<HTMLInputElement>('#search-input');
const gallery =
document.querySelector<HTMLElement>('#gif-gallery');
const status =
document.querySelector<HTMLParagraphElement>(
'#search-status',
);
if (!form || !input || !gallery || !status) {
throw new Error(
'No se pudo inicializar la interfaz de búsqueda.',
);
}

function normalizeText(value: string): string {
return value.trim().toLocaleLowerCase('es-MX');
}

function matchesQuery(gif: Gif, query: string): boolean {
const searchableText = [
gif.title,
gif.username ?? '',
...gif.tags,
].join(' ');
return normalizeText(searchableText).includes(query);
}

function searchGifs(collection: Gif[], value: string): Gif[] {
const query = normalizeText(value);
if (!query) {
return [...collection];
}
return collection.filter((gif) =>
matchesQuery(gif, query),
);
}

function createGifCard(gif: Gif): string {
const {
title,
url,
username = 'Autor no disponible',
tags,
rating,
} = gif;
return `
<article class="gif-card">
<img src="${url}" alt="${title}"
loading="lazy" />
<div class="gif-card__content">
<h2>${title}</h2>
<p>${username} - Clasificación
${rating.toUpperCase()}</p>
<p class="tags">
${tags.map((tag) => `#${tag}`).join(' ')}
</p>
</div>
</article>
`;
}

function renderGifs(collection: Gif[]): void {
  if(!gallery || !status) return;
const total = collection.length;
const label = total === 1 ? 'resultado' : 'resultados';
status.textContent = `${total} ${label}`;
if (total === 0) {
gallery.innerHTML = `
<p class="empty-state">
No se encontraron GIFs.
Prueba con otra palabra.
</p>
`;
return;
}
gallery.innerHTML = collection
.map(createGifCard)
.join('');
}

form.addEventListener('submit', (event: SubmitEvent) => {
event.preventDefault();
const results = searchGifs(gifs, input.value);
renderGifs(results);
});
input.addEventListener('input', () => {
if (input.value.trim() === '') {
renderGifs(gifs);
}
});

const firstSafeGif = gifs.find((gif) => gif.rating === 'g');
console.log(
`Primer GIF clasificación G: ${
firstSafeGif?.title ?? 'Ninguno'
}`,
);
renderGifs(gifs);
