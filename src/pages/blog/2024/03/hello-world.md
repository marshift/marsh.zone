---
title: "is this thing on?"
description: "*dial-up handshake noises*"
pubDate: 2024-03-14T23:10:29.474Z
tags: ["testing"]
layout: "@/layouts/PostLayout.astro"
---

# a whole new world
hi! if you're reading this, allow me to welcome you to my blog! at the time of writing, there isn't much to see - but in future, i'm definitely going to be depositing my thoughts here.
for now, though, here's a little styling test:

<hr />

# Heading 1
## Heading 2
### Heading 3
#### Heading 4

*italic* **bold** ***bold italic*** ~~strikethrough~~ [hyperlink](/)
* a list
* of items!
    - wow!

<label for="input">an input box</label>
<input type="text" name="input" placeholder="with a placeholder!">

<label for="select">a select menu</label>
<select name="select">
    <option value="stable">apple</option>
    <option value="beta">orange</option>
    <option value="alpha">banana</option>
</select>

<button>a nice button!</button>

```ts
// some wonderful code
const exampleVariable = "Hi! Lea! Hi!";

class Evotar {
    public name: string;
    public introText: string;

    constructor(name: string, intro: string) {
        this.name = name;
        this.introText = intro;
        this.speak(this.introText);
    }

    // stub
    speak: (text: string) => {};
}

new Evotar("Lea", exampleVariable);
```
