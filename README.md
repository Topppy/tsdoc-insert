# tsdoc-insert README

A VSCode extension for insert TSDoc style comments into selections.

## Features

Convert:

```typescript
interface test {
  b: {
    a: number;
  };
  c: [string, { d: [boolean] }];
}
```

Into:

```typescript
/**  */
interface test {
  /**  */
  b: {
    /**  */
    a: number;
  };
  /**  */
  c: [
    /**  */
    string,
    /**  */
    {
      d: [
        /**  */
        boolean
      ];
    }
  ];
}
```

![](https://raw.githubusercontent.com/Topppy/tsdoc-insert/main/ani.gif)

## How to Use

- select a block of code (eg. typescript declarations).
- Press `Shift`+`Command`+`P` (Mac) / `Ctrl`+`Shift`+`P` (Windows/Linux). open command palette.
- Select `TSDoc Insert: insert empty TSDoc style comments into selected text`

## Code Repository

https://github.com/Topppy/tsdoc-insert

## License

MIT.

## Release Notes

### 1.0.0

- First release

---
