import * as vscode from 'vscode';

// Directive keywords
const DIRECTIVES: vscode.CompletionItem[] = [
	{ label: 'skip', detail: 'Skip N header lines or skip record if in if block', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'fields', detail: 'Name CSV fields', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'if', detail: 'Conditional rule block', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'source', detail: 'Specify data file to read', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'date-format', detail: 'Declare date parsing pattern', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'decimal-mark', detail: 'Declare decimal mark (. or ,)', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'separator', detail: 'Declare field separator character', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'balance-type', detail: 'Select balance assertion type', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'timezone', detail: 'Declare CSV timezone', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'encoding', detail: 'Declare text encoding', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'include', detail: 'Include another rules file', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'archive', detail: 'Enable archiving of imported files', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'newest-first', detail: 'CSV records are newest first', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'intra-day-reversed', detail: 'Same-day records are reversed', kind: vscode.CompletionItemKind.Keyword },
	{ label: 'end', detail: 'Skip rest of file', kind: vscode.CompletionItemKind.Keyword },
];

// Field names for hledger
const FIELDS: vscode.CompletionItem[] = [
	{ label: "date", detail: 'Transaction date', kind: vscode.CompletionItemKind.Variable },
	{ label: "date2", detail: 'Transaction secondary date', kind: vscode.CompletionItemKind.Variable },
	{ label: "status", detail: 'Transaction status', kind: vscode.CompletionItemKind.Variable },
	{ label: "code", detail: 'Transaction code', kind: vscode.CompletionItemKind.Variable },
	{ label: "description", detail: 'Transaction description', kind: vscode.CompletionItemKind.Variable },
	{ label: "comment", detail: 'Transaction comment', kind: vscode.CompletionItemKind.Variable },
	{ label: "account1", detail: 'First posting account', kind: vscode.CompletionItemKind.Variable },
	{ label: "account2", detail: 'Second posting account', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount", detail: 'Amount (for both postings)', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount1", detail: 'First posting amount', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount2", detail: 'Second posting amount', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount-in", detail: 'Inflow amount field', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount-out", detail: 'Outflow amount field', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount1-in", detail: 'First posting inflow amount', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount1-out", detail: 'First posting outflow amount', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount2-in", detail: 'Second posting inflow amount', kind: vscode.CompletionItemKind.Variable },
	{ label: "amount2-out", detail: 'Second posting outflow amount', kind: vscode.CompletionItemKind.Variable },
	{ label: "currency", detail: 'Currency symbol for all amounts', kind: vscode.CompletionItemKind.Variable },
	{ label: "currency1", detail: 'Currency for first posting', kind: vscode.CompletionItemKind.Variable },
	{ label: "currency2", detail: 'Currency for second posting', kind: vscode.CompletionItemKind.Variable },
	{ label: "balance", detail: 'Balance assertion/assignment', kind: vscode.CompletionItemKind.Variable },
	{ label: "balance1", detail: 'Balance for first posting', kind: vscode.CompletionItemKind.Variable },
	{ label: "balance2", detail: 'Balance for second posting', kind: vscode.CompletionItemKind.Variable },
];

const FIELD_NAMES = new Set(FIELDS.map(field => field.label));

// Common date format patterns
const DATE_FORMATS: vscode.CompletionItem[] = [
	{ label: '%Y-%m-%d', detail: 'YYYY-MM-DD (default, ISO format)', insertText: '%Y-%m-%d', kind: vscode.CompletionItemKind.Value },
	{ label: '%m/%d/%Y', detail: 'MM/DD/YYYY (US format)', insertText: '%m/%d/%Y', kind: vscode.CompletionItemKind.Value },
	{ label: '%d/%m/%Y', detail: 'DD/MM/YYYY (European format)', insertText: '%d/%m/%Y', kind: vscode.CompletionItemKind.Value },
	{ label: '%Y/%m/%d', detail: 'YYYY/MM/DD', insertText: '%Y/%m/%d', kind: vscode.CompletionItemKind.Value },
	{ label: '%d.%m.%Y', detail: 'DD.MM.YYYY', insertText: '%d.%m.%Y', kind: vscode.CompletionItemKind.Value },
	{ label: '%-m/%-d/%Y', detail: 'M/D/YYYY (no leading zeros)', insertText: '%-m/%-d/%Y', kind: vscode.CompletionItemKind.Value },
	{ label: '%-d/%-m/%Y', detail: 'D/M/YYYY (no leading zeros)', insertText: '%-d/%-m/%Y', kind: vscode.CompletionItemKind.Value },
	{ label: '%Y-%h-%d', detail: 'YYYY-Mon-DD (abbreviated month)', insertText: '%Y-%h-%d', kind: vscode.CompletionItemKind.Value },
];

