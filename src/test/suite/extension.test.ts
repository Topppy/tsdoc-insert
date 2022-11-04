import * as assert from "assert";
import { CommentInserter } from "../../comment-inserter";

suite("Test CommentInserter", () => {
  const converter = new CommentInserter();

  test("can't convert empty line", () => {
    const lines = converter.convertComment(["    ", "    birthYear: number"]);
    assert.equal(
      lines.join("\n"),
      ["    ", "    /**  */", "    birthYear: number"].join("\n")
    );
  });

  test("can't convert after single line comment", () => {
    const lines = converter.convertComment([
      "    // name ",
      "    birthYear: number",
    ]);
    assert.equal(
      lines.join("\n"),
      ["    // name ", "    birthYear: number"].join("\n")
    );
  });

  test("can't convert after single line Multi-line comments", () => {
    const testCode = ["    /** name */", "    birthYear: number"];
    const lines = converter.convertComment(testCode);
    assert.equal(lines.join("\n"), testCode.join("\n"));
  });

  test("can't convert after Multi-line comments", () => {
    const testCode = [
      "    /** ",
      "     * name",
      "     */",
      "    birthYear: number",
    ];
    const lines = converter.convertComment(testCode);
    assert.equal(lines.join("\n"), testCode.join("\n"));
  });

  test("can't convert after Multi-line comments adn empty line", () => {
    const testCode = [
      "    /** ",
      "     * name",
      "     */",
      "    ",
      "    birthYear: number",
    ];
    const lines = converter.convertComment(testCode);
    assert.equal(lines.join("\n"), testCode.join("\n"));
  });

  test(`can't convert end line start with ${")"} ${"}"} ${"]"}`, () => {
    const testCode = [
      "  interface test {",
      "    b: {",
      "      a: number",
      "    }",
      "    c: [",
      "      string,",
      "      {d: [",
      "        boolean",
      "      ]}",
      "    ]",
      "  }",
    ];
    const resultCode = [
      "  /**  */",
      "  interface test {",
      "    /**  */",
      "    b: {",
      "      /**  */",
      "      a: number",
      "    }",
      "    /**  */",
      "    c: [",
      "      /**  */",
      "      string,",
      "      /**  */",
      "      {d: [",
      "        /**  */",
      "        boolean",
      "      ]}",
      "    ]",
      "  }",
    ];
    const lines = converter.convertComment(testCode);
    assert.equal(lines.join("\n"), resultCode.join("\n"));
  });
});
