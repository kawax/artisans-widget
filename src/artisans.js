
const files = require.context('./elements/artisans', true, /\.js$/i);
files.keys().forEach(files);
