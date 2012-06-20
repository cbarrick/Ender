/*!
 * ENDER - The open module JavaScript framework
 *
 * Copyright (c) 2011-2012 @ded, @fat, @rvagg and other contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


var archy     = require('archy')
  , colors    = require('colors')
  , extend    = require('../util').extend
  , toKb      = require('../util').toKb
  , Output    = require('./output')
  , argsParse = require('../args-parse')

  , InfoOutput = extend(Output, { // inherit from Output

        buildInfo: function (filename, options, packages, sizes, archyTree) {
          var prepareTree = function (tree) {
            tree.nodes.forEach(prepareTree)
            if (tree.version) {
              tree.label =
                  (tree.label + '@' + tree.version)[tree.first ? 'yellow' : 'grey']
                + ' - '[tree.first ? 'white' : 'grey']
                + (tree.description || '')[tree.first ? 'white' : 'grey']
            }
          }
          prepareTree(archyTree)

          //this.log('Your current build type is ' + ('"' + options.main + '"').yellow)
          this.log('Your current build command is: ' + ('ender ' + argsParse.toContextString(options)).yellow)
          this.log(
              'Your current build size is: '
            + toKb(sizes.raw).yellow + ' raw'
            + (sizes.minify
                ? ', ' + toKb(sizes.minify).yellow + ' minified and ' + toKb(sizes.gzip).yellow + ' gzipped'
                : ''
              )

          )
          this.log()
          this.log(archy(archyTree))
        }

      , create: function (out, debug, quiet) {
          return Object.create(this).init(out, debug, quiet)
        }

    })

module.exports = InfoOutput