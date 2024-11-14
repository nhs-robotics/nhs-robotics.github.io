// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    tags: collection({
      label: "Tags",
      slugField: "name",
      path: "src/content/tags/*",
      format: {
        data: "json",
      },
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: {
              isRequired: true,
            },
          },
        }),
      },
    }),
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: {
              isRequired: true,
            },
          },
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
        }),
        description: fields.text({
          label: "Description",
          multiline: false,
          validation: {
            isRequired: true,
          },
        }),
        published: fields.datetime({
          label: "Published date",
          defaultValue: {
            kind: "now",
          },
          validation: {
            isRequired: true,
          },
        }),
        updated: fields.datetime({
          label: "Updated date",
          defaultValue: {
            kind: "now",
          },
          validation: {
            isRequired: true,
          },
        }),
        hero: fields.object(
          {
            image: fields.image({
              label: "Image",
              description: "The image that will appear at the top",
              directory: "public/images/posts",
              publicPath: "/images/posts/",
              validation: {
                isRequired: true,
              },
            }),
            alt: fields.text({
              label: "Caption",
              multiline: false,
              validation: {
                isRequired: true,
              },
            }),
          },
          {
            label: "Hero image",
          },
        ),
        tags: fields.array(
          fields.relationship({
            label: "Tag",
            collection: "tags",
            validation: {
              isRequired: true,
            },
          }),
          {
            label: "Tags",
            validation: {
              length: {
                min: 1,
              },
            },
            itemLabel(props) {
              return props.value ?? "[invalid tag]";
            },
          },
        ),
      },
    }),
  },
  ui: {
    brand: {
      name: "T-10 Robotics",
      mark: () => {
        return <img src="/images/favicon/gradient.png" width={48} />;
      },
    },
  },
});
