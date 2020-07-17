const fs = require("fs");
const Datastore = require("nedb");
const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const server = express();
var cors = require("cors");
const usersAuthDataPath = "./database/usersAuth.db";
const usersDbPath = "./database/users.db";
const followDbPath = "./database/follow.db";
const followedDbPath = "./database/followed.db";

const usersAuthDataDb = new Datastore(usersAuthDataPath);
usersAuthDataDb.loadDatabase(err => console.log(err));
//usersAuthDataDb.persistence.compactDatafile();

let usersDb = new Datastore(usersDbPath);
usersDb.loadDatabase(err => console.log(err));

let followDb = new Datastore(followDbPath);
followDb.loadDatabase(err => console.log(err));

let followedDb = new Datastore(followedDbPath);
followedDb.loadDatabase(err => console.log(err));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors({ credentials: true }));

const SECRET_KEY = "123456789";

const expiresIn = "500d";


const loginPath = `/auth/login`;
const regPath = `/auth/register`;
const getUsersPath = `/data/users`;
const getProfilePath = `/data/profile/:id`;
const followPath = `/follow/:id`;
const unfollowPath = `/unfollow/:id`;
const followingPath = "/following";
const followedByPath = "/followedBy/:id";

const checkTokenPath = "/checkToken";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (decode !== undefined) {
      return decode;
    } else {
      return err;
    }
  });
}

const VerifyUser = (req, res, next) => {
  // followDb.insert({name:"Inserting Data"})
  console.log("Verufying user - req.headers: ");
  console.log(req.headers);

  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    console.log("unauthorized");
    res.status(status).json({ status, message });
    return;
  } else {
    try {
      let verifyTokenResult;
      verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);
      console.log("verifyTokenResult: ");
      console.log(verifyTokenResult);
      pFindInDb(usersAuthDataDb, {email: verifyTokenResult.email}).then(
        response => {
          // req.headers.id = response.id;
          if (verifyTokenResult instanceof Error) {
            const status = 401;
            const message = "Access token not provided";
            res.status(status).json({ status, message });
            return;
          }
          next();
        }
      )
    } catch (err) {
      const status = 401;
      const message = "Error accessToken is revoked";
      res.status(status).json({ status, message });
    }
  }
};

