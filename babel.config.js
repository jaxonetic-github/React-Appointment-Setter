module.exports = {

  presets: ['@babel/preset-env', '@babel/preset-react'],
 plugins: [ "@babel/plugin-syntax-jsx","transform-class-properties","@babel/plugin-transform-runtime"],
  ignore: ["./src/react-date-picker",'./src/stories'],


};