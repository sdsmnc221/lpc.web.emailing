<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.SocialMediasBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    Placeholder component for social_medias_block (variation:
    {{ slice.variation }}) slices.

    <br />
    <strong>You can edit this slice directly in your code editor.</strong>
    <!--
	💡 Use Prismic MCP with your code editor

	Get AI-powered help to build your slice components — based on your actual model.

	▶️ Setup:
	1. Add a new MCP Server in your code editor:

	{
		"mcpServers": {
			"Prismic MCP": {
				"command": "npx",
				"args": ["-y", "@prismicio/mcp-server"]
			}
		}
	}

	2. Select a model optimized for coding (e.g. Claude 3.7 Sonnet or similar)

	✅ Then open your slice file and ask your code editor:
		"Code this slice"

	Your code editor reads your slice model and helps you code faster ⚡
	📚 Give your feedback: https://community.prismic.io/t/help-us-shape-the-future-of-slice-creation/19505
-->
  </section>
</template>
