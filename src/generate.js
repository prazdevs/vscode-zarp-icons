var fs = require("fs");
const path = require("path");

const associations = require('./associations.json');

// generate icon defs from SVGs

const fileIconsPath = path.join(__dirname, "..", "fileicons", "svg");

let iconTheme = {};

fs.readdir(fileIconsPath, (err, files) => {
  const iconDefinitions = {};

  files.forEach((file) => {
    const name = file.slice(0, -4);
    iconDefinitions["_file_" + name] = { iconPath: `./svg/${name}.svg` };
  });

  iconTheme.iconDefinitions = iconDefinitions;

  iconTheme = { ...associations, ...iconTheme };

  const data = JSON.stringify(iconTheme, null, 4);

  fs.writeFile("fileicons/zarp.json", data, (err) => {
    if (err) throw err;
  });
});
