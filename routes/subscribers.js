const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//get all subscribers
router.get('/', async (req, res) => {
    const subscriber = await Subscriber.find()
    try {
        res.status(200).json(subscriber)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//get subscriber using id
router.get('/:id', getSubscriberById, (req, res) => {
    res.json(res.subscriber)
})

//create subscriber
router.post('/', async (req, res) => {
    const newSubscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const sub = await newSubscriber.save()
        res.status(201).json(sub)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//update subscriber
router.patch('/:id', async (req, res) => {
    try {
        let subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' })
        }
        await subscriber.updateOne({ name: req.params.name, subscriberToChannel: req.params.subscribedToChannel, subscribeDate: req.params.subscribeDate })
        res.json({ message: 'Subscriber Updated' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//delete subscriber
router.delete('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' })
        }
        await subscriber.deleteOne()
        res.json({ message: 'Subscriber Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//middleware function which finds subscriber using id
async function getSubscriberById(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' })
        }
    }
    catch (err) {
        return res.status(200).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router