/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { Amplify } from "aws-amplify";
import outputs from "amplify_outputs.json";

// Amplifyの設定
Amplify.configure(outputs);
const config = Amplify.getConfig();
Amplify.configure({
  ...config,
  API: {
    REST: {
      appRunnerApi: {
        endpoint: outputs.custom.appRunnerAPI.url
      },
    }
  }
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
