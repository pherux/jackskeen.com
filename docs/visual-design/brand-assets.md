# Jack Skeen Brand Assets

The current brand lockup and mark follow the approved editorial direction: quiet,
precise, modern, and restrained. They use the site palette rather than introducing a
separate logo color system.

## Assets

- `public/brand/jack-skeen-wordmark-light.png` — ivory wordmark for dark surfaces.
- `public/brand/jack-skeen-wordmark-dark.png` — dark wordmark for light surfaces.
- `public/brand/jack-skeen-mark-light.png` — transparent icon for dark surfaces.
- `public/brand/jack-skeen-mark-dark.png` — transparent icon for light surfaces.
- `public/brand/jack-skeen-mark-light.svg` — vector compass icon for dark surfaces.
- `public/brand/jack-skeen-mark-dark.svg` — vector compass icon for light surfaces.
- `src/app/icon.png` — square application icon with the dark brand background.

The compact mark is a restrained compass: an open arc, four quiet cardinal ticks,
and a north-pointing coral needle. It expresses orientation and finding the right
next direction while retaining the Circle Blueprint geometry. Keep generous clear
space around the mark and do not add shadows, gradients, labels, or extra ornament.

The production files can be regenerated with:

```powershell
python scripts/branding/create-brand-assets.py
```

The generator requires Pillow and uses the local Windows Arial font for the exact,
deterministic wordmark lettering.
