// storage-adapter-import-placeholder
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig, type PayloadRequest } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import sharp from "sharp"; // sharp-import
import { Media } from "./collections/Media.ts";
import { Users } from "./collections/Users/index.ts";
import { Footer } from "./Footer/config.ts";
import { Header } from "./Header/config.ts";
import { plugins } from "./plugins/index.ts";
import { defaultLexical } from "@/fields/defaultLexical.ts";
import { getServerSideURL } from "./utilities/getURL.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: [ "@/components/BeforeLogin" ],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
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
    Media,
    Users,
  ],
  cors: [ getServerSideURL() ].filter(Boolean),
  globals: [
    Header,
    Footer,
  ],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
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
