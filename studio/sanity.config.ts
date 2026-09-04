import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

// Fill these in once the client's Sanity project is provisioned:
// npx sanity@latest init --project-id <id> --dataset production
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your-project-id>';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Treasure Coast Global Property Solutions',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // Vision lets the client team run raw GROQ queries from the Studio — dev/debug only.
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
