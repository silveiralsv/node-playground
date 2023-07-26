// const simpleGit = require("simple-git");
const axios = require("axios");
import { simpleGit } from "simple-git";
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const repos = ["/home/lucas/repo/facial_functions"];

// const repositoryPath = "/home/lucas/repo/qrcode_sync"; // Replace this with the path to your repository
const githubAccessToken = readFileSync(
  join("/", "home", "lucas", ".ssh", "githubtk.txt"),
  "utf-8"
); // Replace this with your GitHub access token
if (!githubAccessToken) throw new Error("Invalid github access token");
const masterName = "master";
const branchName = "silveira/upgradeHelpers2";
const prBody =
  "This PR upgrades the @tecsomobi/helpers package to the latest version.";
const repoName = "qrcode_sync"; // Replace this with your GitHub repository name
const ownerName = "Tecsomobi"; // Replace this with your GitHub username
const filesToAdd = ["package.json", "yarn.lock"];

const upgradePackage = async (repositoryPath: string) => {
  const repo = repositoryPath.split("/").pop();
  const commitMessage = `[fix] - ${repo} - update helpers`;

  try {
    // Step 0: Checkout master and run yarn
    console.log("Checked out master branch.");
    execSync(`git checkout ${masterName}`, { cwd: repositoryPath });
    console.log("Pulling.");
    execSync(`git pull`, { cwd: repositoryPath });
    console.log("Running yarn...");
    execSync("yarn --ignore-scripts", { cwd: repositoryPath });
    console.log("Installed with yarn");

    // Step 1: Create and checkout the upgrade branch
    execSync(`git checkout -b ${branchName}`, { cwd: repositoryPath });
    console.log(`Created and checked out branch '${branchName}'.`);

    // Step 2: Upgrade the package
    console.log("Upgrading package.");
    execSync("yarn upgrade @tecsomobi/helpers@latest --ignore-scripts", {
      cwd: repositoryPath,
    });
    console.log("Package upgraded.");

    // Step 3: Git add
    execSync(`git add ${filesToAdd.join(" ")}`, { cwd: repositoryPath });
    console.log("Changes added.");

    // Step 4: Git commit
    execSync(`git commit -m '${commitMessage}'`, { cwd: repositoryPath });
    console.log("Changes committed.");

    // Step 5: Git push
    execSync(`git push --set-upstream origin ${branchName}`, {
      cwd: repositoryPath,
    });
    console.log("Branch pushed.");

    // Step 6: Create a pull request using GitHub API
    const response = await axios.post(
      `https://api.github.com/repos/${ownerName}/${repo}/pulls`,
      {
        title: commitMessage,
        body: prBody,
        head: branchName,
        base: "master",
      },
      {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      }
    );

    console.log("Pull request created. PR URL:", response.data.html_url);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

(async () => {
  for (const repo of repos) {
    await upgradePackage(repo);
  }
})();
