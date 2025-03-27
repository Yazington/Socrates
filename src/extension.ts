// src/extension.ts
import * as vscode from "vscode";
import * as path from "path";
import { promises as fs } from "fs";

export function activate(context: vscode.ExtensionContext) {
  // Register the WebviewViewProvider
  const provider = new SocratesChatViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "socrates.chatView", // must match the "id" in package.json
      provider
    )
  );

  console.log("Socrates extension is now active!");
}

export function deactivate() {}

/**
 * This class backs the "Socrates Chat" webview in the activity bar.
 */
class SocratesChatViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    _resolveContext: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    // Let scripts run in the webview
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(this.context.extensionPath, "dist")),
      ],
    };

    // Set the HTML for the webview by reading our dist/index.html
    webviewView.webview.html = await this.getWebviewHtml(webviewView.webview);

    // Listen for messages from the webview
    webviewView.webview.onDidReceiveMessage(async (msg) => {
      if (msg.type === "sendPrompt") {
        const userPrompt: string = msg.value;
        // Call your LLM or do something interesting
        const response = await getLLMResponse(userPrompt);

        // Send the reply back to the webview
        webviewView.webview.postMessage({
          type: "llmResponse",
          value: response,
        });
      }
    });
  }

  private async getWebviewHtml(webview: vscode.Webview): Promise<string> {
    const indexPath = path.join(
      this.context.extensionPath,
      "dist",
      "index.html"
    );
    let html = await fs.readFile(indexPath, "utf-8");

    // If Vite is producing <script src="/assets/..." />, you need to rewrite those
    // absolute paths to the webview scheme. For example:
    const distUri = webview
      .asWebviewUri(
        vscode.Uri.file(path.join(this.context.extensionPath, "dist"))
      )
      .toString();

    // Simple find/replace. You can make this more robust if needed.
    html = html
      .replace(/ src="\//g, ` src="${distUri}/`)
      .replace(/ href="\//g, ` href="${distUri}/`);

    return html;
  }
}

/**
 * A dummy function. Replace with your real LLM API call if you want.
 */
async function getLLMResponse(userPrompt: string): Promise<string> {
  // Example (OpenAI):
  //   const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));
  //   const chatResp = await openai.createChatCompletion(...);
  //   return chatResp.data.choices[0].message?.content ?? "";
  // For now, return a fake response:
  return `Hello! I saw your prompt: "${userPrompt}"`;
}
