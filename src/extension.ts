import * as vscode from 'vscode';
import { HledgerRulesCompletionProvider } from './completionProvider';

export function activate(context: vscode.ExtensionContext) {
	// Register completion provider for hledger-rules files
	const completionProvider = vscode.languages.registerCompletionItemProvider(
		'hledger-rules',
		new HledgerRulesCompletionProvider(),
		'%',  // Trigger completion when % is typed (for field references)
		' ',  // Trigger completion when space is typed (after directives)
		',',  // Trigger completion when comma is typed (in fields directive)
	);

	context.subscriptions.push(completionProvider);
}

export function deactivate() { }
