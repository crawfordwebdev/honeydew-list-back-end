import { Honeydo } from '../models/honeydo.js'

function create(req, res) {
  // add the profile ObjectID of the user to the body of request
  req.body.owner = req.user.profile
  // create a honeydo
  Honeydo.create(req.body)
  .then(honeydo => {
    console.log("honeydo created: ", honeydo)
    // populate the 'owner' of honeydo
    Honeydo.findById(honeydo._id)
    .populate('owner')
    .then(populatedHoneydo => {
      // respond with json (honeydo)
      res.json(populatedHoneydo)
    })
    .catch(err => {
      console.log(err)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
  console.log('index req.user.profile', req.user.profile)

  Honeydo.find({owner: req.user.profile})
  .then(honeydos => {
    console.log("index: honeydos found for user", honeydos)
    res.json(honeydos)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function show(req, res) {
  Honeydo.findById(req.params.id)
  .then(honeydo => {
    if (honeydo.owner._id.equals(req.user.profile)){
      res.json(honeydo)
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Honeydo.findById(req.params.id)
  .then(honeydo => {
    if (honeydo.owner._id.equals(req.user.profile)){
      Honeydo.findByIdAndDelete(honeydo._id)
      .then(deletedHoneydo => {
        res.json(deletedHoneydo)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Honeydo.findById(req.params.id)
  .then(honeydo => {
    if (honeydo.owner._id.equals(req.user.profile)) {
      req.body.finished = !req.body.finished // Flip it for the checkbox
      Honeydo.findByIdAndUpdate(req.params.id, req.body, {new: true}) // new: true returns the modified document instead of the original
      .populate('owner')
      .then(updatedHoneydo => {
        res.json(updatedHoneydo)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}


export {
  create,
  index,
  deleteOne as delete,
  update,
  show,
}