//find In Db Promise
const pFindInDb = (db, query) => {
  // console.log(query);
  return new Promise((resolve, reject) => {
    db.findOne(query, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
};


usersAuthDataDb.persistence.compactDatafile();

const Verification = [VerifyUser];

//Get following users
server.get(followingPath, Verification, (req, res) => {
  console.log("getfollowing endpoint called; request headers");
  console.log(req.headers);
  followDb.findOne({ _id: Number(req.headers.id) }, (err, docs) => {
    if (err) res(err);
    if (docs !== null) res.json(docs.following);
    else {
      res.json([]);
    }
  });
});

//Unfollow
server.post(unfollowPath, Verification, (req, res) => {
  console.log("unfollow endpoint called; request headers");
  console.log(req.headers);

  followDb.update(
    { _id: Number(req.headers.id) },
    { $pull: { following: Number(req.params.id) } },
    {}
  );
  followedDb.update(
    { _id: Number(req.params.id) },
    { $pull: { isFollowedBy: Number(req.headers.id) } },
    {}
  );
  res.json({ unfollowed: req.params.id });
});

//Follow
server.post(followPath, Verification, (req, res) => {
  console.log("follow endpoint called; request headers");
  console.log(req.headers);

  followDb.update(
    { _id: Number(req.headers.id) },
    { $addToSet: { following: Number(req.params.id) } },
    {}
  );
  followedDb.update(
    { _id: Number(req.params.id) },
    { $addToSet: { isFollowedBy: Number(req.headers.id) } },
    {}
  );
  res.json({ followed: req.params.id });
});

//check if token expired
server.post(checkTokenPath, (req, res) => {
  console.log("check token - req headers: ");
  console.log(req.headers);
  let verifyTokenResult;
  verifyTokenResult = verifyToken(req.headers.token);

  if (verifyTokenResult instanceof Error) {
    console.log("expired");

    res.json({
      status: "expired"
    });
  } else {
    console.log("verifyTokenResult: ");
    console.log(verifyTokenResult);
    let timeLeft = Number(verifyTokenResult.exp) - Math.ceil(Date.now() / 1000);
    console.log("time left: ");
    console.log(timeLeft);
    res.json({
      status: "expired",
      timeLeft
    });
  }
});

//Get User
server.get(getProfilePath, Verification, (req, res) => {
  console.log("getuser endpoint called; request params");
  console.log(req.params);
  let id = Number(req.params.id);
  pFindInDb(usersDb, { _id: id }).then(response => {
    if (response !== null) {
      console.log(response);
      let User = response;
      res.json(User);
    } else {
      res.json({
        status: "no user with this ID"
      });
    }
  });
});
//Get users
server.get(getUsersPath, Verification, (req, res) => {
  console.log("getusers endpoint called; request headers");
  console.log(req.headers);
  // console.log(req.query);

  let page = req.query.page;
  let limit = req.query.limit;
  if (!limit || !page) {
    const status = 406;
    const message = "no page or limit";
    res.status(status).json({ status, message });
  }
  let firstIndex = (page - 1) * limit;
  let lastIndex = Number(firstIndex) + Number(limit);
  //console.log(firstIndex + " " + lastIndex);
  usersDb.find({}, (err, docs) => {
    let Users = [];
    for (let i = firstIndex; i < lastIndex; i++) {
      Users.push(docs[i]);
    }
    let usersCount = docs.length;
    const data = { Users, usersCount };
    console.log("first Index: ");
    console.log(firstIndex);
    console.log("last Index: ");
    console.log(lastIndex);

    res.json(data);
  });
});

// Register New User
server.post(regPath, (req, res) => {
  console.log("register endpoint called; request headers");
  console.log(req.headers);
  const { email, password } = req.headers;

  //promise to check if user exists
  let isAuthPromise = new Promise((resolve, reject) => {
    usersAuthDataDb.find({ email, password }, (err, docs) => {
      console.log({ email, password });
      if (err) reject(err);

      docs.length === 0 ? resolve(false) : resolve(true);
    });
  });
  isAuthPromise.then(response => {
    console.log("exists: ");
    console.log(response);
    //if user exists
    if (response === true) {
      const status = 401;
      const message = "Email and Password already exist";
      res.status(status).json({ status, message });
      return;
    }
    //if not,register
    else {
      usersAuthDataDb.persistence.compactDatafile();

      //reducer to find max id
      const reducer = (accumulator, currValue) => {
        if (accumulator._id > currValue._id) {
          return accumulator;
        } else {
          return currValue;
        }
      };

      //get all,then reduce to max id
      usersAuthDataDb.find({}, (err, docs) => {
        //new id
        let id = docs.reduce(reducer)._id + 1;
        console.log(id);
        //today date
        let today = new Date().toISOString().slice(0, 10);

        //insert new user
        let user = {
          _id: id,
          isActive: false,
          age: "",
          name: "",
          gender: "",
          company: "",
          email: email,
          phone: "",
          location: { city: "", country: "" },
          about: "",
          registered: today,
          tags: [],
          greeting: "",
          backgroundImg:
            "https://media.istockphoto.com/photos/vintage-retro-grungy-background-design-and-pattern-texture-picture-id656453072?k=6&m=656453072&s=612x612&w=0&h=4TW6UwMWJrHwF4SiNBwCZfZNJ1jVvkwgz3agbGBihyE=",
          profileImg:
            "https://www.m5hosting.com/wp-content/uploads/no-profile-img.gif"
        };

        usersDb.insert(user);
        usersAuthDataDb.insert({ _id: id, email, password });
        followDb.insert({ _id: id, following: [] });
        followedDb.insert({ _id: id, isFollowedBy: [] });
        const accessToken = createToken({ email, password });

        console.log("Access Token:" + accessToken);
        console.log("email and password: ");
        console.log(email);
        console.log(password);
        res.status(200).json({ accessToken, id });
      });
    }
  });
});

// Login to one of the users from ./users.db
server.post(loginPath, (req, res) => {
  console.log("login endpoint called; request headers:");
  console.log(req.headers);

  const { email, password } = req.headers;
  //find user in db
  pFindInDb(usersAuthDataDb, { email, password }).then(response => {
    console.log("user in db");
    console.log(response);
    if (response === null) {
      const status = 401;
      const message = "Incorrect email or password";
      res.status(status).json({ status, message });
    } else {
      console.log("userID: ");
      console.log(response._id);
      let userId = response._id;
      const accessToken = createToken({ email, password });
      console.log("Access Token:" + accessToken);
      res.status(200).json({ accessToken, userId });
      return;
    }
  });
});

server.listen(4000, () => {
  console.log("Run Auth API Server on 4000");
});
