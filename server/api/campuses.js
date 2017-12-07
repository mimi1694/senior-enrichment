'use strict'

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Campus = models.Campus;
const Student = models.Student;
module.exports = router;

router.get('/', (req, res, next)=>{
    Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
})

router.get('/:campusid', (req, res, next)=>{
    Campus.findAll({where:{id:req.params.campusid}},
                    {include:[{model:Student}]})
    .then(campuses=>res.json(campuses))
    .catch(next)
})


router.post('/', (req, res, next)=>{
    Student.create(req.body)
        .then(campus => res.json(campus))
        .catch(next)
})

router.put('/:campusid', (req, res, next)=>{
    Campus.findById(req.params.campusid)
    .then(campus=>campus.update(req.body))
    .then(campus => res.status(200).json(campus))
    .catch(next)
})

router.delete('/:campusid', (req, res, next)=>{
    Campus.findById(req.params.campusid)
    .then(campus=>campus.destroy())
    .then(()=> res.status(204).end())
    .catch(next);
})

router.get('/:campusid/students', (req, res, next)=>{
    Student.findAll({
        where:
            { campusId:req.params.campusid }
        },
        {include: [{model:Campus}]})
    .then(students=>res.json(students))
    .catch(next)
})