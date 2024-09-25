const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Utility function to sleep for a specified duration
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to update dependencies
const updateDependencies = (dependencies) => {
  Object.keys(dependencies).forEach((dep) => {
    if (dependencies[dep].startsWith('workspace:')) {
      try {
        const version = execSync(`npm view ${dep} version`).toString().trim();
        dependencies[dep] = `^${version}`;
        console.log(`Updated ${dep} to version ${version}`);
      } catch (error) {
        console.error(`Failed to get version for ${dep}: ${error.message}`);
      }
    }
  });
};

// Function to pack and publish a package
const publishPackage = (packageName, dir, targetDir) => {
  try {
    let isPublished = false;
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const latestVersion = execSync(`npm view ${packageJson.name} version`)
      .toString()
      .trim();
    const currentVersion = packageJson.version;

    // Only publish when currentVersion > latestVersion
    if (latestVersion != currentVersion) {
      console.log(`Packing ${dir}...`);
      execSync('npm pack', { cwd: targetDir, stdio: 'inherit' });
      console.log(`${dir} packed successfully.`);

      const tgzFile = fs
        .readdirSync(targetDir)
        .find((file) => file.endsWith('.tgz'));

      if (!tgzFile) {
        throw new Error('No .tgz file found');
      }

      console.log(
        `Publishing ${packageName}...--readme=${path.join(targetDir, 'README.md')}`
      );
      // Publish package

      execSync(
        `npm publish ${tgzFile} --registry=https://npm.pkg.github.com --readme=${path.join(targetDir, 'README.md')}`,
        {
          cwd: targetDir,
          stdio: 'inherit',
        }
      );

      console.log(`Published ${packageName} successfully...`);
      isPublished = true;
    }

    return isPublished;
  } catch (error) {
    console.error(`Failed to publish ${packageName}: ${error.message}`);
  }
};

// Function to create a GitHub release
const createGitHubRelease = (packageName, version, changelogPath) => {
  try {
    const tagName = `${packageName}@${version}`; // Format: @ajabhijeet21-internal/ui-lib@6.6.0

    console.log(`Creating GitHub release for ${packageName} v${version}...`);
    const remoteTags = execSync('git ls-remote --tags origin').toString();

    // Read the changelog and extract the current version section
    const changelogContent = fs.readFileSync(changelogPath, 'utf8');
    const currentVersionChangelog = extractCurrentVersionChangelog(
      changelogContent,
      version
    );

    // Create the release using gh cli
    if (remoteTags.includes(tagName)) {
      // Update the existing release
      console.log(`Tag ${tagName} already exists. Updating release...`);
      execSync(
        `gh release edit ${tagName} \
        --title "$${tagName}" \
        --notes "${currentVersionChangelog}"`,
        { stdio: 'inherit' }
      );
      console.log(`GitHub release updated for ${packageName} ${tagName}`);
    } else {
      // Create a new release
      console.log(`Tag ${tagName} does not exist. Creating new release...`);
      execSync(
        `gh release create ${tagName} \
        --title "${tagName}" \
        --notes "${currentVersionChangelog}"`,
        { stdio: 'inherit' }
      );
      console.log(`GitHub release created for ${packageName} ${tagName}`);
    }
  } catch (error) {
    console.error(
      `Failed to create GitHub release for ${packageName}: ${error.message}`
    );
  }
};

// Function to extract the current version changelog
const extractCurrentVersionChangelog = (changelog, version) => {
  const changelogEntries = changelog.split(/(?=^##\s+\d+\.\d+\.\d+)/gm);

  if (changelogEntries.length > 1) {
    const latestChangelog = changelogEntries[1].trim();
    return latestChangelog;
  } else {
    return `No changelog found for version ${version}`;
  }
};

const publishPackageMain = async () => {
  // Path to the packages directory
  const packagesDir = path.join(__dirname, '../packages');
  const tempPublishDir = path.join(__dirname, '../temp_publish');

  // Ensure temp_publish directory exists
  if (!fs.existsSync(tempPublishDir)) {
    fs.mkdirSync(tempPublishDir);
  }

  // Get all package directories
  const packageDirs = fs.readdirSync(packagesDir).filter((dir) => {
    const fullPath = path.join(packagesDir, dir);
    return (
      fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, 'package.json'))
    );
  });

  // Iterate through each package directory
  for (const dir of packageDirs) {
    const sourceDir = path.join(packagesDir, dir);
    const targetDir = path.join(tempPublishDir, dir);

    // Copy package files to temp directory
    fs.mkdirSync(targetDir, { recursive: true });

    const filesToCopy = ['package.json', 'CHANGELOG.md', 'README.md'];

    filesToCopy.forEach((file) => {
      fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
    });

    // Copy ui-lib specific files
    if (dir == 'ui-lib') {
      const uiLibFiles = ['tailwind.config.js', 'plugin.cjs'];

      uiLibFiles.forEach((file) => {
        fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
      });
    }

    // Copy dist directory if it exists
    const distDir = path.join(sourceDir, 'dist');
    if (fs.existsSync(distDir)) {
      fs.cpSync(distDir, path.join(targetDir, 'dist'), { recursive: true });
    }

    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Update dependencies and devDependencies
    if (packageJson.dependencies) {
      updateDependencies(packageJson.dependencies);
    }
    if (packageJson.devDependencies) {
      updateDependencies(packageJson.devDependencies);
    }

    // Write updated package.json
    const updatedContent = JSON.stringify(packageJson, null, 2) + '\n';
    fs.writeFileSync(packageJsonPath, updatedContent);
    console.log(`Dependencies in ${dir} updated successfully.`);
    console.log(`--------------------------------------------`);

    // Pack, publish and release the release the package
    try {
      const changelogPath = path.join(targetDir, 'CHANGELOG.md');
      const packageName = packageJson.name;
      const version = packageJson.version;

      if (!packageJson.private) {
        // Pack and publish the package
        const isPublished = publishPackage(packageName, dir, targetDir);

        // Create GitHub release only if the package is published
        if (isPublished) {
          createGitHubRelease(packageName, version, changelogPath);
          // Sleep for 10 seconds after each iteration
          await sleep(10000); // 10 seconds
        }
      }
    } catch (error) {
      console.error(`Failed to pack ${dir}: ${error.message}`);
    }
  }

  console.log('All packages were published and released successfully...');

  // Cleanup: Remove temp_publish directory
  try {
    fs.rmSync(tempPublishDir, { recursive: true, force: true });
    console.log(`Cleaned up temporary directory: ${tempPublishDir}`);
  } catch (error) {
    console.error(`Failed to remove temporary directory: ${error.message}`);
  }
};

// Call the main function
publishPackageMain().catch(console.error);
