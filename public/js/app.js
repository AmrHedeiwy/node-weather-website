console.log('this is javascript')

// fetch('http://localhost:3000/weather?address=').then((response) => {
//     response.json().then((data) => {
//        if(data.error){
//         console.log(data.error)
//        } else{
//         console.log(data.address)
//         console.log(data.message)
//        }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
    response.json().then((data) => {
       if(data.error){
        message1.textContent = data.error
       } else{
        console.log(data.continent)
        message1.textContent = data.address, data.continent
        message2.textContent = data.message
       }
    })
})
})
