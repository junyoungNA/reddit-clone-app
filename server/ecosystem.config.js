module.export = {
    apps : [{
        name :'reddit-server',
        script:'env-cmd -f .env.production ts-node ./src/server.ts'
    }]
}