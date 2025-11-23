# AI Transparency Atlas

## Setup & Usage

1. Create a `.env` file with your `PERPLEXITY_API_KEY` and `OPENAI_API_KEY`.
2. Run `npm run experiment` to start the scraper using `/data/models`.
3. Run `npm run dev` to launch the Next.js development server.

## Overview

This repository provides an end-to-end pipeline for collecting, structuring, and presenting data about AI model releases found on the web. It automatically extracts model release information, structures it according to a standardized model card framework, and offers a web-based interface to visualize and explore the resulting dataset. The goal is to make model release data accessible, structured, and useful for both research purposes and practitioners.

## Features

- **Automated Web Scraping:** Efficiently gathers and updates data about new AI model releases from multiple online sources.
- **Structured Model Card Framework:** Extracted data is normalized into a customizable model card format for easy consumption and comparison.
- **Searchable & Visual Web Portal:** Built-in Next.js website to browse, search, and analyze model releases and their properties.
- **Customizable & Extensible:** Designed to support additional sources, data fields, and visualization options.

## Directory Structure

```
/data/models      # Extracted and processed model data (JSON or similar)
/scraper/         # Scraping scripts and pipeline implementation
/components/      # React components for the frontend
/pages/           # Next.js page routes for the web interface
/utils/           # Helper utilities for scraping and processing
.env.example      # Example environment variables (API keys etc.)
README.md         # Project documentation
```

## Getting Started

### 1. Clone this repository

```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file and add your required API keys:

```
PERPLEXITY_API_KEY=your_perplexity_key
OPENAI_API_KEY=your_openai_key
```

### 4. Run the scraper pipeline

Fetch and generate model card data:

```bash
npm run experiment
```
This command runs the pipeline to scrape and process AI model releases, saving structured data into `/data/models`.

### 5. Launch the web interface

Start the development server for the visualization website:

```bash
npm run dev
```
The site should be accessible at [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements, bug fixes, or new features. Extending to new sources or enhancing the model card framework are especially encouraged.

## License

See [LICENSE](./LICENSE) for licensing details and usage terms.

## Acknowledgements

- [Perplexity](https://www.perplexity.ai/) and [OpenAI](https://openai.com/) for API support.

If you have questions or want to collaborate, feel free to open an issue!


