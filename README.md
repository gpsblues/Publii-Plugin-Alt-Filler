# Publii Plugin: `alt` Filler
This plugin automatically populates empty `alt` attributes (`alt=''`) and adds missing `alt` attributes to `<img>` tags, using the corresponding image file name as the value. It ensures your images are more accessible and SEO-friendly.

<p><img height="100" alt="publii plugin" title="Plugin icons" src="https://raw.githubusercontent.com/gpsblues/Publii-Plugin-Alt-Filler/6b6049e2fe5059afa7fbc9a9bd814b27c53dfd29/.assets/thumbnail.svg"></p>

## Features
This plugin, with no settings required, processes featured images, single images, and galleries across all site pages. File names are adjusted for improved readability with the following enhancements:

- **Removal of the file extension**: The file extension (e.g., `.jpg`, `.png`) is removed to focus on the name.
- **Removal of the `-thumbnail` suffix**: The `-thumbnail` suffix is removed for gallery images.
- **Removal of final numbers**: Patterns like `#`, `-#`, `_#`, and `(#)` are removed from the end of file names.
- **Replacement of `%20` with spaces**: URL-encoded spaces (`%20`) are converted to regular spaces.
- **Removal of special characters**: Characters like `(`, `)`, `[`, `]`, `!`, `?`, and `%` are removed.
- **Replacement of separators**: Characters like `-`, `_`, `.`, and `,` are replaced with spaces.
- **Replacement of multiple spaces with a single space**: Extra spaces are reduced to a single space.
- **Truncation to 125 characters**: File names are truncated to 125 characters to avoid overly long descriptions.
- **Capitalization**: The first letter is capitalized, and the rest of the text is converted to lowercase.
- **Addition of a period**: A period `.` is added at the end for proper punctuation.

### Example
`<img src="/media/posts/11/gallery/WHITE-CLOUD-2-in-blue-sky-(02)-thumbnail.webp" alt="">`

`<img src="/media/posts/11/gallery/WHITE-CLOUD-2-in-blue-sky-(02)-thumbnail.webp" alt="White cloud 2 in blue sky.">`

### Note
The plugin uses regular expressions and is designed to work with code generated by Publii. It may not function properly on manually written, pasted, or custom template-derived code. Specifically, keep in mind that:

- **Empty `alt=""` attribute**: If the `alt` attribute is missing, it will be added automatically. If it is already present but empty (`alt=""`), it will be filled with the processed file name.
- **Attribute order**: The `alt` attribute does not need to follow the `src` attribute immediately, but the `src` or `srcset` attribute must be present for the plugin to work.
- **Additional attributes**: The position of other attributes, such as `title`, is irrelevant and does not affect the plugin's functionality.

The filling of `alt` attributes is applied only to the HTML output. Publii's backend content remains unchanged.

## Installation and Usage
- Download the .zip file of the latest plugin version from the [release page](https://github.com/gpsblues/Publii-Plugin-Alt-Filler/releases/).
- Open Publii CMS and [install the plugin](https://getpublii.com/docs/plugins.html#installingplugins).
- [Enable the plugin](https://getpublii.com/docs/plugins.html#enablingplugins).
- Preview/Sync your website to see it in action.

## Disclaimer
This plugin is an unofficial extension for the [Publii CMS](https://getpublii.com/). I do not assume any responsibility for potential issues or malfunctions that may occur while using this plugin. Additionally, support for this plugin is not guaranteed.

For official Publii resources, please visit the [Publii CMS Official Repository](https://marketplace.getpublii.com/plugins/).
