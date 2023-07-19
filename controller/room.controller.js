const { client } = require("../redis")
async function CreateRoom(req, res) {
    try {
        const { roomID, type } = req.body
        await client.set(`${roomID}`, `${type}`)
        await client.expire(`${roomID}`, 60 * 60)
        console.log(roomID, type);
        res.status(201).send({ "ok": true, "msg": "room created succesfully" })

    } catch (error) {
        res.status(401).send({ "ok": false, "msg": error.message })

    }
}

async function JoinRoom(req, res) {
    try {
        const { roomID, type } = req.body
        let isRoomExist = await client.exists(`${roomID}`)
        if (isRoomExist) {
            const DataBaseType = await client.get(`${roomID}`)
            console.log(DataBaseType);
            if (DataBaseType == type) {
                res.status(201).send({ "ok": true, "msg": "Room Joined Succesfully" })
            } else {
                res.send({ "ok": false, "msg": `${type} Room Doesn't Exist` });
            }
        } else {
            res.send({ "ok": false, "msg": `Room Doesn't Exist` });

        }
    } catch (error) {
        console.log(error);
        res.status(401).send({ "ok": false, "msg": error.message })

    }
}

module.exports={CreateRoom,JoinRoom}