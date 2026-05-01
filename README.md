# Hiruwiki

Hiruwiki is a system for displaying graphical proofs in geometry and mathematics, developed by the Basque Wikimedia Chapter (**Euskal Wikilarien Kultura Elkartea**). The name is a play on the word *hiruki* (triangle), as many geometric proofs are performed using triangles.

This project has been ported by **ItsNyoty** to a global MediaWiki gadget during the **Wikimania Hackathon 2026**, introducing a decentralized localization architecture and comprehensive multi-language support.

## Supported Languages
Currently, the system supports:
- English (`en`)
- Basque (`eu`)
- Spanish (`es`)
- French (`fr`)
- Dutch (`nl`)

## Project Structure
- **`i18n.yaml`**: The master registry for all translations.
- **`build_i18n.py`**: Automated script to inject translations from the YAML file into the individual module JS files.
- **`modules/`**: Directory containing 25+ interactive geometric proof widgets.
- **`Gadget-hiruwiki-core.js`**: The main MediaWiki gadget loader.

## How to Contribute Translations
1. Edit the strings in [i18n.yaml](i18n.yaml).
2. Run the build script:
   ```bash
   python build_i18n.py
   ```
   This will update the `/* I18N_START */` blocks in the corresponding `.js` files in the `modules/` folder.

## Credits
- **Original Development**: Euskal Wikilarien Kultura Elkartea.
- **Global Port & Localization Engine**: [ItsNyoty](https://github.com/ItsNyoty) (Wikimania Hackathon 2026).

---
*Based on the original Basque description:*
"Hiruwiki geometria eta matematikako froga grafikoak erakusteko sistema bat da, Euskal Wikilarien Kultura Elkarteak garatua. Izenak hiruki hitzarekin joko bat egiten du, geometriako froga asko hirukien bidez egiten baitira."
