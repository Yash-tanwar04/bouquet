# 🌹 For My Tannu ♡ Happy Birthday Website

A cinematic, romantic, highly interactive birthday website created especially for **Tanisha (Tannu)** for her birthday on **29 September**.

Designed with **Mobile-First Priority (390px)**, featuring a photorealistic 3D bouquet, interactive blooming flowers, handwritten parchment notes, wax-sealed envelopes, constellation story, vintage turntable music player, polaroid memory box, and secret easter eggs.

---

## ✨ Features

1. **Opening Loading Screen**: Dark candlelit aura, beating heart, and gentle floral bloom.
2. **Interactive 3D Flower Bouquet**:
   - 12 touchable flowers with generous tap targets and pulsing glow rings.
   - Dynamic 3D perspective tilt on phone/mouse movement.
   - Phone shake detection (`DeviceMotionEvent`) and **Breeze** button for realistic windy swaying and fluttering petals.
   - Hanging kraft paper tag with secret easter egg (`29 Sept ♡`).
3. **Flower Unfolding Notes**: Close-up bloom, deckled-edge aged parchment notes, botanical sketches, next/previous navigation, and progress tracker (`X / 12 discovered`).
4. **A Garden of Reasons ♡**: 4x3 visual grid of all 12 flowers with discovery status indicators.
5. **29 Little Things About You ♡**: 29 scattered handwritten cards on a candlelit oak desk, celebrating 29/09, ending with `#29 Simply you ♡`.
6. **Our Story (Constellation Timeline)**: Starry night sky with celestial curved constellation (arched on desktop, vertical starlight trail on mobile) with the special `20 Sept ♡` confession star.
7. **Messages I Never Said Properly**: 6 wax-sealed craft envelopes that break open to comfort her on different days (`Open when you're sad`, `Open when you miss me`, etc.).
8. **Our Little Memories (Memory Box)**: Vintage wooden box with layered Polaroids that can be tapped and flipped to read handwritten notes on the back.
9. **Our Little Soundtrack (Vintage Turntable)**: Spinning vinyl record with heart label, tonearm, animated waveform, and a built-in generative romantic piano melody (via Web Audio API) with volume control.
10. **Different Places, Same Sky (Distance Section)**: Connecting both cities across a celestial arc with a pulsing starlight heart.
11. **The Vintage Mirror**: Tap to reveal floating affirmations and the emotional quote: *"You sometimes see yourself through the things you don't like. I wish you could borrow my eyes for a day. ♡"*
12. **Secret Heart Easter Egg**: Hidden surprise triggered by 29 taps or bouquet tag clicks.
13. **Final Cinematic Page**: Warm candlelight closing note and `♡ Come back to me` button.

---

## 🛠️ How to Customize Personal Details

All personal messages, names, memories, dates, and cities can be edited in one single file:

📁 **`src/data/tannuData.ts`**

- **Names**: `Tanisha`, `Tannu`, `Yash`
- **Cities**: Set your city and her city in `distance`
- **Dates**: `29 September`, `20 Sept`
- **Flowers & Messages**: Customize any of the 12 flower notes
- **29 Little Things**: Edit any of the 29 handwritten cards
- **Envelopes**: Update the 6 letters
- **Photos**: Swap out images in `public/assets/images/memories/` or update image URLs in `tannuData.ts`

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npx vite preview --port 4173 --host
```

---

## 🌐 Deploying Online (Free & Instant)

You can deploy this site in under 2 minutes so Tannu can open it on her phone:

1. **Vercel**: Import the project repository or run `npx vercel` in this folder.
2. **Netlify**: Drag and drop the `dist/` folder into Netlify Drop, or connect Git.
3. **GitHub Pages**: Run `npm run build` and deploy the `dist/` directory.
