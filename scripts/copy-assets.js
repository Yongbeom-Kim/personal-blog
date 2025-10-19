#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to copy assets from src/posts/[slug]/ to dist/csr/assets/[slug]/
 * This excludes .mdx files and only copies actual assets like images, gifs, etc.
 */

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const ASSETS_OUTPUT_DIR = path.join(__dirname, '..', 'dist', 'assets');

/**
 * Recursively creates directories if they don't exist
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Checks if a file is an asset (not .mdx, .ts, .js files)
 */
function isAssetFile(filename) {
  const excludedExtensions = ['.mdx', '.ts', '.js', '.json'];
  const ext = path.extname(filename).toLowerCase();
  return !excludedExtensions.includes(ext) && !filename.startsWith('.');
}

/**
 * Copies a file from source to destination
 */
function copyFile(src, dest) {
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${path.basename(src)} -> ${dest}`);
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error.message);
  }
}

/**
 * Processes a single post directory and copies its assets
 */
function processPostDirectory(postDirName) {
  const postDirPath = path.join(POSTS_DIR, postDirName);
  const outputDirPath = path.join(ASSETS_OUTPUT_DIR, postDirName);

  // Skip if not a directory
  if (!fs.statSync(postDirPath).isDirectory()) {
    return;
  }

  console.log(`\nProcessing post: ${postDirName}`);

  // Read all files in the post directory
  const files = fs.readdirSync(postDirPath);
  const assetFiles = files.filter(isAssetFile);

  if (assetFiles.length === 0) {
    console.log(`  No assets found in ${postDirName}`);
    return;
  }

  // Ensure output directory exists
  ensureDirectoryExists(outputDirPath);

  // Copy each asset file
  assetFiles.forEach(filename => {
    const srcPath = path.join(postDirPath, filename);
    const destPath = path.join(outputDirPath, filename);
    copyFile(srcPath, destPath);
  });

  console.log(`  Copied ${assetFiles.length} asset(s) from ${postDirName}`);
}

/**
 * Main function to copy all assets
 */
function copyAllAssets() {
  console.log('Starting asset copy process...');
  console.log(`Source: ${POSTS_DIR}`);
  console.log(`Destination: ${ASSETS_OUTPUT_DIR}`);

  // Check if posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Posts directory not found: ${POSTS_DIR}`);
    process.exit(1);
  }

  // Ensure base assets directory exists
  ensureDirectoryExists(ASSETS_OUTPUT_DIR);

  // Read all items in posts directory
  const postItems = fs.readdirSync(POSTS_DIR);
  
  // Filter out non-directories and utility files
  const postDirectories = postItems.filter(item => {
    const itemPath = path.join(POSTS_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });

  if (postDirectories.length === 0) {
    console.log('No post directories found.');
    return;
  }

  // Process each post directory
  let totalAssetsCopied = 0;
  postDirectories.forEach(postDir => {
    const beforeCount = getTotalFileCount(ASSETS_OUTPUT_DIR);
    processPostDirectory(postDir);
    const afterCount = getTotalFileCount(ASSETS_OUTPUT_DIR);
    totalAssetsCopied += (afterCount - beforeCount);
  });

  console.log(`\n✅ Asset copy completed!`);
  console.log(`📁 Processed ${postDirectories.length} post directories`);
  console.log(`📄 Total assets copied: ${totalAssetsCopied}`);
}

/**
 * Helper function to count total files in a directory recursively
 */
function getTotalFileCount(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  
  let count = 0;
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isFile()) {
      count++;
    } else if (stat.isDirectory()) {
      count += getTotalFileCount(itemPath);
    }
  });
  
  return count;
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  copyAllAssets();
}

export { copyAllAssets, processPostDirectory, isAssetFile };