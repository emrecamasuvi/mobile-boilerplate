# mobile boilerplate
### designed for MKF mobile site
Hopefully will be enhanced progressively.

## Dependencies

- node, npm, ruby, ruby gems, grunt, bower (ofc most of you have these installed)
- ruby gems: image optimizer, sass `gem install image_optim sass`

## Newbies please read these article first

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
