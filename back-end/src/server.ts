import app from './app'

const port =  Number(process.env.PORT)

app.listen(port || 3333, () => {
  console.log(`Sever started 🚀 port: ${3333}`)  
})
