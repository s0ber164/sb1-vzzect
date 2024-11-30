# SIS Props

A professional prop rental platform for TV & film production companies. Built with React, TypeScript, and Tailwind CSS.

## Features

- Browse props by category (furniture, lighting, accessories, plants)
- Search functionality
- Admin panel for managing props via CSV upload
- Responsive design
- Modern, minimalist interface

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sis-props.git
cd sis-props
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## CSV Upload Format

The admin panel accepts CSV files with the following columns:
- name
- price
- image_url
- category
- subcategory
- quantity
- dimensions

Example:
```csv
name,price,image_url,category,subcategory,quantity,dimensions
Vintage Armchair,199,https://example.com/image.jpg,furniture,seating,3,30"W x 32"D x 35"H
```

## License

MIT