import app from './app'

app.get( '/', (req, res) => res.send("ok") );

app.listen( 8080, () => console.log('server listening on port 8080') )
