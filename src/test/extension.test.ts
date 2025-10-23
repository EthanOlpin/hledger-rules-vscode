import * as assert from 'assert';
import * as vscode from 'vscode';
import { before } from 'mocha';

suite('Hledger Rules Completion Provider', () => {
	vscode.window.showInformationMessage('Start completion tests');

	before(() => vscode.extensions.getExtension('EthanOlpin.hledger-rules')?.activate());

	async function getCompletions({ docContent, position = new vscode.Position(0, 0), triggerCharacter }: { docContent: string; position?: vscode.Position; triggerCharacter?: string; }): Promise<vscode.CompletionList> {
		const doc = await vscode.workspace.openTextDocument({
			language: 'hledger-rules',
			content: docContent
		});

		await vscode.window.showTextDocument(doc);

		const completions = vscode.commands.executeCommand<vscode.CompletionList>(
			'vscode.executeCompletionItemProvider',
			doc.uri,
			position,
			triggerCharacter
		);

		return completions;
	}

	test('Should provide directive completions at start of line', async () => {
		const completions = await getCompletions({ docContent: '' });

		assert.ok(completions.items.length > 0);

		const skipCompletion = completions.items.find(item => item.label === 'skip');
		assert.ok(skipCompletion, 'Should include "skip" directive');
		assert.strictEqual(skipCompletion.kind, vscode.CompletionItemKind.Keyword);
	});

	test('Should provide field completions after "fields" directive', async () => {
		const completions = await getCompletions({ docContent: 'fields ' });

		assert.ok(completions.items.length > 0);

		const dateField = completions.items.find(item => item.label === 'date');
		assert.ok(dateField, 'Should include "date" field');
		assert.strictEqual(dateField.kind, vscode.CompletionItemKind.Variable);
	});


	test('Should provide date format completions after "date-format" directive', async () => {
		const completions = await getCompletions({ docContent: 'date-format ', position: new vscode.Position(0, 12) });

		assert.ok(completions.items.length > 0);

		const isoFormat = completions.items.find(item => item.label === '%Y-%m-%d');
		assert.ok(isoFormat, 'Should include ISO date format');
		assert.strictEqual(isoFormat.kind, vscode.CompletionItemKind.Value);
	});

	test('Should provide separator completions after "separator" directive', async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: 'hledger-rules',
			content: 'separator '
		});

		await vscode.window.showTextDocument(doc);

		const position = new vscode.Position(0, 10); // After "separator "
		const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
			'vscode.executeCompletionItemProvider',
			doc.uri,
			position
		);

		assert.ok(completions.items.length > 0);

		const commaSeparator = completions.items.find(item => item.label === ',');
		assert.ok(commaSeparator, 'Should include comma separator');
	});

	test('Should provide balance type completions after "balance-type" directive', async () => {
		const completions = await getCompletions({ docContent: 'balance-type ', position: new vscode.Position(0, 13) });

		assert.strictEqual(completions.items.length, 4);

		const balanceType = completions.items.find(item => item.label === '=');
		assert.ok(balanceType, 'Should include "=" balance type');
	});

	test('Should provide decimal mark completions after "decimal-mark" directive', async () => {
		const completions = await getCompletions({ docContent: 'decimal-mark ', position: new vscode.Position(0, 13) });

		assert.strictEqual(completions.items.length, 2);

		const periodMark = completions.items.find(item => item.label === '.');
		assert.ok(periodMark, 'Should include "." decimal mark');
	});

	test('Should provide custom fields from fields directive', async () => {
		const completions = await getCompletions({
			docContent: 'fields date, description, customField1, customField2\naccount1 %',
			position: new vscode.Position(1, 11), // After "account1 %"
		})

		const customField = completions.items.find(item => item.label === 'customField1');
		assert.ok(customField, 'Should include custom field from fields directive');
		assert.strictEqual(customField.detail, 'Custom field');
	});

	test('Should not provide completions in comments', async () => {
		const completions = await getCompletions({ docContent: '# comment fi', position: new vscode.Position(0, 13) });
		const nonTextCompletions = completions.items.filter(item => item.kind !== vscode.CompletionItemKind.Text);

		assert.strictEqual(nonTextCompletions.length, 0);
	});

	test('Should provide field completions with comma separator', async () => {
		const completions = await getCompletions({ docContent: 'fields date, description,' });

		assert.ok(completions.items.length > 0);

		const amountField = completions.items.find(item => item.label === 'amount');
		assert.ok(amountField, 'Should include field completions after comma');
	});

	test('Should provide all directives and fields at start of line', async () => {
		const completions = await getCompletions({ docContent: '' });

		assert.ok(completions.items.length > 0);

		// Should have both directives and fields
		const skipDirective = completions.items.find(item => item.label === 'skip');
		const dateField = completions.items.find(item => item.label === 'date');

		assert.ok(skipDirective, 'Should include directives');
		assert.ok(dateField, 'Should include fields');
	});
});
