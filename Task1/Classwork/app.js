const fs = require('fs')
const path = require('path')

//Task1
// Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так


fs.mkdir(path.join(__dirname,'task1'),err=>{
    if (err){
        console.log(err)
        throw err
    }
})

fs.writeFile(path.join(__dirname,'task1', 'file.txt'), 'Hello Octen', err => {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.readFile(path.join(__dirname,'task1', 'file.txt'), (err, data) => {
    if (err) {
        console.log(err)
        throw err
    }
    fs.writeFile(path.join(__dirname,'task1', 'file2.txt'), `${data.toString()}`, err => {
        if (err) {
            console.log(err)
            throw err
        }
    })
})

//Task2
// Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//     старий файл видаліть після того як все завершиться. Також вийде callback hell

fs.mkdir(path.join(__dirname, 'task2'), err => {
    if (err) {
        console.log(err)
        throw err
    }
    fs.writeFile(path.join(__dirname, 'task2', 'file.txt'), 'good evening', err => {
        if (err) {
            console.log(err)
            throw err
        }
        fs.readFile(path.join(__dirname, 'task2', 'file.txt'), (err, data) => {
            if (err) {
                console.log(err)
                throw err
            }
            fs.mkdir(path.join(__dirname, 'task2', 'example'), err => {
                if (err) {
                    console.log(err)
                    throw err
                }
                fs.writeFile(path.join(__dirname, 'task2', 'example', 'file3.txt'),'', (err) => {
                    if (err) {
                        console.log(err)
                        throw err
                    }
                    fs.appendFile(path.join(__dirname, 'task2', 'example', 'file3.txt'), `${data.toString()}`, err => {
                        if (err) {
                            console.log(err)
                            throw err
                        }
                        fs.unlink(path.join(__dirname, 'task2', 'file.txt'), err => {
                            if (err) {
                                console.log(err)
                                throw err
                            }
                        })
                    })
                })
            })
        })
    })
})

// fs.mkdir(path.join(__dirname,'task1'),err=>{
//     if (err){
//         console.log(err)
//         throw err
//     }
// })
//
// fs.writeFile(path.join(__dirname,'task1', 'file.txt'), 'Hello Octen', err => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
// })
//
// fs.readFile(path.join(__dirname,'task1', 'file.txt'), (err, data) => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
//     fs.writeFile(path.join(__dirname,'task1', 'file2.txt'), `${data.toString()}`, err => {
//         if (err) {
//             console.log(err)
//             throw err
//         }
//     })
// })
//
// //Task2
// // Створіть файл ( можете вручну ) заповніть його якимись даними
// // Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// //     старий файл видаліть після того як все завершиться. Також вийде callback hell
//
// fs.mkdir(path.join(__dirname, 'task2'), err => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
//     fs.writeFile(path.join(__dirname, 'task2', 'file.txt'), 'good evening', err => {
//         if (err) {
//             console.log(err)
//             throw err
//         }
//         fs.readFile(path.join(__dirname, 'task2', 'file.txt'), (err, data) => {
//             if (err) {
//                 console.log(err)
//                 throw err
//             }
//             fs.mkdir(path.join(__dirname, 'task2', 'example'), err => {
//                 if (err) {
//                     console.log(err)
//                     throw err
//                 }
//                 fs.writeFile(path.join(__dirname, 'task2', 'example', 'file3.txt'),'', (err) => {
//                     if (err) {
//                         console.log(err)
//                         throw err
//                     }
//                     fs.appendFile(path.join(__dirname, 'task2', 'example', 'file3.txt'), `${data.toString()}`, err => {
//                         if (err) {
//                             console.log(err)
//                             throw err
//                         }
//                         fs.unlink(path.join(__dirname, 'task2', 'file.txt'), err => {
//                             if (err) {
//                                 console.log(err)
//                                 throw err
//                             }
//                         })
//                     })
//                 })
//             })
//         })
//     })
// })


//Task3
// Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать -
// це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки,
//     вам потрібно їх перейменувати і додати до назви префікс _new

fs.mkdir(path.join(__dirname, 'task3', 'example1'), err => {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.mkdir(path.join(__dirname, 'task3', 'example2'), err => {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.writeFile(path.join(__dirname, 'task3', 'file1.txt'), 'Hello Octen', err => {
    if (err) {
        console.log(err)
        throw err
    }
})

fs.writeFile(path.join(__dirname, 'task3', 'file2.txt'), 'Good Evening', err => {
    if (err) {
        console.log(err)
        throw err
    }
})

const searchFiles = (file) => {
    fs.readdir(path.join(__dirname,`${file}`),(err,data) => {
        if (err){
            console.log(err)
            throw err
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes('.txt')){
                fs.truncate(path.join(__dirname,`${file}`,`${data[i]}`),err=>{
                    if (err){
                        console.log(err)
                        throw err
                    }
                })
            }else {
                fs.rename(path.join(__dirname,`${file}`,`${data[i]}`),
                    path.join(__dirname,`${file}`,`new_${data[i]}`),err=>{
                    if (err){
                        console.log(err)
                        throw err
                    }
                    })
            }
        }
    })
}
searchFiles('task3')

