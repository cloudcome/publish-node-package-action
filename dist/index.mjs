import mapWorkspaces from "@npmcli/map-workspaces";
import fs from "fs";
import path from "path";
async function rewritePkgJSON(cwd, context) {
  var _a;
  console.log("publish-node-package-action", "1.9.1");
  const owner = (_a = context.payload.repository) == null ? void 0 : _a.owner.login;
  if (!owner) {
    throw new Error("No owner found in context");
  }
  const pkg = JSON.parse(fs.readFileSync(path.join(cwd, "/package.json"), "utf-8"));
  const workspaces = await mapWorkspaces({ pkg, cwd });
  Object.values(workspaces).forEach((workspace) => {
    const file = path.join(workspace, "/package.json");
    const pkg2 = JSON.parse(fs.readFileSync(file, "utf-8"));
    const underlineName = pkg2.name.replace(/@(.*)\/(.*)/, "$1__$2");
    pkg2.name = "@" + owner + "/" + underlineName;
    fs.writeFileSync(file, JSON.stringify(pkg2), "utf-8");
  });
  return "";
}
export {
  rewritePkgJSON as default
};
//# sourceMappingURL=index.mjs.map
