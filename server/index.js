
require('dotenv').config();
const cors = require('cors')
const { urlencoded } = require('express')
const express = require('express');
const { addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } = require('firebase/firestore');
const app = express()
const multer = require('multer');
const {currentCode,infoUser, favList} = require('./config')
const upload = multer()
var accountSid = process.env.ACCOUNT_SID; 
var authToken = process.env.TOKEN_TWILIO; 

const client = require('twilio')(accountSid, authToken);


app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cors())

app.post('/getcode', upload.none(), async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if(req.body.phone){
        const code = Math.floor(100000 + Math.random() * 900000);

        let verifiedcode = ''
        let refDoc = ''
        const QuerySnapshot = await getDocs(currentCode)
        QuerySnapshot.forEach(doc => {
            verifiedcode = doc.id
        });
        if (verifiedcode) {
            refDoc = doc(currentCode, verifiedcode)
            sendText(code,req.body.phone)
        }
        if (refDoc) {
            await updateDoc(refDoc, { code: code })
            sendText(code, req.body.phone)
        } else {
            await addDoc(currentCode, {
                code: code
            });
        }
    }
})

app.post('/signin', upload.none(), async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const QuerySnapshot = await getDocs(currentCode)
    const QuerySnapshotInfo = await getDocs(infoUser)
    let verifiedcode = ''
    let docId = ''
    let infoId = ''
    let dataInfo = ''
    QuerySnapshot.forEach(doc => {
        verifiedcode = doc.data().code
        docId = doc.id
    });
    QuerySnapshotInfo.forEach(doc => {
        dataInfo = doc.data().phone
        infoId = doc.id        
    });
    let message =''
    let success = false
    const refDoc = doc(currentCode, docId)
    
    if(verifiedcode === +req.body.code){
        message = ''
        success = true
        if(!dataInfo){
            await addDoc(infoUser, {
                phone: req.body.phone
            })
        }else{
            const refInfo = doc(infoUser, infoId)
            await updateDoc(refInfo, { phone: req.body.phone })
        }

        await deleteDoc(refDoc,"code")
    }else if(!verifiedcode){
        message = "No validation code was sent!"
        success =false
    }else{
        message = "Incorrect validation code! Try again"
        success = false
    }
    res.json({
        success,
        message
    })
})

app.post('/likeGithubUser', upload.none(), async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const likedUser = req.body.github_user_id
    let list = ''
    let listId = ''
    let docRef = ''
    const QuerySnapshot = await getDocs(favList)
    QuerySnapshot.forEach(doc => {
        list = doc.data().list
        listId = doc.id
    })
    if (Array.isArray(list) && list.length > 0) {
        docRef = doc(favList, listId)
        if (list.indexOf(likedUser) !== -1) {
            await updateDoc(docRef, {
                list: arrayRemove(likedUser)
            })
        } else {
            await updateDoc(docRef, {
                list: arrayUnion(likedUser)
            })
        }

    } else {
        await addDoc(favList, {
            list: [likedUser]
        })
    }
    res.json({
        status: 'push'
    })
})

app.get('/getFavList',async (req, res) => {
    // res.send('hello world')
    res.header("Access-Control-Allow-Origin", "*")
    let list = ''
    let infoUserAcc =''
    const QuerySnapshotList = await getDocs(favList)
    const QuerySnapshotInfo = await getDocs(infoUser)

    QuerySnapshotList.forEach(doc => {
        list = doc.data().list
    });

    QuerySnapshotInfo.forEach(doc => {
        infoUserAcc = doc.data().phone
    });
    if (req.query.phone === infoUserAcc) {
        res.json({
            favList: list
        })
        console.log(list)
    }else{
        res.send('different!')
    }
    console.log('asdas')
})



app.get('/getUserProfile',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    let list = ''
    let infoUserAcc = ''
    const QuerySnapshotList = await getDocs(favList)
    const QuerySnapshotInfo = await getDocs(infoUser)

    QuerySnapshotList.forEach(doc => {
        list = doc.data().list
    });
    QuerySnapshotInfo.forEach(doc => {
        infoUserAcc = doc.data().phone
    });
    const arrayUsers = []
    if (req.query.phone_number === infoUserAcc && list?.length > 0) {
        for(let i = 0 ; i<list.length ;i++){
            const response = await fetch(`https://api.github.com/user/${list[i]}`);
            const json = await response.json();
            if (json) {
                arrayUsers.push(json)
            }
        }
    }
    res.json({
        favorite_github_users:arrayUsers
    })
})

const sendText = (dataText,phoneNo) => {
    client.messages
        .create({
            body: `Your verification code is ${dataText}`,
            messagingServiceSid: 'MG8384452b80f4479f6cb43eaa6ddd8d6a',
            to: phoneNo
        })
        .then(message => console.log(message.sid))
        .done();
}

app.listen(3001)

