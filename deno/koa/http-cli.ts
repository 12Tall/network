import { serve } from "https://deno.land/std/http/server.ts";

const srv = serve("0.0.0.0:8000");

async function main() {
  for await (const req of srv) {
    req.respond({
      body: new TextEncoder().encode("Hello World\n"),
    });
  }
}

main();
