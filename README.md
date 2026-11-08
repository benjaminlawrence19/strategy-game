# Kingdom Wars

A browser-based strategy game built with JavaScript and the p5.js library. The player names and colours a kingdom, chooses a difficulty, develops its economy and military, and attempts to conquer four rival kingdoms.

## How to play

1. Open `kingdom_wars.html` in a modern browser while connected to the internet.
2. Enter a kingdom name (3–15 characters) and choose a colour.
3. Select Easy, Medium or Hard difficulty.
4. Buy economic buildings to increase gold income and military buildings to increase power.
5. Build enough power to conquer the next rival kingdom, then continue until all four have been conquered.

The game starts with four computer-controlled kingdoms and the player's kingdom. Rivals are presented in a fixed conquest order. The conquer action becomes available when the player's power is at least 10% higher than the current target's power. Conquering all four rivals wins the game; the player's kingdom losing all its power results in defeat.

## Difficulty

The starting resources depend on the selected difficulty:

| Difficulty | Starting gold | Starting power |
|---|---:|---:|
| Easy | 500 | 30 |
| Medium | 350 | 25 |
| Hard | 250 | 20 |

## Buildings and resources

The game has six purchasable buildings. Military buildings increase power, while economic buildings increase gold income.

| Building | Cost | Power increase | Gold-income increase |
|---|---:|---:|---:|
| Barracks | 100 | 3 | 0 |
| Small Camp | 250 | 10 | 0 |
| Castle | 500 | 25 | 0 |
| Farmlands | 100 | 0 | 1 |
| Water Mills | 250 | 0 | 3 |
| Mine | 500 | 0 | 10 |

Gold is used to purchase buildings and respond to some events. The game also includes periodic events and harvest outcomes that can alter gold or power. If the player remains in debt, power is gradually reduced. A pause control, in-game tips, a game timer, victory/defeat screens and difficulty-specific score lists are also implemented.

## Project structure

```text
.
├── kingdom_wars.html
├── style.css
├── js_files/
│   ├── main.js
│   ├── buildings.js
│   └── kingdoms.js
├── images/
│   ├── backgrounds/
│   ├── buildings/
│   └── events/
└── sound/
```

- `kingdom_wars.html` loads p5.js, p5.sound and the local JavaScript files.
- `js_files/main.js` contains the game setup, interface, rendering loop, resource management, events, conquest sequence and end screens.
- `js_files/buildings.js` defines the `Building` class and its attributes.
- `js_files/kingdoms.js` defines the `Kingdom` class and its setter methods.
- `images/` contains the map, screen, building and event artwork.
- `sound/` contains music and sound effects.

## Technologies

- JavaScript (game logic and object-oriented classes)
- HTML and CSS (page structure and canvas presentation)
- [p5.js](https://p5js.org/) (canvas rendering, drawing and interface controls)
- p5.sound (audio playback)

## Running locally

The HTML imports p5.js and p5.sound from the Cloudflare-hosted cdnjs CDN, so an internet connection is required when loading the page. Keep the `images/`, `sound/` and `js_files/` folders alongside `kingdom_wars.html`; the game loads these assets using relative paths.

For a local web-server workflow, run a server from this directory, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/kingdom_wars.html`. Serving the files over HTTP is preferable to opening the HTML directly, particularly where browser audio or local-file restrictions apply.

## Design and implementation

The game uses `Kingdom` and `Building` objects to organise game state. Arrays track the kingdoms, buildings, interface buttons and difficulty-specific scores. The p5.js `preload()`, `setup()` and `draw()` lifecycle functions load assets, initialise the canvas and update the game display. Separate functions manage the start screen, difficulty selection, kingdom and building displays, random events, harvests, sword-clash conquest animation, pause state, tips and end screens.

The interface combines a map-style view with a building panel. Players make strategic trade-offs between investing in income and increasing military power, while random events and harvest outcomes introduce uncertainty.

## Notes

The supplied project includes the game source and its image/audio assets, but no automated test suite or package-manager configuration. Score arrays are held in memory by the running page; the supplied code does not provide persistent online leaderboards or a server-side save system.
