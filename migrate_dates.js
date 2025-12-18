import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, 'src/content/blog');

const files = fs.readdirSync(blogDir);

files.forEach(file => {
    if (!file.endsWith('.md')) return;

    // Match YYYY-MM-DD pattern at the start of the filename
    const match = file.match(/^(\d{4}-\d{2}-\d{2})-/);
    if (!match) {
        console.log(`Skipping ${file}: No date found in filename`);
        return;
    }

    const dateStr = match[1];
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if pubDate already exists
    if (content.match(/^pubDate:/m)) {
        console.log(`Skipping ${file}: pubDate already exists`);
        return;
    }

    // Insert pubDate after the first ---
    // We assume the file starts with ---
    const parts = content.split('---');
    if (parts.length < 3) {
        console.log(`Skipping ${file}: Invalid frontmatter`);
        return;
    }

    // Add pubDate to the frontmatter (parts[1])
    const frontmatter = parts[1];
    const newFrontmatter = `pubDate: ${dateStr}\n${frontmatter}`;

    // Reconstruct the file
    const newContent = `---${newFrontmatter}---${parts.slice(2).join('---')}`;

    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${file} with pubDate: ${dateStr}`);
});
