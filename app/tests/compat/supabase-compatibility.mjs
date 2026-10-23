import assert from "node:assert/strict";
import { it, mock } from "node:test";
import { createClient } from "@supabase/supabase-js";
import { fetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { QueryClient } from "@tanstack/react-query";

it("fetches a view through cache helpers using the real Supabase SDK", async () => {
  const fetchMock = mock.fn(
    async () =>
      new Response(JSON.stringify({ id: 12345 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
  );
  const client = createClient("https://supabase.example.test", "test-key", {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: { fetch: fetchMock },
  });
  const queryClient = new QueryClient();

  try {
    const response = await fetchQuery(
      queryClient,
      client.from("latest_registration_user_view").select("id").single(),
    );

    assert.deepEqual(response.data, { id: 12345 });
    assert.equal(response.error, null);
    assert.equal(fetchMock.mock.callCount(), 1);
    const [url, options] = fetchMock.mock.calls[0].arguments;
    assert.equal(
      new URL(url).pathname,
      "/rest/v1/latest_registration_user_view",
    );
    assert.equal(new URL(url).searchParams.get("select"), "id");
    assert.equal(new Headers(options.headers).get("apikey"), "test-key");
  } finally {
    queryClient.clear();
  }
});
