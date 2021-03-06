const { join } = require('path');
const { execSync } = require('child_process');
const { publish } = require('gh-pages');
const { copySync, removeSync } = require('fs-extra');
const ensureRepoUpToDate = require('./ensure-repo-up-to-date');

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
};
const SITE_DIRECTORY = join(process.cwd(), 'site');
const GENERATED_SITE_DIRECTORY = join(process.cwd(), 'site/_site');
const REPO = 'devexpress/devextreme-reactive';
const BRANCH = 'gh-pages';
const COMMIT_MESSAGE = 'chore: update site';

ensureRepoUpToDate();

const gitTag = execSync('git tag --points-at HEAD', { stdio: 'pipe' }).toString().trim();
const gitRevision = execSync('git rev-parse HEAD', { stdio: 'pipe' }).toString().trim();
const demosRevision = gitTag || gitRevision;

console.log();
console.log('====================');
console.log(`| Publishing site to '${COLORS.bright}${REPO}@${BRANCH}${COLORS.reset}'`);
console.log(`| Demos will be linked to the '${COLORS.bright}${demosRevision}${COLORS.reset}' revision`);
console.log('| Assume that repo is clean and up to date')
console.log('====================');
console.log();

console.log('Building site content...');
execSync(`npm run build:site -- -- --versionTag "${demosRevision}"`, { stdio: 'ignore' });

console.log('Cleaning generated site...');
removeSync(GENERATED_SITE_DIRECTORY);

console.log('Generating site...');
execSync(`bundle exec jekyll build --source ${SITE_DIRECTORY} --destination ${GENERATED_SITE_DIRECTORY}`, { cwd: SITE_DIRECTORY, stdio: 'ignore' });

console.log('Coping github staff...');
copySync(join(__dirname, 'gh-pages-files'), GENERATED_SITE_DIRECTORY);

console.log('Publishing...');
publish(GENERATED_SITE_DIRECTORY, {
  branch: BRANCH,
  repo: `https://github.com/${REPO}.git`,
  message: COMMIT_MESSAGE,
  src: ['**/*', '.gitattributes'],
}, (err) => {
  if (err) {
    console.log(String(err));
    return;
  }

  console.log();
  console.log('--------------------');
  console.log('Done!');
  console.log();
  console.log(`You have to check that everething is good at https://devexpress.github.io/devextreme-reactive/`);
  console.log('--------------------');
  console.log();
});