// Separator values
const SEPARATORS: vscode.CompletionItem[] = [
	{ label: ',', detail: 'Comma (CSV)', kind: vscode.CompletionItemKind.Value },
	{ label: ';', detail: 'Semicolon (SSV)', kind: vscode.CompletionItemKind.Value },
	{ label: 'TAB', detail: 'Tab character (TSV)', kind: vscode.CompletionItemKind.Value },
	{ label: 'SPACE', detail: 'Space character', kind: vscode.CompletionItemKind.Value },
];

// Balance type values
const BALANCE_TYPES: vscode.CompletionItem[] = [
	{ label: '=', detail: 'Single commodity, exclude subaccounts', kind: vscode.CompletionItemKind.Value },
	{ label: '=*', detail: 'Single commodity, include subaccounts', kind: vscode.CompletionItemKind.Value },
	{ label: '==', detail: 'Multi commodity, exclude subaccounts', kind: vscode.CompletionItemKind.Value },
	{ label: '==*', detail: 'Multi commodity, include subaccounts', kind: vscode.CompletionItemKind.Value },
];

// Decimal mark values
const DECIMAL_MARKS: vscode.CompletionItem[] = [
	{ label: '.', detail: 'Period/dot (US/UK style)', kind: vscode.CompletionItemKind.Value },
	{ label: ',', detail: 'Comma (European style)', kind: vscode.CompletionItemKind.Value },
];

/**
 * Extract CSV field names from a 'fields' directive in the document
 */
function getCustomFields(document: vscode.TextDocument): string[] {
	const fieldNames: string[] = [];
	const text = document.getText();
	const fieldsRegex = /^\s*fields\s+(.+?)$/gm;

	let match;
	while ((match = fieldsRegex.exec(text)) !== null) {
		const fieldsLine = match[1];
		const fields = fieldsLine.split(',').map(f => f.trim()).filter(f => f.length > 0 && !FIELD_NAMES.has(f));
		fieldNames.push(...fields);
	}

	return fieldNames;
}

export class HledgerRulesCompletionProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		_token: vscode.CancellationToken,
		completionContext: vscode.CompletionContext
	): vscode.CompletionItem[] | vscode.CompletionList {
		const line = document.lineAt(position.line);
		const lineText = line.text;
		const textBeforeCursor = lineText.substring(0, position.character);
		// skip comments
		if (lineText.match(/^\s*[#;*]/) || (completionContext.triggerCharacter === ' ' && lineText.match(/^\s*$/))) {
			return [];
		}
		if (textBeforeCursor.match(/^\s*fields\s+\w*$/i) || textBeforeCursor.match(/^\s*fields\s+.*,$/i)) {
			return FIELDS;
		}
		if (textBeforeCursor.match(/^\s*date-format\s+.*$/i)) {
			return DATE_FORMATS;
		}
		if (textBeforeCursor.match(/^\s*separator\s+$/i)) {
			return SEPARATORS;
		}
		if (textBeforeCursor.match(/^\s*balance-type\s+$/i)) {
			return BALANCE_TYPES;
		}
		if (textBeforeCursor.match(/^\s*decimal-mark\s+$/i)) {
			return DECIMAL_MARKS;
		}
		if (textBeforeCursor.match(/^\w+\s+.*%\w*$/)) {
			const customFields = getCustomFields(document).map(label => {
				return { label, detail: 'Custom field', kind: vscode.CompletionItemKind.Variable };
			});

			return [...customFields, ...FIELDS];
		}
		if (textBeforeCursor.match(/^\s*\w*$/)) {
			const retrigger: vscode.Command = { title: 'trigger argument suggestions', command: 'editor.action.triggerSuggest' };
			const directives = DIRECTIVES.map(dir => ({ ...dir, insertText: dir.label + ' ', command: retrigger }));
			const fields = FIELDS.map(field => ({ ...field, insertText: field.label + ' ' }));
			return [...directives, ...fields];
		};

		return [];
	}
}
