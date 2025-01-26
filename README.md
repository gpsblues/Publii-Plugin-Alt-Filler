# Publii Plugin: `alt` Filler
Fill empty `alt` attributes of `<img>` tags with the corresponding image file name.

<p><img height="100" alt="publii plugin" title="Plugin icons" src="https://raw.githubusercontent.com/gpsblues/Publii-Plugin-Alt-Filler/6b6049e2fe5059afa7fbc9a9bd814b27c53dfd29/.assets/thumbnail.svg"></p>

## Features
This plugin, with no settings required, processes featured images, single images, and galleries across all site pages. File names are adjusted for improved readability with the following enhancements:

- Removal of the file extension.
- Convert to lowercase with the first letter capitalized.
- Replacement of separators (`-`, `_`, `.`) with spaces.
- Addition of a period at the end.
- Removal of the '-thumbnail' suffix for gallery images.

### Example
`<img src="/media/posts/11/gallery/white-CLOUD-in-blue-sky-thumbnail.webp" alt="">`
becomes
`<img src="/media/posts/11/gallery/white-CLOUD-in-blue-sky-thumbnail.webp" alt="White cloud in blue sky.">`

### Note
The plugin uses regular expressions and is designed to work with code generated by Publii. It may not function properly on manually written, pasted, or custom template-derived code. Specifically, keep in mind that:
- The empty `alt=""` attribute must already be present. If missing, it won't be added.
- The empty `alt=""` attribute must follow the `src` attribute (it doesn't need to be immediately following).
- The position of additional attributes, such as `title`, is irrelevant.

The filling of alt attributes is applied only to the HTML output. Publii's backend content remains unchanged.

## Installation and Usage
- Download the .zip file of the latest plugin version from the [release page](https://github.com/gpsblues/Publii-Plugin-Alt-Filler/releases/).
- Open Publii CMS and [install the plugin](https://getpublii.com/docs/plugins.html#installingplugins).
- [Enable the plugin](https://getpublii.com/docs/plugins.html#enablingplugins).
- Preview/Sync your website to see it in action.

## Disclaimer
This plugin is an unofficial extension for the [Publii CMS](https://getpublii.com/). I do not assume any responsibility for potential issues or malfunctions that may occur while using this plugin. Additionally, support for this plugin is not guaranteed.

For official Publii resources, please visit the [Publii CMS Official Repository](https://marketplace.getpublii.com/plugins/).
