const path = require('path');
const fs = require('fs');

const onlineUsers = [
    {name: 'Andriy', age: 22, city: 'Lviv'},
    {name: 'Vasya', age: 25, city: 'Kyiv'},
    {name: 'Petro', age: 30, city: 'Odessa'}
]

const inPersonUsers = [
    {name: 'Natalia', age: 35, city: 'Kyiv'},
    {name: 'Katya', age: 18, city: 'Lviv'},
    {name: 'Olga', age: 22, city: 'Odessa'}
]

fs.mkdir(path.join(__dirname, 'main'), (err) => {
    if (err) {
        console.log(err)
        throw err

    }
    fs.mkdir(path.join(__dirname, 'main', 'online'), (err) => {
        if (err) {
            console.log(err)
            throw err
        }
    })
    fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
        if (err) {
            console.log(err)
            throw err
        }
    })
    for (let i = 0; i < onlineUsers.length; i++) {
        fs.writeFile(path.join(__dirname, 'main', 'online', 'file1.txt'),
            `\n name:${onlineUsers[i].name}, age:${onlineUsers[i].age}, city:${onlineUsers[i].city}`,
            {flag: 'a'}, (err) => {
                if (err) {
                    console.log(err)
                    throw err
                }
            })
    }

    for (let i = 0; i < inPersonUsers.length; i++) {
        fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'file1.txt'),
            `\n name:${inPersonUsers[i].name}, age:${inPersonUsers[i].age}, city:${inPersonUsers[i].city}`,
            {flag: 'a'}, (err) => {
                if (err) {
                    console.log(err)
                    throw err
                }
            })
    }
})


const changeUsers = (prev,next) => {
    fs.readFile(path.join(__dirname,'main',`${prev}`,'file1.txt'),(err,data)=>{
        if (err){
            console.log(err)
            throw err
        }
        fs.appendFile(path.join(__dirname,'main',`${next}`,'file1.txt'),`${data.toString()}`,
            {flag:'w'}, (err)=>{
            if (err){
                console.log(err)
                throw err
            }
        })
    })
}

// changeUsers('online','inPerson')
// changeUsers('inPerson','online')
