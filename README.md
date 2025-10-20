# hledger-rules-vscode

Language support for
[hledger CSV-parsing rules.](https://hledger.org/1.50/hledger.html#csv)

## Features
### Syntax highlighting:
![syntax highlighting for hledger rules](resources/syntax-highlighting.png)

### Completions:
![completion suggestions for custom fields](resources/custom-field-completion.png)
![completion suggestions for directives](resources/directive-completion.png)
![completion suggestions for date-format](resources/date-format-completions.png)
## Planned Features
- [x] Syntax highlighting
  - [ ] POSIX-extended regular expression highlighting
- [x] Completions
- [ ] Snippets
- [ ] Linting
- [ ] Formatting

## Testing

Snapshot testing is used to test syntax highlighting via
[vscode-tmgrammar-test](https://github.com/PanAeon/vscode-tmgrammar-test).
