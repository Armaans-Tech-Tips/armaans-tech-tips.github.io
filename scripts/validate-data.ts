#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import schemas
import { GameSchema, UtilitySchema, GuideSchema, safeValidateGame, safeValidateUtility, safeValidateGuide } from '../src/lib/schemas.ts';

interface ValidationError {
  file: string;
  errors: string[];
}

const errors: ValidationError[] = [];

// Validate games data
try {
  const gamesPath = join(__dirname, '../src/data/games.json');
  const gamesContent = readFileSync(gamesPath, 'utf-8');
  const gamesData = JSON.parse(gamesContent);

  if (!Array.isArray(gamesData)) {
    errors.push({ file: 'games.json', errors: ['Root must be an array'] });
  } else {
    gamesData.forEach((game, index) => {
      const result = safeValidateGame(game);
      if (!result.success) {
        errors.push({
          file: `games.json[${index}]`,
          errors: [result.error.message || 'Validation failed']
        });
      }
    });
  }
} catch (error) {
  errors.push({ file: 'games.json', errors: [`Failed to read or parse: ${error.message}`] });
}

// Validate utilities data
try {
  const utilitiesPath = join(__dirname, '../src/data/utilities.json');
  const utilitiesContent = readFileSync(utilitiesPath, 'utf-8');
  const utilitiesData = JSON.parse(utilitiesContent);

  if (!Array.isArray(utilitiesData)) {
    errors.push({ file: 'utilities.json', errors: ['Root must be an array'] });
  } else {
    utilitiesData.forEach((utility, index) => {
      const result = safeValidateUtility(utility);
      if (!result.success) {
        errors.push({
          file: `utilities.json[${index}]`,
          errors: [result.error.message || 'Validation failed']
        });
      }
    });
  }
} catch (error) {
  errors.push({ file: 'utilities.json', errors: [`Failed to read or parse: ${error.message}`] });
}

// Validate guides data
try {
  const guidesPath = join(__dirname, '../src/data/guides.json');
  const guidesContent = readFileSync(guidesPath, 'utf-8');
  const guidesData = JSON.parse(guidesContent);

  if (!Array.isArray(guidesData)) {
    errors.push({ file: 'guides.json', errors: ['Root must be an array'] });
  } else {
    guidesData.forEach((guide, index) => {
      const result = safeValidateGuide(guide);
      if (!result.success) {
        errors.push({
          file: `guides.json[${index}]`,
          errors: [result.error.message || 'Validation failed']
        });
      }
    });
  }
} catch (error) {
  errors.push({ file: 'guides.json', errors: [`Failed to read or parse: ${error.message}`] });
}

// Output results
if (errors.length > 0) {
  console.error('❌ Data validation failed:');
  errors.forEach(error => {
    console.error(`  ${error.file}:`);
    error.errors.forEach(err => console.error(`    - ${err}`));
  });
  process.exit(1);
} else {
  console.log('✅ All data validation passed!');
  process.exit(0);
}
