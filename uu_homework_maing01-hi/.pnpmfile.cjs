const fs = require("fs");
const path = require("path");

module.exports = {
  hooks: {
    readPackage,
  },
};

// handle "bad" packages that require() things that aren't in their package.json
// https://github.com/pnpm/pnpm/issues/949
// NOTE To apply changes added to this map: remove node_modules/, shrinkwrap.yaml and run "pnpm install" again.
let customNpmTag;
let useCustomNpmTag;
function readPackage(pkg) {
  // explicitly use tag from .npmrc for uu_* dependencies (pnpm otherwise ignores the setting)
  // but only for backend apps / libraries
  if (pkg.dependencies || pkg.devDependencies) {
    if (customNpmTag === undefined) {
      let projectPkg = require("./package.json");
      useCustomNpmTag = typeof projectPkg.spec === "string" && projectPkg.spec.match(/^(nodejs-|iso-)/);
      if (useCustomNpmTag) {
        customNpmTag = getTagFromNpmrc(".npmrc");
        if (customNpmTag === undefined) customNpmTag = getTagFromNpmrc(path.join(require("os").homedir(), ".npmrc"));
        useCustomNpmTag = !!customNpmTag;
      }
      if (customNpmTag === undefined) customNpmTag = null;
    }
    if (useCustomNpmTag) {
      setDependendciesTag(pkg.dependencies, customNpmTag);
      setDependendciesTag(pkg.devDependencies, customNpmTag);
    }
  }

  // hide peer dependency warnings from enzyme/react-hot-loader in nodejs-app project
  if (pkg.peerDependencies) {
    delete pkg.peerDependencies["react"];
    delete pkg.peerDependencies["react-dom"];
  }

  return pkg;
}

function getTagFromNpmrc(npmrcPath) {
  if (!fs.existsSync(npmrcPath)) return;
  let tag;
  let npmrc = fs.readFileSync(npmrcPath, "utf-8");
  npmrc.replace(/(?:^|\n)\s*tag\s*=\s*(\S+)/, (m, g) => (tag = g));
  return tag;
}
function setDependendciesTag(deps, tag) {
  if (!deps) return;
  for (let k in deps) {
    if (k.startsWith("uu_") && (typeof deps[k] !== "string" || !deps[k].startsWith("file:"))) {
      deps[k] = tag;
    }
  }
}
