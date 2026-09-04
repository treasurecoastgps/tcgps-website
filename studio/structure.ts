import type { StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons';

// Custom desk structure: pins the singleton Site Settings document at the top
// (edited in place, never listed/created/deleted like a normal collection),
// then lists every content collection the client team manages directly.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'siteSettings'
      ),
    ]);
