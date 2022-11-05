/* const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404; */
const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;
/* const CREATED = 201; */
/* const OK = 200; */
 
 function loginValition(req, res, next) {
    const { email, password } = req.body;
    const emailFormatValidation = /^[\w.]+@[\w.]+.[a-z]{2,3}(.[a-z]{2})?$/i;
    if (!email) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!emailFormatValidation.test(email)) {
         return res.status(BAD_REQUEST).json({ 
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    if (!password) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(BAD_REQUEST).json({ 
        message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
  }

 function nameValidation(req, res, next) {
    const { name } = req.body;
    if (!name) {
       return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(BAD_REQUEST).json({ 
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    return next();
 }

 function ageValidation(req, res, next) {
    const { age } = req.body;
    if (!age) {
       return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(BAD_REQUEST).json({ 
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }
    return next();
 }

 function talkValidation(req, res, next) {
    const { talk } = req.body;

    if (!talk) {
       return res.status(BAD_REQUEST).json({ message: 'O campo "talk" é obrigatório' });
    }
    return next();
 }

 function talkWatchedAtValidation(req, res, next) {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const dataValidation = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if ('watchedAt' in talk === false) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!dataValidation.test(watchedAt)) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
 }

 function rateValueVerification(value) {
    const intVerify = Number.isInteger(value);
    const ifBigerThanFive = value > 1 && value <= 5; 
    return intVerify && ifBigerThanFive;
  }

 function talkRateValidation(req, res, next) {
    const { talk } = req.body;
    const { rate } = talk;
    if ('rate' in talk === false) {
        return res.status(BAD_REQUEST).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!rateValueVerification(rate)) {
        return res.status(BAD_REQUEST).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
    return next();
 }

 function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });        
    }
    if (authorization.length < 16) {
        return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });        
    }
    return next();
 }

  module.exports = {
    loginValition,
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    talkWatchedAtValidation,
    talkRateValidation,
  };
