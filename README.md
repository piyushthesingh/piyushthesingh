# piyushthesingh.com

Static site. Deploys to Cloudflare Pages.
Deploys automatically from the main branch.

## Files

| File | What it is |
|---|---|
| `index.html` | Home |
| `compass.html` | The Compass case study |
| `style.css` | All styles |
| `script.js` | Nav, mobile menu, scroll reveal |
| `photo.png` | Hero cutout, 825x1100, fallback |
| `photo.webp` | Hero cutout, 68 KB, what browsers actually load |
| `og-image.png` | 1200x630 social card |
| `favicon.ico` | Multi size icon |
| `apple-touch-icon.png` | 180x180 iOS icon |
| `Piyush-Singh-Resume.pdf` | Linked from header, hero and footer |

## If you replace the photo

Export the cutout as PNG with transparency, then:

```
python3 -c "from PIL import Image; im=Image.open('photo.png'); im.save('photo.webp','WEBP',quality=82,method=6)"
```

Update `width` and `height` on the `<img>` in `index.html` to the new pixel size, otherwise the page shifts while loading.

## If you replace the resume

Keep the filename `Piyush-Singh-Resume.pdf` or update the three links in `index.html` and the two in `compass.html`.

## Local check

```
cd ~/piyushthesingh.com && python3 -m http.server 8080
```

Then open http://localhost:8080

## Still open

The Compass page describes the pricing, unit economics, funnel and RICE sections qualitatively. The numbers from the source document are not in it yet.
