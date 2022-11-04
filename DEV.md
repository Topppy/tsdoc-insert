## Develop

doc:

- https://code.visualstudio.com/api/get-started/your-first-extension
- https://juejin.cn/post/7032977183790333960

env: nodev16.8.0

```
npm install -g yo generator-code
```

### hello world 命令如何生效的

doc: https://code.visualstudio.com/api/get-started/extension-anatomy

1. 在 package.json 中声明

```
"activationEvents": [
    "onCommand:tsdoc-insert.helloWorld"
  ],
```

用户在执行 hello world 命令的时候 插件变成激活的

2. 在 package.json 中声明

```
"contributes": {
    "commands": [
      {
        "command": "tsdoc-insert.helloWorld",
        "title": "Hello World"
      }
    ]
  },
```

使得 ctrl+shift+P 调出命令行的时候，命令面板中出现 hello world

3. 在源码的 extention.ts 中使用 vscode API 绑定命令要执行的函数

```
vscode.commands.registerCommand('tsdoc-insert.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello vscode from tsdoc-insert!');
	});
```

## Test

doc:

- https://code.visualstudio.com/api/working-with-extensions/testing-extension
- https://mochajs.org/#tdd

run 'yarn test'

## Publish

doc:
- https://code.visualstudio.com/api/working-with-extensions/publishing-extension

```
npm install -g vsce
```


## 参考

#### vscode 插件：[tsdoc-comment](https://github.com/kingsimba/vscode-tsdoc-comment)

自动将//注释转化为/\*\* \*/注释

##### registerTextEditorCommand

这个命令与 registerCommand 的差异在于

- 只在编辑器激活的时候执行命令
- callback 有 ative editor 和 edit-builder 的访问权限

#### 正则表达式匹配代码块的注释

[正则表达式匹配代码块的注释](https://segmentfault.com/a/1190000039199185)
