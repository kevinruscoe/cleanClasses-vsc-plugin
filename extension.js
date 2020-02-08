const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.cleanClasses', function () {
		
		let document = vscode.window.activeTextEditor.document;
		let modifiedContent = document.getText();

		let regex = new RegExp(/class=['"](.+)["']/gm);
		let match;

		while ((match = regex.exec(document.getText())) !== null) {
			let originalClassAtribute = match[0];
			let classList = match[1];

			let sortedClassList = classList.split(" ").sort().join(" \n");
			let sortedClassAttribute = originalClassAtribute.replace(
				classList,
				sortedClassList
			);

			modifiedContent = modifiedContent.replace(originalClassAtribute, sortedClassAttribute);
		}

		vscode.window.activeTextEditor.edit(function(editBuilder) {
			editBuilder.delete(new vscode.Range(
				document.positionAt(0),
				document.positionAt(document.getText().length))
			);

			editBuilder.insert(
				new vscode.Position(0, 0), 
				modifiedContent
			);
		});	
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
