import express from 'express'

import theatrecontoller from '../controller/theatreController'

    const router = express.Router()


    router.post('/theatre/addmovie',theatrecontoller.addMovie)



export default router