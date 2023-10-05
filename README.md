# Interledger documentation design system

Interledger uses Starlight (powered by Astro) for all its documentation sites. We have 2 visual themes, green for specification documentation and orange for product documentation. These themes are built on top of Starlight's defaults and overrides some of the out-of-the-box styling. They are just CSS files, so use them with the path to `node_modules`. Unfortunately, we did not have enough braincells to figure out how to make it prettier than that. To use them in the `astro.config.mjs`:

```mjs
export default defineConfig({
  integrations: [
    starlight({
      customCss: [
        "./node_modules/@interledger/docs-design-system/src/styles/green-theme.css",
        "./node_modules/@interledger/docs-design-system/src/styles/ilf-docs.css",
      ],
    }),
  ],
});
```

If you are using them in an Astro layout file, then the import would look like this for the build to not fail:

```
import '/node_modules/@interledger/docs-design-system/src/styles/green-theme.css';
```

We also have a number of documentation-specific helper components that can be imported and used where necessary.

- [CodeBlock](#codeblock-component)
- [Disclosure](#disclosure-component)
- [Hidden](#hidden-component)
- [LargeImg](#largeimg-component)
- [LinkOut](#linkout-component)
- [MermaidWrapper](#mermaidwrapper-component)
- [StylishHeader](#stylishheader-component)
- [Tooltip](#tooltip-component)

For the shared components, if you are using both `CodeBlock` and `Disclosure` on the same page, you can import them both like so:

```jsx
import { CodeBlock, Disclosure } from "@interledger/docs-design-system";
```

For more information about importing things in Javascript, please refer to [import on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

1. #### `CodeBlock` component

   Use this component if you wish to add a title to your code block. It takes a `title` attribute, which will be displayed above the code. To use it, your docs page must be in `.mdx` format. Please change the format from `.md` to `.mdx` if necessary. All your existing markdown will still be supported without issue. Import the `CodeBlock` component like so:

   ```jsx
   import { CodeBlock } from "@interledger/docs-design-system";
   ```

   Use the `<CodeBlock>` component within your content like so:

   ````
   <CodeBlock title="Response">

   ```http
   {
      "id":"https://wallet.example/alice/incoming-payments/08394f02-7b7b-45e2-b645-51d04e7c330c",
      "paymentPointer":"https://wallet.example/alice",
      "receivedAmount": {
         "value":"0",
         "assetCode":"USD",
         "assetScale":2
      },
      "completed":false,
      "createdAt":"2022-03-12T23:20:50.52Z",
      "updatedAt":"2022-03-12T23:20:50.52Z",
   }
   ```

   </CodeBlock>
   ````

1. #### `Disclosure` component

   Use this component if you have some content that you want to show/hide via a collapsible container. This component wraps around whatever content you wish to have this expand/collapse behaviour. Note that the `client:load` attribute is required for the functionality to work because this component relies on state.

   To use it, your docs page must be in `.mdx` format. Please change the format from `.md` to `.mdx` if necessary. All your existing markdown will still be supported without issue. Import the `Disclosure` component like so:

   ```jsx
   import { Disclosure } from "@interledger/docs-design-system";
   ```

   Use the `<Disclosure>` component within your content like so:

   ```jsx
   <Disclosure toggleText='Show code snippets' client:load>
      <!-- Your content, can be markup or markdown -->
   </Disclosure>
   ```

   For the specific use-case of displaying multiple code-snippets, it might be worth considering also using the [built-in Starlight `<Tabs>`](https://starlight.astro.build/guides/components#tabs) component:

   ````jsx
   <Disclosure toggleText='Show code snippets' client:load>
      <Tabs>
         <TabItem label='Request'>
         ```bash
         GET /alice HTTP/1.1
         Accept: application/json
         Host: wallet.example
         ```
         </TabItem>
         <TabItem label='Response'>
         ```bash
         HTTP/1.1 200 Success
         Content-Type: application/json

         {
            "id":"https://wallet.example/alice",
            "assetCode":"USD",
            "assetScale":2,
            "authServer":"https://wallet.example/auth",
         }
         ```
         </TabItem>

      </Tabs>
   </Disclosure>
   ````

1. #### `Hidden` component

   Use this component to hide content that is temporarily not ready to be shown to the public. This is not meant for long-term use, but a stop-gap when the current implementation is still far away from our documentation/specifications, and the content we have will be relevant but in the future.

   ```jsx
   import { Hidden } from "@interledger/docs-design-system";
   ```

   Unfortunately, due to the nature of how the ToC on the right is generated, if we want to hide an entire section (including the header), we will have to manually hide the section heading by either commenting it out or deleting it.

1. #### `LargeImg` component

   Use this component if you have a diagram or image that is much larger than our available space and you would like users to view the full image in another tab. This adds a link to "View full image" with an external link indicator on the bottom right corner under the image. It takes in a `src` and `alt`, just like a normal `img` element.

   To use it, your docs page must be in `.mdx` format. Please change the format from `.md` to `.mdx` if necessary. All your existing markdown will still be supported without issue. Import the `LargeImg` component like so:

   ```jsx
   import { LargeImg } from "@interledger/docs-design-system";
   ```

   Use the `<LargeImg>` component within your content like so:

   ```jsx
   <LargeImg src="/img/OMG_A_GIGANTIC_IMG.png" alt="A really large diagram" />
   ```

   By default, there will be a border around the image, but if you want to remove the border, pass in a `hasBorder={false}` attribute.

   ```jsx
   <LargeImg
     src="/img/OMG_A_GIGANTIC_IMG.png"
     alt="A really large diagram"
     hasBorder={false}
   />
   ```

   For user doc diagrams, be sure to include the `docs` folder in the path.

   ```jsx
   <LargeImg
     src="/img/docs/OMG_A_GIGANTIC_IMG.png"
     alt="A really large diagram"
   />
   ```

1. #### `LinkOut` component

   Use this component if you need to add an external link to your content that opens in a new tab. This component adds the necessary attributes for external links and adds an external link indicator icon to the end of the link content. The icon can be turned off, if necessary.

   To use it, your docs page must be in `.mdx` format. Please change the format from `.md` to `.mdx` if necessary. All your existing markdown will still be supported without issue. Import the `LinkOut` component like so:

   ```jsx
   import { LinkOut } from "@interledger/docs-design-system";
   ```

   Use the `<LinkOut>` component within your content like so:

   ```jsx
   <LinkOut href="https://openpayments.guide/">OpenPayments API</LinkOut>
   ```

   If you do not want the external link icon to appear, you can set the `withIcon` prop to `false` like so:

   ```jsx
   <LinkOut href="https://openpayments.guide/" withIcon={false}>
     OpenPayments API
   </LinkOut>
   ```

1. #### `MermaidWrapper` component

   Starlight does not support Mermaid by default, so you would have to install [remark-mermaidjs](https://github.com/remcohaszing/remark-mermaidjs) on your Starlight site before you can use this component.

   Use this component if your Mermaid diagram is much larger than our available space and you would like users to view the full diagram in another tab. This adds "View full diagram" button with an external link indicator on the bottom right corner under the diagram. Note that the `client:load` attribute is required for the functionality to work because this component relies on state.

   To use it, your docs page must be in `.mdx` format. Please change the format from `.md` to `.mdx` if necessary. All your existing markdown will still be supported without issue. Import the `MermaidWrapper` component like so:

   ```jsx
   import { MermaidWrapper } from "@interledger/docs-design-system";
   ```

   Use the `<MermaidWrapper>` component within your content like so:

   ````jsx
   <MermaidWrapper client:load>
     ```mermaid sequenceDiagram Alice ->> Bob: Hello Bob, how are you?
     Bob-->>John: How about you John? Bob--x Alice: I am good thanks! Bob-x
     John: I am good thanks! Note right of John: Bob thinks a long
     <br />
     long time, so long
     <br />
     that the text does
     <br />
     not fit on a row. Bob-->Alice: Checking with John... Alice->John: Yes...
     John, how are you? ```
   </MermaidWrapper>
   ````

   By default, there will be a border around the image, but if you want to remove the border, pass in a `hasBorder={false}` attribute.

   ````jsx
   <MermaidWrapper client:load hasBorder={false}>
     ```mermaid sequenceDiagram Alice ->> Bob: Hello Bob, how are you?
     Bob-->>John: How about you John? Bob--x Alice: I am good thanks! Bob-x
     John: I am good thanks! Note right of John: Bob thinks a long
     <br />
     long time, so long
     <br />
     that the text does
     <br />
     not fit on a row. Bob-->Alice: Checking with John... Alice->John: Yes...
     John, how are you? ```
   </MermaidWrapper>
   ````

1. #### `StylishHeader` component

   Use this component if you wish to create a stylized heading that does not use the heading elements such that it will not appear in the ToC right sidebar. To use it, your docs page must be in `.mdx` format. Please change the format from `.md` to `.mdx` if necessary. All your existing markdown will still be supported without issue. Import the `StylishHeader` component like so:

   ```jsx
   import { StylishHeader } from "@interledger/docs-design-system";
   ```

   Use the `<StylishHeader>` component within your content like so:

   ```jsx
   <StylishHeader>Wow I'm a stylish header</StylishHeader>
   ```

1. #### `Tooltip` component

   Use the tooltip component for adding a short explanation to specific terms. This component is built to be accessible in accordance to the guidance from [WAI Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/). Note that the `client:load` attribute is required for the functionality to work because this component relies on state.

   To use it, your docs page must be in `.mdx` format. Please change the format from `.md` to `.mdx` if necessary. All your existing markdown will still be supported without issue. Import the `Tooltip` component like so:

   ```jsx
   import { Tooltip } from "@interledger/docs-design-system";
   ```

   Use the `<Tooltip>` component within your content like so:

   ```jsx
   <Tooltip content='THIS CONTENT IS DISPLAYED IN THE TOOLTIP UPON INTERACTION' client:load><span>text that you are trying to explain</span></Tooltip>.
   ```

   If the text you are trying to explain is also a link to somewhere else, please put the link within the `<Tooltip>` like so:

   ```jsx
   <Tooltip content='THIS CONTENT IS DISPLAYED IN THE TOOLTIP UPON INTERACTION' client:load><a href="/URL">text that you are trying to explain</a></Tooltip>.
   ```
