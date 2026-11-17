import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  computePortfolioStats,
  validateContactForm,
  buildMailtoHref,
} from './portfolioLogic';
import { PRIMARY_PROJECTS, SECONDARY_PROJECTS } from '../data/projects';
import { CERTIFICATIONS_AND_ACHIEVEMENTS } from '../data/certifications';
import { PERSONAL } from '../data/personal';

import {
  ALLOWED_TUBE_COLORS,
  CURATED_TUBE_PALETTES,
  getNextCuratedPaletteIndex,
  isPaletteWithinAllowedColors,
  pickCuratedPalette,
} from './tubesPalette';
import { buildResumeDocumentData, createResumePdfDocument } from './resumePdf';

test('filterProjects returns all projects when category is All', () => {
  const result = filterProjects(PRIMARY_PROJECTS, 'All');
  assert.equal(result.length, 5);
});

test('filterProjects filters by primary and secondary categories accurately', () => {
  const aiProjects = filterProjects(PRIMARY_PROJECTS, 'AI / ML');
  assert.equal(aiProjects.some((p) => p.id === 'nexa-ai'), true);
  assert.equal(aiProjects.some((p) => p.id === 'ai-career-intelligence'), true);
  assert.equal(aiProjects.some((p) => p.id === 'cvforge'), true);
  assert.equal(aiProjects.some((p) => p.id === 'devconnect'), false);

  const webApps = filterProjects(PRIMARY_PROJECTS, 'Web Applications');
  assert.equal(webApps.some((p) => p.id === 'scholarship-management'), true);
  assert.equal(webApps.some((p) => p.id === 'devconnect'), true);
});

test('computePortfolioStats computes verified counts without fabricated metrics', () => {
  const stats = computePortfolioStats({
    primaryProjects: PRIMARY_PROJECTS,
    secondaryProjects: SECONDARY_PROJECTS,
    credentials: CERTIFICATIONS_AND_ACHIEVEMENTS,
    cgpa: PERSONAL.cgpa,
  });

  assert.equal(stats.cgpa, 7.5);
  assert.equal(stats.primaryProjectCount, 5);
  assert.equal(stats.totalProjects, 7);
  assert.equal(stats.certificationCount, 7);
  assert.equal(stats.achievementCount, 1);
  assert.equal(stats.totalCredentials, 8);
});

test('validateContactForm catches invalid inputs and accepts complete valid submissions', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Too short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Ananya Sen',
    email: 'ananya@example.com',
    subject: 'SWE Internship Interview',
    message: 'Hello Soumik, we would like to schedule a technical conversation.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildMailtoHref encodes subject and reply details cleanly', () => {
  const href = buildMailtoHref('soumikchakraborty88s@gmail.com', {
    name: 'Ananya Sen',
    email: 'ananya@example.com',
    subject: 'Internship Opportunity',
    message: 'Let us connect regarding a role.',
  });
  assert.equal(href.startsWith('mailto:soumikchakraborty88s@gmail.com?'), true);
  assert.equal(href.includes('Internship+Opportunity'), true);
});

test('curated tube palettes strictly stay within the five lavender/purple colors', () => {
  assert.equal(ALLOWED_TUBE_COLORS.length, 5);
  for (let i = 0; i < CURATED_TUBE_PALETTES.length; i += 1) {
    const palette = pickCuratedPalette(i);
    assert.equal(isPaletteWithinAllowedColors(palette), true);
  }
  assert.equal(
    isPaletteWithinAllowedColors({
      tubes: ['#53bc28', '#ff008a', '#fe8a2e'],
      lights: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
    }),
    false
  );
});

test('getNextCuratedPaletteIndex cycles smoothly and wraps around', () => {
  assert.equal(getNextCuratedPaletteIndex(0, 5), 1);
  assert.equal(getNextCuratedPaletteIndex(4, 5), 0);
  assert.equal(getNextCuratedPaletteIndex(-1, 5), 1);
});

test('createResumePdfDocument builds a valid multi-section PDF from verified CV data', () => {
  const data = buildResumeDocumentData();
  assert.equal(data.personal.name, 'Soumik Chakraborty');
  assert.equal(data.projects.length, 5);

  const doc = createResumePdfDocument();
  const raw = doc.output('datauristring');
  assert.equal(raw.startsWith('data:application/pdf'), true);
  assert.equal(doc.getNumberOfPages() >= 1, true);
});
