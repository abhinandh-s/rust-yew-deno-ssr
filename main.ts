import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import init, { render } from "./pkg/yew_ssr_deno.js";

// Load the Wasm file into memory
const wasmCode = await Deno.readFile("./pkg/yew_ssr_deno_bg.wasm");
await init(wasmCode);

console.log("Server running on http://localhost:8000");

serve(async (req) => {
  // Call the Rust function!
  const appHtml = await render();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Yew SSR with Deno</title>
      </head>
      <body>
        <div id="app">${appHtml}</div>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
