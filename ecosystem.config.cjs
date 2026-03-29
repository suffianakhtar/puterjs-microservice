module.exports = {
    apps: [
        {
            name: 'puter.js-microservice',
            script: './src/server.js',
            watch: false,
            exec_mode: 'fork',
            instances: 1,
            kill_timeout: 10000,
            out_file: './logs/out.log',
            error_file: './logs/error.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            merge_logs: true,
            env: {
                NODE_ENV: 'production',
                PORT: 3336
            }
        }
    ]
};
