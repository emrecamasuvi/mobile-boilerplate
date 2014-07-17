# mobile boilerplate
### designed for MKF mobile site
Hopefully will be enhanced progressively.

## Dependencies
- image optimizer `gem install image_optim`s

## Newbies Read these article first
- [Grunt Boilerplate](http://integralist.co.uk/Grunt-Boilerplate.html)
- [Using Grunts Config API](http://integralist.co.uk/Using-Grunts-Config-API.html)

## Usage
- After u cloned the repo, run `npm install && bower install` to install missing packages
- If you need to add a "XXX" plugin or any JS:
  - Install by running `bower install xxx --save-dev`
  - You should add JS path to "JSfiles" variable in gruntfile.js
- Run your local development server by `grunt server`
- Run `grunt minify` to minify & optimize
- Last but not the least for production site, run `grunt build`
