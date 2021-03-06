exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'app.js': /^app/
        'vendor.js': /^bower_components/
      order:
        before: [
          /underscore/
          /jquery/
        ]
    stylesheets:
      joinTo:
        'app.css': /^app/
        'vendor.css': /^(bootstrap.css|)/
    templates:
      joinTo: 'app.js'
  server:
    path: './server/server.js'
    port: 7888
