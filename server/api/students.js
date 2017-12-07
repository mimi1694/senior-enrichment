'use strict'

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Student = models.Student;
module.exports = router;

router.get('/', (req, res, next)=>{
    Student.findAll()
    .then(students => res.json(students))
    .catch(next);
})

router.get('/:id', (req, res, next)=>{
    Student.findAll({where:{id:req.params.id}})
    .then(students=>res.json(students))
    .catch(next)
})

router.post('/', (req, res, next)=>{
    Student.create(req.body)
        .then(student => res.json(student))
        // .then(student=>student.setCampus(student.campusId))
        .catch(next)
})

router.put('/:studentid', (req, res, next)=>{
    Student.findById(req.params.studentid)
    .then(student=>student.update(req.body))
    .then(student => res.status(200).json(student))
    .catch(next)
})

router.delete('/:studentid', (req, res, next)=>{
    Student.findById(req.params.studentid)
    .then(student=>student.destroy())
    .then(()=> res.status(204).end())
    .catch(next);
})

