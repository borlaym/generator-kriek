/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  // required for collection.js template which uses `appname`
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = '.js';
  templateExt = ".hbs";

  /* COLLECTION */

  var destFile = path.join('js/collections', this.name + ext);
  var template = [
    '/*global define*/',
    '',
    'define([',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'parse\',',
    '    \'models/' + this.name + '\'',
    '], function (_, Backbone, Parse, ' + this._.classify(this.name) + 'Model' + ') {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'Collection = Parse.Collection.extend({',
    '        ' + 'model: ' + this._.classify(this.name) + 'Model',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'Collection;',
    '});'
  ].join('\n');

  this.write(destFile, template);

  /* MODEL */

  destFile = path.join('js/models', this.name + ext);
  template = [
    '/*global define*/',
    '',
    'define([',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'parse\'',
    '], function (_, Backbone, Parse) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'Model = Parse.Object.extend("'+this._.classify(this.name)+'", {',
    '        defaults: {',
    '        }',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'Model;',
    '});'
  ].join('\n');

  this.write(destFile, template);

  /* LIST ITEM VIEW */

  destFile = path.join('js/views', this.name + 'ListItem' + ext);
  template = [
    '/*global define*/',
    '',
    'define([',
    '    \'jquery\',',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'parse\',',
    '    \'hbs!templates/'+this.name+'ListItem\',',
    '    \'models/'+this.name+'\'',
    '], function ($, _, Backbone, Parse, template, '+this._.classify(this.name)+'Model) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'ListItemView = Backbone.View.extend({',
    '        ' + 'template: template,',
    '        tagName : "li",',
    '        className : "'+this.name+'",',
    '        initialize : function() {',
    '           this.render();',
    '        },',
    '        render : function() {',
    '           this.$el.html(this.template({model : this.model.toJSON()}));',
    '        },',
    '        events : {',
    '           ',
    '        }',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'ListItemView;',
    '});'
  ].join('\n');

  this.write(destFile, template);
  this.jst_path = 'js/templates/' + this.name + 'ListItem' + templateExt;
  this.template('view.ejs', this.jst_path);

  /* LIST VIEW */

  destFile = path.join('js/views', this.name + 'List' + ext);
  template = [
    '/*global define*/',
    '',
    'define([',
    '    \'jquery\',',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'parse\',',
    '    \'hbs!templates/'+this.name+'List\',',
    '    \'views/'+this.name+'ListItem\'',
    '], function ($, _, Backbone, Parse, template, '+this._.classify(this.name)+'ListItemView) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'ListItemView = Backbone.View.extend({',
    '        ' + 'template: template,',
    '        tagName : "ul",',
    '        className : "'+this.name+'",',
    '        initialize : function() {',
    '           this.render();',
    '        },',
    '        render : function() {',
    '           this.collection.each(function(item) {',
    '              this.$el.html("");',
    '              var '+this.name+'ListItem = new ' + this._.classify(this.name) + 'ListItemView({model : item});',
    '              this.$el.append('+this.name+'ListItem);',
    '           }, this);  ',
    '        },',
    '        events : {',
    '           ',
    '        }',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'ListItemView;',
    '});'
  ].join('\n');

  this.write(destFile, template);
  this.jst_path = 'js/templates/' + this.name + 'List' + templateExt;
  this.template('view.ejs', this.jst_path);

  /* CONTROLLER */

  destFile = path.join('js/', this.name + ext);
  template = [
    '/*global define*/',
    '',
    'define([',
    '    \'jquery\',',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'parse\',',
    '    \'collections/'+this.name+'\',',
    '    \'views/'+this.name+'\'',
    '], function ($, _, Backbone, Parse, '+this._.classify(this.name)+'Collection, '+this._.classify(this.name)+'View) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + ' = {',
    '        initialize : function() {',
    '           this.collection = new ' + this._.classify(this.name) + 'Collection();',
    '        }',
    '    };',
    '',
    '    return ' + this._.classify(this.name) + ';',
    '});'
  ].join('\n');

  this.write(destFile, template);

  /* CONTROLLER VIEW */

  destFile = path.join('js/views', this.name + ext);
  template = [
    '/*global define*/',
    '',
    'define([',
    '    \'jquery\',',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'parse\',',
    '    \'hbs!templates/'+this.name+'\',',
    '], function ($, _, Backbone, Parse, template) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'View = Backbone.View.extend({',
    '        ' + 'template: template,',
    '        tagName : "div",',
    '        className : "'+this.name+'",',
    '        initialize : function() {',
    '           ',
    '        },',
    '        render : function() {',
    '           this.$el.html(this.template({model : this.model.toJSON()}));',
    '        },',
    '        events : {',
    '           ',
    '        }',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'View;',
    '});'
  ].join('\n');

  this.write(destFile, template);
  this.jst_path = 'js/templates/' + this.name + templateExt;
  this.template('view.ejs', this.jst_path);
};
