module.exports = function (grunt) {

    grunt.initConfig({
        // Task: clean
        clean: {
            css: {
                src: ["style/*.min.css"]
            },
            js: {
                src: ["js/*.min.js"]
            }
        },

        // Task: for templates
        nunjucks: {
            options: {},
            render: {
                files: [{
                    expand: true,
                    cwd: "templates/",
                    src: "*.twig.html",
                    dest: "html/",
                    ext: ".html"
                }]
            }
        },

        // Task: sass
        sass: {
            dist: {
                options: {
                    style: "compressed"
                },
                files: {
                    "style/app.css": "sass/main.scss", // 'destination': 'source'
                }
            }
        },

        // Task: minify
        cssmin: {
            dist: {
                files: {
                    "style/lib.min.css": [
                        "node_modules/bootstrap/dist/css/bootstrap.min.css",
                        "node_modules/swiper/swiper-bundle.min.css",
                    ]
                }
            }
        },

        // Task: concat
        concat: {
            options: {
                stripBanners: true,
            },
            jsPlugins: {
                src: [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
                    "node_modules/swiper/swiper-bundle.min.js",
                ],
                dest: "js/lib.js"
            }
        },

        jshint: {
            all: [
                "gruntfile.js",
                "js/site.js"
            ]
        },

        uglify: {
            js: {
                files: {
                    "js/lib.min.js": ["js/lib.js"]
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    "js/site.js"
                ],
                tasks: ["js"],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ["sass/**/*.scss"],
                tasks: [
                    "sass"
                ],
                options: {
                    livereload: true
                }
            },
            template: {
                files: ["templates/**/*.twig.html"],
                tasks: ["html"],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nunjucks-2-html');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-sync');

    // all HTML tasks
    grunt.registerTask("html", ["nunjucks"]);

    // all CSS tasks
    grunt.registerTask("css", ["clean:css", "cssmin", "sass"]);

    // all JS tasks
    grunt.registerTask("js", [
        //"concat:js", // TODO: remove. deprecated
        "jshint",
        "clean:js",
        "concat:jsPlugins",
        "uglify:js"
    ]);

    grunt.registerTask("default", ["css", "js", "html"]);
};