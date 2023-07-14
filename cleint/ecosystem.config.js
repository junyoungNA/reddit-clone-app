module.export = {
    apps : [{
        name :'reddit-client',
        script:'env-cmd -f .env.production next start'
    }]
}