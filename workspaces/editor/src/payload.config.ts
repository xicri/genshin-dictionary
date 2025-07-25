import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig, type PayloadRequest } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { searchPlugin } from "@payloadcms/plugin-search";
import { defaultLexical } from "@/fields/defaultLexical.ts";
import { searchFields } from "@/search/fieldOverrides.ts";
import { beforeSyncWithSearch } from "@/search/beforeSync.ts";
import { Users } from "./collections/Users.ts";
import { Tags } from "./collections/Tags.ts";
import { Words } from "./collections/Words.ts";
import { getServerSideURL } from "./utilities/getURL.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default buildConfig({
  admin: {
    components: {
      beforeLogin: [ "@/components/BeforeLogin" ],
      beforeDashboard: [ "@/components/BeforeDashboard" ],
    },
    importMap: {
      baseDir: __dirname,
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "",
    },
  }),
  collections: [
    Users,
    Tags,
    Words,
  ],
  cors: [ getServerSideURL() ].filter(Boolean),
  plugins: [
    searchPlugin({
      collections: [ "words" ],
      beforeSync: beforeSyncWithSearch,
      searchOverrides: {
        fields: ({ defaultFields }) => {
          return [ ...defaultFields, ...searchFields ];
        },
      },
    }),
    payloadCloudPlugin(),
  ],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: resolve(__dirname, "payload-types.ts"),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest; }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) {
          return true;
        }

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${ process.env.CRON_SECRET }`;
      },
    },
    tasks: [],
  },
});
