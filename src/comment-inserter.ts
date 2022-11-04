export class CommentInserter {
  private lines: string[] = [];
  private lineIndex: number = 0;
  private newLines: string[] = [];
  private isPrevComment: boolean = false;

  /**
   *
   * @param lines string[]
   * @returns string[]
   */
  public convertComment(lines: string[]) {
    this.lines = lines;
    this.lineIndex = 0;
    this.newLines = [];
    this.isPrevComment = false;
    const len = this.lines.length;

    for (; this.lineIndex < len; this.lineIndex++) {
      const line = lines[this.lineIndex];
      console.log("===this.isPrevComment", this.isPrevComment);
      // 插入注释
      if (this.needInsertComment(line)) {
        this.newLines.push(this.getComment(line));
      }
      this.updatePrevComment(line);
      this.newLines.push(line);
    }
    return this.newLines;
  }

  private needInsertComment(line: string): boolean {
    // 空行不处理,右括号结束不处理, 注释不处理, 上一行有ts注释的不处理
    if (
      this.isEmptyLine(line) ||
      this.isEnd(line) ||
      this.isComment(line) ||
      this.isPrevComment
    ) {
      return false;
    }
    return true;
  }

  private updatePrevComment(line: string) {
    // 空行继承上一次的值
    this.isPrevComment =
      this.isComment(line) ||
      (this.isEmptyLine(line) ? this.isPrevComment : false);
  }

  private isEmptyLine(line: string) {
    const reg = /^\s*$/g;
    const t = reg.test(line);
    return t;
  }

  private isEnd(line: string) {
    const reg = /^\s*[\)\}\]]*\s*$/g;
    const t = reg.test(line);
    return t;
  }

  private isComment(line: string) {
    const commentRegexp = /^(\s)*\/\/|\/\*|\*/g;
    const t = commentRegexp.test(line);
    return t;
  }

  private getIndent(line: string) {
    let indent = "";
    const m = line.match(/(\s*)/);
    if (m !== null) {
      indent = m[1];
    }
    return indent;
  }

  private getComment(line: string) {
    const indent = this.getIndent(line);
    return `${indent}/**  */`;
  }
}
