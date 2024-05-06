// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

console.log("Hello from glotrun Functions!");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  const { method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const lang = url.searchParams.get("lang");
  const version = url.searchParams.get("version");

  if (lang && version) {
    if (method == "POST") {
      let body = "";
      for await (const chunk of req.body) {
        body += new TextDecoder().decode(chunk);
      }

      let glotUrl = `https://glot.io/api/run/${lang}/${version}`;
      console.log("glotUrl", glotUrl);

      const res = await fetch(glotUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Deno.env.get("GLOT_TOKEN")}`,
        },
        method: "POST",
        body: body,
      });
      if (res.ok) {
        const data = await res.json();

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        console.log("res not ok data", res.text);
        return new Response(await res.text(), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(
        JSON.stringify({ status: 405, body: "Method Not Allowed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } else {
    const data = {
      message:
        "please request with POST method and with lang and version parameters",
      your_url: req.url,
    };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});