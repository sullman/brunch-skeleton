exports.config = {
    paths: {
        watched: ['app', 'vendor']
    },
    conventions: {
        ignored: /^(vendor\/styles\/bootstrap\/*|(.*?\/)?[_]\w*)/
    },
    files: {
        javascripts: {
            defaultExtension: "js",
            joinTo: {
                "javascripts/app.js": /^app/,
                "javascripts/vendor.js": /^vendor/
            },
            order: {
                before: [
                    'vendor/scripts/console-helper.js',
                    'vendor/scripts/jquery.js',
                    'vendor/scripts/underscore.js',
                    'vendor/scripts/backbone.js',
                    'vendor/scripts/backbone.marionette.js',
                    'vendor/scripts/bootstrap/transition.js',
                    'vendor/scripts/bootstrap/alert.js',
                    'vendor/scripts/bootstrap/button.js',
                    'vendor/scripts/bootstrap/carousel.js',
                    'vendor/scripts/bootstrap/collapse.js',
                    'vendor/scripts/bootstrap/dropdown.js',
                    'vendor/scripts/bootstrap/modal.js',
                    'vendor/scripts/bootstrap/tooltip.js',
                    'vendor/scripts/bootstrap/popover.js',
                    'vendor/scripts/bootstrap/scrollspy.js',
                    'vendor/scripts/bootstrap/tab.js',
                    'vendor/scripts/bootstrap/affix.js',
                    'vendor/scripts/swag.js'
                ]
            }
        },
        stylesheets: {
            joinTo: "stylesheets/app.css",
            order: {
                before: [
                    'app/styles/bootstrap.less',
                    'vendor/styles/font-awesome.css'
                ]
            }
        },
        templates: {
            defaultExtension: "hbs",
            joinTo: "javascripts/app.js"
        }
    },
    server: {
        port: 8080,
        run: true
    }
};