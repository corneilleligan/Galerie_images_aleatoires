// Récupération des éléments du DOM
const gallery   = document.getElementById('gallery');
const regenBtn  = document.getElementById('regenBtn');
const countSel  = document.getElementById('countSelect');
const counter   = document.getElementById('counter');
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbClose   = document.getElementById('lbClose');

// Fonction utilitaire pour générer un nombre aléatoire entre min et max
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction principale : génère la galerie d’images
function buildGallery() {
  const n = parseInt(countSel.value); // nombre d’images sélectionné
  gallery.innerHTML = '';             // vide la galerie
  counter.textContent = '';           // reset du compteur

  // Animation du bouton (rotation)
  regenBtn.classList.add('spinning');
  setTimeout(() => regenBtn.classList.remove('spinning'), 500);

  let loaded = 0; // compteur d’images chargées

  for (let i = 0; i < n; i++) {

    // Création de la carte image
    const card = document.createElement('div');
    card.className = 'card';

    // Création de l’image
    const img = document.createElement('img');

    // Dimensions aléatoires pour varier les images
    const w = rand(400, 800), h = rand(400, 800);

    // Source de l’image via API Picsum
    img.src = `https://picsum.photos/${w}/${h}?random=${rand(1, 9999)}`;
    img.alt = `Image aléatoire ${i + 1}`;

    // Quand l’image est chargée
    img.addEventListener('load', () => {
      img.classList.add('loaded'); // effet fade-in
      card.classList.add('done');  // enlève le skeleton
      loaded++;
      counter.textContent = `${loaded} / ${n} images chargées`;

      // Si tout est chargé
      if (loaded === n) {
        counter.textContent = `${n} images chargées`;
      }
    });

    // Si erreur de chargement
    img.addEventListener('error', () => {
      card.classList.add('done');
      card.style.background = '#e5e7eb';
    });

    // Ouvre la lightbox au clic
    card.addEventListener('click', () => openLightbox(img.src));

    // Ajout dans le DOM
    card.appendChild(img);
    gallery.appendChild(card);
  }
}

// Ouvre la lightbox avec l’image
function openLightbox(src) {
  lbImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden'; // bloque le scroll
}

// Ferme la lightbox
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';

  // Nettoie l’image après animation
  setTimeout(() => { lbImg.src = ''; }, 300);
}

// Fermeture via bouton
lbClose.addEventListener('click', closeLightbox);

// Fermeture en cliquant en dehors de l’image
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Fermeture avec la touche Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Regénérer la galerie au clic
regenBtn.addEventListener('click', buildGallery);

// Regénérer quand on change le nombre d’images
countSel.addEventListener('change', buildGallery);

// Génération initiale au chargement
buildGallery();