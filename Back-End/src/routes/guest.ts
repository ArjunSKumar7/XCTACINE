import express from 'express'

import guestcontroller from '../controller/guestController'

const router = express.Router()

    router.get("/guestmovielist",guestcontroller.guestMovieList)

export default router