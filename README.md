# CvSU Mini Store — Laboratory Exercise 4

**React `useState` and `useEffect` (Live Search and Filter)**

This project continues Laboratory Exercise 3. The product catalog now has a live search
box, a category filter, a price sort option, and a Clear Filters button.

## How to run

```bash
npm install
npm run dev
```

## Branch

Work for this exercise is in the `lab4-live-search` branch.

## Files added or changed for Lab 4

| File | Status | Description |
|------|--------|-------------|
| `src/components/SearchBar.jsx` | **Added** | Controlled search input, category dropdown, sort dropdown, and Clear Filters button |
| `src/App.jsx` | Modified | Added the Lab 4 states, the debounce effect, the tab title effect, the filtering/sorting logic, the result count, and the empty state |
| `src/App.css` | Modified | Basic styles for the search bar, result count, and empty state |
| `README.md` | **Added** | This file (Guide Question answers) |

Everything else from Lab 3 was kept as is: `ProductCard.jsx`, `ProductCard.css`,
`products.js`, `main.jsx`, `index.html`, and the Add to Cart behavior.

---

## Guide Questions

### 1. Why do we use two separate states, `searchText` and `debouncedSearch`, instead of only one?

`searchText` is what the user is typing right now. It changes on every keystroke so the
text box always shows the exact letters the user typed.

`debouncedSearch` is the value that is actually used for filtering. It only updates
300 milliseconds after the user stops typing.

If we used only one state, the product list would be filtered on every single keystroke.
That means the list would flicker and we would run the filter many times per second for
no reason. Having two states lets the text box stay instantly responsive while the
filtering waits for the user to pause.

### 2. What would happen if the debounce effect did not return a cleanup function?

Without `return () => clearTimeout(timer)`, the old timers would never be cancelled.

Every keystroke would start a new 300 ms timer and all of them would still be running.
So if the user typed 5 letters quickly, 5 timers would fire one after the other, and
`setDebouncedSearch` would be called 5 times instead of once. That defeats the whole
purpose of debouncing — the list would still update almost on every keystroke.

The timers would also keep running after the component is removed, which is a memory
leak. The cleanup function prevents both problems by cancelling the previous timer
before starting a new one.

### 3. What is the purpose of the dependency array? What happens if it is empty (`[]`)? What happens if it is left out completely?

The dependency array tells React **when** the effect should run again. React compares
the values inside it after every render, and the effect re-runs only when at least one
of those values has changed.

- **Empty array `[]`** — the effect runs only once, right after the first render, and
  never again. With an empty array, our debounce effect would capture the first
  `searchText` (which is `""`) and never react to typing, so the search would stop
  working.
- **No dependency array at all** — the effect runs after **every** render. The debounce
  timer would restart again and again, and in a case where the effect itself changes
  state, it can cause an endless loop of renders.

In our code we use `[searchText]` for the debounce so it restarts only when the typed
text changes, and `[displayedProducts.length]` for the title so the tab title updates
only when the number of results changes.

### 4. Why should we avoid sorting the original `products` array directly?

Because `products` is the only copy of our real data. `sort()` changes the array it is
called on, so sorting it directly would permanently reorder the original list.

After that, the "Default" sort option could no longer show the products in their
original order, because the original order would already be gone. Any other part of the
app that uses `products` would also get the sorted version unexpectedly.

That is why we write `const displayedProducts = [...filteredProducts];` first. The
spread operator makes a new array, and we sort that copy instead. The original
`products` array is never touched.

### 5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.

It is better to **calculate it during rendering**, not store it in its own state.

The filtered list is not new information — it is just the result of `searchText`,
`category`, and `sortOrder` applied to `products`. Since React already re-renders
whenever those three states change, the list can simply be recalculated in the same
render and it will always be correct and up to date.

If we stored it in a separate state, we would have to remember to manually update it
every time the search text, category, or sort order changed. If we forgot even one of
them, the list would show the wrong products. Storing it in state would also mean two
sources of truth for the same data, which is a common source of bugs.

This is why we write `const filteredProducts = products.filter(...)` directly in the
component body instead of using `useState`.

---

## Note on the "Books" category

The dropdown includes the **Books** option exactly as the activity requires. However,
the sample product data from Laboratory Exercise 3 has no product with the category
`Books`. Because the instructions say not to modify the original sample product data,
selecting **Books** correctly shows the empty-state message:

> No products found. Try a different keyword or category.

This is the expected behavior of the filter code. Adding a book product to
`products.js` would make that option show results.
