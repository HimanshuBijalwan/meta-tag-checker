# Meta Tag Checker

## Overview
The Meta Tag Checker is a tool designed to verify and analyze the meta tags of web pages. It focuses on three main features: checking Open Graph images, validating Twitter Card meta tags, and analyzing search engine results pages (SERP) for optimization.

## Features
- **Meta OG Image Checker**: Validates the presence and correctness of Open Graph images in the meta tags of a specified URL.
- **Twitter Card Checker**: Checks for the presence and validity of Twitter Card meta tags in the HTML of a given URL.
- **SERP Checker**: Analyzes the search engine results page for a given query to ensure that the meta tags are optimized for search visibility.

## Installation
To install the Meta Tag Checker, clone the repository and install the dependencies using npm:

```bash
git clone https://github.com/yourusername/meta-tag-checker.git
cd meta-tag-checker
npm install
```

## Usage
After installation, you can use the features by importing them into your project. Here’s a brief example of how to use each feature:

### Meta OG Image Checker
```typescript
import { checkMetaOgImage } from './src/features/metaOgImageChecker';

const result = checkMetaOgImage('https://example.com');
console.log(result);
```

### Twitter Card Checker
```typescript
import { checkTwitterCard } from './src/features/twitterCardChecker';

const result = checkTwitterCard('https://example.com');
console.log(result);
```

### SERP Checker
```typescript
import { checkSerp } from './src/features/serpChecker';

const result = checkSerp('your search query');
console.log(result);
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.