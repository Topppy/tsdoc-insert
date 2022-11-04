// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { CommentInserter } from "./comment-inserter";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "tsdoc-insert" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerTextEditorCommand(
    "tsdoc-insert.helloWorld",
    (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // vscode.window.showInformationMessage("Hello vscode from tsdoc-insert!");
      // The code you place here will be executed every time your command is executed
      const document = textEditor.document;
      const selection = textEditor.selection;
      const startLine = selection.start.line;
      const endLine = selection.end.line;

      // get selected lines
      const lines = [];
      for (let i = startLine; i <= endLine; i++) {
        lines.push(document.lineAt(i).text);
      }

      // convert
      const inserter = new CommentInserter();
      const newLines = inserter.convertComment(lines);

      // replace
      const replaceRange = new vscode.Range(
        startLine,
        0,
        endLine,
        lines[lines.length - 1].length
      );
      textEditor.edit((editBuilder: vscode.TextEditorEdit) => {
        editBuilder.replace(replaceRange, newLines.join("\n"));
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
