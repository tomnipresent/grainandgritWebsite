RESULTS IMAGES — drop-in convention
===================================
Same idea as the hero: drop a correctly-named .jpg in and it appears.
Missing files show an on-brand placeholder, so nothing breaks.
Edit copy / metadata in  src/_data/results.json  (not the template).
Toggle either block on/off with showCompare / showGallery in that file.

COMPARE block  → src/assets/img/results/compare/<id>.jpg   (16:9)
  Same scene, graded with each stock. Filenames match "id" in results.json:
    vision3-500t.jpg   tri-x-400.jpg   portra-400.jpg
    velvia-50.jpg      cinestill-800t.jpg

GALLERY block  → src/assets/img/results/gallery/<file>.jpg  (16:9)
  One frame each. Filenames match "file" in results.json:
    vision3-500t-ext.jpg   portra-400-golden.jpg   tri-x-400-street.jpg
    velvia-50-land.jpg      cinestill-neon.jpg      hp5-portrait.jpg
