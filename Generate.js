const sourceFolder = './assets';

const fs = require('fs');
const glob = require('glob');

const pathsArr = glob.sync(`${sourceFolder}/**/*.png`);

const getBundleNames = (paths) => {
   const bundleNames = [];  
   paths.forEach((path) => {
      if (!bundleNames.includes(path.split('/')[2])) {
         bundleNames.push(path.split('/')[2]);
      }
   })
   return bundleNames;
}

const getBundleName = (path) => path.split('/')[2];

const formTemplate = (paths) => {

   const bundleNames = getBundleNames(paths);
   const template = {
      "bundles":[]
   }
   
   const formAssetEntry = (path) => {
      const name = path.replace(/^.*[\\\/]|....$/, '').replace(/.{4}$/, '');
      return {
         "name": name,
         "srcs": path,
      }
   }

   bundleNames.forEach((bundleName) => {
      template.bundles.push({"name": bundleName, "assets": []})
   })

   paths.forEach((path) => {
      const bundleName = getBundleName(path);
      console.log(bundleName);
      const bundleIndex = bundleNames.indexOf(bundleName);
      console.log(bundleIndex);
      
      console.log(formAssetEntry(path));
      template.bundles[bundleIndex].assets.push(formAssetEntry(path));
      console.log(template.bundles[bundleIndex]);
   });
   
   return(template);
}

const JSONstr = JSON.stringify(formTemplate(pathsArr));

try {
   fs.writeFileSync("./assets/manifest.json", JSONstr);
   console.log('file written successfully');
} catch (err) {
   console.error(err);
}
// pathsArr.forEach((pathStr) => {
   //    const fullPath = `${pathStr}`;
//    const path = fullPath.split('/').slice(2)
//    const bundleName = path[0];
   
//    if (!bundles.includes(bundleName)) {
//       bundles.push(bundleName)
//    }
// });

// console.log(bundles);
// const getDirectories = (src, callback) => {
//   glob(`${src}/**/*.png`, callback);
// };

// const getStats = (file, callback) => {
//    fs.stat(file, callback)
// };

// console.log(getDirectories);

// let filesArr = [];

// getDirectories(sourceFolder, (err, files) => {
//   if (err) {
//       console.log('Error', err);
//   } else {
//       filesArr = files;
//       console.log(filesArr)
//    }
// });