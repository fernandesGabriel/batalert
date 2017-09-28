# Batalert System

## About

Batalert is a system designed to handle Batman´s need on the internet era. It creates an interface with different APIs as Google and Batcave's supercomputer. 

The following web stack is used on its development: ECMA6, SASS, React, Gulp. The Bulma CSS framework is also used to help the interface development.

Other development concepts as mobile first and dependency injection were used.

## Requirements

Make sure you have Node.js and NPM proper installed on your computer before continue. Since this project does access some external scripts, you may need to host it on any webserver of your preference.

## Structure

Before its compilation, Batalert project is divided in two folders:

**assets**: contains static assets for the project as images and fonts

**src**: stores source files as SASS and JS that will be compiled in sequence 

After the build process a third folder will be created. The **dist** folder stores the compiled versions of the ES6 and SCSS.

Gulp and Babel is used to compile ECMA6 to ES2015 and the CSS source files.
 
## Installation

If you are able to execute a shell scrip, run the following command on the project root and be happy:
``` shell
./make.sh
```

If you are not able to execute it, run the following commands on the project root: 

1 - Install Gulp globally

``` shell
npm install -g gulp
```

2 - Download project dependencies

``` shell
npm install
```

3 - Build project assets
 
``` shell
gulp build
```
 
## Roadmap / Improvements

Some improvements for the current version can be the following:
* Improve User Experience
* Add better error handling and messages
* Refine UI
* Use Webpack
* Add Gulp file watch

