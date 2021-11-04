import express from 'express';
import dayjs from 'dayjs';
import loginService from '../services/loginService';
import { parseLogin } from '../utils/dataParsers';
import { userIsLoggedIn } from '../utils/userChecker';

const router = express.Router();

// Login
router.post('/', (req, res, next) => {
  if (!userIsLoggedIn(req.cookies.token)) {
    const userFromInput = parseLogin(req.body);
    loginService
      .checkPassAndLogin(userFromInput)
      .then((jwt) => {
        console.log('jwt for login is!', jwt);
        const tokenExpirty = userFromInput.keepLoggedIn
          ? undefined
          : dayjs().add(1, 'minute').toDate(); // change expirty to 1h

        res.cookie('token', jwt, {
          secure: false, // this should later be changed
          httpOnly: true,
          expires: tokenExpirty,
        });

        res.status(200).send({
          message: 'Logged in!',
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(400).json({
      message: 'User already logged in',
    });
  }
});

// Logout
router.post('/logout', (req, res, next) => {
  console.log(req.cookies.token);
  try {
    res
      .clearCookie('token')
      .json({
        message: 'Logged out!',
      })
      .end();
  } catch (error) {
    next(error);
  }
});

export default router;
